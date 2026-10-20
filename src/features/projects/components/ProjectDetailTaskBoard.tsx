"use client";

// تخته وظایف پروژه: هر وظیفه یک آکاردئون است که با کلیک باز/بسته می‌شود
// و توضیحات آن نمایش داده می‌شود. امکان افزودن وظیفهٔ جدید هم از همین بخش فراهم است.
import {useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {NewProjectTaskInput, ProjectTask} from "../types";
import {formatProjectDate, getTaskDescription, getTaskTitle} from "../lib/display";
import {ProjectTaskCreateModal} from "./ProjectTaskCreateModal";

interface ProjectDetailTaskBoardProps {
  tasks: ProjectTask[];
  onAddTask: (task: NewProjectTaskInput) => void;
}

const TASK_STATUS_STYLE: Record<ProjectTask["status"], string> = {
  done: "bg-emerald-500/10 text-emerald-700",
  in_progress: "bg-amber-500/10 text-amber-700",
  todo: "bg-slate-500/10 text-slate-700",
};

const TASK_STATUS_LABEL_KEY: Record<ProjectTask["status"], string> = {
  done: "task.done",
  in_progress: "task.inProgress",
  todo: "task.todo",
};

export function ProjectDetailTaskBoard({tasks, onAddTask}: ProjectDetailTaskBoardProps) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const totalTasks = tasks.length;

  const toggleTask = (taskId: string) => {
    setExpandedTaskId((current) => (current === taskId ? null : taskId));
  };

  return (
    <section
      className="animate-in slide-in-from-top-1 rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6"
      style={{animationDelay: "200ms"}}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("tasksLabel")}</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">{t("taskBoard")}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {doneTasks}/{totalTasks} {t("done")}
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/95"
          >
            <Icons.Plus size={14} />
            {t("addTask")}
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/50 bg-background/40 p-6 text-center text-sm text-muted-foreground">
            {t("noTasks")}
          </div>
        ) : (
          tasks.map((task, index) => {
            const isOpen = expandedTaskId === task.id;
            const panelId = `task-panel-${task.id}`;
            const headerId = `task-header-${task.id}`;
            const description = getTaskDescription(task, t);

            return (
              <div
                key={task.id}
                className="animate-in slide-in-from-start overflow-hidden rounded-2xl border border-border/40 bg-background/60 transition duration-200 hover:border-primary/25 sm:bg-background/60"
                style={{animationDelay: `${250 + index * 70}ms`}}
              >
                <button
                  type="button"
                  id={headerId}
                  onClick={() => toggleTask(task.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full flex-col gap-3 p-4 text-start outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex min-w-0 flex-col text-start">
                    <span className="truncate text-sm font-semibold text-foreground">{getTaskTitle(task, t)}</span>
                    <span className="mt-1 text-xs text-muted-foreground">{task.assignee}</span>
                  </span>

                  <span className="flex items-center gap-2 sm:justify-end">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${TASK_STATUS_STYLE[task.status]}`}>
                      {t(TASK_STATUS_LABEL_KEY[task.status])}
                    </span>
                    {task.dueDate ? (
                      <span className="text-xs text-muted-foreground">{formatProjectDate(task.dueDate, locale)}</span>
                    ) : null}
                    <Icons.ArrowDown
                      size={16}
                      className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border/40 px-4 pb-4 pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {t("taskDescription")}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {description || t("noDescription")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <ProjectTaskCreateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={onAddTask} />
    </section>
  );
}

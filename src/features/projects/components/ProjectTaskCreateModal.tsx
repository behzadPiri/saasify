"use client";

// مودال ایجاد وظیفهٔ جدید — یک کامپوننت نمایشی (View) است.
// منطق فرم در `useTaskCreateForm` قرار دارد و این کامپوننت فقط رندر و ارسال داده را انجام می‌دهد.
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Modal} from "@/shared/components/ui";
import {useTaskCreateForm} from "../hooks";
import type {NewProjectTaskInput, ProjectTask} from "../types";

interface ProjectTaskCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (task: NewProjectTaskInput) => void;
}

// گزینه‌های وضعیت وظیفه که در select نمایش داده می‌شوند.
const STATUS_OPTIONS: Array<{value: ProjectTask["status"]; labelKey: string}> = [
  {value: "todo", labelKey: "task.todo"},
  {value: "in_progress", labelKey: "task.inProgress"},
  {value: "done", labelKey: "task.done"},
];

export function ProjectTaskCreateModal({open, onClose, onCreate}: ProjectTaskCreateModalProps) {
  const t = useTranslations("Projects");
  const tCommon = useTranslations("Common");
  const {
    title,
    assignee,
    description,
    status,
    dueDate,
    setTitle,
    setAssignee,
    setDescription,
    setStatus,
    setDueDate,
    canSave,
    handleSubmit,
  } = useTaskCreateForm(open, onCreate, onClose);

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={t("taskModal.title")}
      className="mx-4 mb-4 max-w-2xl rounded-4xl sm:mx-0 sm:mb-0"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{t("addTask")}</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{t("taskModal.title")}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("taskModal.description")}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/50 bg-card/90 text-muted-foreground transition hover:bg-muted/70 hover:text-foreground"
          aria-label={tCommon("close")}
        >
          <Icons.X size={18} />
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">{t("taskModal.titleField")}</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t("taskModal.titleField")}
            className="mt-2 w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">{t("taskModal.assignee")}</span>
          <input
            type="text"
            value={assignee}
            onChange={(event) => setAssignee(event.target.value)}
            placeholder={t("taskModal.assignee")}
            className="mt-2 w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-muted-foreground">{t("taskModal.descriptionField")}</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={t("taskModal.descriptionField")}
            rows={3}
            className="mt-2 w-full resize-none rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">{t("taskModal.status")}</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectTask["status"])}
            className="mt-2 w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">{t("taskModal.dueDate")}</span>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          {tCommon("cancel")}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSave}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icons.Plus size={16} />
          {tCommon("save")}
        </button>
      </div>
    </Modal>
  );
}

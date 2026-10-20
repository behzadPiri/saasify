"use client";

// نمای کلی پروژه: شناسه، درصد تکمیل و کارت‌های بودجه/اعضا/مهلت.
// انیمیشن ورود با تاخیر کوتاه نسبت به هدر اجرا می‌شود تا ظاهر شدن محتوا پلکانی باشد.
import {useLocale, useTranslations} from "next-intl";
import type {ProjectSummary, ProjectTask} from "../types";
import {formatProjectCurrency, formatProjectDate} from "../lib/display";

interface ProjectDetailOverviewProps {
  project: ProjectSummary;
  tasks: ProjectTask[];
}

export function ProjectDetailOverview({project, tasks}: ProjectDetailOverviewProps) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const totalTasks = tasks.length;
  const completion = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return (
    <section
      className="animate-in slide-in-from-top-1 rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6"
      style={{animationDelay: "100ms"}}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("projectId")}</p>
          <p className="mt-2 text-xl font-semibold text-foreground">{project.id}</p>
        </div>
        <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
          {completion}% {t("complete")}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatCard label={t("budget")} value={formatProjectCurrency(project.budget, locale)} />
        <StatCard label={t("members")} value={project.members} />
        <StatCard label={t("deadline")} value={formatProjectDate(project.deadline, locale)} />
      </div>
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({label, value}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/60 p-4 transition duration-200 hover:border-primary/25 hover:bg-accent/10">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}

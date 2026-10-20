"use client";

// جدول زمانی پروژه: تاریخ شروع، سررسید و آخرین به‌روزرسانی.
// انیمیشن ورود از سمت انتهای صفحه با تاخیر بیشتر برای ستون کناری.
import {useLocale, useTranslations} from "next-intl";
import type {ProjectSummary} from "../types";
import {formatProjectDate} from "../lib/display";

interface ProjectDetailTimelineProps {
  project: ProjectSummary;
}

export function ProjectDetailTimeline({project}: ProjectDetailTimelineProps) {
  const t = useTranslations("Projects");
  const locale = useLocale();

  return (
    <section
      className="animate-in slide-in-from-end rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6"
      style={{animationDelay: "300ms"}}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("timeline")}</p>
      <div className="mt-5 space-y-4 text-sm text-muted-foreground">
        <TimelineRow label={t("startDate")} value={formatProjectDate(project.startDate, locale)} />
        <TimelineRow label={t("dueDate")} value={formatProjectDate(project.dueDate, locale)} />
        <TimelineRow label={t("updatedAt")} value={formatProjectDate(project.updatedAt, locale)} />
      </div>
    </section>
  );
}

interface TimelineRowProps {
  label: string;
  value: string;
}

function TimelineRow({label, value}: TimelineRowProps) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/60 p-4 transition duration-200 hover:border-primary/25 hover:bg-accent/10">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

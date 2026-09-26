"use client";

// کارت نمایش پروژه — صرفاً مسئول نمایش اطلاعات پروژه است.
// منطق زمانی و فرم‌ها در هوک‌ها (مثلاً `useProjectsPage`) جدا شده‌اند.
// توضیحات:
// - مقدار `now` یک بار پس از مونت گرفتن گرفته می‌شود تا از فراخوانی‌های
//   impure مثل Date.now() در هنگام رندر جلوگیری شود.
// - انیمیشن پیشرفت با یک تایم‌آوت کوتاه پیاده‌سازی شده تا تغییرات
//   بازگشتی (layout shift) کمتر رخ دهد.
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Link} from "@/i18n/navigation";
import type {ProjectSummary} from "../types";
import {PROJECT_STATUS_STYLE} from "../constants";

interface ProjectCardProps {
  project: ProjectSummary;
  formatDate: (date: Date) => string;
  formatCurrency: (value: number) => string;
}

export function ProjectCard({project, formatDate, formatCurrency}: ProjectCardProps) {
  const statusStyle = PROJECT_STATUS_STYLE[project.status];
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // مقدار ثابت زمان را یکبار پس از مونت گرفتن تعیین می‌کنیم تا
    // محاسباتی مانند تعیین معوق بودن پروژه (`isOverdue`) از فراخوانی
    // مستقیم Date.now() در حین رندر منع شوند. از میکروتسک استفاده می‌کنیم
    // تا ست‌کردن state داخل اثر به صورت هم‌زمان (synchronous) انجام نشود.
    Promise.resolve().then(() => setNow(Date.now()));
  }, []);

  const isOverdue = project.deadline ? (now !== null ? project.deadline.getTime() < now : false) : false;
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const t = useTranslations("Projects");

  // افکت انیمیشنی برای نشان دادن تدریجی مقدار پیشرفت
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setAnimatedProgress(Math.min(Math.max(project.progress, 0), 100));
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [project.progress]);

  const progressWidth = `${animatedProgress}%`;

  // کل کارت یک لینک است تا UX کلیک‌پذیری ساده باشد؛
  // تمرکز (focus) و موتورهای دسترسی در نظر گرفته شده‌اند.
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block w-full rounded-3xl border border-border/40 bg-card/80 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex flex-col gap-5 min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-2">{project.name}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {project.members !== undefined && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-1">
                  <Icons.Users size={12} />
                  {project.members} {t("members")}
                </span>
              )}
              {project.deadline && (
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${isOverdue ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                  <Icons.Calendar size={12} />
                  {formatDate(project.deadline)}
                </span>
              )}
            </div>
          </div>

          <div className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle.badge}`}>
            {t(statusStyle.labelKey)}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>{t("budget")}</span>
            <span className="font-medium text-foreground">{project.budget ? formatCurrency(project.budget) : "—"}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t("progress")}</span>
              <span>{project.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{width: progressWidth}}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

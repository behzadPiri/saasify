"use client";

// هدر صفحهٔ جزئیات پروژه: عنوان، توضیحات، نشان وضعیت، لینک بازگشت و نوار پیشرفت.
// با کلاس‌های animate-in یک انیمیشن ورود نرم هنگام mount اجرا می‌شود.
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Icons} from "@/shared/components/ui/icons";
import {PROJECT_STATUS_STYLE} from "../constants";
import type {ProjectSummary} from "../types";
import {getProjectDescription, getProjectName} from "../lib/display";

interface ProjectDetailHeaderProps {
  project: ProjectSummary;
}

export function ProjectDetailHeader({project}: ProjectDetailHeaderProps) {
  const t = useTranslations("Projects");
  const statusStyle = PROJECT_STATUS_STYLE[project.status];
  // عرض نوار پیشرفت ابتدا صفر است و پس از mount به مقدار واقعی می‌رسد
  // تا انیمیشن رشد نرم اجرا شود (مشابه الگوی ProjectCard).
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setProgressWidth(Math.min(Math.max(project.progress, 0), 100));
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [project.progress]);

  return (
    <section className="animate-in slide-in-from-top-3 rounded-[30px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            <Icons.Folder size={12} />
            {t("projectDetails")}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{getProjectName(project, t)}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              {getProjectDescription(project, t) || t("projectDetailsDescription")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle.badge}`}>
            {t(statusStyle.labelKey)}
          </span>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40"
          >
              {t("back")}
              <Icons.ArrowLeft className="ltr:rotate-180" size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[26px] border border-border/40 bg-linear-to-r from-primary/10 via-background/50 to-transparent p-5">
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>{t("progress")}</span>
          <span className="font-semibold text-foreground">{project.progress}%</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted/80">
          <div
            className="h-full rounded-full bg-linear-to-r from-primary to-primary/70 transition-[width] duration-1000 ease-out"
            style={{width: `${progressWidth}%`}}
          />
        </div>
      </div>
    </section>
  );
}

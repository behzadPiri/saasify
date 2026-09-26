"use client";

import {useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {ACTIVITY_TYPES} from "@/features/dashboard/constants";
import type {ActivityItem} from "@/features/dashboard/types";
import {Icons} from "@/shared/components/ui/icons";

type ActivityFilter = "all" | "project" | "team" | "payment" | "task";

const activityItems: ActivityItem[] = [
  {
    id: "a-101",
    type: "project_created",
    title: "پروژه جدید ایجاد شد",
    description: "پروژه «پنل مدیریت محتوا» توسط تیم توسعه آغاز شد.",
    user: {name: "احمد محمدی"},
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    id: "a-102",
    type: "member_joined",
    title: "عضو جدید به تیم اضافه شد",
    description: "سارا احمدی به عنوان طراح UI/UX به تیم پیوست.",
    user: {name: "سارا احمدی"},
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
  },
  {
    id: "a-103",
    type: "task_completed",
    title: "وظیفه تکمیل شد",
    description: "پیاده‌سازی احراز هویت دو مرحله‌ای در پروژه اصلی خاتمه یافت.",
    user: {name: "رضا کریمی"},
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "a-104",
    type: "payment_received",
    title: "دریافت پرداخت",
    description: "اشتراک ماهانه پلن حرفه‌ای با موفقیت دریافت شد.",
    user: {name: "صورت‌حساب"},
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
  {
    id: "a-105",
    type: "project_updated",
    title: "پروژه بروزرسانی شد",
    description: "نسخه 2.1 اپلیکیشن موبایل با چند بهبود رابط کاربری منتشر شد.",
    user: {name: "مریم حسینی"},
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
  {
    id: "a-106",
    type: "project_created",
    title: "پروژه جدید برای مشتری جدید آغاز شد",
    description: "ساخت داشبورد مدیریتی برای تیم فروش روی پروژه جدید شروع شد.",
    user: {name: "نیلوفر طاهری"},
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "a-107",
    type: "task_completed",
    title: "تکمیل milestone",
    description: "مرحله طراحی و تست API در پروژه Gateway به پایان رسید.",
    user: {name: "میلاد احمدی"},
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
  {
    id: "a-108",
    type: "member_joined",
    title: "دعوت عضو جدید پذیرفته شد",
    description: "امیر رضایی به‌عنوان توسعه‌دهنده فرانت‌اند به تیم اضافه شد.",
    user: {name: "امیر رضایی"},
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
  },
];

function typeToGroup(type: ActivityItem["type"]): ActivityFilter {
  if (type === "project_created" || type === "project_updated") return "project";
  if (type === "member_joined") return "team";
  if (type === "payment_received") return "payment";
  return "task";
}

function formatRelativeTime(date: Date, locale: string): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  const rtf = new Intl.RelativeTimeFormat(locale, {numeric: "auto"});

  if (minutes < 1) return rtf.format(0, "minute");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (hours < 24) return rtf.format(-hours, "hour");
  if (days < 7) return rtf.format(-days, "day");

  return new Intl.DateTimeFormat(locale, {dateStyle: "medium"}).format(new Date(date));
}

export function Activity() {
  const t = useTranslations("Activity");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>("all");

  const filterOptions = useMemo(
    () => [
      {id: "all" as const, label: t("groups.all")},
      {id: "project" as const, label: t("groups.project")},
      {id: "team" as const, label: t("groups.team")},
      {id: "payment" as const, label: t("groups.payment")},
      {id: "task" as const, label: t("groups.task")},
    ],
    [t],
  );

  const filteredActivities = useMemo(() => {
    if (activeFilter === "all") return activityItems;
    return activityItems.filter((item) => typeToGroup(item.type) === activeFilter);
  }, [activeFilter]);

  const summary = useMemo(() => {
    const total = activityItems.length;
    const today = activityItems.filter((item) => {
      const diff = Date.now() - new Date(item.timestamp).getTime();
      return diff <= 1000 * 60 * 60 * 24;
    }).length;
    const successful = activityItems.filter(
      (item) => item.type === "task_completed" || item.type === "payment_received",
    ).length;

    return {total, today, successful};
  }, []);

  const typeLabels = {
    project: t("groups.project"),
    team: t("groups.team"),
    payment: t("groups.payment"),
    task: t("groups.task"),
  };

  return (
    <div className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]" />

        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              <Icons.Activity size={12} />
              {t("title")}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("subtitle")}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {locale === "fa"
                  ? "ردیابی وقایع مهم، تغییرات تیم و وضعیت پروژه‌ها در یک جریان زمان‌مند و قابل‌فهم."
                  : "Track important events, team updates, and project health in one clear, time-based stream."}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("allEvents")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.total}</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">+12%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("today")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.today}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600">
                {t("summaryBadge.active")}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("successfulActions")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.successful}</span>
              <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-medium text-violet-600">
                {t("summaryBadge.highRate")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("filter")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("filterTitle")}</h2>
          </div>
          <span className="text-sm text-muted-foreground">{t("filterDescription")}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setActiveFilter(option.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                activeFilter === option.id
                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                  : "border-border/60 bg-background/50 text-muted-foreground hover:bg-accent/40"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("timeline")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("recentEvents")}</h2>
          </div>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {filteredActivities.length} {t("itemsCount")}
          </span>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-background/40 p-8 text-center text-muted-foreground">
            {t("noActivity")}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredActivities.map((activity, index) => {
              const config = ACTIVITY_TYPES[activity.type];
              const Icon = Icons[config.icon as keyof typeof Icons];

              return (
                <div
                  key={activity.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:bg-accent/10 animate-in fade-in"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <div className="relative flex items-start gap-3 sm:gap-4">
                    <div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 ${config.bg}`}>
                      <Icon size={16} className={config.color} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {typeLabels[typeToGroup(activity.type)]}
                          </span>
                        </div>
                        <time className="text-xs text-muted-foreground">{formatRelativeTime(activity.timestamp, locale)}</time>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{activity.description}</p>

                      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                            {activity.user.name.slice(0, 1)}
                          </div>
                          <span className="text-xs font-medium text-foreground">{activity.user.name}</span>
                        </div>

                        <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {t(`typeLabels.${activity.type}`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

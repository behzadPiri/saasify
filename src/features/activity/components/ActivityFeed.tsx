/**
 * کامپوننت فید فعالیت‌ها
 * نمایش لیست فعالیت‌های اخیر با آیکون، رنگ و زمان نسبی
 * تنها مسئول رندر کردن UI است، منطق در useActivity و توابع کمکی قرار دارد
 */

"use client";

import {useMemo} from "react";
import {Icons} from "@/shared/components/ui/icons";
import type {ActivityItem, ActivityGroup} from "@/features/activity";
import {typeToGroup, getActivityTypeConfig} from "../hooks/useActivity";
import {formatRelativeTime} from "../lib/date-format";
import {useTranslations} from "next-intl";

interface ActivityFeedProps {
  activities: ActivityItem[];
  limit?: number;
  /** اگر true باشد، انیمیشن staggered اعمال می‌شود */
  animated?: boolean;
  /** لوکال برای فرمت‌بندی زمان */
  locale?: string;
}

export function ActivityFeed({activities, limit = 5, animated = true, locale = "fa"}: ActivityFeedProps) {
  const t = useTranslations("Activity");

  // typeLabels محلی برای کامپوننت (استفاده از ترجمه‌ها)
  const typeLabels = useMemo(() => ({
    project: t("groups.project"),
    team: t("groups.team"),
    payment: t("groups.payment"),
    task: t("groups.task"),
  }), [t]);

  const displayedActivities = useMemo(() => activities.slice(0, limit), [activities, limit]);

  if (displayedActivities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
        <Icons.Inbox size={32} className="opacity-50" />
        <p>هیچ فعالیت جدیدی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayedActivities.map((activity, index) => {
        const config = getActivityTypeConfig(activity.type);
        const Icon = Icons[config.icon as keyof typeof Icons];
        const group = typeToGroup(activity.type);

        return (
          <div
            key={activity.id}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:bg-accent/10 animate-in fade-in"
            style={animated ? {animationDelay: `${index * 55}ms`} : undefined}
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
                      {typeLabels[group as ActivityGroup]}
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
                    {typeLabels[group as ActivityGroup]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

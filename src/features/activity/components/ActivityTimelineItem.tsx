/**
 * کامپوننت کارت منفرد فعالیت در لیست تایم‌لاین (Atomic Component)
 * نمایش آیکون، عنوان، توضیحات، کاربر و زمان نسبی هر رویداد با انیمیشن ملایم
 */

"use client";

import React from "react";
import { Icons } from "@/shared/components/ui/icons";
import type { ActivityItem, ActivityGroup } from "@/features/activity";
import { typeToGroup, getActivityTypeConfig } from "../hooks/useActivity";
import { formatRelativeTime } from "../lib/date-format";

/**
 * پراپ‌های کامپوننت کارت فعالیت
 */
interface ActivityTimelineItemProps {
  /** آیتم فعالیت */
  activity: ActivityItem;
  /** ایندکس آیتم برای تأخیر در انیمیشن (Staggered Animation) */
  index: number;
  /** برچسب‌های گروه‌ها برای ترجمه */
  typeLabels: Record<ActivityGroup, string>;
  /** لوکال برای فرمت‌بندی زمان */
  locale: string;
}

/**
 * کامپوننت اتمیک کارت فعالیت با بهینه‌سازی React.memo برای جلوگیری از رندر مجدد غیرضروری
 */
export const ActivityTimelineItem = React.memo(function ActivityTimelineItem({
  activity,
  index,
  typeLabels,
  locale,
}: ActivityTimelineItemProps) {
  const config = getActivityTypeConfig(activity.type);
  const Icon = Icons[config.icon as keyof typeof Icons] || Icons.Activity;
  const group = typeToGroup(activity.type);

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:bg-accent/10 animate-in fade-in"
      style={{ animationDelay: `${index * 55}ms` }}
      role="listitem"
    >
      <div className="relative flex items-start gap-3 sm:gap-4">
        {/* آیکون با پس‌زمینه تماتیک */}
        <div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 ${config.bg}`}>
          <Icon size={16} className={config.color} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{activity.title}</p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {typeLabels[group]}
              </span>
            </div>
            <time className="text-xs text-muted-foreground">{formatRelativeTime(activity.timestamp, locale)}</time>
          </div>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">{activity.description}</p>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary" aria-hidden="true">
                {activity.user.name.slice(0, 1)}
              </div>
              <span className="text-xs font-medium text-foreground">{activity.user.name}</span>
            </div>

            <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {typeLabels[group]}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

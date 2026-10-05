/**
 * کامپوننت لیست تایم‌لاین فعالیت‌ها
 * نمایش لیست فعالیت‌ها یا پیام خالی بودن همراه با کامپوننت صفحه‌بندی
 */

"use client";

import { useTranslations } from "next-intl";
import type { ActivityItem, ActivityGroup } from "@/features/activity";
import { ActivityTimelineItem } from "@/features/activity";
import { Pagination, type PaginationProps } from "./Pagination";

/**
 * پراپ‌های کامپوننت تایم‌لاین فعالیت
 */
interface ActivityTimelineProps {
  /** لیست فعالیت‌های صفحه جاری */
  activities: ActivityItem[];
  /** برچسب‌های گروه‌ها برای ترجمه */
  typeLabels: Record<ActivityGroup, string>;
  /** لوکال برای فرمت‌بندی زمان */
  locale?: string;
  /** وضعیت و تنظیمات صفحه‌بندی */
  pagination?: PaginationProps["pagination"];
  /** تابع تغییر صفحه */
  onPageChange?: (page: number) => void;
  /** تابع تغییر سایز صفحه */
  onPageSizeChange?: (size: number) => void;
  /** گزینه‌های تعداد در صفحه */
  pageSizeOptions?: number[];
}

/**
 * کامپوننت تایم‌لاین فعالیت‌ها با پشتیبانی کامل از لیست و pagination
 */
export function ActivityTimeline({
  activities,
  typeLabels,
  locale = "fa",
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
}: ActivityTimelineProps) {
  const t = useTranslations("Activity");

  // حالت نمایش در صورت خالی بودن لیست
  if (activities.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-background/40 p-8 text-center text-muted-foreground">
        {t("noActivity")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* لیست آیتم‌های فعالیت */}
      <div className="space-y-3" role="list" >
        {activities.map((activity, index) => (
          <ActivityTimelineItem
            key={activity.id}
            activity={activity}
            index={index}
            typeLabels={typeLabels}
            locale={locale}
          />
        ))}
      </div>

      {/* کامپوننت صفحه‌بندی */}
      {pagination && onPageChange && (
        <Pagination
          pagination={pagination}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          pageSizeOptions={pageSizeOptions}
          showInfo={true}
        />
      )}
    </div>
  );
}

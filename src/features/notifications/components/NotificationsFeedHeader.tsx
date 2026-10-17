"use client";

/**
 * هدر بخش فید اعلان‌ها
 * عنوان و زیرعنوان فید، بج تعداد خوانده‌نشده و نوار فیلتر را رندر می‌کند.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {NotificationsFilterTabs} from "@/features/notifications";
import type {NotificationFilter, NotificationFilterOption} from "../types";

interface NotificationsFeedHeaderProps {
  /** تعداد اعلان‌های خوانده‌نشده برای بج هدر */
  unreadCount: number;
  /** گزینه‌های فیلتر */
  filterOptions: NotificationFilterOption[];
  /** فیلتر فعال */
  activeFilter: NotificationFilter;
  /** تغییر فیلتر */
  onFilterChange: (filter: NotificationFilter) => void;
}

/**
 * هدر فید اعلان‌ها
 * چرا memo؟ چون فقط با تغییر شمارنده یا فیلتر باید رندر شود، نه با تغییر لیست.
 */
export const NotificationsFeedHeader = memo(function NotificationsFeedHeader({
  unreadCount,
  filterOptions,
  activeFilter,
  onFilterChange,
}: NotificationsFeedHeaderProps) {
  const t = useTranslations("Notifications");

  return (
    <div className="mb-4 space-y-4">
      {/* چینش راست‌به‌چپ/چپ‌به‌راست به‌صورت خودکار با dir ریشه مدیریت می‌شود */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("feedTitle")}</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t("feedSubtitle")}</h2>
        </div>
        <span className="rounded-full border border-border/60 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {t("unreadCount", {count: unreadCount})}
        </span>
      </div>

      <NotificationsFilterTabs
        options={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
});

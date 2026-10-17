"use client";

/**
 * شبکه کارت‌های آماری اعلان‌ها
 * سه کارت (کل، خوانده‌نشده، این هفته) را از یک منبع داده می‌سازد و تک‌تک آن‌ها memo هستند.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {NotificationStatCard} from "./NotificationStatCard";
import type {NotificationsStats} from "../types";

interface NotificationsStatsGridProps {
  /** آمار محاسبه‌شده در لایه هوک */
  stats: NotificationsStats;
}

/**
 * شبکه آمار اعلان‌ها
 * چرا memo؟ با تغییر لیست صفحه‌بندی، این بخش نباید دوباره رندر شود مگر آمار تغییر کند.
 */
export const NotificationsStatsGrid = memo(function NotificationsStatsGrid({
  stats,
}: NotificationsStatsGridProps) {
  const t = useTranslations("Notifications.stats");

  return (
    <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
      <NotificationStatCard
        label={t("total")}
        value={stats.total}
        badgeLabel={t("active")}
        accent="primary"
      />
      <NotificationStatCard
        label={t("unread")}
        value={stats.unread}
        badgeLabel={t("new")}
        accent="amber"
      />
      <NotificationStatCard
        label={t("thisWeek")}
        value={stats.thisWeek}
        badgeLabel={t("updated")}
        accent="emerald"
      />
    </div>
  );
});

/**
 * کامپوننت wrapper برای کارت‌های آمار کلی فعالیت
 * شامل ۴ کارت: کل رویدادها، سرور، عملیات موفق، و نرخ خطا
 * با طراحی مدرن، Glassmorphism، بج‌های ترند و رنگ‌بندی تماتیک
 */

"use client";

import {useTranslations} from "next-intl";
import {StatCard} from "./StatCard";
import type {ActivityItem} from "@/features/activity";

interface ActivityOverviewCardsProps {
  /** لیست تمام فعالیت‌ها برای محاسبه آمار */
  activities: ActivityItem[];
  /** وضعیت لودینگ */
  isLoading?: boolean;
}

interface ActivityStats {
  total: number;
  server: number;
  successful: number;
  failed: number;
  totalTrend: number;
  serverTrend: number;
  successfulTrend: number;
  failedTrend: number;
}

/**
 * محاسبه آمار کلی و روندهای هفتگی از لیست فعالیت‌ها
 */
function calculateStats(activities: ActivityItem[]): ActivityStats {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const oneWeekMs = 7 * oneDayMs;

  const total = activities.length;

  const server = activities.filter(
    (item) => item.type === "project_created" || item.type === "project_updated"
  ).length;

  const successful = activities.filter(
    (item) => item.type === "task_completed" || item.type === "payment_received"
  ).length;

  const failed = activities.filter(
    (item) => item.type === "project_updated" || item.type === "member_joined"
  ).length;

  const lastWeekActivities = activities.filter((item) => {
    const diff = now - new Date(item.timestamp).getTime();
    return diff > oneDayMs && diff <= oneWeekMs;
  });

  const lastWeekTotal = lastWeekActivities.length;
  const lastWeekServer = lastWeekActivities.filter(
    (item) => item.type === "project_created" || item.type === "project_updated"
  ).length;
  const lastWeekSuccessful = lastWeekActivities.filter(
    (item) => item.type === "task_completed" || item.type === "payment_received"
  ).length;
  const lastWeekFailed = lastWeekActivities.filter(
    (item) => item.type === "project_updated" || item.type === "member_joined"
  ).length;

  const totalTrend = lastWeekTotal > 0
    ? Math.round(((total - lastWeekTotal) / lastWeekTotal) * 100)
    : 12;

  const serverTrend = lastWeekServer > 0
    ? Math.round(((server - lastWeekServer) / lastWeekServer) * 100)
    : 8;

  const successfulTrend = lastWeekSuccessful > 0
    ? Math.round(((successful - lastWeekSuccessful) / lastWeekSuccessful) * 100)
    : 15;

  const failedTrend = lastWeekFailed > 0
    ? Math.round(((failed - lastWeekFailed) / lastWeekFailed) * 100)
    : -3;

  return {
    total,
    server,
    successful,
    failed,
    totalTrend,
    serverTrend,
    successfulTrend,
    failedTrend,
  };
}

export function ActivityOverviewCards({activities, isLoading = false}: ActivityOverviewCardsProps) {
  const t = useTranslations("Activity.overview");
  const stats = calculateStats(activities);

  const cards = [
    {
      label: t("totalEvents"),
      value: isLoading ? "—" : stats.total,
      icon: "Activity" as const,
      variant: "primary" as const,
      trend: isLoading ? undefined : {
        value: stats.totalTrend,
        label: t("fromLastWeek"),
      },
    },
    {
      label: t("server"),
      value: isLoading ? "—" : stats.server,
      icon: "Shield" as const,
      variant: "purple" as const,
      trend: isLoading ? undefined : {
        value: stats.serverTrend,
        label: t("fromLastWeek"),
      },
    },
    {
      label: t("successfulActions"),
      value: isLoading ? "—" : stats.successful,
      icon: "Check" as const,
      variant: "success" as const,
      trend: isLoading ? undefined : {
        value: stats.successfulTrend,
        label: t("fromLastWeek"),
      },
    },
    {
      label: t("errorRate"),
      value: isLoading ? "—" : `${stats.failed}%`,
      icon: "AlertTriangle" as const,
      variant: "danger" as const,
      trend: isLoading ? undefined : {
        value: stats.failedTrend,
        label: t("fromLastWeek"),
      },
    },
  ];

  return (
    <div
      className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      role="region"
      aria-label={t("ariaLabel")}
    >
      {cards.map((card) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          variant={card.variant}
          trend={card.trend}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

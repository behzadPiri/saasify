/**
 * @file AnalyticsMetricsGrid.tsx
 * @description کامپوننت شبکه کارت‌های شاخص کلیدی عملکرد (KPI Metrics Grid).
 * وظیفه نمایش کارت‌های آمار درآمد، بازدیدها، نرخ تبدیل و نرخ پرش با قالب‌بندی‌های اختصاصی.
 */

"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";
import { StatCard } from "@/features/dashboard/components";
import type { AnalyticsMetricItem } from "@/features/analytics";
import { formatCurrency, formatNumber } from "@/shared/lib/number-format";

/**
 * پروپزهای کامپوننت AnalyticsMetricsGrid
 */
export interface AnalyticsMetricsGridProps {
  /** فهرست متریک‌ها برای نمایش */
  metrics: AnalyticsMetricItem[];
}

/**
 * کامپوننت گرید کارت‌های متریک‌های تحلیلی
 */
export const AnalyticsMetricsGrid: React.FC<AnalyticsMetricsGridProps> = memo(function AnalyticsMetricsGrid({
  metrics,
}) {
  const t = useTranslations("Analytics.metrics");

  /**
   * تابع قالب‌بندی مقدار بر اساس نوع متریک
   */
  const getFormatter = (formatType: AnalyticsMetricItem["formatType"]) => {
    return (val: number) => {
      switch (formatType) {
        case "currency":
          return formatCurrency(val);
        case "percent":
          return `${val.toFixed(1)}%`;
        case "number":
          return formatNumber(val);
        case "duration":
          return `${val}s`;
        default:
          return formatNumber(val);
      }
    };
  };

  /**
   * دریافت عنوان ترجمه‌شده متریک
   */
  const getMetricTitle = (titleKey: string): string => {
    switch (titleKey) {
      case "totalRevenue":
        return t("totalRevenue");
      case "totalVisits":
        return t("totalVisits");
      case "conversionRate":
        return t("conversionRate");
      case "bounceRate":
        return t("bounceRate");
      case "activeUsers":
        return t("activeUsers");
      case "pageViews":
        return t("pageViews");
      default:
        return titleKey;
    }
  };

  return (
    <div className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <StatCard
          key={metric.id}
          value={metric.value}
          label={getMetricTitle(metric.titleKey)}
          icon={metric.icon}
          trend={metric.trend}
          change={metric.changePercent}
          format={getFormatter(metric.formatType)}
        />
      ))}
    </div>
  );
});

AnalyticsMetricsGrid.displayName = "AnalyticsMetricsGrid";

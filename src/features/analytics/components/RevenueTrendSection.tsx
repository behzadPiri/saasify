/**
 * @file RevenueTrendSection.tsx
 * @description کامپوننت بخش نمودار روند درآمد و فروش (Revenue Trend Section).
 * شامل نمودار ستونی (BarChart) برای نمایش مقایسه درآمد ناخالص و سود خالص.
 */

"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";
import { BarChart } from "@/features/dashboard/components";
import { Icons } from "@/shared/components/ui/icons";
import type { TimeSeriesPoint } from "@/features/analytics";

/**
 * پروپزهای کامپوننت RevenueTrendSection
 */
export interface RevenueTrendSectionProps {
  /** داده‌های سری زمانی درآمد */
  data: TimeSeriesPoint[];
}

/**
 * کامپوننت بخش روند درآمد
 */
export const RevenueTrendSection: React.FC<RevenueTrendSectionProps> = memo(function RevenueTrendSection({
  data,
}) {
  const t = useTranslations("Analytics.charts");

  /**
   * تبدیل فرمت داده‌های TimeSeriesPoint به فرمت مورد انتظار BarChart
   */
  const chartFormattedData = data.map((item) => ({
    label: item.label,
    value: item.primaryValue,
  }));

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5 lg:col-span-2">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("revenueTrend")}
          </p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t("revenueSubtitle")}</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-600">
          <Icons.TrendingUp size={14} />
          +24.8%
        </div>
      </div>

      <BarChart
        data={chartFormattedData}
        height={250}
        color="primary"
        legendLabel={t("grossRevenue")}
        showGrid
        showLabels
        animated
      />
    </div>
  );
});

RevenueTrendSection.displayName = "RevenueTrendSection";

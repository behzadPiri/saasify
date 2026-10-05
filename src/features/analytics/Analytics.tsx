/**
 * @file Analytics.tsx
 * @description کامپوننت اصلی ماژول تحلیل و آمار (Analytics).
 * ترکیب‌کننده منطق (useAnalytics) و کامپوننت‌های اتمیک UI (Hero، MetricsGrid، RevenueTrend و غیره)
 * مطابق با معماری استاندارد داشبورد.
 */

"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useAnalytics } from "./hooks/useAnalytics";
import {
  AnalyticsHero,
  AnalyticsMetricsGrid,
  ConversionFunnelSection,
  TopPagesSection,
} from "./components";
import { ChartSkeleton } from "@/features/dashboard/components";
import { Icons } from "@/shared/components/ui/icons";

/**
 * بارگذاری تنبل (Dynamic Import) بخش‌های سنگین نمودار برای بهینه‌سازی پرفورمنس
 */
const DynamicRevenueTrend = dynamic(
  () => import("./components/RevenueTrendSection").then((m) => m.RevenueTrendSection),
  { loading: () => <ChartSkeleton height={250} /> }
);

const DynamicProjectDistribution = dynamic(
  () => import("./components/ProjectDistributionSection").then((m) => m.ProjectDistributionSection),
  { loading: () => <ChartSkeleton height={220} /> }
);

/**
 * کامپوننت اصلی صفحه تحلیلی
 */
export function Analytics() {
  const t = useTranslations("Dashboard"); // برای کلیدهای عمومی مانند retry و loading
  const {
    timeRange,
    setTimeRange,
    availableRanges,
    data,
    isLoading,
    error,
    refetch,
  } = useAnalytics();

  /**
   * هندلر خروجی گرفتن از گزارش
   */
  const handleExport = useCallback(() => {
    alert("گزارش تحلیلی با موفقیت آماده دانلود شد.");
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <Icons.AlertCircle size={48} className="text-destructive" />
        <p className="text-destructive">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full sm:px-5 lg:px-7 xl:px-0 animate-in fade-in slide-in-from-top-3">
      {/* هدر و فیلتر زمان */}
      <AnalyticsHero
        timeRange={timeRange}
        availableRanges={availableRanges}
        onRangeChange={setTimeRange}
        onExport={handleExport}
      />

      {/* کارت‌های متریک کلیدی (KPIs) */}
      {data?.metrics && <AnalyticsMetricsGrid metrics={data.metrics} />}

      {/* نمودارهای تحلیل و درآمد */}
      <div className="grid gap-4 lg:grid-cols-3">
        {isLoading && !data ? (
          <div className="lg:col-span-3">
            <ChartSkeleton height={250} />
          </div>
        ) : (
          <>
            {data?.revenueTrend && (
              <DynamicRevenueTrend data={data.revenueTrend} />
            )}
            {data?.projectDistribution && (
              <DynamicProjectDistribution data={data.projectDistribution} />
            )}
          </>
        )}
      </div>

      {/* بخش قیف تبدیل و پربازدیدترین صفحات */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {data?.conversionFunnel && (
          <ConversionFunnelSection steps={data.conversionFunnel} />
        )}
        {data?.topPages && <TopPagesSection pages={data.topPages} />}
      </div>
    </div>
  );
}

Analytics.displayName = "Analytics";

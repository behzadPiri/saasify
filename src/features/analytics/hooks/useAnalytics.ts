/**
 * @file useAnalytics.ts
 * @description هوک اصلی ماژول تحلیل و آمار (Analytics).
 * مدیریت وضعیت بارگذاری، خطا، فیلترهای زمانی، داده‌های نمودارها، متریک‌ها و پاک‌سازی منابع (Cleanup).
 */

"use client";

import { useState, useEffect, useCallback, useMemo, startTransition } from "react";
import type { AnalyticsData, AnalyticsTimeRange } from "../types/analytics.types";
import {
  MOCK_METRIC_CARDS,
  MOCK_REVENUE_CHART,
  MOCK_TRAFFIC_CHART,
  MOCK_PROJECT_DISTRIBUTION,
  MOCK_CONVERSION_FUNNEL,
  MOCK_TOP_PAGES,
} from "../mocks/analytics.mock";
import { useAnalyticsFilters } from "./useAnalyticsFilters";

/**
 * خروجی هوک اصلی استفاده از داده‌ها و منطق تحلیلی
 */
export interface UseAnalyticsReturn {
  /** بازه زمانی فعال */
  timeRange: AnalyticsTimeRange;
  /** تابع تغییر بازه زمانی */
  setTimeRange: (range: AnalyticsTimeRange) => void;
  /** لیست بازه‌های مجاز */
  availableRanges: readonly AnalyticsTimeRange[];
  /** داده‌های کامل تحلیلی */
  data: AnalyticsData;
  /** وضعیت بارگذاری */
  isLoading: boolean;
  /** خطای احتمالی */
  error: string | null;
  /** تابع بارگذاری مجدد داده‌ها */
  refetch: () => void;
}

/**
 * دریافت داده‌های اولیه بر اساس بازه زمانی
 */
function getAnalyticsDataForRange(range: AnalyticsTimeRange): AnalyticsData {
  return {
    metrics: MOCK_METRIC_CARDS[range] || MOCK_METRIC_CARDS["30d"],
    revenueTrend: MOCK_REVENUE_CHART,
    trafficTrend: MOCK_TRAFFIC_CHART,
    projectDistribution: MOCK_PROJECT_DISTRIBUTION,
    conversionFunnel: MOCK_CONVERSION_FUNNEL,
    topPages: MOCK_TOP_PAGES,
  };
}

/**
 * هوک اصلی مدیریت داده‌ها و منطق بیزینس ماژول تحلیل
 */
export function useAnalytics(): UseAnalyticsReturn {
  const { timeRange, setTimeRange, availableRanges } = useAnalyticsFilters("30d");
  const [data, setData] = useState<AnalyticsData>(() => getAnalyticsDataForRange("30d"));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * تابع بارگذاری داده‌های تحلیلی
   */
  const fetchAnalyticsData = useCallback(async (currentRange: AnalyticsTimeRange, signal: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(null);

      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, 300);
        signal.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

      if (signal.aborted) return;

      const resolvedData = getAnalyticsDataForRange(currentRange);
      startTransition(() => {
        setData(resolvedData);
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      setError("خطا در دریافت اطلاعات تحلیلی. لطفاً مجدداً تلاش کنید.");
      console.error("Analytics fetch error:", err);
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchAnalyticsData(timeRange, controller.signal);

    return () => {
      controller.abort();
    };
  }, [timeRange, fetchAnalyticsData]);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchAnalyticsData(timeRange, controller.signal);
  }, [timeRange, fetchAnalyticsData]);

  return useMemo(
    () => ({
      timeRange,
      setTimeRange,
      availableRanges,
      data,
      isLoading,
      error,
      refetch,
    }),
    [timeRange, setTimeRange, availableRanges, data, isLoading, error, refetch]
  );
}

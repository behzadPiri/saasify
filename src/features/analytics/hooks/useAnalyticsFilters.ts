/**
 * @file useAnalyticsFilters.ts
 * @description هوک مدیریت فیلتر بازه زمانی در ماژول تحلیل و آمار.
 * مسئول نگهداری وضعیت بازه زمانی فعال (مانند 7d، 30d و غیره) و ارائه توابع تغییر بهینه‌شده.
 */

"use client";

import { useState, useCallback } from "react";
import type { AnalyticsTimeRange } from "@/features/analytics";

/**
 * اینترفیس خروجی هوک مدیریت فیلترهای تحلیلی
 */
export interface UseAnalyticsFiltersReturn {
  /** بازه زمانی فعال فعلی */
  timeRange: AnalyticsTimeRange;
  /** تابع تغییر بازه زمانی فعال */
  setTimeRange: (range: AnalyticsTimeRange) => void;
  /** فهرست تمام بازه‌های زمانی پشتیبانی‌شده */
  availableRanges: readonly AnalyticsTimeRange[];
}

/**
 * فهرست تمام بازه‌های زمانی مجاز در سیستم
 */
const TIME_RANGES: readonly AnalyticsTimeRange[] = ["today", "7d", "30d", "90d", "12m"] as const;

/**
 * هوک سفارشی مدیریت فیلتر زمان گزارش‌ها
 * @param defaultRange بازه زمانی اولیه پیش‌فرض (پیش‌فرض: "30d")
 * @returns بازه زمانی فعال، تابع تغییر و لیست گزینه‌ها
 */
export function useAnalyticsFilters(
  defaultRange: AnalyticsTimeRange = "30d"
): UseAnalyticsFiltersReturn {
  const [timeRange, setTimeRangeState] = useState<AnalyticsTimeRange>(defaultRange);

  /**
   * تابع تغییر بازه زمانی با پایداری رفرنس (useCallback)
   */
  const setTimeRange = useCallback((range: AnalyticsTimeRange) => {
    setTimeRangeState(range);
  }, []);

  return {
    timeRange,
    setTimeRange,
    availableRanges: TIME_RANGES,
  };
}

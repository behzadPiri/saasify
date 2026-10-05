/**
 * هوک اصلی و تجمیعی صفحه فعالیت‌ها (Facade Hook)
 * این هوک هوک‌های کوچک تخصصی (شبکه، فیلتر، صفحه‌بندی و آمار) را ترکیب می‌کند
 */

"use client";

import { useLocale } from "next-intl";
import type { ActivityItem, ActivityType, ActivityTypeConfig, ActivityFilter, ActivityGroup } from "@/features/activity";
import { ACTIVITY_TYPES } from "../constants/activity-types";
import { formatRelativeTime } from "../lib/date-format";
import { useActivityNetwork, DEFAULT_ACTIVITY_ITEMS } from "@/features/activity";
import { useActivityFilter, typeToGroup } from "./useActivityFilter";
import { useActivityPagination, type PaginationState } from "@/features/activity";
import { useActivityStats, type ActivityStats } from "./useActivityStats";

/**
 * دریافت پیکربندی نوع فعالیت (آیکون، رنگ، پس‌زمینه)
 * @param type نوع فعالیت
 * @returns پیکربندی ظاهری
 */
export function getActivityTypeConfig(type: ActivityType): ActivityTypeConfig {
  return ACTIVITY_TYPES[type] ?? ACTIVITY_TYPES.project_created;
}

/**
 * تنظیمات هوک اصلی فعالیت
 */
interface UseActivityOptions {
  autoFetch?: boolean;
  fetchFn?: (signal: AbortSignal) => Promise<ActivityItem[]>;
  pageSize?: number;
}

/**
 * خروجی جامع هوک فعالیت
 */
interface UseActivityReturn {
  activeFilter: ActivityFilter;
  setActiveFilter: (filter: ActivityFilter) => void;
  isLoading: boolean;
  error: string | null;
  isOnline: boolean;
  pagination: PaginationState;
  setPageSize: (size: number) => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
  filteredActivities: ActivityItem[];
  paginatedActivities: ActivityItem[];
  summary: { total: number; today: number; successful: number };
  stats: ActivityStats;
  filterOptions: { id: ActivityFilter; label: string }[];
  typeLabels: Record<ActivityGroup, string>;
  typeToGroup: (type: ActivityType) => ActivityGroup;
  getActivityTypeConfig: (type: ActivityType) => ActivityTypeConfig;
  formatRelativeTime: (date: Date) => string;
  refetch: () => Promise<void>;
}

/**
 * هوک مدیریت کلان فعالیت‌ها با ترکیب هوک‌های تخصصی ایزوله
 * @param initialActivities داده‌های اولیه
 * @param options تنظیمات هوک
 * @returns تمامی وضعیت‌ها، داده‌ها و توابع کنترلی صفحه فعالیت
 */
export function useActivity(
  initialActivities: ActivityItem[] = DEFAULT_ACTIVITY_ITEMS,
  options: UseActivityOptions = {}
): UseActivityReturn {
  const { autoFetch = false, fetchFn, pageSize = 5 } = options;
  const locale = useLocale();

  // ۱. مدیریت شبکه و داده‌ها
  const { activities, isLoading, error, isOnline, refetch } = useActivityNetwork(initialActivities, {
    autoFetch,
    fetchFn,
  });

  // ۲. مدیریت فیلترینگ
  const { activeFilter, setActiveFilter, filteredActivities, filterOptions, typeLabels } = useActivityFilter(activities);

  // ۳. مدیریت صفحه‌بندی روی داده‌های فیلتر شده
  const {
    pagination,
    paginatedActivities,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
  } = useActivityPagination(filteredActivities, pageSize);

  // ۴. محاسبه آمار و ترندها
  const stats = useActivityStats(activities);

  // محاسبه خلاصه سریع برای سازگاری با کامپوننت‌های موجود
  const summary = {
    total: stats.total,
    today: stats.server, // یا رویدادهای امروز
    successful: stats.successful,
  };

  return {
    activeFilter,
    setActiveFilter,
    isLoading,
    error,
    isOnline,
    pagination,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
    filteredActivities,
    paginatedActivities,
    summary,
    stats,
    filterOptions,
    typeLabels,
    typeToGroup,
    getActivityTypeConfig,
    formatRelativeTime: (date: Date) => formatRelativeTime(date, locale),
    refetch,
  };
}

// صادرات مجدد هوک‌های ایزوله برای استفاده مستقل در صورت نیاز
export { useActivityNetwork, DEFAULT_ACTIVITY_ITEMS } from "./useActivityNetwork";
export { useActivityFilter, typeToGroup } from "./useActivityFilter";
export { useActivityPagination, type PaginationState } from "./useActivityPagination";
export { useActivityStats, type ActivityStats } from "./useActivityStats";

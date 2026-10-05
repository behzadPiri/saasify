/**
 * هوک اختصاصی مدیریت صفحه‌بندی (Pagination) فعالیت‌ها
 * مسئول کنترل صفحه جاری، تعداد آیتم در صفحه، محاسبهداده‌های صفحات و ناوبری
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import type { ActivityItem } from "@/features/activity";

/**
 * وضعیت صفحه‌بندی
 */
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

/**
 * خروجی هوک صفحه‌بندی
 */
interface UseActivityPaginationReturn {
  pagination: PaginationState;
  paginatedActivities: ActivityItem[];
  setPageSize: (size: number) => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
}

/**
 * هوک مدیریت صفحه‌بندی فعالیت‌ها
 * @param activities لیست فعالیت‌های فیلتر شده
 * @param initialPageSize تعداد پیش‌فرض آیتم در هر صفحه
 * @returns وضعیت صفحه‌بندی، فعالیت‌های صفحه جاری و توابع ناوبری
 */
export function useActivityPagination(
  activities: ActivityItem[],
  initialPageSize = 5
): UseActivityPaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  /**
   * تغییر سایز صفحه و بازنشانی به صفحه اول
   */
  const setPageSize = useCallback((newSize: number) => {
    setPageSizeState(newSize);
    setCurrentPage(1);
  }, []);

  /**
   * رفتن به صفحه مشخص با اعمال محدودیت‌های مرزی
   */
  const goToPage = useCallback((page: number) => {
    const totalPages = Math.ceil(activities.length / pageSize) || 1;
    const clampedPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clampedPage);
  }, [activities.length, pageSize]);

  /**
   * رفتن به صفحه بعد
   */
  const nextPage = useCallback(() => {
    const totalPages = Math.ceil(activities.length / pageSize) || 1;
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [activities.length, pageSize]);

  /**
   * رفتن به صفحه قبل
   */
  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  /**
   * بازنشانی صفحه به صفحه اول (مثلاً هنگام تغییر فیلتر)
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  /**
   * محاسبه وضعیت کامل صفحه‌بندی
   */
  const pagination = useMemo((): PaginationState => {
    const totalItems = activities.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalItems);

    return {
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      startIndex: totalItems > 0 ? startIndex : 0,
      endIndex,
    };
  }, [activities, currentPage, pageSize]);

  /**
   * برش دادن لیست فعالیت‌ها برای صفحه جاری
   */
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return activities.slice(startIndex, endIndex);
  }, [activities, currentPage, pageSize]);

  return {
    pagination,
    paginatedActivities,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
  };
}

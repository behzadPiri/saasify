"use client";

/**
 * هوک فاساد (ViewModel ریشه) صفحه اعلان‌ها؛ الگوبرداری از useDashboard/useSettings.
 * همه زیرهوک‌های تخصصی را یکجا ترکیب می‌کند تا کامپوننت ریشه فقط یک هوک صدا بزند
 * و هیچ منطقی داخل JSX نماند.
 */

import {useCallback, useMemo} from "react";
import {useNotificationsData} from "./useNotificationsData";
import {useNotificationsFilter} from "./useNotificationsFilter";
import {useNotificationsPagination} from "@/features/notifications";
import {useNotificationsStats} from "./useNotificationsStats";
import type {NotificationFilter} from "../types";

/**
 * هوک ریشه اعلان‌ها
 * @returns جهت نوشتار، داده/عملیات، فیلتر، آمار و صفحه‌بندی
 */
export function useNotifications() {



  // ۱. لایه داده و عملیات
  const {items, fetchedAt, isLoading, hasError, markAllRead, toggleReadStatus, deleteNotification, refetch} =
    useNotificationsData();

  // ۲. فیلتر روی داده خام
  const {activeFilter, setActiveFilter, filteredItems, filterOptions} = useNotificationsFilter(items);

  // ۳. صفحه‌بندی روی داده فیلترشده
  const {currentPage, totalPages, pageItems, pageNumbers, goToPage, nextPage, prevPage, resetPage} =
    useNotificationsPagination(filteredItems);

  // ۴. آمار مشتق‌شده از همه اعلان‌ها (نه فقط صفحه جاری)
  const stats = useNotificationsStats(items, fetchedAt ?? 0);

  /**
   * تغییر فیلتر + بازگشت به صفحه اول.
   * چرا اینجا؟ تا همیشه جفت این دو عملیات با هم و بدون effect اضافه انجام شود.
   */
  const handleFilterChange = useCallback(
    (filter: NotificationFilter) => {
      setActiveFilter(filter);
      resetPage();
    },
    [setActiveFilter, resetPage],
  );

  // ترکیب نهایی memoشده؛ شیء خروجی بی‌دلیل بازساخته نمی‌شود.
  return useMemo(
    () => ({
      items,
      isLoading,
      hasError,
      stats,
      activeFilter,
      filterOptions,
      filteredItemsCount: filteredItems.length,
      pageItems,
      currentPage,
      totalPages,
      pageNumbers,
      markAllRead,
      toggleReadStatus,
      handleFilterChange,
      deleteNotification,
      goToPage,
      nextPage,
      prevPage,
      refetch,
    }),
    [
      items,
      isLoading,
      hasError,
      stats,
      activeFilter,
      filterOptions,
      filteredItems.length,
      pageItems,
      currentPage,
      totalPages,
      pageNumbers,
      markAllRead,
      toggleReadStatus,
      deleteNotification,
      handleFilterChange,
      goToPage,
      nextPage,
      prevPage,
      refetch,
    ],
  );
}

/** نوع خروجی فاساد برای استفاده در کامپوننت ریشه */
export type UseNotificationsReturn = ReturnType<typeof useNotifications>;

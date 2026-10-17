"use client";

/**
 * هوک اختصاصی صفحه‌بندی اعلان‌ها
 * روی لیست فیلترشده کار می‌کند و در صورت کاهش تعداد آیتم‌ها (مثلاً بعد از تغییر وضعیت)
 * صفحه فعلی را به‌صورت مشتق‌شده داخل محدوده معتبر نگه می‌دارد؛ پس نیازی به effect نیست.
 */

import {useCallback, useMemo, useState} from "react";
import {NOTIFICATIONS_PAGE_SIZE} from "../constants";
import type {NotificationItem} from "../types";

/** خروجی هوک صفحه‌بندی اعلان‌ها */
export interface UseNotificationsPaginationReturn {
  /** شماره صفحه جاری (همیشه داخل محدوده معتبر) */
  currentPage: number;
  /** تعداد کل صفحات (حداقل ۱) */
  totalPages: number;
  /** آیتم‌های صفحه جاری */
  pageItems: NotificationItem[];
  /** آرایه شماره صفحات برای رندر دکمه‌ها */
  pageNumbers: number[];
  /** رفتن به صفحه مشخص (با clamp) */
  goToPage: (page: number) => void;
  /** صفحه بعد */
  nextPage: () => void;
  /** صفحه قبل */
  prevPage: () => void;
  /** بازگشت به صفحه اول؛ هنگام تغییر فیلتر صدا زده می‌شود */
  resetPage: () => void;
}

/**
 * هوک صفحه‌بندی اعلان‌ها
 * @param data لیست اعلان‌های فیلترشده
 * @param pageSize تعداد آیتم هر صفحه
 * @returns وضعیت و توابع کنترل صفحه‌بندی
 */
export function useNotificationsPagination(
  data: NotificationItem[],
  pageSize: number = NOTIFICATIONS_PAGE_SIZE,
): UseNotificationsPaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);

  /** تعداد صفحات؛ حداقل یک صفحه تا UI هیچ‌وقت صفحه صفر نشان ندهد */
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data.length / pageSize)),
    [data.length, pageSize],
  );

  // اگر بعد از فیلتر/تغییر وضعیت تعداد صفحات کم شود، صفحه جاری به‌صورت مشتق‌شده clamp می‌شود.
  const safePage = Math.min(currentPage, totalPages);

  /** آیتم‌های صفحه جاری؛ فقط با تغییر داده یا صفحه دوباره محاسبه می‌شود */
  const pageItems = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, safePage, pageSize]);

  /** شماره صفحات برای رندر دکمه‌های صفحه */
  const pageNumbers = useMemo(
    () => Array.from({length: totalPages}, (_, index) => index + 1),
    [totalPages],
  );

  const goToPage = useCallback(
    (page: number) => setCurrentPage(Math.min(Math.max(page, 1), totalPages)),
    [totalPages],
  );
  const nextPage = useCallback(
    () => setCurrentPage((page) => Math.min(page + 1, totalPages)),
    [totalPages],
  );
  const prevPage = useCallback(() => setCurrentPage((page) => Math.max(page - 1, 1)), []);
  const resetPage = useCallback(() => setCurrentPage(1), []);

  return {currentPage: safePage, totalPages, pageItems, pageNumbers, goToPage, nextPage, prevPage, resetPage};
}

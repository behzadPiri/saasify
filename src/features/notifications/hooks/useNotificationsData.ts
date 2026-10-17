"use client";

/**
 * هوک اختصاصی لایه داده اعلان‌ها (Data / Network)
 * مسئول دریافت لیست اعلان‌ها، مدیریت وضعیت بارگذاری/خطا، لغو درخواست با AbortController
 * و عملیات تغییر وضعیت (خوانده‌شدن) است. هیچ چیزی از UI اینجا نیست.
 */

import {useCallback, useEffect, useRef, useState} from "react";
import {fetchNotifications} from "../lib/fetch-notifications";
import type {NotificationItem} from "../types";

/**
 * تشخیص خطای لغو درخواست.
 * چرا جدا؟ چون لغو، خطای واقعی نیست و نباید به کاربر نمایش داده شود.
 * @param error خطای دریافتی
 * @returns true اگر خطا از نوع AbortError باشد
 */
function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

/** خروجی هوک داده اعلان‌ها */
export interface UseNotificationsDataReturn {
  /** لیست اعلان‌های دریافتی */
  items: NotificationItem[];
  /** زمان موفق آخرین دریافت؛ مرجع محاسبه آمار «این هفته» (null یعنی هنوز نرسیده) */
  fetchedAt: number | null;
  /** آیا درخواست در جریان است؟ */
  isLoading: boolean;
  /** آیا خطا رخ داده است؟ (پیام خطا در لایه UI ترجمه می‌شود) */
  hasError: boolean;
  /** علامت‌گذاری همه اعلان‌ها به‌عنوان خوانده‌شده */
  markAllRead: () => void;
  /** جابه‌جایی وضعیت خوانده‌شدن یک اعلان مشخص */
  toggleReadStatus: (id: string) => void;
  /** حذف یک اعلان از لیست */
  deleteNotification: (id: string) => void;
  /** دریافت مجدد لیست از سرور (برای دکمه تلاش دوباره) */
  refetch: () => void;
}

/**
 * هوک مدیریت داده اعلان‌ها
 * @returns لیست اعلان‌ها، وضعیت بارگذاری/خطا و توابع تغییر وضعیت
 */
export function useNotificationsData(): UseNotificationsDataReturn {
  const [items, setItems] = useState<NotificationItem[]>([]);
  // از ابتدا در حالت بارگذاری هستیم چون درخواست اول در همان effect اول اجرا می‌شود.
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // زمان دریافت از state گرفته می‌شود تا محاسبات وابسته به «الان» در رندر خالص بمانند.
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  // نگه‌داشتن آخرین AbortController تا در refetch، درخواست قبلی لغو شود.
  const abortRef = useRef<AbortController | null>(null);

  /**
   * اجرای درخواست دریافت اعلان‌ها همراه با پاکسازی دقیق.
   * تمام تغییرهای state بعد از await رخ می‌دهند، پس در بدنه effect سنکرون نیستند.
   * @param controller کنترلر سیگنال این درخواست
   */
  const loadNotifications = useCallback(async (controller: AbortController) => {
    try {
      const data = await fetchNotifications(controller.signal);
      // اگر بین راه لغو شده باشیم، نتیجه را اعمال نمی‌کنیم.
      if (controller.signal.aborted) return;
      setItems(data);
      setFetchedAt(Date.now());
      setHasError(false);
    } catch (error) {
      if (isAbortError(error)) return; // لغو عمدی؛ خطا نیست
      if (controller.signal.aborted) return;
      setHasError(true);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }, []);

  // اجرای اولیه درخواست + لغو کامل هنگام unmount (جلوگیری از memory leak).
  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    // تغییر state فقط بعد از await انجام می‌شود؛ این قاعده به‌صورت ایستا قابل تشخیص نیست.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadNotifications(controller);

    return () => {
      controller.abort();
      abortRef.current = null;
    };
  }, [loadNotifications]);

  /** علامت‌گذاری همه به‌عنوان خوانده‌شده؛ با حالت تابعی تا به state فعلی وابسته نباشیم */
  const markAllRead = useCallback(() => {
    setItems((current) => current.map((item) => (item.read ? item : {...item, read: true})));
  }, []);

  /** تغییر وضعیت یک اعلان؛ فقط آیتم هدف آبجکت جدید می‌گیرد تا memo فرزندان بی‌جهت نشکند */
  const toggleReadStatus = useCallback((id: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? {...item, read: !item.read} : item)),
    );
  }, []);

  /** حذف یک اعلان؛ بقیه آیتم‌ها رفرنس خود را حفظ می‌کنند تا memo لیست نشکند */
  const deleteNotification = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  /** دریافت مجدد؛ ابتدا درخواست قبلی لغو و سپس درخواست تازه شروع می‌شود */
  const refetch = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);
    setHasError(false);
    void loadNotifications(controller);
  }, [loadNotifications]);

  return {
    items,
    fetchedAt,
    isLoading,
    hasError,
    markAllRead,
    toggleReadStatus,
    deleteNotification,
    refetch,
  };
}

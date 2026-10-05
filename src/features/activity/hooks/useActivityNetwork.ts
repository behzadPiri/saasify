/**
 * هوک اختصاصی مدیریت اتصال شبکه، خطاها و داده‌های API فعالیت‌ها
 * مسئول مدیریت وضعیت آنلاین/آفلاین، بارگذاری و لغو درخواست‌ها (AbortController)
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ActivityItem } from "@/features/activity";

/**
 * داده‌های پیش‌فرض فعالیت‌ها برای حالت محلی یا نمایشی
 */
export const DEFAULT_ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "a-101",
    type: "project_created",
    title: "پروژه جدید ایجاد شد",
    description: "پروژه «پنل مدیریت محتوا» توسط تیم توسعه آغاز شد.",
    user: { name: "احمد محمدی" },
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    id: "a-102",
    type: "member_joined",
    title: "عضو جدید به تیم اضافه شد",
    description: "سارا احمدی به عنوان طراح UI/UX به تیم پیوست.",
    user: { name: "سارا احمدی" },
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
  },
  {
    id: "a-103",
    type: "task_completed",
    title: "وظیفه تکمیل شد",
    description: "پیاده‌سازی احراز هویت دو مرحله‌ای در پروژه اصلی خاتمه یافت.",
    user: { name: "رضا کریمی" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "a-104",
    type: "payment_received",
    title: "دریافت پرداخت",
    description: "اشتراک ماهانه پلن حرفه‌ای با موفقیت دریافت شد.",
    user: { name: "صورت‌حساب" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
  {
    id: "a-105",
    type: "project_updated",
    title: "پروژه بروزرسانی شد",
    description: "نسخه 2.1 اپلیکیشن موبایل با چند بهبود رابط کاربری منتشر شد.",
    user: { name: "مریم حسینی" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
  {
    id: "a-106",
    type: "project_created",
    title: "پروژه جدید برای مشتری جدید آغاز شد",
    description: "ساخت داشبورد مدیریتی برای تیم فروش روی پروژه جدید شروع شد.",
    user: { name: "نیلوفر طاهری" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "a-107",
    type: "task_completed",
    title: "تکمیل milestone",
    description: "مرحله طراحی و تست API در پروژه Gateway به پایان رسید.",
    user: { name: "میلاد احمدی" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
  {
    id: "a-108",
    type: "member_joined",
    title: "دعوت عضو جدید پذیرفته شد",
    description: "امیر رضایی به‌عنوان توسعه‌دهنده فرانت‌اند به تیم اضافه شد.",
    user: { name: "امیر رضایی" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
  },
];

/**
 * تنظیمات ورودی هوک مدیریت داده‌های شبکه
 */
interface UseActivityNetworkOptions {
  autoFetch?: boolean;
  fetchFn?: (signal: AbortSignal) => Promise<ActivityItem[]>;
  onSuccess?: (data: ActivityItem[]) => void;
}

/**
 * خروجی هوک شبکه
 */
interface UseActivityNetworkReturn {
  activities: ActivityItem[];
  isLoading: boolean;
  error: string | null;
  isOnline: boolean;
  refetch: () => Promise<void>;
}

/**
 * هوک اختصاصی مدیریت وضعیت شبکه و درخواست‌های API
 * @param initialActivities داده‌های اولیه
 * @param options تنظیمات و تابع fetch
 * @returns لیست فعالیت‌ها، وضعیت بارگذاری، خطا، وضعیت آنلاین و تابع بارگذاری مجدد
 */
export function useActivityNetwork(
  initialActivities: ActivityItem[] = DEFAULT_ACTIVITY_ITEMS,
  options: UseActivityNetworkOptions = {}
): UseActivityNetworkReturn {
  const { autoFetch = false, fetchFn, onSuccess } = options;
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  // مرجع برای لغو درخواست‌های همزمان با استفاده از AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * ردیابی وضعیت آنلاین و آفلاین بودن مرورگر
   */
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /**
   * تابع دریافت اطلاعات از API با قابلیت مدیریت AbortSignal و پاکسازی دقیق
   */
  const fetchActivities = useCallback(async () => {
    if (!fetchFn) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchFn(abortControllerRef.current.signal);
      setActivities(data);
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return; // نادیده گرفتن خطای لغو درخواست
      }
      const errorMessage = err instanceof Error ? err.message : "خطا در دریافت فعالیت‌ها";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, onSuccess]);

  /**
   * اجرای خودکار در صورت فعال بودن autoFetch با رعایت dependency صحیح
   */
  useEffect(() => {
    if (autoFetch) {
      fetchActivities();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [autoFetch, fetchActivities]);

  const refetch = useCallback(async () => {
    await fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    isLoading,
    error,
    isOnline,
    refetch,
  };
}

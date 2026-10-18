/**
 * هوک اختصاصی مدیریت اتصال شبکه، خطاها و داده‌های API فعالیت‌ها
 * مسئول مدیریت وضعیت آنلاین/آفلاین، بارگذاری و لغو درخواست‌ها (AbortController)
 */

"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import type { ActivityItem } from "@/features/activity";

/**
 * داده‌های پیش‌فرض فعالیت‌ها برای حالت محلی یا نمایشی
 */
export const DEFAULT_ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "a-101",
    type: "project_created",
    titleKey: "items.contentPanelStarted.title",
    descriptionKey: "items.contentPanelStarted.description",
    user: { name: "Ahmad Mohammadi" },
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    id: "a-102",
    type: "member_joined",
    titleKey: "items.memberJoined.title",
    descriptionKey: "items.memberJoined.description",
    user: { name: "Sara Ahmadi" },
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
  },
  {
    id: "a-103",
    type: "task_completed",
    titleKey: "items.taskCompleted.title",
    descriptionKey: "items.taskCompleted.description",
    user: { name: "Reza Karimi" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "a-104",
    type: "payment_received",
    titleKey: "items.paymentReceived.title",
    descriptionKey: "items.paymentReceived.description",
    user: { name: "Billing" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
  {
    id: "a-105",
    type: "project_updated",
    titleKey: "items.projectUpdated.title",
    descriptionKey: "items.projectUpdated.description",
    user: { name: "Maryam Hosseini" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
  {
    id: "a-106",
    type: "project_created",
    titleKey: "items.clientDashboard.title",
    descriptionKey: "items.clientDashboard.description",
    user: { name: "Niloufar Taheri" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "a-107",
    type: "task_completed",
    titleKey: "items.milestoneCompleted.title",
    descriptionKey: "items.milestoneCompleted.description",
    user: { name: "Milad Ahmadi" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
  {
    id: "a-108",
    type: "member_joined",
    titleKey: "items.inviteAccepted.title",
    descriptionKey: "items.inviteAccepted.description",
    user: { name: "Amir Rezaei" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
  },
];

/**
 * اشتراک در تغییرات وضعیت آنلاین/آفلاین مرورگر؛
 * یک منبع خارجی است و از `setState` داخل افکت پرهیز می‌کند.
 */
function subscribeToOnlineStatus(callback: () => void): () => void {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

/** اسنپ‌شات وضعیت آنلاین در کلاینت */
const getOnlineSnapshot = (): boolean => navigator.onLine;

/** اسنپ‌شات وضعیت آنلاین در سرور (پیش از hydration) */
const getServerOnlineSnapshot = (): boolean => true;

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
  const t = useTranslations("Activity");
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // وضعیت آنلاین/آفلاین از طریق اشتراک در منبع خارجی (بدون setState داخل افکت)
  const isOnline = useSyncExternalStore(
    subscribeToOnlineStatus,
    getOnlineSnapshot,
    getServerOnlineSnapshot
  );

  // مرجع برای لغو درخواست‌های همزمان با استفاده از AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * دریافت اطلاعات از API با زنجیرهٔ Promise.
   * تمام به‌روزرسانی‌های state داخل callbackهای async انجام می‌شود تا با قانون
   * `set-state-in-effect` سازگار باشد.
   */
  const fetchActivities = useCallback((): Promise<void> => {
    if (!fetchFn) return Promise.resolve();

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    return Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) return undefined;
        setIsLoading(true);
        setError(null);
        return fetchFn(controller.signal);
      })
      .then((data) => {
        if (!data || controller.signal.aborted) return;
        setActivities(data);
        onSuccess?.(data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") {
          return; // نادیده گرفتن خطای لغو درخواست
        }
        const errorMessage = err instanceof Error ? err.message : t("loadErrorMessage");
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchFn, onSuccess, t]);

  /**
   * اجرای خودکار در صورت فعال بودن autoFetch با رعایت dependency صحیح
   */
  useEffect(() => {
    if (autoFetch) {
      void fetchActivities();
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

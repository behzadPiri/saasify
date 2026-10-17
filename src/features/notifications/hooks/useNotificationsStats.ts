"use client";

/**
 * هوک اختصاصی آمار اعلان‌ها
 * مقادیر مشتق‌شده (کل، خوانده‌نشده و هفته اخیر) را در یک پیمایش واحد محاسبه می‌کند
 * تا هنگام تغییر وضعیت‌ها، محاسبه دوباره و پرهزینه‌ای انجام نشود.
 */

import {useMemo} from "react";
import {ONE_WEEK_MS} from "../constants";
import type {NotificationItem, NotificationsStats} from "../types";

/**
 * محاسبه آمار اعلان‌ها
 * @param items لیست کامل اعلان‌ها
 * @param referenceTime مبنای زمانی محاسبه «هفته اخیر» (زمان آخرین دریافت داده)
 * @returns شمارش کل، خوانده‌نشده و اعلان‌های هفت روز گذشته
 */
export function useNotificationsStats(
  items: NotificationItem[],
  referenceTime: number,
): NotificationsStats {
  return useMemo(() => {
    let unread = 0;
    let thisWeek = 0;

    // یک پیمایش واحد به‌جای سه filter جداگانه؛ برای لیست‌های بزرگ به‌مراتب سریع‌تر است.
    for (const item of items) {
      if (!item.read) unread += 1;
      if (referenceTime - item.timestamp.getTime() < ONE_WEEK_MS) thisWeek += 1;
    }

    return {total: items.length, unread, thisWeek};
  }, [items, referenceTime]);
}

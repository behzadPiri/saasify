"use client";

/**
 * هوک اختصاصی فیلتر اعلان‌ها
 * مسئول نگه‌داشتن فیلتر فعال (همه/خوانده‌شده/خوانده‌نشده)، ساخت گزینه‌های ترجمه‌شده
 * و محاسبه لیست فیلترشده با useMemo است. هیچ منطق رندر داخلی ندارد.
 */

import {useCallback, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {NOTIFICATION_FILTER_ORDER} from "../constants";
import type {NotificationFilter, NotificationFilterOption, NotificationItem} from "../types";

/** خروجی هوک فیلتر اعلان‌ها */
export interface UseNotificationsFilterReturn {
  /** فیلتر فعال فعلی */
  activeFilter: NotificationFilter;
  /** تغییر فیلتر فعال (پایدار با useCallback) */
  setActiveFilter: (filter: NotificationFilter) => void;
  /** لیست اعلان‌های مطابق فیلتر فعال */
  filteredItems: NotificationItem[];
  /** گزینه‌های آماده رندر نوار فیلتر با برچسب ترجمه‌شده */
  filterOptions: NotificationFilterOption[];
}

/**
 * هوک فیلتر اعلان‌ها
 * @param items لیست کامل اعلان‌ها
 * @returns فیلتر فعال، لیست فیلترشده و گزینه‌های فیلتر
 */
export function useNotificationsFilter(items: NotificationItem[]): UseNotificationsFilterReturn {
  const t = useTranslations("Notifications.filters");
  // فقط شناسه فیلتر در state نگه داشته می‌شود؛ لیست فیلترشده مشتق‌شده است.
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");

  /** تغییر فیلتر فعال؛ پایدار می‌ماند تا باعث رندر مجدد نوار فیلتر نشود */
  const handleFilterChange = useCallback((filter: NotificationFilter) => {
    setActiveFilter(filter);
  }, []);

  /** لیست فیلترشده؛ با useMemo تا در هر رندر دوباره پیمایش سنگین انجام نشود */
  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    const wantRead = activeFilter === "read";
    return items.filter((item) => item.read === wantRead);
  }, [items, activeFilter]);

  /** گزینه‌های فیلتر با ترتیب ثابت و برچسب ترجمه‌شده */
  const filterOptions = useMemo<NotificationFilterOption[]>(
    () => NOTIFICATION_FILTER_ORDER.map((id) => ({id, label: t(id)})),
    [t],
  );

  return {activeFilter, setActiveFilter: handleFilterChange, filteredItems, filterOptions};
}

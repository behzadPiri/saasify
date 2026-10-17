/**
 * داده ماک فیچر اعلان‌ها
 * تمام اطلاعات نمونه اعلان‌ها اینجاست و از لایه UI و هوک‌ها کاملاً جدا شده است.
 * نکته کلیدی: به‌جای متن ترجمه‌شده، فقط «کلید ترجمه» ذخیره می‌شود تا با تغییر زبان،
 * متن‌ها خودکار به‌روز شوند و داده‌ماک وابسته به locale نباشد.
 */

import type {NotificationItem} from "../types";

/**
 * ساخت لیست نمونه اعلان‌ها با زمان‌های نسبی تازه.
 * چرا تابع و نه ثابت؟ چون timestampها باید در لحظه fetch نسبت به «الان» محاسبه شوند
 * تا نمایش «چند دقیقه پیش» همیشه منطقی بماند.
 * @returns آرایه‌ای تازه از اعلان‌های نمونه با کلیدهای ترجمه
 */
export function createMockNotifications(): NotificationItem[] {
  return [
    {
      id: "n-101",
      type: "success",
      titleKey: "items.billing.title",
      descriptionKey: "items.billing.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 18),
      read: false,
      tagKey: "tags.billing",
    },
    {
      id: "n-102",
      type: "info",
      titleKey: "items.team.title",
      descriptionKey: "items.team.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 48),
      read: false,
      tagKey: "tags.team",
    },
    {
      id: "n-103",
      type: "warning",
      titleKey: "items.security.title",
      descriptionKey: "items.security.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true,
      tagKey: "tags.security",
    },
    {
      id: "n-104",
      type: "critical",
      titleKey: "items.performance.title",
      descriptionKey: "items.performance.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28),
      read: false,
      tagKey: "tags.performance",
    },
    {
      id: "n-105",
      type: "success",
      titleKey: "items.system.title",
      descriptionKey: "items.system.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60),
      read: true,
      tagKey: "tags.system",
    },
    {
      id: "n-106",
      type: "info",
      titleKey: "items.billing.title",
      descriptionKey: "items.billing.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 75),
      read: true,
      tagKey: "tags.billing",
    },
    {
      id: "n-107",
      type: "warning",
      titleKey: "items.security.title",
      descriptionKey: "items.security.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
      read: false,
      tagKey: "tags.security",
    },
    {
      id: "n-108",
      type: "success",
      titleKey: "items.system.title",
      descriptionKey: "items.system.description",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168),
      read: true,
      tagKey: "tags.system",
    },
  ];
}

"use client";

/**
 * لیست اعلان‌ها
 * فقط وظیفه پیمایش آیتم‌های صفحه جاری و واگذاری رندر هر ردیف را دارد؛
 * هیچ منطق داده‌ای یا ترجمه‌ای در آن نیست.
 */

import {memo} from "react";
import {NotificationListItem} from "./NotificationListItem";
import type {NotificationItem} from "../types";

interface NotificationListProps {
  /** آیتم‌های صفحه جاری */
  items: NotificationItem[];
  /** جابه‌جایی وضعیت خوانده‌شدن یک اعلان (پایدار با useCallback در لایه هوک) */
  onToggleRead: (id: string) => void;
  /** حذف یک اعلان (پایدار با useCallback در لایه هوک) */
  onDelete: (id: string) => void;
}

/**
 * لیست اعلان‌ها
 * چرا memo؟ چون فقط با تغییر آیتم‌های صفحه جاری یا تابع عملیات باید رندر شود.
 */
export const NotificationList = memo(function NotificationList({
  items,
  onToggleRead,
  onDelete,
}: NotificationListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <NotificationListItem
          key={item.id}
          item={item}
          onToggle={onToggleRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

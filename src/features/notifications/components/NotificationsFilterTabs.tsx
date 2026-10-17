"use client";

/**
 * تب‌های فیلتر اعلان‌ها (همه / خوانده‌نشده / خوانده‌شده)
 * یک اتم نمایشی کاملاً کنترل‌شده؛ تغییر فیلتر از طریق prop به لایه هوک می‌رود.
 */

import {memo} from "react";
import type {NotificationFilter, NotificationFilterOption} from "../types";

interface NotificationsFilterTabsProps {
  /** گزینه‌های آماده رندر با برچسب ترجمه‌شده */
  options: NotificationFilterOption[];
  /** فیلتر فعال */
  activeFilter: NotificationFilter;
  /** تغییر فیلتر فعال */
  onFilterChange: (filter: NotificationFilter) => void;
}

/**
 * نوار فیلتر اعلان‌ها
 * چرا memo؟ چون فقط با تغییر گزینه‌ها یا فیلتر فعال باید رندر شود.
 */
export const NotificationsFilterTabs = memo(function NotificationsFilterTabs({
  options,
  activeFilter,
  onFilterChange,
}: NotificationsFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((option) => {
        const isActive = option.id === activeFilter;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onFilterChange(option.id)}
            aria-pressed={isActive}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border/60 bg-background/50 text-muted-foreground hover:bg-accent/40"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
});

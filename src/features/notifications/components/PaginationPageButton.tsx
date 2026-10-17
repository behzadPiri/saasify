"use client";

/**
 * دکمه شماره صفحه در صفحه‌بندی اعلان‌ها
 * یک اتم نمایشی که حالت فعال/غیرفعال را با رنگ مشخص می‌کند.
 */

import {memo} from "react";

interface PaginationPageButtonProps {
  /** شماره صفحه */
  page: number;
  /** آیا صفحه جاری است؟ */
  isActive: boolean;
  /** انتخاب این صفحه */
  onSelect: (page: number) => void;
}

/**
 * دکمه شماره صفحه
 * چرا memo؟ تا با تغییر وضعیت اعلان‌ها، دکمه‌های صفحات دیگر بی‌جهت رندر نشوند.
 */
export const PaginationPageButton = memo(function PaginationPageButton({
  page,
  isActive,
  onSelect,
}: PaginationPageButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(page)}
      aria-current={isActive ? "page" : undefined}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-background/60 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      }`}
    >
      {page}
    </button>
  );
});

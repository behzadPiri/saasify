"use client";

/**
 * دکمه ناوبری صفحه‌بندی (قبلی/بعدی)
 * یک اتم کوچک و قابل استفاده برای هر دو جهت؛ متن برچسب از بیرون ترجمه و پاس داده می‌شود.
 */

import {memo} from "react";

interface PaginationNavButtonProps {
  /** برچسب ترجمه‌شده دکمه (قبلی یا بعدی) */
  label: string;
  /** غیرفعال بودن دکمه در ابتدا/انتهای صفحات */
  disabled: boolean;
  /** عملیات رفتن به صفحه قبل/بعد */
  onClick: () => void;
}

/**
 * دکمه ناوبری صفحه‌بندی
 * چرا memo؟ برای جلوگیری از رندر دوباره هر دو دکمه با تغییر لیست اعلان‌ها.
 */
export const PaginationNavButton = memo(function PaginationNavButton({
  label,
  disabled,
  onClick,
}: PaginationNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
});

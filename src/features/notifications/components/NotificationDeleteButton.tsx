"use client";

/**
 * دکمه حذف یک اعلان
 * یک اتم آیکونی کوچک؛ تنها وظیفه‌اش اعلام کلیک به لایه بالاست و هیچ منطق داده‌ای ندارد.
 */

import {memo} from "react";
import {Icons} from "@/shared/components/ui/icons";

interface NotificationDeleteButtonProps {
  /** عملیات حذف اعلان */
  onClick: () => void;
  /** برچسب دسترس‌پذیری (aria-label) که از ترجمه می‌آید */
  ariaLabel: string;
}

/**
 * دکمه حذف اعلان
 * چرا memo؟ چون فقط با تغییر تابع عملیات یا برچسب باید رندر شود.
 */
export const NotificationDeleteButton = memo(function NotificationDeleteButton({
  onClick,
  ariaLabel,
}: NotificationDeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"
    >
      <Icons.X size={14} />
    </button>
  );
});

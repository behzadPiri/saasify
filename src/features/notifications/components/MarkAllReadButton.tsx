"use client";

/**
 * دکمه «علامت‌گذاری همه به‌عنوان خوانده‌شده»
 * یک اتم نمایشی است؛ عملیات واقعی از طریق prop onClick به لایه هوک سپرده می‌شود.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

interface MarkAllReadButtonProps {
  /** عملیات علامت‌گذاری همه */
  onClick: () => void;
  /** وقتی اعلان خوانده‌نشده‌ای نیست، دکمه غیرفعال می‌شود */
  disabled?: boolean;
}

/**
 * دکمه علامت‌گذاری همه اعلان‌ها به‌عنوان خوانده‌شده
 * چرا memo؟ چون فقط با تغییر بولی disabled باید رندر شود.
 */
export const MarkAllReadButton = memo(function MarkAllReadButton({
  onClick,
  disabled = false,
}: MarkAllReadButtonProps) {
  const t = useTranslations("Notifications");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icons.Check size={16} />
      {t("markAllRead")}
    </button>
  );
});

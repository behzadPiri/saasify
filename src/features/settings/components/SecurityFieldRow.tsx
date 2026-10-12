/**
 * یک ردیف نمایشی امنیت حساب (آیکون + لیبل + مقدار)؛ اتمیک و memoشده.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {SecurityField} from "../types";

/** Props ردیف امنیت */
interface SecurityFieldRowProps {
  /** داده ردیف؛ لیبل و مقدار هر دو کلید ترجمه‌اند */
  field: SecurityField;
}

/**
 * ردیف امنیت حساب؛ کاملاً نمایشی و بدون state.
 */
export const SecurityFieldRow = memo(function SecurityFieldRow({field}: SecurityFieldRowProps) {
  const t = useTranslations("Settings");
  const Icon = Icons[field.icon];

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/40 p-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-background/80 text-foreground">
          <Icon size={14} />
        </div>
        <span className="text-sm text-muted-foreground">{t(field.labelKey)}</span>
      </div>
      <span className="text-sm font-semibold text-foreground">{t(field.valueKey)}</span>
    </div>
  );
});

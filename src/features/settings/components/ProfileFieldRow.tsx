/**
 * یک ردیف اطلاعاتی پروفایل (آیکون + لیبل + مقدار)؛ اتمیک و memoشده.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {ProfileField} from "../types";

/** Props ردیف پروفایل */
interface ProfileFieldRowProps {
  /** داده ردیف (لیبل کلید ترجمه است) */
  field: ProfileField;
  /** جهت نوشتار */
  isRtl: boolean;
}

/**
 * ردیف اطلاعات پروفایل
 * مقدار نقش (role) کلید ترجمه است و اینجا ترجمه می‌شود؛ بقیه مقادیر داده‌اند.
 */
export const ProfileFieldRow = memo(function ProfileFieldRow({field, isRtl}: ProfileFieldRowProps) {
  const t = useTranslations("Settings");
  const Icon = Icons[field.icon];
  // فقط فیلد نقش نیاز به ترجمه مقدار دارد؛ نام و ایمیل داده خام‌اند.
  const displayValue = field.id === "role" ? t(field.value) : field.value;

  return (
    <div className="rounded-2xl border border-border/40 bg-background/40 p-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background/80 text-foreground">
          <Icon size={15} />
        </div>
        <div className={isRtl ? "text-right" : "text-left"}>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{t(field.labelKey)}</p>
          <p className="mt-1 text-sm font-medium text-foreground">{displayValue}</p>
        </div>
      </div>
    </div>
  );
});

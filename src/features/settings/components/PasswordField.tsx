/**
 * اینپوت تک‌فیلد رمز عبور با نمایش خطا؛ اتمیک و memoشده.
 * کنترل‌شده است: مقدار و خطا از والد می‌آید تا state تکراری ساخته نشود.
 */

"use client";

import {memo, useCallback, type ChangeEvent} from "react";
import {useTranslations} from "next-intl";
import type {PasswordFieldId} from "../types";

/** Props فیلد رمز */
interface PasswordFieldProps {
  /** شناسه فیلد برای گزارش تغییر به والد */
  id: PasswordFieldId;
  /** کلید ترجمه لیبل/placeholder */
  labelKey: string;
  /** مقدار کنترل‌شده */
  value: string;
  /** پیام خطای ترجمه‌شده؛ null یعنی بدون خطا */
  error: string | null;
  /** مقدار autocomplete مرورگر */
  autoComplete: string;
  /** کال‌بک پایدار تغییر مقدار */
  onChange: (field: PasswordFieldId, value: string) => void;
}

/**
 * فیلد رمز عبور
 * @param onChange با useCallback والد پایدار مانده تا memo مؤثر باشد.
 */
export const PasswordField = memo(function PasswordField({
  id,
  labelKey,
  value,
  error,
  autoComplete,
  onChange,
}: PasswordFieldProps) {
  const t = useTranslations("Settings");

  /** پل ورودی DOM به کال‌بک تایپ‌سیف والد */
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(id, event.target.value);
    },
    [id, onChange],
  );

  const describedBy = error ? `${id}-error` : undefined;

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {t(labelKey)}
      </span>
      <input
        type="password"
        value={value}
        autoComplete={autoComplete}
        placeholder={t(labelKey)}
        aria-invalid={error !== null}
        aria-describedby={describedBy}
        onChange={handleInputChange}
        className="w-full rounded-xl border border-border/50 bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary"
      />
      {/* پیام خطا فقط وقتی هست که اعتبارسنجی رد شده باشد */}
      {error !== null ? (
        <span id={describedBy} role="alert" className="mt-1.5 block text-xs text-destructive">
          {error}
        </span>
      ) : null}
    </label>
  );
});

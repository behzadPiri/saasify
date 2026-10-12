/**
 * سوییچ تک‌ردیفه تنظیمات؛ کامپوننت اتمیک و memoشده.
 * فقط props می‌گیرد و هیچ state داخلی ندارد تا ری‌رندر والد آن را بی‌دلیل بیدار نکند.
 */

"use client";

import {memo} from "react";

/** Props سوییچ؛ همه از والد ترجمه‌شده می‌آیند */
interface ToggleRowProps {
  /** متن نمایشی تنظیم (ترجمه‌شده) */
  label: string;
  /** وضعیت فعلی سوئیچ */
  enabled: boolean;
  /** هندلر پایدار (useCallback) تغییر وضعیت */
  onToggle: () => void;
  /** جهت نوشتار برای انیمیشن دستگیره */
  isRtl: boolean;
}

/**
 * ردیف سوئیچ
 * چرا memo؟ چون در لیست اعلان‌ها چند نمونه رندر می‌شود و نباید با تایپ در فرم رمز بیدار شود.
 */
export const ToggleRow = memo(function ToggleRow({label, enabled, onToggle, isRtl}: ToggleRowProps) {
  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-background/40 p-3.5"
    >
      <p className="text-sm font-medium text-foreground">{label}</p>
      <button
        type="button"
        aria-pressed={enabled}
        aria-label={label}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition duration-200 ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute h-4 w-4 rounded-full bg-white shadow-sm transition duration-200 ${
            enabled ? (isRtl ? "-translate-x-6" : "translate-x-6") : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
});

/**
 * آیتم تکی سوئیچ اعلان؛ واسط بین لیست و ToggleRow برای حفظ memo.
 * هندلر داخل همین کامپوننت با useCallback پایدار می‌شود تا رندر حلقه‌ای والد هندلر جدید نسازد.
 */

"use client";

import {memo, useCallback} from "react";
import {useTranslations} from "next-intl";
import type {NotificationPreferenceKey} from "../types";
import {ToggleRow} from "./ToggleRow";

/** Props آیتم سوئیچ */
interface NotificationToggleItemProps {
  /** کلید ترجیح؛ هم برای خواندن وضعیت، هم کلید ترجمه لیبل */
  preferenceKey: NotificationPreferenceKey;
  /** وضعیت فعلی این سوئیچ */
  enabled: boolean;
  /** تابع toggle پایدار از هوک */
  onToggle: (key: NotificationPreferenceKey) => void;
  /** جهت نوشتار */
  isRtl: boolean;
}

/**
 * آیتم سوئیچ اعلان
 * چرا کامپوننت جدا؟ تا `() => onToggle(key)` داخل حلقه والد ساخته نشود و memo فرزند واقعاً کار کند.
 */
export const NotificationToggleItem = memo(function NotificationToggleItem({
  preferenceKey,
  enabled,
  onToggle,
  isRtl,
}: NotificationToggleItemProps) {
  const t = useTranslations("Settings");

  /** هندلر پایدار مختص همین کلید */
  const handleToggle = useCallback(() => {
    onToggle(preferenceKey);
  }, [onToggle, preferenceKey]);

  return <ToggleRow label={t(preferenceKey)} enabled={enabled} isRtl={isRtl} onToggle={handleToggle} />;
});

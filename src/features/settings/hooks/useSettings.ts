/**
 * فاساد فیچر تنظیمات (ViewModel ریشه)؛ الگوبرداری از useDashboard.
 * همه زیرهوک‌ها را یکجا ترکیب می‌کند تا Settings.tsx فقط یک هوک صدا بزند.
 */

"use client";

import {useLocale} from "next-intl";
import {useMemo} from "react";
import {useNotificationPreferences} from "./useNotificationPreferences";
import {usePasswordForm} from "./usePasswordForm";
import {useProfileSection} from "./useProfileSection";
import {useSecurityOverview} from "./useSecurityOverview";

/**
 * هوک ریشه تنظیمات
 * @returns جهت نوشتار (isRtl) + خروجی هر بخش (پروفایل، امنیت، رمز، اعلان‌ها)
 */
export function useSettings() {
  const locale = useLocale();
  // مقدار مشتق‌شده جهت؛ memo تا رفرنس خروجی بی‌دلیل عوض نشود.
  const isRtl = useMemo(() => locale === "fa", [locale]);

  const profile = useProfileSection();
  const security = useSecurityOverview();
  const passwordForm = usePasswordForm();
  const notifications = useNotificationPreferences();

  // ترکیب نهایی memoشده؛ هر بخش فقط با تغییر خودش بازسازی می‌شود.
  return useMemo(
    () => ({isRtl, profile, security, passwordForm, notifications}),
    [isRtl, profile, security, passwordForm, notifications],
  );
}

/** نوع خروجی فاساد برای کامپوننت Settings */
export type UseSettingsReturn = ReturnType<typeof useSettings>;

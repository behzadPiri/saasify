/**
 * کامپوننت ریشه فیچر تنظیمات؛ ارکستراسیون نازک مثل Dashboard.tsx.
 * هیچ state، منطق فرم یا داده ایستا اینجا نیست؛ همه از فاساد useSettings می‌آید.
 */

"use client";

import {useLocale} from "next-intl";
import {useMemo} from "react";
import {useSettings} from "./hooks/useSettings";
import {NotificationPreferences, PasswordForm, ProfileSection, SecurityOverview, SettingsHero} from "./components";

/**
 * صفحه تنظیمات
 * @returns چیدمان Hero + گرید پروفایل/امنیت/رمز + کارت اعلان‌ها
 */
export function Settings() {
  const locale = useLocale();
  // جهت نوشتار فقط در ریشه ست می‌شود؛ فرزندان فقط برای تراز متن داخلی آن را می‌گیرند.
  const isRtl = useMemo(() => locale === "fa", [locale]);
  const {profile, security, passwordForm, notifications} = useSettings();

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      <SettingsHero />

      <div className="grid gap-4 xl:grid-cols-3">
        <ProfileSection data={profile} isRtl={isRtl} />
        <SecurityOverview data={security} />
        <PasswordForm form={passwordForm} />
      </div>

      <NotificationPreferences
        preferences={notifications.preferences}
        onToggle={notifications.togglePreference}
        isRtl={isRtl}
      />
    </div>
  );
}

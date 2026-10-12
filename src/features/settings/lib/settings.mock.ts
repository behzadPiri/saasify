/**
 * داده ماک فیچر تنظیمات
 * داده نمایشی پروفایل و سازنده ردیف‌های پروفایل/امنیت؛ جدا از UI و هوک.
 */

import type {ProfileField, SecurityField, SettingsProfile} from "../types";

/**
 * پروفایل نمایشی کاربر جاری.
 * نام و ایمیل «داده» هستند نه متن رابط کاربری، پس ترجمه نمی‌شوند.
 */
export const MOCK_PROFILE: SettingsProfile = {
  fullName: "Ava Thompson",
  email: "ava@saasify.io",
  roleKey: "productLead",
  initials: "AT",
};

/**
 * ساخت ردیف‌های کارت پروفایل از روی پروفایل ماک.
 * @param profile پروفایل ماک
 * @returns آرایه ردیف‌های قابل رندر در ProfileSection
 */
export function buildProfileFields(profile: SettingsProfile): ProfileField[] {
  return [
    {id: "fullName", labelKey: "fullName", value: profile.fullName, icon: "User"},
    {id: "email", labelKey: "emailAddress", value: profile.email, icon: "Mail"},
    // مقدار سمت شغلی کلید ترجمه است و در کامپوننت با t() ترجمه می‌شود.
    {id: "role", labelKey: "role", value: profile.roleKey, icon: "Users"},
  ];
}

/**
 * ردیف‌های ایستای کارت امنیت حساب.
 * مقادیر valueKey در کامپوننت با useTranslations ترجمه می‌شوند.
 */
export const MOCK_SECURITY_FIELDS: readonly SecurityField[] = [
  {id: "twoFactor", labelKey: "twoFactor", valueKey: "enabled", icon: "Check"},
  {id: "lastLogin", labelKey: "lastLogin", valueKey: "lastLoginToday", icon: "Clock"},
  {id: "activeSessions", labelKey: "activeSessions", valueKey: "activeSessionsValue", icon: "Users"},
] as const;

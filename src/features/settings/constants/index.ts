/**
 * ثوابت فیچر تنظیمات (Settings)
 * تمام مقادیر ایستا، ترتیب رندر و پیکربندی فیلدها اینجاست تا از UI و هوک‌ها جدا بماند.
 */

import type {
  NotificationPreferenceKey,
  PasswordFieldConfig,
  SettingsPreferences,
} from "../types";

/**
 * مقادیر اولیه سوئیچ‌های ترجیحات؛ تنها منبع حقیقت برای state اولیه.
 * چرا اینجا؟ تا هوک و UI هر دو از یک نقطه بخوانند و مغایرت پیش نیاید.
 */
export const DEFAULT_PREFERENCES: SettingsPreferences = {
  notificationsEnabled: true,
  marketingUpdates: true,
  securityAlerts: false,
  weeklyReports: false,
} as const;

/**
 * ترتیب ثابت رندر سوئیچ‌ها؛ تغییر ترتیب فقط با جابه‌جایی این آرایه انجام می‌شود.
 * هر کلید باید در SettingsPreferences وجود داشته باشد.
 */
export const NOTIFICATION_TOGGLE_ORDER: readonly NotificationPreferenceKey[] = [
  "notificationsEnabled",
  "marketingUpdates",
  "securityAlerts",
  "weeklyReports",
] as const;

/**
 * پیکربندی فیلدهای فرم رمز؛ لیبل‌ها کلید ترجمه‌اند نه متن هاردکد.
 * ترتیب آرایه = ترتیب نمایش در فرم.
 */
export const PASSWORD_FIELD_CONFIG: readonly PasswordFieldConfig[] = [
  {id: "currentPassword", labelKey: "currentPassword", autoComplete: "current-password"},
  {id: "newPassword", labelKey: "newPassword", autoComplete: "new-password"},
  {id: "confirmPassword", labelKey: "confirmPassword", autoComplete: "new-password"},
] as const;

/** حداقل طول مجاز رمز جدید */
export const MIN_PASSWORD_LENGTH = 8;

/** مدت شبیه‌سازی ذخیره رمز (میلی‌ثانیه) برای نمایش حالت saving */
export const PASSWORD_SAVE_DELAY_MS = 600;

/**
 * تایپ‌های فیچر تنظیمات (Settings)
 * لایه Model در معماری MVVM؛ هیچ منطق اجرایی یا متن هاردکد در اینجا نیست.
 */

import type {Icons} from "@/shared/components/ui/icons";

/** نام معتبر آیکون‌های shared؛ برای ارجاع تایپ‌سیف به آیکون‌ها */
export type SettingsIconName = keyof typeof Icons;

/** کلیدهای قابل تنظیم در بخش ترجیحات اعلان‌ها */
export type NotificationPreferenceKey =
  | "notificationsEnabled"
  | "marketingUpdates"
  | "securityAlerts"
  | "weeklyReports";

/** وضعیت همه سوئیچ‌های ترجیحات کاربر */
export type SettingsPreferences = Record<NotificationPreferenceKey, boolean>;

/** شناسه فیلدهای فرم تغییر رمز عبور */
export type PasswordFieldId = "currentPassword" | "newPassword" | "confirmPassword";

/** مقادیر کنترل‌شده فرم رمز عبور */
export interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/** خطای اعتبارسنجی هر فیلد؛ null یعنی بدون خطا */
export type PasswordFormErrors = Record<PasswordFieldId, string | null>;

/** وضعیت ارسال فرم رمز (idle در حال سکون، saving در حال ذخیره، success موفق) */
export type PasswordSubmitStatus = "idle" | "saving" | "success";

/** تعریف ایستای یک فیلد رمز برای رندر حلقه‌ای */
export interface PasswordFieldConfig {
  /** شناسه یکتای فیلد */
  id: PasswordFieldId;
  /** کلید ترجمه لیبل و placeholder در نیم‌اسپیس Settings */
  labelKey: string;
  /** مقدار autocomplete استاندارد مرورگر */
  autoComplete: string;
}

/** یک ردیف اطلاعاتی پروفایل (لیبل + مقدار + آیکون) */
export interface ProfileField {
  /** شناسه یکتا برای key */
  id: string;
  /** کلید ترجمه لیبل */
  labelKey: string;
  /** مقدار نمایشی (داده، نه متن UI) */
  value: string;
  /** نام آیکون */
  icon: SettingsIconName;
}

/** یک ردیف نمایشی در کارت امنیت حساب */
export interface SecurityField {
  /** شناسه یکتا برای key */
  id: string;
  /** کلید ترجمه لیبل */
  labelKey: string;
  /** کلید ترجمه مقدار */
  valueKey: string;
  /** نام آیکون */
  icon: SettingsIconName;
}

/** پروفایل ماک کاربر جاری */
export interface SettingsProfile {
  /** نام نمایشی */
  fullName: string;
  /** ایمیل */
  email: string;
  /** کلید ترجمه سمت شغلی */
  roleKey: string;
  /** حروف اول نام برای آواتار */
  initials: string;
}

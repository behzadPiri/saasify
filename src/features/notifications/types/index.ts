/**
 * تایپ‌های فیچر اعلان‌ها (Notifications)
 * لایه Model در معماری MVVM؛ این فایل هیچ منطق اجرایی و هیچ متن هاردکدی ندارد
 * و فقط قرارداد داده‌ها را تعریف می‌کند تا UI، هوک‌ها و داده‌ماک همه از یک منبع تبعیت کنند.
 */

import type {Icons} from "@/shared/components/ui/icons";

/** نام معتبر آیکون‌های shared؛ برای ارجاع تایپ‌سیف به آیکون‌های اعلان */
export type NotificationIconName = keyof typeof Icons;

/**
 * انواع اعلان (System, Alert, Message و ...).
 * این تایپ مبنای رنگ‌بندی و انتخاب آیکون در لایه ثوابت است.
 */
export type NotificationType = "success" | "info" | "warning" | "critical";

/** فیلترهای قابل انتخاب در نوار فیلتر اعلان‌ها (همه / خوانده‌شده / خوانده‌نشده) */
export type NotificationFilter = "all" | "read" | "unread";

/**
 * یک اعلان واحد.
 * نکته مهم: به‌جای نگه‌داشتن متن ترجمه‌شده، فقط «کلید ترجمه» ذخیره می‌شود
 * تا تغییر زبان باعث به‌روزرسانی خودکار متن‌ها شود و داده‌ماک از locale مستقل بماند.
 */
export interface NotificationItem {
  /** شناسه یکتا (برای key و عملیات تغییر وضعیت) */
  id: string;
  /** نوع اعلان؛ تعیین‌کننده آیکون و رنگ */
  type: NotificationType;
  /** کلید ترجمه عنوان در نیم‌اسپیس Notifications */
  titleKey: string;
  /** کلید ترجمه توضیحات در نیم‌اسپیس Notifications */
  descriptionKey: string;
  /** کلید ترجمه برچسب دسته (صورت‌حساب، تیم، امنیت و ...) */
  tagKey: string;
  /** زمان ایجاد اعلان */
  timestamp: Date;
  /** وضعیت خوانده‌شدن؛ منبع حقیقت عملیات mark read */
  read: boolean;
}

/** پیکربندی ظاهری هر نوع اعلان (نقطه رنگی، بج و آیکون) */
export interface NotificationTypeStyle {
  /** کلاس رنگ نقطه وضعیت روی آیتم */
  dot: string;
  /** کلاس رنگ پس‌زمینه و متن بج آیکون */
  badge: string;
  /** نام آیکون از مجموعه Icons */
  icon: NotificationIconName;
}

/** آمار خلاصه اعلان‌ها که در کارت‌های بالای صفحه نمایش داده می‌شود */
export interface NotificationsStats {
  /** تعداد کل اعلان‌ها */
  total: number;
  /** تعداد اعلان‌های خوانده‌نشده */
  unread: number;
  /** تعداد اعلان‌های هفت روز گذشته */
  thisWeek: number;
}

/** گزینه فیلتر آماده رندر؛ label همان متن ترجمه‌شده است */
export interface NotificationFilterOption {
  /** شناسه فیلتر */
  id: NotificationFilter;
  /** برچسب ترجمه‌شده برای نمایش */
  label: string;
}

/** رنگ‌های بصری مجاز برای بج کارت‌های آماری */
export type NotificationStatAccent = "primary" | "amber" | "emerald";

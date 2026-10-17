/**
 * ثوابت فیچر اعلان‌ها (Notifications)
 * تمام مقادیر ایستا، پیکربندی رنگ/آیکون انواع اعلان و تنظیمات صفحه‌بندی اینجاست
 * تا از لایه UI و هوک‌ها جدا بماند و تنها منبع حقیقت باشد.
 */

import type {NotificationFilter, NotificationType, NotificationTypeStyle} from "../types";

/**
 * پیکربندی ظاهری هر نوع اعلان.
 * چرا در ثوابت؟ چون یک داده ایستای نمایشی است و نباید در بدنه کامپوننت تکرار شود.
 */
export const NOTIFICATION_TYPE_STYLES: Record<NotificationType, NotificationTypeStyle> = {
  success: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600",
    icon: "Check",
  },
  info: {
    dot: "bg-sky-500",
    badge: "bg-sky-500/10 text-sky-600",
    icon: "Bell",
  },
  warning: {
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600",
    icon: "Activity",
  },
  critical: {
    dot: "bg-rose-500",
    badge: "bg-rose-500/10 text-rose-600",
    icon: "Support",
  },
};

/** ترتیب ثابت نمایش فیلترها در نوار فیلتر؛ تغییر ترتیب فقط از همین‌جا انجام می‌شود */
export const NOTIFICATION_FILTER_ORDER: readonly NotificationFilter[] = ["all", "unread", "read"];

/** تعداد اعلان‌های هر صفحه در بخش صفحه‌بندی */
export const NOTIFICATIONS_PAGE_SIZE = 4;

/** بازه زمانی یک هفته به میلی‌ثانیه؛ پایه محاسبه آمار «این هفته» */
export const ONE_WEEK_MS = 1000 * 60 * 60 * 24 * 7;

/** تأخیر شبیه‌سازی‌شده دریافت اعلان‌ها از سرور (میلی‌ثانیه) */
export const NOTIFICATIONS_FETCH_DELAY_MS = 320;

/**
 * کلاس‌های بج کارت‌های آماری بر اساس رنگ.
 * خارج از کامپوننت نگه داشته شده تا کارت آماری صرفاً داده را رندر کند.
 */
export const NOTIFICATION_STAT_ACCENT_STYLES = {
  primary: "bg-primary/10 text-primary",
  amber: "bg-amber-500/10 text-amber-600 animate-pulse",
  emerald: "bg-emerald-500/10 text-emerald-600",
} as const;

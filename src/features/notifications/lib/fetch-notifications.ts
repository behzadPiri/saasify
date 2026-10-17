/**
 * شبیه‌ساز درخواست دریافت اعلان‌ها
 * این تابع نقش لایه Data/Network را بازی می‌کند: داده ماک را با تأخیر برمی‌گرداند
 * و کامل از AbortSignal پشتیبانی می‌کند تا با unmount شدن صفحه، درخواست لغو شود
 * و از نشتی حافظه (به‌جا ماندن تایمر و listener) جلوگیری شود.
 */

import {NOTIFICATIONS_FETCH_DELAY_MS} from "../constants";
import {createMockNotifications} from "./notifications.mock";
import type {NotificationItem} from "../types";

/**
 * دریافت اعلان‌ها به‌صورت Promise با پشتیبانی از لغو.
 * @param signal سیگنال لغو که هنگام cleanup از سمت هوک ارسال می‌شود
 * @param delayMs مدت شبیه‌سازی تأخیر شبکه (پیش‌فرض از ثوابت خوانده می‌شود)
 * @returns لیست اعلان‌ها یا رد شدن با خطای AbortError هنگام لغو
 */
export function fetchNotifications(
  signal: AbortSignal,
  delayMs: number = NOTIFICATIONS_FETCH_DELAY_MS,
): Promise<NotificationItem[]> {
  return new Promise<NotificationItem[]>((resolve, reject) => {
    // تایمر باید در cleanup پاک شود؛ در غیر این صورت بعد از unmount هم اجرا می‌شد.
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", handleAbort);
      resolve(createMockNotifications());
    }, delayMs);

    // هنگام لغو: تایمر پاک و Promise با خطای استاندارد AbortError رد می‌شود.
    function handleAbort() {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    }

    signal.addEventListener("abort", handleAbort, {once: true});
  });
}

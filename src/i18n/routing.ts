/**
 * قوانین روتینگ بین‌المللی (next-intl)
 * تعریف زبان‌های پشتیبانی‌شده و نحوه نمایش پیشوند زبان در URL
 */

import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
    locales: ["fa", "en"],          // زبان‌های پشتیبانی‌شده
    defaultLocale: "fa",            // زبان پیش‌فرض: فارسی
    localePrefix: "as-needed",      // /fa نمایش داده نمی‌شود ولی /en نمایش داده می‌شود
    localeDetection: true           // تشخیص خودکار زبان از مرورگر
});

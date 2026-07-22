/**
 * تنظیمات درخواست next-intl
 * تعیین زبان و بارگذاری فایل‌های ترجمه برای هر درخواست
 */

// src/i18n/request.ts
import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async ({requestLocale}) => {
    // requestLocale یک Promise است، باید await بشه
    const resolved = await requestLocale;   // "fa" | "en" | undefined

    // اگر چیزی نیومد، همیشه برو روی فارسی
    const locale = resolved || "fa";

    return {
        locale,
        // فایل‌های ترجمه:
        // src/messages/fa.json
        // src/messages/en.json
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});


/**
 * کمکی‌های فرمت‌بندی تاریخ برای داشبورد
 * استفاده از Intl با locale انگلیسی برای اعداد لاتین
 */

export function formatLocaleDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

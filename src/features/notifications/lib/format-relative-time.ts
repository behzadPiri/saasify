/**
 * کمک‌تابع فرمت زمان نسبی برای اعلان‌ها
 * از Intl استفاده می‌کند تا خروجی برای هر locale (فارسی/انگلیسی) درست و بومی باشد.
 */

/**
 * تبدیل یک تاریخ به متن زمان نسبی.
 * اگر فاصله کمتر از یک هفته باشد از Intl.RelativeTimeFormat استفاده می‌شود
 * (مثل «۱۸ دقیقه پیش») و در غیر این صورت تاریخ کوتاه شمسی/میلادی نمایش داده می‌شود.
 * @param date تاریخ اعلان
 * @param locale کد زبان جاری (مثلاً fa یا en)
 * @returns متن آماده نمایش
 */
export function formatRelativeTime(date: Date, locale: string): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  const rtf = new Intl.RelativeTimeFormat(locale, {numeric: "auto"});

  if (minutes < 1) return rtf.format(0, "minute");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (hours < 24) return rtf.format(-hours, "hour");
  if (days < 7) return rtf.format(-days, "day");

  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR-u-ca-persian" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

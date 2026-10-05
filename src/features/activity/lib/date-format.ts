/**
 * توابع فرمت‌بندی تاریخ برای ماژول فعالیت
 * جداگانه از منطق UI نگه داشته شده تا قابل تست و استفاده مجدد باشد
 */

/**
 * فرمت کردن تاریخ به زمان نسبی (مثلاً: "۲ ساعت پیش"، "۳ روز پیش")
 * @param date - تاریخ مورد نظر
 * @param locale - لوکال برای نمایش (fa، en، و...)
 * @returns رشته زمان نسبی
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

  return new Intl.DateTimeFormat(locale, {dateStyle: "medium"}).format(new Date(date));
}

/**
 * فرمت کردن تاریخ به صورت کامل (مثلاً: "۱۴۰۳/۰۷/۱۵")
 * @param date - تاریخ مورد نظر
 * @param locale - لوکال برای نمایش
 * @returns رشته تاریخ فرمت شده
 */
export function formatFullDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * فرمت کردن تاریخ برای نمایش در input type="date"
 * @param date - تاریخ مورد نظر
 * @returns رشته به فرمت YYYY-MM-DD
 */
export function formatDateInput(date: Date): string {
  return new Date(date).toISOString().split("T")[0];
}

/**
 * بررسی اینکه آیا تاریخ امروز است
 * @param date - تاریخ مورد نظر
 * @returns true اگر تاریخ امروز باشد
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  const target = new Date(date);
  return (
    target.getDate() === today.getDate() &&
    target.getMonth() === today.getMonth() &&
    target.getFullYear() === today.getFullYear()
  );
}
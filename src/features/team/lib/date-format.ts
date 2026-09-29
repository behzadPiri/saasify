/**
 * کمکی‌های تاریخ تیم
 */

export function formatShortDate(date: Date, locale = "en"): string {
  return new Intl.DateTimeFormat(locale, {month: "short", day: "numeric", year: "numeric"}).format(date);
}

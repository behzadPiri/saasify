/**
 * کمک‌کننده‌های نمایش پروژه
 * تبدیل کلیدهای ترجمه یا مقادیر تحت‌اللفظی به متن قابل نمایش
 */

import type {ProjectSummary, ProjectTask, ProjectTeamMember} from "../types";

type Translate = (key: string) => string;

/** نام قابل نمایش پروژه: ابتدا کلید ترجمه و در نهایت نام تحت‌اللفظی */
export function getProjectName(project: ProjectSummary, t: Translate): string {
  return project.nameKey ? t(project.nameKey) : project.name ?? "";
}

/** توضیحات قابل نمایش پروژه */
export function getProjectDescription(project: ProjectSummary, t: Translate): string {
  return project.descriptionKey ? t(project.descriptionKey) : project.description ?? "";
}

/** عنوان قابل نمایش وظیفه */
export function getTaskTitle(task: ProjectTask, t: Translate): string {
  return task.titleKey ? t(task.titleKey) : task.title ?? "";
}

/** توضیحات قابل نمایش وظیفه */
export function getTaskDescription(task: ProjectTask, t: Translate): string {
  return task.descriptionKey ? t(task.descriptionKey) : task.description ?? "";
}

/** برچسب قابل نمایش نقش عضو پروژه */
export function getProjectRole(role: ProjectTeamMember["role"], t: Translate): string {
  return t(`roles.${role}`);
}

/** تشخیص لوکال فارسی (شامل fa و fa-IR) برای انتخاب تقویم شمسی و واحد پول ریال */
function isPersianLocale(locale: string): boolean {
  return locale.toLowerCase().startsWith("fa");
}

/**
 * قالب‌بندی تاریخ بر اساس لوکال انتخاب‌شدهٔ کاربر.
 * برای فارسی تقویم هجری شمسی (persian) و برای سایر زبان‌ها تقویم میلادی (gregory) استفاده می‌شود.
 * مقدار خالی با خط تیره نمایش داده می‌شود.
 */
export function formatProjectDate(date: Date | undefined, locale: string): string {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale, {
    calendar: isPersianLocale(locale) ? "persian" : "gregory",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * قالب‌بندی مبلغ بودجه بر اساس لوکال انتخاب‌شدهٔ کاربر.
 * فارسی: ریال (IRR)، انگلیسی: دلار (USD). مقدار خالی با خط تیره نمایش داده می‌شود.
 */
export function formatProjectCurrency(value: number | undefined, locale: string): string {
  if (value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: isPersianLocale(locale) ? "IRR" : "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

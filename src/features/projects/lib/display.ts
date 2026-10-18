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

/** برچسب قابل نمایش نقش عضو پروژه */
export function getProjectRole(role: ProjectTeamMember["role"], t: Translate): string {
  return t(`roles.${role}`);
}

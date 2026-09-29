/**
 * ثابت‌های تیم
 * شامل گزینه‌های فیلتر/مرتب‌سازی، استایل نقش‌ها و گزینه‌های دعوت
 */

import type {TeamFilterOption, TeamRole, TeamSortOption} from "../types";

export * from "./member-projects";
export * from "./member-activity";

export const TEAM_FILTER_OPTIONS: readonly TeamFilterOption[] = [
  "all",
  "owner",
  "admin",
  "member",
  "viewer",
] as const;

export const TEAM_SORT_OPTIONS: ReadonlyArray<{value: TeamSortOption; labelKey: string}> = [
  {value: "name", labelKey: "sort.name"},
  {value: "role", labelKey: "sort.role"},
  {value: "lastActive", labelKey: "sort.lastActive"},
];

export const INVITE_ROLE_OPTIONS: ReadonlyArray<{value: TeamRole; labelKey: string}> = [
  {value: "admin", labelKey: "roles.admin"},
  {value: "member", labelKey: "roles.member"},
  {value: "viewer", labelKey: "roles.viewer"},
];

export const TEAM_ROLE_STYLE: Record<TeamRole, {badge: string; labelKey: string}> = {
  owner: {
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    labelKey: "roles.owner",
  },
  admin: {
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    labelKey: "roles.admin",
  },
  member: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    labelKey: "roles.member",
  },
  viewer: {
    badge: "bg-muted text-muted-foreground",
    labelKey: "roles.viewer",
  },
};

/** رنگ نقطهٔ وضعیت آنلاین/آفلاین عضو */
export const TEAM_STATUS_STYLE: Record<"online" | "away" | "offline", string> = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-slate-400",
};

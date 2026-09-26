import type {ProjectStatus} from "./types";

// گزینه‌های فیلتر وضعیت که در UI (select) نمایش داده می‌شوند
export const PROJECT_FILTER_OPTIONS = ["all", "active", "completed", "on_hold", "archived"] as const;
export type ProjectFilterOption = (typeof PROJECT_FILTER_OPTIONS)[number];

// استایل و متن مرتبط با هر وضعیت پروژه
// badge: کلاس‌های tailwind برای نشان وضعیت
// labelKey: کلید ترجمه در فایل پیام‌ها
// icon: نام آیکونی که برای وضعیت نمایش داده می‌شود
export const PROJECT_STATUS_STYLE: Record<ProjectStatus, {badge: string; labelKey: string; icon: string}> = {
  active: {
    badge: "bg-emerald-100 text-emerald-700",
    labelKey: "status.active",
    icon: "Activity",
  },
  completed: {
    badge: "bg-blue-100 text-blue-700",
    labelKey: "status.completed",
    icon: "Check",
  },
  on_hold: {
    badge: "bg-amber-100 text-amber-700",
    labelKey: "status.onHold",
    icon: "Pause",
  },
  archived: {
    badge: "bg-muted text-muted-foreground",
    labelKey: "status.archived",
    icon: "Archive",
  },
};

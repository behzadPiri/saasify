/**
 * ثابت‌های فعالیت‌ها
 * پیکربندی‌های ظاهری و برچسب‌های عمومی برای انواع فعالیت
 */

import {ActivityType, ActivityTypeConfig} from "@/features/activity";

export const ACTIVITY_TYPES: Record<ActivityType, ActivityTypeConfig> = {
  project_created: {
    icon: "Plus",
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  project_updated: {
    icon: "Edit",
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  member_joined: {
    icon: "UserPlus",
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  payment_received: {
    icon: "DollarSign",
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  task_completed: {
    icon: "Check",
    color: "text-indigo-500",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
} as const;

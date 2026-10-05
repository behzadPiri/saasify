/**
 * انواع فعالیت‌ها
 * تعریف تایپ‌ها برای آیتم‌های فعالیت، پیکربندی‌های ظاهری و فیلترها
 */

export type ActivityType =
  | "project_created"
  | "project_updated"
  | "member_joined"
  | "payment_received"
  | "task_completed";

export type ActivityFilter = "all" | "project" | "team" | "payment" | "task";

export type ActivityGroup = Exclude<ActivityFilter, "all">;

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
}

/**
 * پیکربندی نوع فعالیت
 * مربوط به آیکون، رنگ و پس‌زمینه هر نوع فعالیت
 */
export interface ActivityTypeConfig {
  icon: string;
  color: string;
  bg: string;
}

// انواع مورد استفاده در ویژگی پروژه‌ها
// این فایل فقط انواع سطح-بالا را تعریف می‌کند تا بین هوک‌ها و
// کامپوننت‌ها یک قرارداد روشن برای داده‌های پروژه برقرار باشد.

// وضعیت پروژه: مقادیر ممکن که در سراسر ویژگی استفاده می‌شوند
export type ProjectStatus = "active" | "completed" | "on_hold" | "archived";

// خلاصهٔ اطلاعات پروژه که برای نمایش در کارت‌ها و لیست‌ها استفاده می‌شود
export interface ProjectTeamMember {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  assignee: string;
  status: "todo" | "in_progress" | "done";
  dueDate?: Date;
}

export interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  progress: number; // درصد پیشرفت (0-100)
  members: number; // تعداد اعضای مرتبط با پروژه
  deadline?: Date; // تاریخ مهلت (اختیاری)
  budget?: number; // بودجه به صورت عدد
  updatedAt: Date; // آخرین زمان به‌روزرسانی
  startDate?: Date;
  dueDate?: Date;
  teamId?: string;
  coverColor?: string;
  teamMembers?: ProjectTeamMember[];
  tasks?: ProjectTask[];
}

// مقادیر آماری که در بخش آمار صفحه نمایش داده می‌شوند
export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  overdueProjects: number;
  totalBudget: number;
}

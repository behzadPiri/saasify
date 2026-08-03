/**
 * تایپ‌های داشبورد
 * شامل آمار، فعالیت‌ها، پروژه‌ها و داده‌های نمودار
 */

import type {Icons} from "@/shared/components/ui/icons";

export type IconName = keyof typeof Icons;

export interface DashboardStats {
    totalProjects: number;
    activeProjects: number;
    teamMembers: number;
    revenue: number;
    revenueChange: number;
    projectsChange: number;
    membersChange: number;
}

export interface ActivityItem {
    id: string;
    type: "project_created" | "project_updated" | "member_joined" | "payment_received" | "task_completed";
    title: string;
    description: string;
    user: {
        name: string;
        avatar?: string;
    };
    timestamp: Date;
    metadata?: Record<string, unknown>;
}

export interface ChartDataPoint {
    label: string;
    value: number;
    date?: string;
}

export interface ProjectSummary {
    id: string;
    name: string;
    status: "active" | "completed" | "on_hold" | "archived";
    progress: number;
    members: number;
    deadline?: Date;
    budget?: number;
}

export interface QuickAction {
    id: string;
    labelKey: string;
    descriptionKey: string;
    icon: string;
    href: string;
    variant: "primary" | "secondary" | "outline";
}

export interface DashboardData {
    stats: DashboardStats;
    recentActivity: ActivityItem[];
    projects: ProjectSummary[];
    revenueChart: ChartDataPoint[];
    projectDistribution: ChartDataPoint[];
    quickActions: QuickAction[];
    planRenewDate?: Date;
}

/** رنگ‌های بصری مجاز برای آیتم‌های مصرف پلن */
export type PlanAccent = "primary" | "emerald" | "amber" | "sky" | "violet";

/** یک سهمیه از پلن (پروژه، عضو، فضا و ...) */
export interface PlanUsageItem {
    id: string;
    label: string;
    used: number;
    total: number;
    unit?: string;
    icon: IconName;
    accent?: PlanAccent;
}
/**
 * ثابت‌های داشبورد
 * شامل اکشن‌های سریع و داده‌های پیش‌فرض
 */

import {QuickAction} from "../types";

export const QUICK_ACTIONS: QuickAction[] = [
    {
        id: "new-project",
        labelKey: "newProject",
        descriptionKey: "newProjectDesc",
        icon: "Plus",
        href: "/projects",
        variant: "primary",
    },
    {
        id: "invite-member",
        labelKey: "inviteMember",
        descriptionKey: "inviteMemberDesc",
        icon: "UserPlus",
        href: "/team",
        variant: "secondary",
    },
    {
        id: "view-reports",
        labelKey: "viewReports",
        descriptionKey: "viewReportsDesc",
        icon: "FileText",
        href: "/analytics",
        variant: "outline",
    },
    {
        id: "settings",
        labelKey: "settings",
        descriptionKey: "settingsDesc",
        icon: "Settings",
        href: "/settings",
        variant: "outline",
    },
];

export const STAT_CARDS_CONFIG = [
    {
        id: "total-projects",
        label: "کل پروژه‌ها",
        icon: "Folder",
        trend: "up",
    },
    {
        id: "active-projects",
        label: "پروژه‌های فعال",
        icon: "Activity",
        trend: "up",
    },
    {
        id: "team-members",
        label: "اعضای تیم",
        icon: "Users",
        trend: "neutral",
    },
    {
        id: "revenue",
        label: "درآمد",
        icon: "DollarSign",
        trend: "up",
    },
] as const;

export const ACTIVITY_TYPES = {
    project_created: {icon: "Plus", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30"},
    project_updated: {icon: "Edit", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30"},
    member_joined: {icon: "UserPlus", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30"},
    payment_received: {icon: "DollarSign", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30"},
    task_completed: {icon: "Check", color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30"},
} as const;
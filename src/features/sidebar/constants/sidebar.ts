/**
 * آیتم‌های ناوبری سایدبار
 * هر آیتم شامل id، کلید ترجمه، آدرس href و آیکون مربوطه است
 */

import { Icons } from "@/shared/components/ui/icons";

export interface SidebarNavItem {
    id: string;
    translationKey: string;
    href: string;
    icon: keyof typeof Icons;
}

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
    {
        id: "dashboard",
        translationKey: "items.dashboard",
        href: "/dashboard",
        icon: "Dashboard",
    },
    {
        id: "projects",
        translationKey: "items.projects",
        href: "/projects",
        icon: "Folder",
    },
    {
        id: "billing",
        translationKey: "items.billing",
        href: "/billing",
        icon: "Billing",
    },
    {
        id: "notifications",
        translationKey: "items.notifications",
        href: "/notifications",
        icon: "Bell",
    },
    {
        id: "settings",
        translationKey: "items.settings",
        href: "/settings",
        icon: "Settings",
    },
    {
        id: "support",
        translationKey: "items.support",
        href: "/support",
        icon: "Support",
    },
];
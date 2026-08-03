"use client";

/**
 * هوک فید فعالیت‌ها
 * مدیریت برش لیست، نمایش زمان نسبی و پیکربندی نوع فعالیت
 */

import {useTranslations} from "next-intl";
import {ACTIVITY_TYPES} from "../constants";
import type {ActivityItem} from "../types";
import {formatLocaleDate} from "../lib/date-format";

export function useActivityFeed(activities: ActivityItem[], limit = 5) {
    const t = useTranslations("Dashboard.activity");

    const displayedActivities = activities.slice(0, limit);

    /** تبدیل تاریخ به زمان نسبی (همین الان، چند دقیقه پیش و ...) */
    const formatTimeAgo = (date: Date): string => {
        const now = new Date();
        const diffMs = now.getTime() - new Date(date).getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return t("justNow");
        if (diffMins < 60) return t("minutesAgo", {count: diffMins});
        if (diffHours < 24) return t("hoursAgo", {count: diffHours});
        if (diffDays < 7) return t("daysAgo", {count: diffDays});
        return formatLocaleDate(date);
    };

    /** پیکربندی ظاهری نوع فعالیت با مقدار پیش‌فرض */
    const getActivityTypeConfig = (type: ActivityItem["type"]) => {
        return ACTIVITY_TYPES[type] ?? ACTIVITY_TYPES.project_created;
    };

    return {
        t,
        displayedActivities,
        formatTimeAgo,
        getActivityTypeConfig,
    };
}

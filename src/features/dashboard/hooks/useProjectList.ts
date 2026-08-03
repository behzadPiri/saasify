"use client";

/**
 * هوک لیست پروژه‌ها
 * مدیریت برش لیست و فرمت‌بندی تاریخ
 */

import type {ProjectSummary} from "../types";
import {formatLocaleDate} from "../lib/date-format";

export function useProjectList(projects: ProjectSummary[], limit = 4) {
    const displayedProjects = projects.slice(0, limit);

    /** فرمت تاریخ مهلت پروژه */
    const formatDate = (date: Date): string => {
        return formatLocaleDate(date);
    };

    return {
        displayedProjects,
        formatDate,
    };
}

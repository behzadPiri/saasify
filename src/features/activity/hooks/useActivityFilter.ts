/**
 * هوک اختصاصی مدیریت فیلترینگ و جستجوی فعالیت‌ها
 * مسئول فیلتر کردن لیست فعالیت‌ها بر اساس دسته‌بندی انتخابی
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { ActivityItem, ActivityFilter, ActivityGroup } from "@/features/activity";

/**
 * تبدیل نوع فعالیت به گروه فیلترینگ مربوطه
 * @param type نوع فعالیت
 * @returns گروه فیلتر
 */
export function typeToGroup(type: ActivityItem["type"]): ActivityGroup {
  if (type === "project_created" || type === "project_updated") return "project";
  if (type === "member_joined") return "team";
  if (type === "payment_received") return "payment";
  return "task";
}

/**
 * خروجی هوک فیلترینگ فعالیت‌ها
 */
interface UseActivityFilterReturn {
  activeFilter: ActivityFilter;
  setActiveFilter: (filter: ActivityFilter) => void;
  filteredActivities: ActivityItem[];
  filterOptions: { id: ActivityFilter; label: string }[];
  typeLabels: Record<ActivityGroup, string>;
}

/**
 * هوک مدیریت فیلترهای فعالیت
 * @param activities لیست کامل فعالیت‌ها
 * @returns وضعیت فیلتر فعال، لیست فیلتر شده و گزینه‌ها
 */
export function useActivityFilter(activities: ActivityItem[]): UseActivityFilterReturn {
  const t = useTranslations("Activity");
  const [activeFilter, setActiveFilterState] = useState<ActivityFilter>("all");

  /**
  * تغییر فیلتر فعال با استفاده از useCallback برای جلوگیری از رندر مجدد
  */
  const setActiveFilter = useCallback((filter: ActivityFilter) => {
    setActiveFilterState(filter);
  }, []);

  /**
   * لیست فعالیت‌های فیلتر شده بر اساس فیلتر فعال
   */
  const filteredActivities = useMemo(() => {
    if (activeFilter === "all") return activities;
    return activities.filter((item) => typeToGroup(item.type) === activeFilter);
  }, [activities, activeFilter]);

  /**
   * ترجمه گروه‌های فعالیت
   */
  const typeLabels = useMemo(() => ({
    project: t("groups.project"),
    team: t("groups.team"),
    payment: t("groups.payment"),
    task: t("groups.task"),
  }), [t]);

  /**
   * گزینه‌های فیلتر برای نمایش در تب‌ها
   */
  const filterOptions = useMemo(
    () => [
      { id: "all" as const, label: t("groups.all") },
      { id: "project" as const, label: t("groups.project") },
      { id: "team" as const, label: t("groups.team") },
      { id: "payment" as const, label: t("groups.payment") },
      { id: "task" as const, label: t("groups.task") },
    ],
    [t],
  );

  return {
    activeFilter,
    setActiveFilter,
    filteredActivities,
    filterOptions,
    typeLabels,
  };
}

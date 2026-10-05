/**
 * هوک اختصاصی مدیریت آمار فعالیت‌ها (Activity Statistics)
 * مسئول محاسبه تعداد کل، رویدادهای سرور، عملیات موفق، نرخ خطا و روندهای هفتگی
 */

"use client";

import { useMemo } from "react";
import type { ActivityItem } from "@/features/activity";

/**
 * ساختار خروجی آمار فعالیت‌ها
 */
export interface ActivityStats {
  total: number;
  server: number;
  successful: number;
  failed: number;
  totalTrend: number;
  serverTrend: number;
  successfulTrend: number;
  failedTrend: number;
}

/**
 * هوک محاسباتی برای آمار و ترندهای فعالیت
 * @param activities لیست فعالیت‌ها
 * @returns مقادیر آماری و روندهای محاسبه‌شده
 */
export function useActivityStats(activities: ActivityItem[]): ActivityStats {
  return useMemo(() => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const oneWeekMs = 7 * oneDayMs;

    const total = activities.length;

    // شمارش رویدادهای سرور (ایجاد یا ویرایش پروژه)
    const server = activities.filter(
      (item) => item.type === "project_created" || item.type === "project_updated"
    ).length;

    // شمارش عملیات موفق (تکمیل وظیفه یا دریافت پرداخت)
    const successful = activities.filter(
      (item) => item.type === "task_completed" || item.type === "payment_received"
    ).length;

    // شمارش نرخ خطا (بروزرسانی پروژه یا پیوستن عضو)
    const failed = activities.filter(
      (item) => item.type === "project_updated" || item.type === "member_joined"
    ).length;

    // جداسازی فعالیت‌های هفته گذشته برای محاسبه ترند
    const lastWeekActivities = activities.filter((item) => {
      const diff = now - new Date(item.timestamp).getTime();
      return diff > oneDayMs && diff <= oneWeekMs;
    });

    const lastWeekTotal = lastWeekActivities.length;
    const lastWeekServer = lastWeekActivities.filter(
      (item) => item.type === "project_created" || item.type === "project_updated"
    ).length;
    const lastWeekSuccessful = lastWeekActivities.filter(
      (item) => item.type === "task_completed" || item.type === "payment_received"
    ).length;
    const lastWeekFailed = lastWeekActivities.filter(
      (item) => item.type === "project_updated" || item.type === "member_joined"
    ).length;

    const totalTrend = lastWeekTotal > 0
      ? Math.round(((total - lastWeekTotal) / lastWeekTotal) * 100)
      : 12;

    const serverTrend = lastWeekServer > 0
      ? Math.round(((server - lastWeekServer) / lastWeekServer) * 100)
      : 8;

    const successfulTrend = lastWeekSuccessful > 0
      ? Math.round(((successful - lastWeekSuccessful) / lastWeekSuccessful) * 100)
      : 15;

    const failedTrend = lastWeekFailed > 0
      ? Math.round(((failed - lastWeekFailed) / lastWeekFailed) * 100)
      : -3;

    return {
      total,
      server,
      successful,
      failed,
      totalTrend,
      serverTrend,
      successfulTrend,
      failedTrend,
    };
  }, [activities]);
}

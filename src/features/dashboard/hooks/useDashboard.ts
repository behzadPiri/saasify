"use client";

/**
 * هوک اصلی داشبورد - مدیریت تمام منطق داشبورد
 * شامل دریافت داده‌ها، محاسبه آمار، و مدیریت وضعیت
 */

import {useState, useEffect, useCallback, useMemo} from "react";
import {DashboardData, DashboardStats, ChartDataPoint} from "../types";
import {QUICK_ACTIONS} from "../constants";

export function useDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // شبیه‌سازی دریافت داده‌ها از API
    const fetchDashboardData = useCallback(async () => {
        try {
            setIsLoading(true);
            // در اینجا می‌توانید API واقعی فراخوانی کنید
            // const response = await fetch('/api/dashboard');
            // const json = await response.json();

            // داده‌های موقت برای توسعه
            await new Promise((resolve) => setTimeout(resolve, 500));

            const mockData: DashboardData = {
                stats: {
                    totalProjects: 24,
                    activeProjects: 12,
                    teamMembers: 8,
                    revenue: 45800,
                    revenueChange: 12.5,
                    projectsChange: 8.3,
                    membersChange: 0,
                },
                recentActivity: [
                    {
                        id: "1",
                        type: "project_created",
                        title: "پروژه جدید ایجاد شد",
                        description: "پروژه \"_panel مدیریت محتوا\" توسط تیم توسعه آغاز گردید",
                        user: {name: "احمد محمدی"},
                        timestamp: new Date(Date.now() - 1000 * 60 * 15),
                    },
                    {
                        id: "2",
                        type: "member_joined",
                        title: "عضو جدید به تیم پیوست",
                        description: "سارا احمدی به عنوان طراح UI/UX به تیم اضافه شد",
                        user: {name: "سارا احمدی"},
                        timestamp: new Date(Date.now() - 1000 * 60 * 45),
                    },
                    {
                        id: "3",
                        type: "payment_received",
                        title: "دریافت پرداخت",
                        description: "پرداخت ماهانه از اشتراک پریمیوم دریافت گردید",
                        user: {name: "شرکت تکنولوژی"},
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
                    },
                    {
                        id: "4",
                        type: "task_completed",
                        title: "وظیفه تکمیل شد",
                        description: "پیاده‌سازی احراز هویت دو مرحله‌ای Finalize گردید",
                        user: {name: "رضا کریمی"},
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
                    },
                    {
                        id: "5",
                        type: "project_updated",
                        title: "پروژه به‌روزرسانی شد",
                        description: "نسخه 2.1 اپلیکیشن موبایل منتشر گردید",
                        user: {name: "مریم حسینی"},
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
                    },
                ],
                projects: [
                    {
                        id: "1",
                        name: "پنل مدیریت محتوا",
                        status: "active",
                        progress: 65,
                        members: 4,
                        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
                        budget: 12000,
                    },
                    {
                        id: "2",
                        name: "اپلیکیشن موبایل",
                        status: "active",
                        progress: 80,
                        members: 3,
                        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                        budget: 8000,
                    },
                    {
                        id: "3",
                        name: "API Gateway",
                        status: "on_hold",
                        progress: 30,
                        members: 2,
                        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                        budget: 5000,
                    },
                    {
                        id: "4",
                        name: "سیستم احراز هویت",
                        status: "completed",
                        progress: 100,
                        members: 3,
                        deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
                        budget: 6000,
                    },
                ],
                revenueChart: generateRevenueChartData(),
                projectDistribution: [
                    {label: "active", value: 12},
                    {label: "completed", value: 8},
                    {label: "onHold", value: 3},
                    {label: "archived", value: 1},
                ],
                quickActions: QUICK_ACTIONS,
                planRenewDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
            };

            setData(mockData);
            setError(null);
        } catch (err) {
            setError("خطا در دریافت داده‌های داشبورد");
            console.error("Dashboard fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchDashboardData();
    }, [fetchDashboardData]);

    // محاسبات مشتق شده
    const stats = useMemo(() => data?.stats ?? getDefaultStats(), [data?.stats]);
    const recentActivity = useMemo(() => data?.recentActivity ?? [], [data?.recentActivity]);
    const projects = useMemo(() => data?.projects ?? [], [data?.projects]);
    const revenueChart = useMemo(() => data?.revenueChart ?? [], [data?.revenueChart]);
    const projectDistribution = useMemo(() => data?.projectDistribution ?? [], [data?.projectDistribution]);
    const quickActions = useMemo(() => data?.quickActions ?? QUICK_ACTIONS, [data?.quickActions]);
    const planRenewDate = useMemo(() => data?.planRenewDate, [data?.planRenewDate]);

    const refetch = useCallback(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return {
        // Data
        stats,
        recentActivity,
        projects,
        revenueChart,
        projectDistribution,
        quickActions,
        planRenewDate,

        // State
        isLoading,
        error,

        // Actions
        refetch,
    };
}

function getDefaultStats(): DashboardStats {
    return {
        totalProjects: 0,
        activeProjects: 0,
        teamMembers: 0,
        revenue: 0,
        revenueChange: 0,
        projectsChange: 0,
        membersChange: 0,
    };
}

function generateRevenueChartData(): ChartDataPoint[] {
    // همه ۱۲ ماه سال؛ درآمدها بر اساس میلیون ریال و ماه‌های بدون فعالیت با مقدار صفر نمایش داده می‌شوند
    const months = [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
    ];
    return months.map((month, index) => ({
        label: month,
        value: index < 6 ? (Math.floor(Math.random() * 10000) + 5000 + index * 1000) * 1000 : 0,
        date: `1403/${(index + 1).toString().padStart(2, "0")}/01`,
    }));
}
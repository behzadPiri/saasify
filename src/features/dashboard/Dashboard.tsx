"use client";

/**
 * کامپوننت اصلی داشبورد
 * ترکیب منطق (useDashboard) و ویو (کامپوننت‌های UI)
 * مسئول لایه‌بندی و ترکیب تمام بخش‌های داشبورد
 */

import dynamic from "next/dynamic";
import {useDashboard} from "./hooks/useDashboard";
import {StatCard, ActivityFeed, PlanUsage, ProjectList, QuickActions, ChartSkeleton} from "./components";
import type {PlanUsageItem} from "./types";
import {Icons} from "@/shared/components/ui/icons";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {formatNumber, formatCurrency} from "@/shared/lib/number-format";

// لود تنبل نمودارها: جدا کردن تکه‌کد سنگین SVG تا باندل اولیه سبک‌تر بماند
const BarChart = dynamic(() => import("./components/BarChart").then((m) => m.BarChart), {
    loading: () => <ChartSkeleton height={230}/>,
});
const PieChart = dynamic(() => import("./components/PieChart").then((m) => m.PieChart), {
    loading: () => <ChartSkeleton height={230}/>,
});

export function Dashboard() {
    const t = useTranslations("Dashboard");
    const tCommon = useTranslations("Common");
    const {
        stats,
        recentActivity,
        projects,
        revenueChart,
        projectDistribution,
        quickActions,
        planRenewDate,
        isLoading,
        error,
        refetch,
    } = useDashboard();

    const formatStatValue = (value: number) => formatNumber(value);
    const formatRevenueValue = (value: number) => formatCurrency(value);

    const planUsageItems: PlanUsageItem[] = [
        {
            id: "projects",
            label: t("planUsage.projects"),
            used: stats.totalProjects,
            total: 40,
            icon: "Folder",
            accent: "primary"
        },
        {
            id: "members",
            label: t("planUsage.members"),
            used: stats.teamMembers,
            total: 10,
            icon: "Users",
            accent: "emerald"
        },
        {
            id: "storage",
            label: t("planUsage.storage"),
            used: 4.2,
            total: 10,
            unit: t("planUsage.unit.gb"),
            icon: "Inbox",
            accent: "amber",
        },
        {id: "apiCalls", label: t("planUsage.apiCalls"), used: 12500, total: 50000, icon: "Activity", accent: "sky"},
        {
            id: "bandwidth",
            label: t("planUsage.bandwidth"),
            used: 82,
            total: 200,
            unit: t("planUsage.unit.gb"),
            icon: "BarChart",
            accent: "violet",
        },
    ];

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <Icons.AlertCircle size={48} className="text-destructive"/>
                <p className="text-destructive">{error}</p>
                <button
                    onClick={refetch}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    {t("retry")}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-3">
            <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]" />

                <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                    <div className="max-w-3xl space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                            <Icons.Dashboard size={12} />
                            {t("title")}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                {t("quickActions.title")}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={refetch}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Icons.RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                        {isLoading ? tCommon("loading") : t("refresh")}
                    </button>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" role="region" aria-label={t("statsLabel")}>
                <StatCard
                    value={stats.totalProjects}
                    label={t("stats.totalProjects")}
                    change={stats.projectsChange}
                    icon="Folder"
                    trend={stats.projectsChange >= 0 ? "up" : "down"}
                    format={formatStatValue}
                />
                <StatCard
                    value={stats.activeProjects}
                    label={t("stats.activeProjects")}
                    icon="Activity"
                    trend="up"
                    format={formatStatValue}
                />
                <StatCard
                    value={stats.teamMembers}
                    label={t("stats.teamMembers")}
                    change={stats.membersChange}
                    icon="Users"
                    trend={stats.membersChange >= 0 ? "up" : "neutral"}
                    format={formatStatValue}
                />
                <StatCard
                    value={stats.revenue}
                    label={t("stats.revenue")}
                    change={stats.revenueChange}
                    icon="DollarSign"
                    trend={stats.revenueChange >= 0 ? "up" : "down"}
                    format={formatRevenueValue}
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-3 w-full min-w-0 overflow-hidden">
                {/* Revenue Bar Chart - 2 columns */}
                <div
                    className="lg:col-span-2 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 p-4 sm:p-5 shadow-sm w-full min-w-0">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-base sm:text-lg font-semibold">{t("revenueChart.title")}</h2>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Icons.TrendingUp size={14} className="text-emerald-500"/>
                            <span>{t("revenueChart.growth")}</span>
                        </div>
                    </div>
                    <div className="min-w-0">
                        <BarChart
                            data={revenueChart}
                            height={200}
                            color="primary"
                            legendLabel={t("revenueChart.total")}
                            showGrid={true}
                            showLabels={true}
                            animated={true}
                        />
                    </div>
                </div>

                {/* Project Distribution Pie Chart - 1 column */}
                <div className="rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 p-4 sm:p-5 shadow-sm w-full min-w-0">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-base sm:text-lg font-semibold">{t("projectDistribution.title")}</h2>
                    </div>
                    <div className="min-w-0">
                        <PieChart
                            data={projectDistribution}
                            height={200}
                            showLabels={false}
                            animated={true}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0 overflow-hidden">
                {/* Quick Actions */}
                <div className="lg:col-span-2 flex flex-col gap-4 min-w-0">
                    <div className="rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 p-4 sm:p-5 shadow-sm w-full min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t("quickActions.title")}</h2>
                        <QuickActions actions={quickActions}/>
                    </div>

                    {/* Upgrade Banner */}
                    <div
                        className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-primary via-indigo-500 to-violet-600 p-3 sm:p-4 md:p-6 text-primary-foreground shadow-sm w-full min-w-0">
                        <div
                            className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 sm:-left-10 sm:-top-10 sm:h-36 sm:w-36 rounded-full bg-white/10"/>
                        <div
                            className="pointer-events-none absolute -bottom-10 -right-8 h-40 w-40 sm:-bottom-12 sm:-right-8 sm:h-44 sm:w-44 rounded-full bg-white/10"/>
                        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div
                                    className="hidden h-10 w-10 sm:flex shrink-0 items-center justify-center rounded-lg bg-white/15">
                                    <Icons.Sparkles size={20}/>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-semibold">{t("upgradeBanner.title")}</h3>
                                    <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-primary-foreground/85">
                                        {t("upgradeBanner.description")}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/billing"
                                className="inline-flex shrink-0 items-center justify-center gap-1.5 sm:gap-2 self-start rounded-lg bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-white/90 sm:self-center"
                            >
                                {t("upgradeBanner.cta")}
                                <Icons.ArrowRight size={14} className="[dir=rtl]_rotate-180"/>
                            </Link>
                        </div>
                    </div>

                    {/* Plan Usage */}
                    <PlanUsage
                        planName={t("planUsage.planName")}
                        items={planUsageItems}
                        renewDate={planRenewDate}
                        className="flex-1 w-full min-w-0"
                    />
                </div>

{/* Sidebar - Activity & Projects */}
            <div className="space-y-4 sm:space-y-6 lg:col-span-1 min-w-0">
                    {/* Recent Activity */}
                    <div className="rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 p-4 sm:p-5 shadow-sm w-full min-w-0">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h2 className="text-base sm:text-lg font-semibold">{t("activity.title")}</h2>
                            <Link href="/activity" className="text-xs sm:text-sm text-primary hover:underline">
                                {t("activity.viewAll")}
                            </Link>
                        </div>
                        <ActivityFeed activities={recentActivity} limit={5}/>
                    </div>

                    {/* Projects */}
                    <div className="rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 p-4 sm:p-5 shadow-sm w-full min-w-0">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h2 className="text-base sm:text-lg font-semibold">{t("projects.title")}</h2>
                            <Link href="/projects" className="text-xs sm:text-sm text-primary hover:underline">
                                {t("projects.viewAll")}
                            </Link>
                        </div>
                        <ProjectList projects={projects} limit={4}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

/**
 * کامپوننت مصرف پلن فعلی
 * نمایش سهمیه‌های پلن با گیج دایره‌ای مصرف کلی، نوارهای پیشرفت گرادیانی و نشانگر وضعیت
 */

import {useState, useEffect} from "react";
import {Icons} from "@/shared/components/ui/icons";
import {Link} from "@/i18n/navigation";
import type {PlanUsageItem} from "../types";
import {usePlanUsage} from "../hooks/usePlanUsage";
import {
    CHIP_STYLES,
    DONUT_CIRCUMFERENCE,
    DONUT_SIZE,
    DONUT_STROKE,
    getUsageLevel,
    LEVEL_BAR,
    LEVEL_TEXT,
    PLAN_ACCENTS,
} from "../constants/plan-usage";

interface PlanUsageProps {
    planName: string;
    items: PlanUsageItem[];
    renewDate?: Date;
    className?: string;
}

export function PlanUsage({planName, items, renewDate, className = ""}: PlanUsageProps) {
    const {
        t,
        progress,
        overallUsage,
        overallLevel,
        donutOffset,
        formatDate,
        hasRenewDate,
        formatNumber,
    } = usePlanUsage({items, renewDate});

    const overallChip = CHIP_STYLES[overallLevel];
    const donutStroke =
        overallLevel === "critical" ? "#ef4444" : overallLevel === "high" ? "#f59e0b" : "url(#plan-usage-gradient)";
    const overallNumberColor =
        overallLevel === "critical" ? "text-red-500" : overallLevel === "high" ? "text-amber-500" : "text-foreground";

    // RTL-aware arrow rotation
    const arrowRotation = "rotate-180"; // For RTL languages, handled by CSS dir attribute

    // Animated progress for quota bars
    const [quotaProgress, setQuotaProgress] = useState<Record<string, number>>({});

    useEffect(() => {
        const animatedProgress: Record<string, number> = {};
        items.forEach((item, index) => {
            setTimeout(() => {
                const percentage = Math.min((item.used / item.total) * 100, 100);
                animatedProgress[item.id] = percentage;
                setQuotaProgress({...animatedProgress});
            }, index * 100 + 300);
        });
    }, [items]);

    return (
        <div
            className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 p-4 sm:p-5 shadow-sm ${className}`}
        >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-44 w-44 rounded-full bg-violet-500/5 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-indigo-500/15 text-primary">
                        <Icons.Activity size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold leading-tight">{t("title")}</h2>
                        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            <Icons.Sparkles size={12} />
                            {planName}
                        </span>
                    </div>
                </div>
                <Link href="/billing" className="shrink-0 text-sm text-primary hover:underline">
                    {t("manage")}
                </Link>
            </div>

            {/* Body */}
            <div className="relative flex flex-1 flex-col gap-3 sm:gap-4 py-3 sm:py-4 sm:flex-row sm:items-stretch overflow-hidden">
                {/* Donut gauge */}
                <div className="flex shrink-0 flex-col items-center justify-center gap-2.5 sm:gap-3">
                    <div className="relative" style={{width: DONUT_SIZE, height: DONUT_SIZE}}>
                        <svg
                            width={DONUT_SIZE}
                            height={DONUT_SIZE}
                            viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`}
                            className="-rotate-90"
                        >
                            <circle
                                cx={DONUT_SIZE / 2}
                                cy={DONUT_SIZE / 2}
                                r={(DONUT_SIZE - DONUT_STROKE) / 2}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={DONUT_STROKE}
                                className="text-foreground/5"
                            />
                            <circle
                                cx={DONUT_SIZE / 2}
                                cy={DONUT_SIZE / 2}
                                r={(DONUT_SIZE - DONUT_STROKE) / 2}
                                fill="none"
                                stroke={donutStroke}
                                strokeWidth={DONUT_STROKE}
                                strokeLinecap="round"
                                strokeDasharray={DONUT_CIRCUMFERENCE}
                                strokeDashoffset={donutOffset}
                                style={{transition: "stroke-dashoffset 0.8s ease-out"}}
                            />
                            <defs>
                                <linearGradient id="plan-usage-gradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="50%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-bold tabular-nums ${overallNumberColor}`}>
                                {formatNumber(Math.round(overallUsage * progress))}%
                            </span>
                            <span className="mt-0.5 text-[11px] text-muted-foreground">{t("overallLabel")}</span>
                        </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${overallChip.chip}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${overallChip.dot} ${overallLevel === "normal" ? "animate-pulse" : ""}`} />
                        {t(overallChip.labelKey)}
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                        {formatNumber(Math.max(100 - overallUsage, 0))}% {t("remaining")}
                    </span>
                </div>

                {/* Quota bars */}
                <div className="flex flex-1 flex-col gap-2 sm:gap-3 min-w-0">
                    {items.map((item) => {
                        const Icon = Icons[item.icon];
                        const accent = PLAN_ACCENTS[item.accent ?? "primary"];
                        const percentage = Math.min((item.used / item.total) * 100, 100);
                        const level = getUsageLevel(percentage);
                        const barClass = LEVEL_BAR[level] || accent.bar;
                        const textClass = LEVEL_TEXT[level] || accent.text;
                        const animatedPercentage = quotaProgress[item.id] ?? 0;

                        return (
                            <div key={item.id} className="group flex flex-1 flex-col justify-center rounded-xl -mx-1 sm:-mx-2 px-1 sm:px-2 transition-colors hover:bg-accent/30">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div
                                        className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${accent.icon}`}
                                    >
                                        <Icon size={15} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-1.5 text-xs sm:text-sm">
                                            <span className="font-medium truncate">{item.label}</span>
                                            <span className="shrink-0 tabular-nums text-muted-foreground">
                                                {formatNumber(item.used)}
                                                {item.unit} {t("of")} {formatNumber(item.total)}
                                                {item.unit}
                                            </span>
                                        </div>
                                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-foreground/5">
                                            <div
                                                className={`h-full rounded-full ${barClass} transition-all duration-700 ease-out`}
                                                style={{width: `${animatedPercentage * progress}%`}}
                                            />
                                        </div>
                                    </div>
                                    <span className={`shrink-0 w-10 sm:w-11 text-right text-xs sm:text-sm font-semibold tabular-nums ${textClass}`}>
                                        {formatNumber(Math.round(animatedPercentage * progress))}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="relative flex items-center justify-between gap-3 border-t border-border/40 pt-4">
                {hasRenewDate && renewDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icons.Calendar size={14} />
                        <span>{t("renewsOn")} {formatDate(renewDate)}</span>
                    </div>
                )}
                <Link
                    href="/billing"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-indigo-500 px-3.5 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:brightness-110"
                >
                    {t("upgrade")}
                    <Icons.ArrowRight size={14} className={arrowRotation} />
                </Link>
            </div>
        </div>
    );
}

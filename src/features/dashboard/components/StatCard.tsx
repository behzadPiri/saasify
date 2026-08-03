"use client";

/**
 * کامپوننت کارت آمار
 * نمایش یک آمار کلیدی با مقدار، برچسب، آیکون و روند تغییر
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {useStatCard} from "../hooks/useStatCard";

interface StatCardProps {
    value: number | string;
    label: string;
    change?: number;
    icon: keyof typeof Icons;
    trend?: "up" | "down" | "neutral";
    format?: (value: number) => string;
}

export function StatCard({
                             value,
                             label,
                             change,
                             icon: IconName,
                             trend = "neutral",
                             format,
                         }: StatCardProps) {
    const t = useTranslations("Dashboard.stats");
    const Icon = Icons[IconName];
    const {formattedValue, trendColor, TrendIcon, hasChange} = useStatCard({value, change, trend, format});

    return (
        <div
            className="flex flex-col gap-1.5 rounded-xl bg-card/50 backdrop-blur-xl border border-border/40 p-2 sm:p-3 shadow-sm transition-all hover:shadow-md hover:border-border/60">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground truncate">{label}</p>
                    <p className="mt-1 text-sm sm:text-base font-bold tracking-tight">{formattedValue}</p>
                </div>
                <div
                    className="shrink-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-accent/50 text-muted-foreground">
                    <Icon size={14}/>
                </div>
            </div>

            {hasChange && change !== undefined && (
                <div className="flex items-center gap-1 text-xs">
                    <TrendIcon
                        size={12}
                        className={`${trendColor}`}
                        aria-hidden="true"
                    />
                    <span className={trendColor}>
                        {trend === "up" ? "+" : ""}{change}%
                    </span>
                    <span className="text-muted-foreground">{t("fromLastMonth")}</span>
                </div>
            )}
        </div>
    );
}

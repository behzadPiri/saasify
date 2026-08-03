"use client";

/**
 * هوک کارت آمار
 * مدیریت فرمت مقدار و نمایش روند (بالا/پایین/خنثی)
 */

import {Icons} from "@/shared/components/ui/icons";

interface UseStatCardOptions {
    value: number | string;
    change?: number;
    trend?: "up" | "down" | "neutral";
    format?: (value: number) => string;
}

const TREND_COLORS = {
    up: "text-emerald-500",
    down: "text-red-500",
    neutral: "text-muted-foreground",
} as const;

const TREND_ICONS = {
    up: "ArrowUp",
    down: "ArrowDown",
    neutral: "Minus",
} as const;

export function useStatCard({value, change, trend = "neutral", format}: UseStatCardOptions) {
    const formattedValue = format ? format(value as number) : String(value);
    const trendColor = TREND_COLORS[trend];
    const TrendIcon = Icons[TREND_ICONS[trend]];

    return {
        formattedValue,
        trendColor,
        TrendIcon,
        hasChange: change !== undefined,
    };
}

"use client";

/**
 * هوک نمودار میله‌ای
 * محاسبه مقیاس، گرادیان میله‌ها و مدیریت hover/انیمیشن
 */

import {useState} from "react";
import type {ChartDataPoint} from "../types";
import {useProgressAnimation} from "../lib/useProgressAnimation";

interface UseBarChartOptions {
    data: ChartDataPoint[];
    height?: number;
    showLabels?: boolean;
    animated?: boolean;
    color?: "primary" | "emerald" | "amber" | "purple" | "pink";
}

const COLOR_CONFIG = {
    primary: {start: "#3b82f6", end: "#8b5cf6"},
    emerald: {start: "#10b981", end: "#0d9488"},
    amber: {start: "#f59e0b", end: "#ea580c"},
    purple: {start: "#a855f7", end: "#6366f1"},
    pink: {start: "#ec4899", end: "#e11d48"},
} as const;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

// گرد کردن سقف محور عمودی به یک عدد «تمیز» تا برچسب‌ها خوانا و متناسب با ارتفاع میله‌ها باشند
function niceCeil(value: number): number {
    if (value <= 0) return 1;
    const power = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / power;
    const nice =
        normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    return nice * power;
}

export function useBarChart({
    data,
    height = 280,
    showLabels = true,
    animated = true,
    color = "primary",
}: UseBarChartOptions) {
    const animationProgress = useProgressAnimation(data.length, {
        duration: 1000,
        enabled: animated,
        easing: easeOutQuart,
    });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const dataMaxValue = Math.max(...data.map((d) => d.value));
    const range = niceCeil(dataMaxValue || 1);

    // فاصله‌گذاری نمودار (آگاه از جهت متن) - بهینه شده برای موبایل و تبلت
    const padding = {top: 16, inline: 4, bottom: showLabels ? 36 : 16, axis: 48};
    const innerHeight = height - padding.top - padding.bottom;

    const colorConfig = COLOR_CONFIG[color];
    const barGradient = `linear-gradient(180deg, ${colorConfig.end}, ${colorConfig.start})`;

    const gridFractions = [0, 0.25, 0.5, 0.75, 1];

    return {
        animationProgress,
        hoveredIndex,
        setHoveredIndex,
        range,
        padding,
        innerHeight,
        barGradient,
        gridFractions,
    };
}

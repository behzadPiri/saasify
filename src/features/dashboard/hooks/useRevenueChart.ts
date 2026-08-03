"use client";

/**
 * هوک نمودار درآمد (خطی)
 * محاسبه مختصات نقاط، مقیاس نمودار و مدیریت hover/انیمیشن
 */

import {useState} from "react";
import type {ChartDataPoint} from "../types";
import {formatCompactNumber, formatNumber} from "@/shared/lib/number-format";
import {useProgressAnimation} from "../lib/useProgressAnimation";

interface UseRevenueChartOptions {
    data: ChartDataPoint[];
    height?: number;
    animated?: boolean;
}

export function useRevenueChart({data, height = 280, animated = true}: UseRevenueChartOptions) {
    const animationProgress = useProgressAnimation(data.length, {duration: 1200, enabled: animated});
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    const padding = {top: 20, right: 10, bottom: 30, left: 50};
    const innerWidth = `calc(100% - ${padding.left + padding.right}px)`;
    const innerHeight = height - padding.top - padding.bottom;

    /** مختصات X نقطه با پشتیبانی از عرض نسبی */
    const getX = (index: number) => {
        const step = data.length > 1 ? `calc(${innerWidth} / ${data.length - 1})` : "0";
        return `calc(${padding.left}px + ${index} * ${step})`;
    };

    /** مختصات Y نقطه بر اساس مقدار */
    const getY = (value: number) => {
        const ratio = (value - minValue) / range;
        return `calc(${padding.top}px + ${innerHeight}px - ${ratio} * ${innerHeight}px)`;
    };

    /** نقاط انیمیشنی (مقدارها در حین ورود صعود می‌کنند) */
    const animatedPoints = data
        .map((_, i) => {
            const x = getX(i);
            const y = getY(data[i].value * animationProgress + minValue * (1 - animationProgress));
            return `${x},${y}`;
        })
        .join(" ");

    /** نقاط نهایی برای پایان انیمیشن */
    const fullPoints = data.map((_, i) => `${getX(i)},${getY(data[i].value)}`).join(" ");

    const formatValue = (value: number) => formatCompactNumber(value);

    return {
        hoveredIndex,
        setHoveredIndex,
        animationProgress,
        maxValue,
        minValue,
        formatValue,
        formatNumber: (value: number) => formatNumber(value),
        getX,
        getY,
        animatedPoints,
        fullPoints,
        padding,
        innerHeight,
    };
}

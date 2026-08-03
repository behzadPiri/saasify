"use client";

/**
 * هوک نمودار دایره‌ای/حلقه‌ای
 * محاسبه هندسه قوس‌ها، برچسب‌ها و مدیریت hover/انیمیشن
 */

import {useState} from "react";
import type {ChartDataPoint} from "../types";
import {formatCompactNumber} from "@/shared/lib/number-format";
import {useProgressAnimation} from "../lib/useProgressAnimation";

interface UsePieChartOptions {
    data: ChartDataPoint[];
    height?: number;
    animated?: boolean;
    showLegend?: boolean;
    showLabels?: boolean;
    innerRadius?: number;
    colors?: string[];
}

const DEFAULT_COLORS = [
    "hsl(221, 83%, 53%)", // blue
    "hsl(142, 76%, 36%)", // emerald
    "hsl(38, 92%, 50%)", // amber
    "hsl(262, 83%, 58%)", // purple
    "hsl(346, 87%, 59%)", // pink
    "hsl(199, 89%, 48%)", // sky
    "hsl(27, 96%, 52%)", // orange
    "hsl(152, 71%, 42%)", // green
];

/** برش خام نمودار با اطلاعات درصد و زاویه */
interface ArcSlice extends ChartDataPoint {
    percentage: number;
    angle: number;
    color: string;
}

/** قوس آماده‌ی رندر با مسیر و موقعیت برچسب */
interface PieArc extends ArcSlice {
    pathData: string;
    labelX: number;
    labelY: number;
    startAngle: number;
    endAngle: number;
    fullAngle: number;
}

export function usePieChart({
    data,
    height = 280,
    animated = true,
    showLegend = true,
    innerRadius,
    colors = DEFAULT_COLORS,
}: UsePieChartOptions) {
    const animationProgress = useProgressAnimation(data.length, {duration: 1200, enabled: animated});
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const total = data.reduce((sum, d) => sum + d.value, 0);

    const slices: ArcSlice[] = data.map((point, i) => {
        const percentage = point.value / total;
        const angle = percentage * 2 * Math.PI;
        return {...point, percentage, angle, color: colors[i % colors.length]};
    });

    // ابعاد: فضای موردنیاز legend از ارتفاع کم می‌شود تا متن‌ها از چارت بیرون نزنند
    const legendSpace = showLegend ? 60 : 8;
    const size = Math.min(height - legendSpace, 300);
    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = size / 2 - 8;
    // حلقه‌ی داخلی (دونات) به نسبت اندازه‌ی نمودار
    const holeRadius = innerRadius ?? Math.round(outerRadius * 0.55);

    const arcs = slices.reduce<PieArc[]>((acc, slice, index) => {
        const startAngle = index === 0 ? -Math.PI / 2 : acc[index - 1].startAngle + acc[index - 1].fullAngle;
        const fullAngle = slice.angle;
        const endAngle = startAngle + slice.angle * animationProgress;

        const largeArcFlag = slice.angle * animationProgress > Math.PI ? 1 : 0;

        const startX = centerX + Math.cos(startAngle) * outerRadius;
        const startY = centerY + Math.sin(startAngle) * outerRadius;
        const endX = centerX + Math.cos(endAngle) * outerRadius;
        const endY = centerY + Math.sin(endAngle) * outerRadius;

        const innerStartX = centerX + Math.cos(startAngle) * holeRadius;
        const innerStartY = centerY + Math.sin(startAngle) * holeRadius;
        const innerEndX = centerX + Math.cos(endAngle) * holeRadius;
        const innerEndY = centerY + Math.sin(endAngle) * holeRadius;

        const pathData = `
            M ${startX} ${startY}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}
            L ${innerEndX} ${innerEndY}
            A ${holeRadius} ${holeRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
            Z
        `;

        // موقعیت برچسب درصد (وسط برش)
        const labelAngle = startAngle + (slice.angle / 2) * animationProgress;
        const labelRadius = (outerRadius + holeRadius) / 2;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;

        acc.push({
            label: slice.label,
            value: slice.value,
            date: slice.date,
            percentage: slice.percentage,
            angle: slice.angle,
            color: slice.color,
            pathData,
            labelX,
            labelY,
            startAngle,
            endAngle,
            fullAngle,
        });
        return acc;
    }, []);

    const formatPercentage = (value: number) => {
        return `${(value * 100).toFixed(1)}%`;
    };

    return {
        animationProgress,
        hoveredIndex,
        setHoveredIndex,
        total,
        slices,
        arcs,
        size,
        centerX,
        centerY,
        holeRadius,
        formatPercentage,
        formatValue: (value: number) => formatCompactNumber(value),
    };
}

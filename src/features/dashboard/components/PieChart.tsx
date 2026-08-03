"use client";

/**
 * کامپوننت نمودار دایره‌ای/حلقه‌ای انیمیشنی
 * نمایش توزیع داده‌ها با انیمیشن ورود و تعامل hover
 */

import {useTranslations} from "next-intl";
import type {ChartDataPoint} from "../types";
import {usePieChart} from "../hooks/usePieChart";

interface PieChartProps {
    data: ChartDataPoint[];
    height?: number;
    animated?: boolean;
    showLegend?: boolean;
    showLabels?: boolean;
    innerRadius?: number; // 0 = pie, undefined = donut (به صورت خودکار)
    colors?: string[];
}

export function PieChart({
    data,
    height = 280,
    animated = true,
    showLegend = true,
    showLabels = true,
    innerRadius,
    colors,
}: PieChartProps) {
    const t = useTranslations("Dashboard.projectDistribution");
    const {
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
        formatValue,
    } = usePieChart({data, height, animated, showLegend, showLabels, innerRadius, colors});

    if (data.length === 0) {
        return (
            <div className="flex h-70 items-center justify-center text-muted-foreground">
                <p>{t("noData")}</p>
            </div>
        );
    }

    const hoveredArc = hoveredIndex !== null ? arcs[hoveredIndex] : null;

    return (
        <div className="relative flex w-full flex-col items-center justify-center" style={{minHeight: height}}>
            <div className="relative aspect-square w-full" style={{maxWidth: size}}>
                <svg
                    viewBox={`0 0 ${size} ${size}`}
                    className="h-full w-full"
                    role="img"
                    aria-label={t("chartAriaLabel", {defaultValue: "Pie chart"})}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <defs>
                        {slices.map((slice, i) => (
                            <linearGradient key={i} id={`pie-gradient-${i}`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor={slice.color} stopOpacity="0.9" />
                                <stop offset="100%" stopColor={slice.color} stopOpacity="1" />
                            </linearGradient>
                        ))}
                        <filter id="pie-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Slices */}
                    {arcs.map((arc, i) => (
                        <g
                            key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{cursor: "pointer"}}
                        >
                            <path
                                d={arc.pathData}
                                fill={`url(#pie-gradient-${i})`}
                                stroke="var(--background)"
                                strokeWidth={2}
                                filter={hoveredIndex === i ? "url(#pie-glow)" : "none"}
                                style={{
                                    transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                                    transformOrigin: `${centerX}px ${centerY}px`,
                                    transition: "transform 0.2s ease, filter 0.2s ease",
                                }}
                            />

                            {/* Percentage label on slice */}
                            {showLabels && arc.percentage > 0.08 && animationProgress > 0.3 && (
                                <text
                                    x={arc.labelX}
                                    y={arc.labelY}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="12"
                                    fontWeight="600"
                                    fill="var(--foreground)"
                                    style={{opacity: animationProgress}}
                                    pointerEvents="none"
                                >
                                    {formatPercentage(arc.percentage)}
                                </text>
                            )}
                        </g>
                    ))}

                    {/* Center content for donut chart */}
                    {holeRadius > 0 && (
                        <g>
                            <circle
                                cx={centerX}
                                cy={centerY}
                                r={holeRadius - 2}
                                fill="var(--background)"
                                stroke="var(--border)"
                                strokeWidth="1"
                            />
                            {hoveredArc ? (
                                <g>
                                    <text
                                        x={centerX}
                                        y={centerY - 8}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="22"
                                        fontWeight="700"
                                        fill="var(--foreground)"
                                    >
                                        {formatValue(hoveredArc.value)}
                                    </text>
                                    <text
                                        x={centerX}
                                        y={centerY + 12}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="11"
                                        fill="var(--muted-foreground)"
                                    >
                                        {t(`status.${hoveredArc.label}`)}
                                    </text>
                                </g>
                            ) : (
                                <g>
                                    <text
                                        x={centerX}
                                        y={centerY - 8}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="20"
                                        fontWeight="700"
                                        fill="var(--foreground)"
                                    >
                                        {formatValue(total)}
                                    </text>
                                    <text
                                        x={centerX}
                                        y={centerY + 12}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="11"
                                        fill="var(--muted-foreground)"
                                    >
                                        {t("total")}
                                    </text>
                                </g>
                            )}
                        </g>
                    )}
                </svg>
            </div>

            {/* Legend */}
            {showLegend && (
                <div className="mt-2 sm:mt-3 grid w-full grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1.5 text-xs sm:text-sm">
                    {slices.map((slice, i) => (
                        <div
                            key={i}
                            className={`flex cursor-pointer items-center gap-1.5 sm:gap-2 transition-opacity ${
                                hoveredIndex === i ? "opacity-100" : hoveredIndex !== null && hoveredIndex !== i ? "opacity-40" : "opacity-100"
                            }`}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className="h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full"
                                style={{background: slice.color}}
                            />
                            <span className="truncate text-muted-foreground">{t(`status.${slice.label}`)}</span>
                            <span className="ms-auto font-medium text-foreground">{formatPercentage(slice.percentage)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

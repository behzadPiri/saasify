"use client";

/**
 * کامپوننت نمودار درآمد
 * نمودار جذاب با انیمیشن‌های SVG برای نمایش روند درآمد ماهانه
 */

import {useLocale} from "next-intl";
import type {ChartDataPoint} from "../types";
import {useRevenueChart} from "../hooks/useRevenueChart";

interface RevenueChartProps {
    data: ChartDataPoint[];
    height?: number;
    showGrid?: boolean;
    showLabels?: boolean;
    animated?: boolean;
}

export function RevenueChart({
    data,
    height = 280,
    showGrid = true,
    showLabels = true,
    animated = true,
}: RevenueChartProps) {
    const locale = useLocale();
    const {
        hoveredIndex,
        setHoveredIndex,
        animationProgress,
        formatValue,
        formatNumber,
        getX,
        getY,
        animatedPoints,
        fullPoints,
        padding,
        innerHeight,
        maxValue,
        minValue,
    } = useRevenueChart({data, height, animated});

    if (data.length === 0) {
        return (
            <div className="flex h-[280px] items-center justify-center text-muted-foreground">
                <p>داده‌ای برای نمایش وجود ندارد</p>
            </div>
        );
    }

    const getTooltipContent = (index: number) => {
        const point = data[index];
        return (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                <div className="font-medium text-foreground">{point.label}</div>
                <div className="text-primary font-semibold">{formatNumber(point.value)}</div>
            </div>
        );
    };

    return (
        <div className="relative w-full" style={{height}}>
            {/* Grid lines */}
            {showGrid && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                    <defs>
                        <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            )}

            {/* Y-axis labels */}
            {showLabels && (
                <div className="absolute left-0 top-0 bottom-6 sm:bottom-8 flex h-full justify-between px-1.5 sm:px-2 text-[10px] xs:text-[11px] sm:text-[12px] text-muted-foreground" aria-hidden="true">
                    {[maxValue, (maxValue + minValue) / 2, minValue].map((val, i) => (
                        <div key={i} className="flex h-1/2 items-end pb-1">
                            {formatValue(val)}
                        </div>
                    ))}
                </div>
            )}

            {/* Chart SVG */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 100% ${height}`}
                preserveAspectRatio="none"
                role="img"
                aria-label={locale === "fa" ? "نمودار درآمد ماهانه" : "Monthly Revenue Chart"}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="revenue-gradient-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                        <stop offset="60%" stopColor="currentColor" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="revenue-gradient-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Area fill - animated */}
                <path
                    d={animated ? animatedPoints : fullPoints}
                    fill="url(#revenue-gradient-area)"
                    className="text-primary transition-all duration-1000 ease-out"
                    style={{
                        // Clip path animation for drawing effect
                        clipPath: animated ? `inset(0 ${100 - animationProgress * 100}% 0 0)` : "none",
                    }}
                />

                {/* Area fill - full (for when animation completes) */}
                {animated && animationProgress >= 1 && (
                    <path
                        d={fullPoints}
                        fill="url(#revenue-gradient-area)"
                        className="text-primary"
                    />
                )}

                {/* Line path - animated drawing */}
                <path
                    d={animated ? animatedPoints : fullPoints}
                    fill="none"
                    stroke="url(#revenue-gradient-line)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="filter transition-all duration-1000 ease-out"
                    style={{
                        filter: "url(#glow)",
                        strokeDasharray: animated ? "2000" : "none",
                        strokeDashoffset: animated ? 2000 * (1 - animationProgress) : 0,
                    }}
                />

                {/* Line path - full (for when animation completes) */}
                {animated && animationProgress >= 1 && (
                    <path
                        d={fullPoints}
                        fill="none"
                        stroke="url(#revenue-gradient-line)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="filter"
                        style={{filter: "url(#glow)"}}
                    />
                )}

                {/* Data points with hover effect */}
                {data.map((point, i) => (
                    <g
                        key={i}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{cursor: "pointer"}}
                    >
                        {/* Outer glow ring on hover */}
                        {hoveredIndex === i && (
                            <circle
                                cx={getX(i)}
                                cy={getY(point.value)}
                                r={12}
                                fill="currentColor"
                                className="text-primary/20"
                                style={{
                                    transition: "r 0.2s ease, opacity 0.2s ease",
                                    animation: "pulse 2s ease-in-out infinite",
                                }}
                            />
                        )}

                        {/* Main point */}
                        <circle
                            cx={getX(i)}
                            cy={getY(point.value)}
                            r={hoveredIndex === i ? 8 : 5}
                            fill="var(--background)"
                            stroke="url(#revenue-gradient-line)"
                            strokeWidth={hoveredIndex === i ? 4 : 3}
                            className="transition-all duration-200 ease-out"
                            style={{
                                filter: hoveredIndex === i ? "url(#glow)" : "none",
                                transform: hoveredIndex === i ? "scale(1.3)" : "scale(1)",
                                transformOrigin: "center",
                            }}
                        />

                        {/* Tooltip */}
                        {hoveredIndex === i && (
                            <foreignObject
                                x={parseFloat(getX(i).replace("calc(", "").replace("px", "")) - 60}
                                y={parseFloat(getY(point.value).replace("calc(", "").replace("px", "")) - 80}
                                width={120}
                                height={60}
                            >
                                {getTooltipContent(i)}
                            </foreignObject>
                        )}
                    </g>
                ))}

                {/* Vertical indicator line on hover */}
                {hoveredIndex !== null && (
                    <line
                        x1={getX(hoveredIndex)}
                        y1={padding.top}
                        x2={getX(hoveredIndex)}
                        y2={padding.top + innerHeight}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                        className="text-primary/50 pointer-events-none"
                    />
                )}
            </svg>

            {/* CSS Animation for pulse */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { r: 10; opacity: 0.3; }
                    50% { r: 14; opacity: 0.1; }
                }
            `}</style>

            {/* X-axis labels */}
            {showLabels && (
                <div className="absolute bottom-0 left-[45px] right-[10px] sm:left-[50px] sm:right-[10px] flex justify-between text-[10px] xs:text-[11px] text-muted-foreground" aria-hidden="true">
                    {data.map((point, i) => (
                        <div key={i} style={{left: getX(i), transform: "translateX(-50%)"}} className="absolute">
                            {point.label}
                        </div>
                    ))}
                </div>
            )}

            {/* Legend */}
            <div className="absolute top-2 right-2 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <div className="w-5 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
                    <span>{locale === "fa" ? "درآمد" : "Revenue"}</span>
                </div>
                {animated && animationProgress < 1 && (
                    <div className="flex items-center gap-1 text-primary">
                        <span className="animate-pulse">●</span>
                        <span>{locale === "fa" ? "در حال بارگذاری..." : "Loading..."}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

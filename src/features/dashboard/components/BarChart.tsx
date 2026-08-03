"use client";

/**
 * کامپوننت نمودار میله‌ای انیمیشنی
 * مبتنی بر HTML/CSS با پشتیبانی کامل از RTL
 */

import {useTranslations} from "next-intl";
import type {ChartDataPoint} from "../types";
import {formatCompactNumber, formatCurrency, formatNumber} from "@/shared/lib/number-format";
import {useBarChart} from "../hooks/useBarChart";

/** فرمت کردن مقادیر برای محور عمودی (به میلیون) - استفاده از اعداد لاتین */
function formatValueForAxis(value: number): string {
    if (value >= 1e9) {
        // برای میلیارد - نمایش به صورت 1B
        return new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1,
        }).format(value);
    }
    // برای میلیون - نمایش عدد ساده (مثلاً 1، 2، 5)
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
    }).format(value / 1e6);
}

interface BarChartProps {
    data: ChartDataPoint[];
    height?: number;
    showGrid?: boolean;
    showLabels?: boolean;
    animated?: boolean;
    color?: "primary" | "emerald" | "amber" | "purple" | "pink";
    showValues?: boolean;
    showLegend?: boolean;
    legendLabel?: string;
}

export function BarChart({
                             data,
                             height = 280,
                             showGrid = true,
                             showLabels = true,
                             animated = true,
                             color = "primary",
                             showValues = true,
                             showLegend = true,
                             legendLabel,
                         }: BarChartProps) {
    const t = useTranslations("Dashboard.revenueChart");
    const tMonths = useTranslations("Dashboard.months");
    const {
        animationProgress,
        hoveredIndex,
        setHoveredIndex,
        range,
        padding,
        barGradient,
        gridFractions,
    } = useBarChart({data, height, showLabels, animated, color});

    if (data.length === 0) {
        return (
            <div className="flex h-70 items-center justify-center text-muted-foreground">
                <p>{t("noData")}</p>
            </div>
        );
    }

    // ارتفاع رزروشده برای برچسب‌های محور افقی
    const axisBand = showLabels ? 32 : 8;
    const total = data.reduce((sum, d) => sum + d.value, 0);

    /** نقشه ماه‌های شمسی به کلید ترجمه */
    const monthKeyMap: Record<string, string> = {
        "فروردین": "farvardin",
        "اردیبهشت": "ordibehesht",
        "خرداد": "khordad",
        "تیر": "tir",
        "مرداد": "mordad",
        "شهریور": "shahrivar",
        "مهر": "mehr",
        "آبان": "aban",
        "آذر": "azar",
        "دی": "day",
        "بهمن": "bahman",
        "اسفند": "esfand",
    };

    /** دریافت کلید ترجمه برای ماه */
    const getMonthKey = (label: string): string => {
        return monthKeyMap[label] ?? label.toLowerCase();
    };

    return (
        <div className="flex w-full flex-col">
            <div className="relative w-full" style={{height}}>
                {/* ردیف محورها: برچسب‌های عمودی + ناحیه رسم نمودار */}
                <div
                    className="absolute inset-x-0 flex"
                    style={{top: padding.top, bottom: axisBand}}
                >
                    {/* برچسب‌های محور عمودی */}
                    <div
                        className="relative z-10 flex w-11.5 shrink-0 flex-col justify-between text-[11px] leading-none text-muted-foreground"
                        aria-hidden="true"
                    >
                        {[...gridFractions].reverse().map((f) => (
                            <span key={f} className="w-full translate-y-1/2 text-end pe-1.5">
                                {formatValueForAxis(range * f)}
                            </span>
                        ))}
                    </div>

                    {/* ناحیه رسم */}
                    <div className="relative flex-1">
                        {/* محور افقی (خط صفر) */}
                        <div className="absolute inset-x-0 bottom-0 border-t border-foreground/25"/>
                        {/* محور عمودی (خط صفر) */}
                        <div className="absolute inset-y-0 inset-s-0 w-px bg-foreground/15"/>
                        {/* عنوان محور عمودی */}
                        <div
                            className="absolute -inset-s-18 sm:-inset-s-16 top-1/2 -translate-y-1/2 -rotate-90 transform-origin-center text-[10px] text-muted-foreground whitespace-nowrap">
                            {t("yAxisTitle")}
                        </div>

                        {/* خطوط شبکه */}
                        {showGrid &&
                            gridFractions
                                .filter((f) => f > 0)
                                .map((f) => (
                                    <div
                                        key={f}
                                        className="absolute inset-x-0 border-t border-foreground/10 border-dotted"
                                        style={{bottom: `${f * 100}%`}}
                                    />
                                ))}

                        {/* میله‌ها */}
                        <div className="absolute inset-y-0 inset-s-6 inset-e-2 flex items-end justify-start gap-3">
                            {data.map((point, i) => {
                                const barHeight = (point.value / range) * 100 * animationProgress;
                                const isHovered = hoveredIndex === i;

                                return (
                                    <div
                                        key={i}
                                        className="relative flex h-full flex-1 flex-col items-center justify-end"
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        role="img"
                                        aria-label={`${point.label}: ${formatNumber(point.value)}`}
                                    >
                                        {/* Bar track */}
                                        <div className="absolute inset-y-0 w-full rounded-t-lg bg-foreground/4"/>

                                        {/* Value on top of bar */}
                                        {showValues && point.value > 0 && animationProgress > 0.5 && (
                                            <span
                                                className="absolute z-10 text-[11px] font-semibold text-foreground/80"
                                                style={{bottom: `calc(${barHeight}% + 6px)`}}
                                            >
                                            {formatCompactNumber(point.value)}
                                        </span>
                                        )}

                                        {/* Animated bar */}
                                        <div
                                            className={`relative w-full rounded-t-lg transition-[filter] duration-200 ease-out ${
                                                isHovered ? "brightness-110" : ""
                                            }`}
                                            style={{
                                                height: `${barHeight}%`,
                                                background: barGradient,
                                            }}
                                        />

                                        {/* Tooltip */}
                                        {isHovered && (
                                            <div
                                                className="pointer-events-none absolute z-20 flex flex-col items-center rounded-lg border border-border bg-card px-3 py-2 text-center shadow-xl"
                                                style={{bottom: `calc(${barHeight}% + 34px)`}}
                                            >
                                            <span className="text-sm font-bold text-foreground">
                                                {formatNumber(point.value)}
                                            </span>
                                                <span className="text-[11px] text-muted-foreground">
                                                    {tMonths(getMonthKey(point.label), {defaultValue: point.label})}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

{/* برچسب‌های محور افقی */}
                {showLabels && (
                    <div
                        className="absolute bottom-0 flex justify-start gap-2 sm:gap-3 px-2 sm:px-0"
                        style={{
                            bottom: 8,
                            insetInlineStart: padding.axis + 14,
                            insetInlineEnd: padding.inline + 8,
                        }}
                    >
                        {data.map((point, i) => (
                            <div
                                key={i}
                                className="flex-1 truncate text-center text-[10px] xs:text-[11px] leading-none text-muted-foreground"
                                title={tMonths(getMonthKey(point.label), {defaultValue: point.label})}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>

                )}
            </div>

            {/* Legend */}
            {showLegend && (
                <div
                    className="mt-3 flex items-center gap-2 text-sm"
                    style={{paddingInlineStart: padding.axis + 14, paddingInlineEnd: padding.inline + 8}}
                >
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{background: barGradient}}/>
                    <span className="truncate text-muted-foreground">
                        {legendLabel ?? t("legendLabel")}
                    </span>
                    <span className="ms-auto font-medium text-foreground tabular-nums">{formatCurrency(total)}</span>
                </div>
            )}
        </div>
    );
}

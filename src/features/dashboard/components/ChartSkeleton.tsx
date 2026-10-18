"use client";

/**
 * اسکلت بارگذاری نمودارها
 * به‌عنوان جایگزین هنگام لود شدن تکه‌کد نمودارها نمایش داده می‌شود
 */

import {useTranslations} from "next-intl";

interface ChartSkeletonProps {
    height?: number;
}

const SKELETON_BARS = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8];

export function ChartSkeleton({height = 230}: ChartSkeletonProps) {
    const t = useTranslations("Dashboard");
    return (
        <div
            className="flex items-end justify-center gap-3 animate-pulse"
            style={{height}}
            role="status"
            aria-label={t("chartLoading")}
        >
            {SKELETON_BARS.map((h, i) => (
                <div
                    key={i}
                    className="w-full max-w-14 flex-1 rounded-t-lg bg-foreground/10"
                    style={{height: `${h * 100}%`}}
                />
            ))}
        </div>
    );
}

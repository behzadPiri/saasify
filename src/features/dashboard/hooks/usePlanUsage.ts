"use client";

/**
 * هوک مصرف پلن فعلی
 * محاسبه مصرف کلی، سطح وضعیت، انیمیشن پیشرفت و فرمت‌بندی
 */

import {useMemo} from "react";
import {useTranslations} from "next-intl";
import {formatNumber} from "@/shared/lib/number-format";
import type {PlanUsageItem} from "../types";
import {DONUT_CIRCUMFERENCE, getUsageLevel} from "../constants/plan-usage";
import {formatLocaleDate} from "../lib/date-format";
import {useProgressAnimation} from "../lib/useProgressAnimation";

interface UsePlanUsageOptions {
    items: PlanUsageItem[];
    renewDate?: Date;
}

export function usePlanUsage({items, renewDate}: UsePlanUsageOptions) {
    const t = useTranslations("Dashboard.planUsage");

    // امضای داده‌ها: فقط با تغییر واقعی مقادیر، انیمیشن از ابتدا اجرا می‌شود
    const itemsKey = useMemo(
        () => items.map((item) => `${item.id}:${item.used}/${item.total}`).join("|"),
        [items]
    );
    const progress = useProgressAnimation(itemsKey, {duration: 900});

    /** میانگین مصرف سهمیه‌ها (صفر تا صد) */
    const overallUsage = Math.min(
        Math.round(
            (items.reduce((sum, item) => sum + item.used / item.total, 0) / Math.max(items.length, 1)) * 100
        ),
        100
    );

    const overallLevel = getUsageLevel(overallUsage);

    /** جابه‌جایی دایره گیج بر اساس پیشرفت انیمیشن */
    const donutOffset = DONUT_CIRCUMFERENCE * (1 - (overallUsage / 100) * progress);

    const formatDate = (date: Date): string => formatLocaleDate(date);

    return {
        t,
        progress,
        overallUsage,
        overallLevel,
        donutOffset,
        formatDate,
        hasRenewDate: !!renewDate,
        formatNumber: (value: number) => formatNumber(value),
    };
}

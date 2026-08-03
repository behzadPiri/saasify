/**
 * پیکربندی منطقی و بصری بخش مصرف پلن
 * شامل رنگ‌ها، سطح‌های وضعیت و ابعاد گیج دایره‌ای
 */

import type {PlanAccent} from "../types";

/** سطح مصرف: عادی / استفاده بالا / رو به اتمام */
export type UsageLevel = "normal" | "high" | "critical";

/** رنگ‌های گرادیانی و آیکونی هر سهمیه */
export const PLAN_ACCENTS: Record<PlanAccent, {icon: string; bar: string; text: string}> = {
    primary: {
        icon: "bg-primary/10 text-primary",
        bar: "bg-gradient-to-r from-primary to-indigo-500",
        text: "text-primary",
    },
    emerald: {
        icon: "bg-emerald-500/10 text-emerald-500",
        bar: "bg-gradient-to-r from-emerald-500 to-teal-400",
        text: "text-emerald-500",
    },
    amber: {
        icon: "bg-amber-500/10 text-amber-500",
        bar: "bg-gradient-to-r from-amber-500 to-orange-400",
        text: "text-amber-500",
    },
    sky: {
        icon: "bg-sky-500/10 text-sky-500",
        bar: "bg-gradient-to-r from-sky-500 to-cyan-400",
        text: "text-sky-500",
    },
    violet: {
        icon: "bg-violet-500/10 text-violet-500",
        bar: "bg-gradient-to-r from-violet-500 to-fuchsia-400",
        text: "text-violet-500",
    },
};

/** تعیین سطح وضعیت بر اساس درصد مصرف */
export function getUsageLevel(percentage: number): UsageLevel {
    if (percentage >= 90) return "critical";
    if (percentage >= 75) return "high";
    return "normal";
}

/** رنگ نوار پیشرفت در سطح‌های هشدار (در سطح عادی از رنگ سهمیه استفاده می‌شود) */
export const LEVEL_BAR: Record<UsageLevel, string> = {
    normal: "",
    high: "bg-gradient-to-r from-amber-500 to-orange-400",
    critical: "bg-gradient-to-r from-red-500 to-rose-500",
};

/** رنگ متن درصد در سطح‌های هشدار */
export const LEVEL_TEXT: Record<UsageLevel, string> = {
    normal: "",
    high: "text-amber-500",
    critical: "text-red-500",
};

/** ظاهر چیپ وضعیت گیج کلی */
export const CHIP_STYLES: Record<UsageLevel, {chip: string; dot: string; labelKey: string}> = {
    normal: {chip: "bg-emerald-500/10 text-emerald-500", dot: "bg-emerald-500", labelKey: "statusNormal"},
    high: {chip: "bg-amber-500/10 text-amber-500", dot: "bg-amber-500", labelKey: "statusHigh"},
    critical: {chip: "bg-red-500/10 text-red-500", dot: "bg-red-500", labelKey: "statusCritical"},
};

/** ابعاد گیج دایره‌ای مصرف کلی */
export const DONUT_SIZE = 140;
export const DONUT_STROKE = 12;
export const DONUT_RADIUS = (DONUT_SIZE - DONUT_STROKE) / 2;
export const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

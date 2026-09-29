"use client";

/**
 * هوک کارت آمار تیم
 * تبدیل دادهٔ آمار به مقادیر و استایل نمایشی
 */

import type {TeamStat} from "../types";

const TONE_CLASSES = {
  emerald: "bg-emerald-500/10 text-emerald-600",
  primary: "bg-primary/10 text-primary",
  violet: "bg-violet-500/10 text-violet-600",
} as const;

export function useTeamStatCard({label, value, badgeLabel, tone, showDot = false}: TeamStat) {
  return {
    label,
    value,
    badgeLabel,
    showDot,
    badgeClassName: TONE_CLASSES[tone],
  };
}

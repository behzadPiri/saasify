"use client";

/**
 * کارت آمار تیم
 * نمایش یک شاخص کلی (تعداد اعضا، آنلاین‌ها، مدیران) با نشان کناری
 */

import {useTeamStatCard} from "@/features/team";
import type {TeamStat} from "../types";

export function TeamStatCard(stat: TeamStat) {
  const {label, value, badgeLabel, showDot, badgeClassName} = useTeamStatCard(stat);

  return (
    <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium ${badgeClassName}`}>
          {showDot ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> : null}
          {badgeLabel}
        </span>
      </div>
    </div>
  );
}

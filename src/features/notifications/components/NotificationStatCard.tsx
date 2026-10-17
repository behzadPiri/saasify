"use client";

/**
 * کارت آماری تک‌منظوره اعلان‌ها
 * یک برچسب، یک مقدار عددی و یک بج وضعیت را با رنگ مشخص رندر می‌کند.
 */

import {memo} from "react";
import {NOTIFICATION_STAT_ACCENT_STYLES} from "../constants";
import type {NotificationStatAccent} from "../types";

interface NotificationStatCardProps {
  /** برچسب ترجمه‌شده کارت */
  label: string;
  /** مقدار عددی */
  value: number;
  /** متن بج وضعیت (ترجمه‌شده) */
  badgeLabel: string;
  /** رنگ بج */
  accent: NotificationStatAccent;
}

/**
 * کارت آماری
 * چرا memo؟ چون سه کارت ایستا هستند و فقط با تغییر مقدارشان باید رندر شوند.
 */
export const NotificationStatCard = memo(function NotificationStatCard({
  label,
  value,
  badgeLabel,
  accent,
}: NotificationStatCardProps) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${NOTIFICATION_STAT_ACCENT_STYLES[accent]}`}>
          {badgeLabel}
        </span>
      </div>
    </div>
  );
});

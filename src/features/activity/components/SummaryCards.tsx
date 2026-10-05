/**
 * کامپوننت کارت‌های خلاصه آمار فعالیت
 * نمایش تعداد کل، امروز و عملیات موفق
 */

"use client";

import {Icons} from "@/shared/components/ui/icons";
import {useTranslations} from "next-intl";

interface SummaryCardsProps {
  summary: {
    total: number;
    today: number;
    successful: number;
  };
}

export function SummaryCards({summary}: SummaryCardsProps) {
  const t = useTranslations("Activity");

  const cards = [
    {
      label: t("allEvents"),
      value: summary.total,
      trend: "+12%",
      trendColor: "text-primary",
      trendBg: "bg-primary/10",
      icon: Icons.Activity,
    },
    {
      label: t("today"),
      value: summary.today,
      badge: t("summaryBadge.active"),
      badgeColor: "text-emerald-600",
      badgeBg: "bg-emerald-500/10",
      icon: Icons.Sun,
    },
    {
      label: t("successfulActions"),
      value: summary.successful,
      badge: t("summaryBadge.highRate"),
      badgeColor: "text-violet-600",
      badgeBg: "bg-violet-500/10",
      icon: Icons.Check,
    },
  ];

  return (
    <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-border/40 bg-background/60 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{card.label}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="text-2xl font-bold text-foreground">{card.value}</span>
            {card.trend ? (
              <span className="rounded-full px-2 py-1 text-[10px] font-medium" style={{backgroundColor: card.trendBg, color: card.trendColor}}>
                {card.trend}
              </span>
            ) : (
              <span className="rounded-full px-2 py-1 text-[10px] font-medium" style={{backgroundColor: card.badgeBg, color: card.badgeColor}}>
                {card.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

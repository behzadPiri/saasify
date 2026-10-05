/**
 * @file AnalyticsHero.tsx
 * @description کامپوننت بخش هدر و بنر بالایی صفحه تحلیلی (Analytics Hero).
 * شامل عنوان صفحه، توضیح کوتاه، دکمه‌های انتخاب بازه زمانی، دکمه خروجی گزارش و وضعیت به‌روزرسانی زنده.
 */

"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";
import { Icons } from "@/shared/components/ui/icons";
import type { AnalyticsTimeRange } from "@/features/analytics";

/**
 * پروپزهای کامپوننت AnalyticsHero
 */
export interface AnalyticsHeroProps {
  /** بازه زمانی فعال فعلی */
  timeRange: AnalyticsTimeRange;
  /** لیست بازه‌های زمانی مجاز */
  availableRanges: readonly AnalyticsTimeRange[];
  /** تابع تغییر بازه زمانی */
  onRangeChange: (range: AnalyticsTimeRange) => void;
  /** تابع درخواست خروجی گزارش */
  onExport: () => void;
}

/**
 * کامپوننت هدر و کنترل‌های بالای صفحه تحلیل
 */
export const AnalyticsHero: React.FC<AnalyticsHeroProps> = memo(function AnalyticsHero({
  timeRange,
  availableRanges,
  onRangeChange,
  onExport,
}) {
  const t = useTranslations("Analytics");

  /**
   * برچسب‌های متنی بازه‌های زمانی
   */
  const getRangeLabel = (range: AnalyticsTimeRange): string => {
    switch (range) {
      case "today":
        return t("timeRange.today");
      case "7d":
        return t("timeRange.7d");
      case "30d":
        return t("timeRange.30d");
      case "90d":
        return t("timeRange.90d");
      case "12m":
        return t("timeRange.12m");
      default:
        return range;
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_35%)]" />

      <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <Icons.BarChart size={12} />
            {t("badge")}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {t("heroDescription")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* دکمه‌های انتخاب بازه زمانی */}
          <div className="inline-flex rounded-2xl border border-border/60 bg-background/70 p-1">
            {availableRanges.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onRangeChange(option)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  timeRange === option
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent/40"
                }`}
              >
                {getRangeLabel(option)}
              </button>
            ))}
          </div>

          {/* دکمه خروجی گزارش */}
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
          >
            <Icons.Download size={16} />
            {t("exportReport")}
          </button>
        </div>
      </div>
    </section>
  );
});

AnalyticsHero.displayName = "AnalyticsHero";

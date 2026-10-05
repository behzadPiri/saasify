/**
 * @file ConversionFunnelSection.tsx
 * @description کامپوننت بخش شاخص‌های عملکرد و قیف تبدیل (Conversion Funnel & Performance Section).
 * نمایش مراحل پیشرفت کاربران در قیف تبدیل و شاخص‌های کلیدی عملکرد.
 */

"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";
import type { FunnelStepItem } from "../types/analytics.types";

/**
 * پروپزهای کامپوننت ConversionFunnelSection
 */
export interface ConversionFunnelSectionProps {
  /** مراحل قیف تبدیل */
  steps: FunnelStepItem[];
}

/**
 * کامپوننت بخش شاخص‌های عملکرد و قیف تبدیل
 */
export const ConversionFunnelSection: React.FC<ConversionFunnelSectionProps> = memo(function ConversionFunnelSection({
  steps,
}) {
  const t = useTranslations("Analytics.charts");

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("funnelTitle")}
          </p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t("funnelSubtitle")}</h2>
        </div>
        <button type="button" className="text-sm font-medium text-primary hover:underline">
          نمایش همه
        </button>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/40 p-3.5"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{step.stepNameKey}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("funnelDropoff")}: {step.dropoffRate}%
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-foreground">{step.conversionRate.toFixed(1)}%</p>
              <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                {step.visitorsCount.toLocaleString()} بازدیدکننده
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

ConversionFunnelSection.displayName = "ConversionFunnelSection";

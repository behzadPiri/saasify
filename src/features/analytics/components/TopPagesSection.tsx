/**
 * @file TopPagesSection.tsx
 * @description کامپوننت بخش پربازدیدترین صفحات (Top Pages Section).
 * نمایش فهرست URLهای محبوب سامانه همراه با تعداد بازدید، بازدیدکنندگان یکتا و نرخ پرش.
 */

"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";
import type { TopPageItem } from "@/features/analytics";
import { formatCompactNumber } from "@/shared/lib/number-format";

/**
 * پروپزهای کامپوننت TopPagesSection
 */
export interface TopPagesSectionProps {
  /** فهرست صفحات برتر */
  pages: TopPageItem[];
}

/**
 * کامپوننت بخش صفحات برتر
 */
export const TopPagesSection: React.FC<TopPagesSectionProps> = memo(function TopPagesSection({
  pages,
}) {
  const t = useTranslations("Analytics.charts");

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("topPagesTitle")}
        </p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">{t("topPagesSubtitle")}</h2>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <div key={page.path} className="rounded-2xl border border-border/40 bg-background/40 p-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">{page.path}</p>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                {page.changePercent >= 0 ? `+${page.changePercent}%` : `${page.changePercent}%`}
              </span>
            </div>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <span className="text-xl font-bold text-foreground">
                  {formatCompactNumber(page.pageViews)}
                </span>
                <span className="mr-1.5 text-xs text-muted-foreground">{t("thViews")}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {page.uniqueVisitors.toLocaleString()} {t("thUnique")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

TopPagesSection.displayName = "TopPagesSection";

/**
 * @file ProjectDistributionSection.tsx
 * @description کامپوننت بخش توزیع وضعیت پروژه‌ها (Project Distribution Section).
 * با استفاده از کامپوننت استاندارد PieChart داشبورد برای نمایش توزیع وضعیت پروژه‌ها.
 */

"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";
import { PieChart } from "@/features/dashboard/components";
import type { ProjectDistributionItem } from "../types/analytics.types";

/**
 * پروپزهای کامپوننت ProjectDistributionSection
 */
export interface ProjectDistributionSectionProps {
  /** داده‌های توزیع وضعیت پروژه‌ها */
  data: ProjectDistributionItem[];
}

/**
 * کامپوننت بخش توزیع وضعیت پروژه‌ها (نمودار دایره‌ای مشابه داشبورد)
 */
export const ProjectDistributionSection: React.FC<ProjectDistributionSectionProps> = memo(function ProjectDistributionSection({
  data,
}) {
  const t = useTranslations("Dashboard.projectDistribution");

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("title")}
        </p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">{t("title")}</h2>
      </div>
      <PieChart data={data} height={220} showLabels={false} animated />
    </div>
  );
});

ProjectDistributionSection.displayName = "ProjectDistributionSection";

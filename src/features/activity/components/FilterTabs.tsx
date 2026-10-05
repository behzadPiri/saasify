/**
 * کامپوننت تب‌های فیلتر فعالیت
 * نمایش گزینه‌های فیلتر و مدیریت حالت فعال
 */

"use client";

import {useTranslations} from "next-intl";
import type {ActivityFilter} from "@/features/activity";

interface FilterTabsProps {
  activeFilter: ActivityFilter;
  onFilterChange: (filter: ActivityFilter) => void;
  filterOptions: {id: ActivityFilter; label: string}[];
}

export function FilterTabs({activeFilter, onFilterChange, filterOptions}: FilterTabsProps) {
  const t = useTranslations("Activity");

  return (
    <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("filter")}</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t("filterTitle")}</h2>
        </div>
        <span className="text-sm text-muted-foreground">{t("filterDescription")}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onFilterChange(option.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              activeFilter === option.id
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border/60 bg-background/50 text-muted-foreground hover:bg-accent/40"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
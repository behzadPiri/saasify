"use client";

// قسمت جستجو و انتخاب ترتیب/وضعیت — مسئول جمع‌آوری ورودی‌های کاربر است.
// نکتهٔ RTL/LTR: آیکون جستجو با کلاس‌های `ltr:` و `rtl:` جابه‌جا می‌شود
// تا در هر دو جهت متن، موقعیت درست آیکون حفظ شود.

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {ProjectFilterOption} from "@/features/projects";

interface ProjectToolbarSearchProps {
  searchValue: string;
  statusFilter: ProjectFilterOption;
  sortBy: "recent" | "deadline" | "budget";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectFilterOption) => void;
  onSortChange: (value: "recent" | "deadline" | "budget") => void;
}

const SORT_OPTIONS = [
  {value: "recent", labelKey: "sort.recent"},
  {value: "deadline", labelKey: "sort.deadline"},
  {value: "budget", labelKey: "sort.budget"},
] as const;

export function ProjectToolbarSearch({
  searchValue,
  statusFilter,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: ProjectToolbarSearchProps) {
  const t = useTranslations("Projects");

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr]">
      <label className="relative block w-full">
        <span className="sr-only">{t("search")}</span>
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("search")}
          className="w-full rounded-2xl border border-border/60 bg-card/80 py-3 ltr:pl-12 ltr:pr-4 rtl:pr-12 rtl:pl-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <Icons.Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ltr:left-4 rtl:right-4" />
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr]">
        <label className="block">
          <span className="sr-only">{t("filters.all")}</span>
          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value as ProjectFilterOption)}
            className="w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">{t("filters.all")}</option>
            <option value="active">{t("status.active")}</option>
            <option value="completed">{t("status.completed")}</option>
            <option value="on_hold">{t("status.onHold")}</option>
            <option value="archived">{t("status.archived")}</option>
          </select>
        </label>

        <label className="block">
          <span className="sr-only">{t("sortBy")}</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as "recent" | "deadline" | "budget")}
            className="w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

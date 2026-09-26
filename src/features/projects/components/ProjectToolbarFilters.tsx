"use client";

// نمایش فیلترهای فعال به صورت chip و دکمهٔ پاک‌کردن همهٔ فیلترها.
// این کامپوننت فقط نمایشی است و با کال‌بک‌ها به والد اعلام تغییر می‌کند.

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

interface ProjectToolbarFiltersProps {
  searchValue: string;
  statusFilter: string;
  filteredCount: number;
  totalCount: number;
  sortBy: "recent" | "deadline" | "budget";
  onSearchChange: (value: string) => void;
  onStatusReset: () => void;
  onClearFilters: () => void;
}

export function ProjectToolbarFilters({
  searchValue,
  statusFilter,
  filteredCount,
  totalCount,
  sortBy,
  onSearchChange,
  onStatusReset,
  onClearFilters,
}: ProjectToolbarFiltersProps) {
  const t = useTranslations("Projects");
  const hasFilters = searchValue.trim().length > 0 || statusFilter !== "all";
  const statusLabel =
    statusFilter !== "all"
      ? t(statusFilter === "on_hold" ? "status.onHold" : (`status.${statusFilter}` as const))
      : "";

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap gap-2">
        {searchValue.trim().length > 0 && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/10"
          >
            <Icons.Search size={14} />
            <span className="truncate">{searchValue}</span>
            <Icons.X size={12} />
          </button>
        )}

        {statusFilter !== "all" && (
          <button
            type="button"
            onClick={onStatusReset}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/10"
          >
            <span>{statusLabel}</span>
            <Icons.X size={12} />
          </button>
        )}
      </div>

      {hasFilters ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {t("filters.activeFilters")}: <span className="font-semibold text-foreground">{filteredCount}</span>
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/90 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted"
          >
            <Icons.X size={14} />
            {t("filters.clearAll")}
          </button>
        </div>
      ) : null}

      <div className="grid gap-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between gap-2">
          <span>{t("title")}</span>
          <strong className="font-semibold text-foreground">{filteredCount}/{totalCount}</strong>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>{t("sortBy")}</span>
          <strong className="font-semibold text-foreground">{t(`sort.${sortBy}`)}</strong>
        </div>
      </div>
    </div>
  );
}

"use client";

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {TEAM_SORT_OPTIONS} from "../constants";
import {useTeamToolbar} from "@/features/team";
import type {TeamFilterOption, TeamSortOption} from "../types";

interface TeamToolbarProps {
  searchValue: string;
  statusFilter: TeamFilterOption;
  sortBy: TeamSortOption;
  filteredCount: number;
  totalCount: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TeamFilterOption) => void;
  onSortChange: (value: TeamSortOption) => void;
  onClearFilters: () => void;
}

export function TeamToolbar({
  searchValue,
  statusFilter,
  sortBy,
  filteredCount,
  totalCount,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onClearFilters,
}: TeamToolbarProps) {
  const t = useTranslations("Team");
  const {hasFilters} = useTeamToolbar({searchValue, statusFilter});

  return (
    <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
      <div className="rounded-[24px] border border-border/50 bg-card/80 p-3 shadow-sm backdrop-blur-xl sm:p-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr]">
          <label className="relative block w-full">
            <span className="sr-only">{t("search")}</span>
            <input
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={t("search")}
              className="w-full rounded-2xl border border-border/60 bg-background/60 py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <Icons.Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="sr-only">{t("filters.role")}</span>
              <select
                value={statusFilter}
                onChange={(event) => onStatusChange(event.target.value as TeamFilterOption)}
                className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">{t("filters.all")}</option>
                <option value="owner">{t("roles.owner")}</option>
                <option value="admin">{t("roles.admin")}</option>
                <option value="member">{t("roles.member")}</option>
                <option value="viewer">{t("roles.viewer")}</option>
              </select>
            </label>

            <label className="block">
              <span className="sr-only">{t("sortBy")}</span>
              <select
                value={sortBy}
                onChange={(event) => onSortChange(event.target.value as TeamSortOption)}
                className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {TEAM_SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-[24px] border border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur-xl sm:p-5">
        <div className="flex flex-wrap gap-2">
          {searchValue.trim().length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-2 text-[11px] font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/10"
            >
              <Icons.Search size={12} />
              <span className="max-w-[120px] truncate">{searchValue}</span>
              <Icons.X size={12} />
            </button>
          )}

          {statusFilter !== "all" && (
            <button
              type="button"
              onClick={() => onStatusChange("all")}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-2 text-[11px] font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/10"
            >
              <span>{t(`roles.${statusFilter}`)}</span>
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
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 text-[11px] font-medium text-muted-foreground transition hover:bg-muted"
            >
              <Icons.X size={12} />
              {t("filters.clearAll")}
            </button>
          </div>
        ) : null}

        <div className="grid gap-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-2">
            <span>{t("meta.total")}</span>
            <strong className="font-semibold text-foreground">{filteredCount}/{totalCount}</strong>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>{t("sortBy")}</span>
            <strong className="font-semibold text-foreground">{t(`sort.${sortBy}`)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

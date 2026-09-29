"use client";

/**
 * بخش پروژه‌های عضو
 * جستجو، ساخت پروژه و گرید کارت‌های پروژه
 */

import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {formatCurrency} from "@/shared/lib/number-format";
import {ProjectCard} from "@/features/projects/components/ProjectCard";
import {ProjectCreateModal} from "@/features/projects/components/ProjectCreateModal";
import {formatShortDate} from "../lib/date-format";
import type {ProjectStatus, ProjectSummary} from "@/features/projects";

interface MemberProjectsProps {
  visibleProjects: ProjectSummary[];
  searchTerm: string;
  feedback: {type: "success" | "error"; message: string} | null;
  isCreateOpen: boolean;
  onSearchChange: (value: string) => void;
  onOpenCreate: () => void;
  onCloseCreate: () => void;
  onCreate: (project: {name: string; status: ProjectStatus; budget: number; deadline?: string}) => void;
}

export function MemberProjects({
  visibleProjects,
  searchTerm,
  feedback,
  isCreateOpen,
  onSearchChange,
  onOpenCreate,
  onCloseCreate,
  onCreate,
}: MemberProjectsProps) {
  const t = useTranslations("Team");
  const locale = useLocale();

  return (
    <section className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("projects.title")}</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">{t("projects.subtitle")}</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block w-full max-w-md">
            <span className="sr-only">{t("projects.search")}</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={t("projects.search")}
              className="w-full rounded-2xl border border-border/60 bg-background/60 py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <Icons.Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </label>

          <button
            type="button"
            onClick={onOpenCreate}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95"
          >
            <Icons.Plus size={16} />
            {t("createProject")}
          </button>
        </div>
      </div>

      {feedback ? (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-500/10 text-emerald-700"
              : "border-red-200 bg-red-500/10 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      {visibleProjects.length === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-border/70 bg-background/50 p-10 text-center">
          <Icons.Inbox size={42} className="mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold text-foreground">{t("projects.emptyTitle")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("projects.emptyDescription")}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              formatDate={(date) => formatShortDate(date, locale)}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}

      <ProjectCreateModal open={isCreateOpen} onClose={onCloseCreate} onCreate={onCreate} />
    </section>
  );
}

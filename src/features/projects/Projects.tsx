"use client";
// صفحهٔ پروژه‌ها — مسئول کنار هم قرار دادن ویوها و وصل کردن هوک‌های منطق:
// - رندر هدر، آمار، تولبار و کارت‌های پروژه
// - مدیریت مودال ایجاد پروژه (View) و پاس‌دادن کال‌بک‌ها به هوک
// تاکید: این فایل فقط ترکیب‌کنندهٔ نماها است؛ منطق واقعی در `useProjectsPage` قرار دارد.

import {useState} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {useProjectsPage} from "./hooks";
import {ProjectCard} from "./components/ProjectCard";
import {ProjectCreateModal} from "./components/ProjectCreateModal";
import {ProjectStats} from "./components/ProjectStats";
import {ProjectsToolbar} from "./components/ProjectsToolbar";

export function Projects() {
  const t = useTranslations("Projects");
  const tCommon = useTranslations("Common");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    filteredProjects,
    stats,
    statusFilter,
    searchTerm,
    sortBy,
    isLoading,
    error,
    refresh,
    createProject,
    handleSearchChange,
    handleStatusChange,
    handleSortChange,
    formatDate,
    formatCurrency,
  } = useProjectsPage();

  return (
    <div className="w-full space-y-6 sm:px-6 lg:px-8 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]" />

        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              <Icons.Folder size={12} />
              {t("title")}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                {t("stats.subtitle")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={refresh}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icons.RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? tCommon("loading") : tCommon("refresh")}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
            >
              <Icons.Plus size={16} />
              {t("newProject")}
            </button>
          </div>
        </div>
      </section>

      <ProjectCreateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createProject}
      />

      <ProjectsToolbar
        searchValue={searchTerm}
        statusFilter={statusFilter}
        sortBy={sortBy}
        filteredCount={filteredProjects.length}
        totalCount={stats.totalProjects}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onClearFilters={() => {
          handleSearchChange("");
          handleStatusChange("all");
        }}
      />

      <section className="rounded-3xl border border-border/40 bg-card/80 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("stats.summary")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("stats.subtitle")}</p>
          </div>
          <Icons.Folder size={24} className="text-primary" />
        </div>

        <div className="mt-6">
          <ProjectStats stats={stats} />
        </div>
      </section>

      {error ? (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-destructive">{tCommon("error")}</p>
              <p className="mt-1 text-muted-foreground">{t("loadErrorMessage")}</p>
            </div>
            <button
              type="button"
              onClick={refresh}
              className="inline-flex items-center justify-center rounded-2xl bg-destructive px-4 py-2 text-sm font-semibold text-white transition hover:bg-destructive/90"
            >
              {tCommon("retry")}
            </button>
          </div>
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({length: 6}).map((_, index) => (
            <div key={index} className="animate-pulse rounded-3xl border border-border/40 bg-card/80 p-5 shadow-sm" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-border/40 bg-card/80 p-10 text-center shadow-sm">
          <Icons.Inbox size={44} className="mx-auto text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold text-foreground">{t("noProjects")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("createFirst")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}
    </div>
  );
}

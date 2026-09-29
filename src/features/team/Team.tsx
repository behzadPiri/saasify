"use client";

/**
 * کامپوننت اصلی تیم
 * ترکیب منطق (useTeamPage) و ویو (کامپوننت‌های UI)
 * مسئول لایه‌بندی و ترکیب تمام بخش‌های صفحه teamm
 * بهینه شده با dynamic imports و جلوگیری از رندرهای اضافی
 */

import dynamic from "next/dynamic";
import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {TeamMembersSkeleton} from "./components";
import {useTeamInvite, useTeamPage} from "./hooks";

// Dynamic imports for code splitting - lazy load heavy components
const TeamToolbar = dynamic(
  () => import("./components/TeamToolbar").then((m) => m.TeamToolbar),
  {ssr: false, loading: () => null}
);
const TeamMembersGrid = dynamic(
  () => import("./components/TeamMembersGrid").then((m) => m.TeamMembersGrid),
  {ssr: false, loading: () => <TeamMembersSkeleton />}
);
const InviteMemberModal = dynamic(
  () => import("./components/InviteMemberModal").then((m) => m.InviteMemberModal),
  {ssr: false}
);

export function Team() {
  const t = useTranslations("Team");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  const {
    filteredMembers,
    visibleMembers,
    // summary removed - data available through filteredMembers
    statusFilter,
    sortBy,
    searchValue,
    isLoading,
    error,
    refresh,
    addMember,
    handleRoleFilterChange,
    handleSortChange,
    handleSearchChange,
    clearFilters,
  } = useTeamPage();

  const {isInviteOpen, notice, openInvite, closeInvite, handleInviteSubmit} = useTeamInvite({addMember, locale});

  return (
    <div className="space-y-6 w-full sm:px-5 lg:px-7 xl:px-0">
      <section
        className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]"
        />
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              <Icons.Users size={12} />
              {t("title")}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{t("description")}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={refresh}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icons.RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? tCommon("loading") : tCommon("refresh")}
            </button>
            <button
              type="button"
              onClick={openInvite}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40"
            >
              <Icons.Plus size={16} />
              {t("inviteMember")}
            </button>
          </div>
        </div>
      </section>

      {notice ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
          {notice}
        </div>
      ) : null}

      <TeamToolbar
        searchValue={searchValue}
        statusFilter={statusFilter}
        sortBy={sortBy}
        filteredCount={visibleMembers.length}
        totalCount={filteredMembers.length}
        onSearchChange={handleSearchChange}
        onStatusChange={handleRoleFilterChange}
        onSortChange={handleSortChange}
        onClearFilters={clearFilters}
      />

      {error ? (
        <div className="rounded-[26px] border border-destructive/30 bg-destructive/5 p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-destructive/10 p-2 text-destructive">
                <Icons.AlertCircle size={18} />
              </div>
              <div>
                <p className="text-base font-semibold text-destructive">{tCommon("error")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={refresh}
              className="inline-flex items-center justify-center rounded-2xl bg-destructive px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-destructive/90"
            >
              {tCommon("retry")}
            </button>
          </div>
        </div>
      ) : null}

      <TeamMembersGrid members={visibleMembers} isLoading={isLoading} />

      <InviteMemberModal open={isInviteOpen} onClose={closeInvite} onSubmit={handleInviteSubmit} />
    </div>
  );
}
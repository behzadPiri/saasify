"use client";

import {useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {InviteMemberModal} from "./components/InviteMemberModal";
import {TeamMemberCard} from "./components/TeamMemberCard";
import {TeamToolbar} from "./components/TeamToolbar";
import {useTeamPage} from "./hooks/useTeamPage";

export function Team() {
  const t = useTranslations("Team");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const [searchValue, setSearchValue] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const {filteredMembers, statusFilter, sortBy, isLoading, error, refresh, handleRoleFilterChange, handleSortChange, addMember} =
    useTeamPage();

  const visibleMembers = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return filteredMembers;
    }

    return filteredMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(normalizedSearch) || member.email.toLowerCase().includes(normalizedSearch)
    );
  }, [filteredMembers, searchValue]);

  const summary = useMemo(() => {
    const total = filteredMembers.length;
    const online = filteredMembers.filter((member) => member.status === "online").length;
    const managers = filteredMembers.filter((member) => member.role === "owner" || member.role === "admin").length;

    return {total, online, managers};
  }, [filteredMembers]);

  const handleSearchChange = (value: string) => setSearchValue(value);
  const clearFilters = () => {
    setSearchValue("");
    handleRoleFilterChange("all");
  };

  const handleInviteSubmit = ({email, role}: {email: string; role: "owner" | "admin" | "member" | "viewer"}) => {
    const created = addMember({email, role, locale});
    setNotice(t("invite.success", {email: created.email}));
  };

  return (
    <div className="space-y-6 w-full sm:px-5 lg:px-7 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]" />
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
              onClick={() => setIsInviteOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40"
            >
              <Icons.Plus size={16} />
              {t("inviteMember")}
            </button>
          </div>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("stats.totalMembers")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.total}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600">
                +{Math.max(summary.total - 1, 0)}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("stats.activeNow")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.online}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {t("status.online")}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("stats.managers")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.managers}</span>
              <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-medium text-violet-600">
                {t("roles.admin")}
              </span>
            </div>
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

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({length: 6}).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-3 w-32 rounded bg-muted/80" />
                  </div>
                </div>
                <div className="h-7 w-20 rounded-full bg-muted" />
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-3 w-full rounded bg-muted/80" />
                <div className="h-3 w-2/3 rounded bg-muted/80" />
              </div>
            </div>
          ))}
        </div>
      ) : visibleMembers.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-border/70 bg-card/70 p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icons.Users size={30} />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-foreground">{t("emptyTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("emptyDescription")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}

      <InviteMemberModal
        open={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSubmit={handleInviteSubmit}
      />
    </div>
  );
}

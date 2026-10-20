"use client";

/**
 * هدر صفحهٔ جزئیات عضو
 * آواتار، نقش، تب‌های ناوبری کلاینتی و کارت‌های متادیتا
 *
 * تب‌ها دیگر لینک نیستند؛ با تغییر state والد جابه‌جا می‌شوند تا هیچ
 * ناوبری/رفرش کامل صفحه‌ای رخ ندهد. نشانگر (indicator) با ترنزیشن نرم
 * بین دو تب حرکت می‌کند و در حالت RTL نیز با `inset-inline-start` درست
 * رفتار می‌کند.
 */

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Tabs} from "@/shared/components/ui";
import type {TabItem} from "@/shared/components/ui";
import {Icons} from "@/shared/components/ui/icons";
import {TEAM_ROLE_STYLE, TEAM_STATUS_STYLE} from "../constants";
import type {TeamMember, TeamMemberView} from "../types";

interface MemberHeaderProps {
  member: TeamMember;
  initials: string;
  activeTab: TeamMemberView;
  onTabChange: (tab: TeamMemberView) => void;
  projectCount: number;
}

export function MemberHeader({member, initials, activeTab, onTabChange, projectCount}: MemberHeaderProps) {
  const t = useTranslations("Team");
  const roleStyle = TEAM_ROLE_STYLE[member.role];

  const tabs: TabItem<TeamMemberView>[] = [
    {value: "overview", label: t("tabs.overview"), icon: <Icons.Users size={15} />},
    {value: "projects", label: t("tabs.projects"), icon: <Icons.Folder size={15} />, badge: projectCount},
  ];

  return (
    <div className="rounded-[30px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${member.avatarColor} text-lg font-bold text-white`}>
            {initials}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t(roleStyle.labelKey)}
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{member.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{member.email}</p>
          </div>
        </div>

        <Link
          href="/team"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40"
        >
            {t("backToTeam")}
            <Icons.ArrowLeft className="ltr:rotate-180" size={16} />
        </Link>
      </div>

      <nav className="mt-6" aria-label={t("title")}>
        <Tabs
          items={tabs}
          value={activeTab}
          onChange={onTabChange}
          ariaLabel={t("tabs.label")}
          idPrefix="member"
          className="w-full sm:max-w-lg"
        />
      </nav>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("meta.location")}</p>
          <p className="mt-3 text-lg font-semibold text-foreground">{member.location}</p>
        </div>
        <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("meta.projects")}</p>
          <p className="mt-3 text-lg font-semibold text-foreground">{projectCount}</p>
        </div>
        <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("meta.status")}</p>
          <div className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-foreground">
            <span className={`h-2.5 w-2.5 rounded-full ${TEAM_STATUS_STYLE[member.status]}`} />
            {t(`status.${member.status}`)}
          </div>
        </div>
      </div>
    </div>
  );
}

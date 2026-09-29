"use client";

/**
 * هدر صفحهٔ جزئیات عضو
 * آواتار، نقش، تب‌های ناوبری و کارت‌های متادیتا
 */

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Icons} from "@/shared/components/ui/icons";
import {TEAM_ROLE_STYLE, TEAM_STATUS_STYLE} from "../constants";
import type {TeamMember, TeamMemberView} from "../types";

interface MemberHeaderProps {
  member: TeamMember;
  initials: string;
  view: TeamMemberView;
  projectCount: number;
}

export function MemberHeader({member, initials, view, projectCount}: MemberHeaderProps) {
  const t = useTranslations("Team");
  const roleStyle = TEAM_ROLE_STYLE[member.role];

  const tabs = [
    {key: "overview" as const, label: t("tabs.overview"), href: `/team/${member.id}`},
    {key: "projects" as const, label: t("tabs.projects"), href: `/team/${member.id}/projects`},
  ];

  return (
    <div className="rounded-[30px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${member.avatarColor} text-lg font-bold text-white`}>
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
          <Icons.ArrowLeft size={16} />
          {t("backToTeam")}
        </Link>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label={t("title")}>
        {tabs.map((tab) => {
          const isActive = tab.key === view;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border/60 bg-background/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.key === "projects" ? <Icons.Folder size={14} /> : <Icons.Users size={14} />}
              {tab.label}
            </Link>
          );
        })}
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

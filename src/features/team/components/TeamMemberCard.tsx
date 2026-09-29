"use client";

import {Link} from "@/i18n/navigation";
import {Icons} from "@/shared/components/ui/icons";
import {useTeamMemberCard} from "@/features/team";
import type {TeamMember} from "../types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({member}: TeamMemberCardProps) {
  const {t, initials, roleBadgeClass, roleLabel, statusDotClass, statusLabel, relativeActivity, href} =
    useTeamMemberCard(member);

  return (
    <Link href={href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
      <article
        className="h-full rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_50px_rgba(99,102,241,0.12)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.avatarColor} text-sm font-bold text-white shadow-inner`}
            >
              {initials}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-foreground">{member.name}</h3>
              <p className="truncate text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>

          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${roleBadgeClass}`}>
            {roleLabel}
          </span>
        </div>

        <div className="mt-5 space-y-4">
          <div
            className="flex items-center justify-between gap-3 rounded-2xl bg-muted/20 px-3 py-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2 font-medium">
              <span className={`h-2.5 w-2.5 rounded-full ${statusDotClass}`} />
              {statusLabel}
            </span>
            <span className="truncate text-right">{member.location}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/60 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <Icons.Folder size={12} />
                {t("meta.projects")}
              </div>
              <div className="text-lg font-semibold text-foreground">{member.projects}</div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background/60 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <Icons.Activity size={12} />
                {t("meta.active")}
              </div>
              <div className="text-sm font-medium text-foreground">{relativeActivity}</div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Add display name for ESLint
TeamMemberCard.displayName = "TeamMemberCard";
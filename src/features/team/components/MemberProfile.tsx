"use client";

/**
 * پنل پروفایل عضو
 * تاریخ پیوستن، وضعیت، فعالیت‌های اخیر و اکشن‌های مدیریتی
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {TEAM_STATUS_STYLE} from "../constants";
import type {MemberActivityItem} from "@/features/team";
import type {TeamMember} from "../types";

interface MemberProfileProps {
  member: TeamMember;
  joinedDate: string;
  relativeLastSeen: string;
  activityItems: readonly MemberActivityItem[];
}

export function MemberProfile({member, joinedDate, relativeLastSeen, activityItems}: MemberProfileProps) {
  const t = useTranslations("Team");

  const actions = [
    {key: "edit" as const, label: t("profile.actions.edit"), icon: Icons.Edit, danger: false},
    {key: "access" as const, label: t("profile.actions.access"), icon: Icons.Settings, danger: false},
    {key: "delete" as const, label: t("profile.actions.delete"), icon: Icons.AlertCircle, danger: true},
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("profile.joined")}</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{joinedDate}</p>
          </div>
          <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">{relativeLastSeen}</div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 p-4">
            <span className="text-sm text-muted-foreground">{t("profile.activeStatus")}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <span className={`h-2 w-2 rounded-full ${TEAM_STATUS_STYLE[member.status]}`} />
              {t(`status.${member.status}`)}
            </span>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-sm font-medium text-muted-foreground">{t("profile.recentActivity")}</p>
            <ul className="mt-4 space-y-3">
              {activityItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-card/60 px-3 py-2">
                  <span className="text-sm text-foreground">{t(`profile.activity.${item.labelKey}`)}</span>
                  <span className="text-xs text-muted-foreground">{t(`profile.activity.${item.timeKey}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <aside className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
        <div className="space-y-3">
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                action.danger
                  ? "border-red-200 bg-red-500/5 text-red-700 hover:bg-red-500/10"
                  : "border-border/50 bg-background/60 text-foreground hover:bg-accent/40"
              }`}
            >
              <span>{action.label}</span>
              <action.icon size={16} />
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

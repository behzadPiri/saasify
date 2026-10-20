"use client";

// اعضای تیم پروژه: آواتار رنگی، نام و نقش هر عضو.
// هر عضو با تاخیر پلکانی ظاهر می‌شود تا لیست به‌صورت نرم بالا بیاید.
import {useTranslations} from "next-intl";
import type {ProjectSummary, ProjectTeamMember} from "../types";
import {getProjectRole} from "../lib/display";

interface ProjectDetailTeamProps {
  project: ProjectSummary;
}

export function ProjectDetailTeam({project}: ProjectDetailTeamProps) {
  const t = useTranslations("Projects");

  return (
    <section
      className="animate-in slide-in-from-end rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6"
      style={{animationDelay: "400ms"}}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("teamMembers")}</p>
      <div className="mt-5 space-y-3">
        {(project.teamMembers ?? []).map((member, index) => (
          <MemberRow key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}

interface MemberRowProps {
  member: ProjectTeamMember;
  index: number;
}

function MemberRow({member, index}: MemberRowProps) {
  const t = useTranslations("Projects");
  const initials = member.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="animate-in slide-in-from-start flex items-center gap-3 rounded-2xl border border-border/40 bg-background/60 p-3 transition duration-200 hover:border-primary/25 hover:bg-accent/10"
      style={{animationDelay: `${450 + index * 70}ms`}}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${member.avatarColor} text-xs font-bold text-white`}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
        <p className="text-xs text-muted-foreground">{getProjectRole(member.role, t)}</p>
      </div>
    </div>
  );
}

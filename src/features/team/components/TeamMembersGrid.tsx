"use client";

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {TeamMemberCard} from "@/features/team";
import {TeamMembersSkeleton} from "@/features/team";
import type {TeamMember} from "../types";

interface TeamMembersGridProps {
  members: TeamMember[];
  isLoading: boolean;
}

export function TeamMembersGrid({members, isLoading}: TeamMembersGridProps) {
  const t = useTranslations("Team");

  if (isLoading) {
    return <TeamMembersSkeleton />;
  }

  if (members.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-border/70 bg-card/70 p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icons.Users size={30} />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-foreground">{t("emptyTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("emptyDescription")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

// Add display name for ESLint
TeamMembersGrid.displayName = "TeamMembersGrid";
"use client";

/**
 * هوک جزئیات عضو تیم
 * دریافت عضو، پروژه‌های اختصاص‌یافته، جستجو و ساخت پروژه
 */

import {useCallback, useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {formatCurrency} from "@/shared/lib/number-format";
import {getRelativeTime} from "../lib/relative-time";
import {MEMBER_ACTIVITY, TEAM_MEMBER_PROJECTS} from "../constants";
import {useTeamPage} from "./useTeamPage";
import type {MemberActivityItem} from "@/features/team";
import type {TeamMemberView} from "../types";
import type {ProjectStatus, ProjectSummary} from "@/features/projects";

interface UseTeamMemberDetailOptions {
  memberId: string;
  view: TeamMemberView;
}

export function useTeamMemberDetail({memberId, view}: UseTeamMemberDetailOptions) {
  const t = useTranslations("Team");
  const locale = useLocale();
  const {members, isLoading, error, refresh} = useTeamPage();

  const member = useMemo(() => members.find((item) => item.id === memberId), [members, memberId]);

  const [projectOverrides, setProjectOverrides] = useState<Record<string, ProjectSummary[]>>({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState<{type: "success" | "error"; message: string} | null>(null);

  const projects = useMemo(
    () => projectOverrides[memberId] ?? TEAM_MEMBER_PROJECTS[memberId] ?? [],
    [memberId, projectOverrides]
  );

  const visibleProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return projects;
    }

    return projects.filter((project) => project.name.toLowerCase().includes(normalizedSearch));
  }, [projects, searchTerm]);

  const openCreateModal = useCallback(() => setIsCreateOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateOpen(false), []);

  const handleCreateProject = useCallback(
    (project: {name: string; status: ProjectStatus; budget: number; deadline?: string}) => {
      const nextProject: ProjectSummary = {
        id: `team-${memberId}-${Date.now()}`,
        name: project.name,
        status: project.status,
        progress: 0,
        members: 1,
        deadline: project.deadline ? new Date(project.deadline) : undefined,
        budget: project.budget,
        updatedAt: new Date(),
      };

      setProjectOverrides((current) => ({
        ...current,
        [memberId]: [nextProject, ...(current[memberId] ?? TEAM_MEMBER_PROJECTS[memberId] ?? [])],
      }));

      setFeedback({type: "success", message: t("create.success", {name: project.name})});
      setSearchTerm("");
    },
    [memberId, t]
  );

  const relativeLastSeen = useMemo(
    () => (member ? getRelativeTime(member.lastActiveAt ?? new Date(), locale) : ""),
    [member, locale]
  );

  const joinedDate = useMemo(() => {
    if (!member) return "";

    return new Intl.DateTimeFormat(locale, {year: "numeric", month: "short", day: "numeric"}).format(
      new Date(member.joinedAt)
    );
  }, [member, locale]);

  const initials = useMemo(
    () =>
      member
        ? member.name
            .split(" ")
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("")
        : "",
    [member]
  );

  const activityItems: readonly MemberActivityItem[] = MEMBER_ACTIVITY;

  return {
    view,
    isLoading,
    error,
    refresh,
    member,
    initials,
    projects,
    visibleProjects,
    searchTerm,
    setSearchTerm,
    feedback,
    isCreateOpen,
    openCreateModal,
    closeCreateModal,
    handleCreateProject,
    relativeLastSeen,
    joinedDate,
    activityItems,
    formatCurrency,
  };
}

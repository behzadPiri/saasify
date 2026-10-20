"use client";

/**
 * هوک جزئیات عضو تیم
 * دریافت عضو، پروژه‌های اختصاص‌یافته، جستجو، ساخت پروژه و اکشن‌های پروفایل
 * (ویرایش، تغییر دسترسی و حذف عضو)
 */

import {useCallback, useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {formatCurrency} from "@/shared/lib/number-format";
import {useToast} from "@/shared/components/ui";
import {getRelativeTime} from "../lib/relative-time";
import {MEMBER_ACTIVITY} from "../constants";
import {useMemberProjects} from "./useMemberProjects";
import {useTeamPage} from "./useTeamPage";
import type {MemberActivityItem} from "@/features/team";
import type {MemberEditValues} from "./useMemberEditForm";
import type {TeamMemberView} from "../types";
import type {ProjectStatus, ProjectSummary} from "@/features/projects";
import type {TeamRole} from "../types";
import {getProjectName} from "@/features/projects/lib/display";

interface UseTeamMemberDetailOptions {
  memberId: string;
  view: TeamMemberView;
}

export type MemberActionModal = "edit" | "access" | "remove" | null;

export function useTeamMemberDetail({memberId, view}: UseTeamMemberDetailOptions) {
  const t = useTranslations("Team");
  const tProjects = useTranslations("Projects");
  const locale = useLocale();
  const router = useRouter();
  const {showToast} = useToast();
  const {members, isLoading, error, refresh, updateMember, removeMember} = useTeamPage();
  const {projects, addProject} = useMemberProjects(memberId);

  const member = useMemo(() => members.find((item) => item.id === memberId), [members, memberId]);

  const [activeTab, setActiveTab] = useState<TeamMemberView>(view);
  const [activeModal, setActiveModal] = useState<MemberActionModal>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState<{type: "success" | "error"; message: string} | null>(null);

  const visibleProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return projects;
    }

    return projects.filter((project) => getProjectName(project, tProjects).toLowerCase().includes(normalizedSearch));
  }, [projects, searchTerm, tProjects]);

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

      addProject(nextProject);

      setFeedback({type: "success", message: t("create.success", {name: project.name})});
      setSearchTerm("");
    },
    [addProject, memberId, t]
  );

  // -------------------------------------------------------------------------
  // اکشن‌های پروفایل
  // -------------------------------------------------------------------------

  const openEditModal = useCallback(() => setActiveModal("edit"), []);
  const openAccessModal = useCallback(() => setActiveModal("access"), []);
  const openRemoveModal = useCallback(() => setActiveModal("remove"), []);
  const closeActionModal = useCallback(() => setActiveModal(null), []);

  const handleEditSubmit = useCallback(
    (values: MemberEditValues) => {
      const updated = updateMember(memberId, values);

      if (updated) {
        showToast(t("profile.edit.success"), "success");
      }
    },
    [memberId, showToast, t, updateMember]
  );

  const handleAccessSubmit = useCallback(
    (role: TeamRole) => {
      const updated = updateMember(memberId, {role});

      if (updated) {
        showToast(t("profile.access.success", {role: t(`roles.${role}`)}), "success");
      }
    },
    [memberId, showToast, t, updateMember]
  );

  const handleRemoveConfirm = useCallback(() => {
    if (!member) return;

    const removed = removeMember(memberId);

    if (!removed) {
      showToast(t("profile.remove.error"), "error");
      return;
    }

    // پیش از ناوبری، حالت «در حال حذف» را فعال می‌کنیم تا صفحهٔ «عضو یافت نشد»
    // حتی برای یک فریم هم نمایش داده نشود.
    setIsRemoving(true);
    setActiveModal(null);
    showToast(t("profile.remove.success", {name: removed.name}), "success");
    router.push("/team");
  }, [member, memberId, removeMember, router, showToast, t]);

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

    // تب‌ها و اکشن‌های پروفایل
    activeTab,
    setActiveTab,
    activeModal,
    isRemoving,
    openEditModal,
    openAccessModal,
    openRemoveModal,
    closeActionModal,
    handleEditSubmit,
    handleAccessSubmit,
    handleRemoveConfirm,
  };
}

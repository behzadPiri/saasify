"use client";

/**
 * هوک پروژه‌های اختصاص‌یافته به یک عضو
 * از فروشگاه مشترک تیم می‌خواند تا پروژه‌های تازه‌ساخته‌شده هم بلافاصله
 * در صفحهٔ جزئیات و مسیر اختصاصی پروژه قابل دسترسی باشند.
 */

import {useCallback, useSyncExternalStore} from "react";
import {
  addMemberProject,
  getMemberProjectsSnapshot,
  getServerMemberProjectsSnapshot,
  subscribeMemberProjects,
} from "../lib/team-store";
import type {ProjectSummary} from "@/features/projects";

export function useMemberProjects(memberId: string) {
  const projects = useSyncExternalStore(
    subscribeMemberProjects,
    () => getMemberProjectsSnapshot(memberId),
    () => getServerMemberProjectsSnapshot(memberId)
  );

  const addProject = useCallback(
    (project: ProjectSummary) => {
      addMemberProject(memberId, project);
    },
    [memberId]
  );

  return {projects, addProject};
}

export function useMemberProject(memberId: string, projectId: string) {
  const {projects} = useMemberProjects(memberId);

  return projects.find((project) => project.id === projectId);
}

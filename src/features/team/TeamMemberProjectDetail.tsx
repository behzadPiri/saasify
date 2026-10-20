"use client";

/**
 * جزئیات پروژهٔ اختصاص‌یافته به یک عضو تیم
 * ---------------------------------------------------------------
 * مسیر `/team/[memberId]/projects/[projectId]` از همین کامپوننت استفاده
 * می‌کند تا پروژه‌های عضو (شامل پروژه‌های تازه‌ساخته‌شده) با همان نما و
 * کامپوننت‌های صفحهٔ عمومی پروژه‌ها رندر شوند؛ فقط دکمهٔ بازگشت به
 * فهرست پروژه‌های همان عضو اشاره می‌کند.
 */

import {useTranslations} from "next-intl";
import {ProjectDetail, ProjectDetailNotFound} from "@/features/projects";
import {useMemberProject} from "./hooks";

interface TeamMemberProjectDetailProps {
  memberId: string;
  projectId: string;
}

export function TeamMemberProjectDetail({memberId, projectId}: TeamMemberProjectDetailProps) {
  const t = useTranslations("Team");
  const project = useMemberProject(memberId, projectId);
  const projectsHref = `/team/${memberId}/projects`;

  if (!project) {
    return (
      <ProjectDetailNotFound
        backHref={projectsHref}
        backLabel={t("tabs.projects")}
      />
    );
  }

  return (
    <ProjectDetail
      projectId={projectId}
      project={project}
      backHref={projectsHref}
      backLabel={t("tabs.projects")}
    />
  );
}

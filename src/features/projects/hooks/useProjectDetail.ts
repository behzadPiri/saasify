"use client";

// هوک صفحهٔ جزئیات پروژه: مسئول یافتن پروژه بر اساس شناسه و ارائهٔ آن به کامپوننت‌های نمایشی.
// منطق دریافت داده (در اینجا از منبع mock) جدا از ویو نگه داشته می‌شود تا
// تست‌پذیری و نگهداری آسان‌تر باشد، دقیقاً همان الگویی که `useProjectsPage` دنبال می‌کند.
import {useMemo} from "react";
import {createMockProjects} from "../lib/mockProjects";
import type {ProjectSummary} from "../types";

export function useProjectDetail(projectId: string) {
  const project = useMemo<ProjectSummary | undefined>(
    () => createMockProjects().find((item) => item.id === projectId),
    [projectId]
  );

  return {project};
}

"use client";

// صفحهٔ جزئیات پروژه — فقط ترکیب‌کنندهٔ نماها است.
// منطق یافتن پروژه در هوک `useProjectDetail` و مدیریت وظایف در `useProjectTasks`
// قرار دارد؛ هر بخش نیز کامپوننت مستقل خود را دارد تا این فایل فقط چیدمان باشد.
// `project` اختیاری اجازه می‌دهد مسیرهای اختصاصی (مثل پروژه‌های یک عضو تیم)
// پروژه را بدون وابستگی به منبع عمومی صفحهٔ پروژه‌ها رندر کنند.
import type {ProjectSummary} from "../types";
import {useProjectDetail, useProjectTasks} from "../hooks";
import {ProjectDetailHeader} from "./ProjectDetailHeader";
import {ProjectDetailNotFound} from "./ProjectDetailNotFound";
import {ProjectDetailOverview} from "./ProjectDetailOverview";
import {ProjectDetailTaskBoard} from "./ProjectDetailTaskBoard";
import {ProjectDetailTeam} from "./ProjectDetailTeam";
import {ProjectDetailTimeline} from "./ProjectDetailTimeline";

interface ProjectDetailProps {
  projectId: string;
  /** پروژهٔ از پیش resolve شده (مثلاً از پروژه‌های یک عضو تیم) */
  project?: ProjectSummary;
  /** مقصد دکمهٔ بازگشت؛ پیش‌فرض `/projects` است. */
  backHref?: string;
  /** برچسب دکمهٔ بازگشت؛ پیش‌فرض ترجمهٔ `Projects.back` است. */
  backLabel?: string;
}

export function ProjectDetail({projectId, project: providedProject, backHref, backLabel}: ProjectDetailProps) {
  const {project: storedProject} = useProjectDetail(projectId);
  const project = providedProject ?? storedProject;

  if (!project) {
    return <ProjectDetailNotFound />;
  }

  // با کلید بر اساس شناسهٔ پروژه، وضعیت وظایف هنگام جابه‌جایی بین پروژه‌ها بازنشانی می‌شود.
  return (
    <ProjectDetailContent key={project.id} project={project} backHref={backHref} backLabel={backLabel} />
  );
}

interface ProjectDetailContentProps {
  project: ProjectSummary;
  backHref?: string;
  backLabel?: string;
}

function ProjectDetailContent({project, backHref, backLabel}: ProjectDetailContentProps) {
  const {tasks, addTask} = useProjectTasks(project.tasks ?? []);

  return (
    <div className="w-full space-y-6">
      <ProjectDetailHeader project={project} backHref={backHref} backLabel={backLabel} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-6">
          <ProjectDetailOverview project={project} tasks={tasks} />
          <ProjectDetailTaskBoard tasks={tasks} onAddTask={addTask} />
        </section>

        <aside className="space-y-6">
          <ProjectDetailTimeline project={project} />
          <ProjectDetailTeam project={project} />
        </aside>
      </div>
    </div>
  );
}

"use client";

// صفحهٔ جزئیات پروژه — فقط ترکیب‌کنندهٔ نماها است.
// منطق یافتن پروژه در هوک `useProjectDetail` و مدیریت وظایف در `useProjectTasks`
// قرار دارد؛ هر بخش نیز کامپوننت مستقل خود را دارد تا این فایل فقط چیدمان باشد.
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
}

export function ProjectDetail({projectId}: ProjectDetailProps) {
  const {project} = useProjectDetail(projectId);

  if (!project) {
    return <ProjectDetailNotFound />;
  }

  // با کلید بر اساس شناسهٔ پروژه، وضعیت وظایف هنگام جابه‌جایی بین پروژه‌ها بازنشانی می‌شود.
  return <ProjectDetailContent key={project.id} project={project} />;
}

interface ProjectDetailContentProps {
  project: ProjectSummary;
}

function ProjectDetailContent({project}: ProjectDetailContentProps) {
  const {tasks, addTask} = useProjectTasks(project.tasks ?? []);

  return (
    <div className="w-full space-y-6">
      <ProjectDetailHeader project={project} />

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

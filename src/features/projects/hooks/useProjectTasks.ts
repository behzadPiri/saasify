"use client";

// هوک مدیریت وظایف پروژه: نگهداری فهرست وظایف و افزودن وظیفهٔ جدید.
// در والد (`ProjectDetail`) کامپوننت با `key={project.id}` رندر می‌شود تا
// هنگام تغییر پروژه، وضعیت وظایف به‌درستی بازنشانی شود.
import {useCallback, useState} from "react";
import type {NewProjectTaskInput, ProjectTask} from "../types";

export function useProjectTasks(initialTasks: ProjectTask[]) {
  const [tasks, setTasks] = useState<ProjectTask[]>(initialTasks);

  const addTask = useCallback((input: NewProjectTaskInput) => {
    setTasks((current) => [
      ...current,
      {
        id: `tsk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: input.title,
        description: input.description,
        assignee: input.assignee,
        status: input.status,
        dueDate: input.dueDate,
      },
    ]);
  }, []);

  return {tasks, addTask};
}

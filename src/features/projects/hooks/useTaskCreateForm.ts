"use client";

// هوک فرم ایجاد وظیفهٔ جدید.
// منطق فرم (وضعیت فیلدها، اعتبارسنجی و ارسال) از کامپوننت نمایش جدا نگه داشته شده است.
import {useEffect, useState} from "react";
import type {NewProjectTaskInput, ProjectTask} from "../types";

export interface UseTaskCreateFormResult {
  title: string;
  assignee: string;
  description: string;
  status: ProjectTask["status"];
  dueDate: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setAssignee: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<ProjectTask["status"]>>;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  canSave: boolean;
  handleSubmit: () => void;
}

export function useTaskCreateForm(
  open: boolean,
  onCreate: (task: NewProjectTaskInput) => void,
  onClose: () => void
): UseTaskCreateFormResult {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectTask["status"]>("todo");
  const [dueDate, setDueDate] = useState("");

  // هنگام باز شدن مودال، فرم را ریست می‌کنیم. از میکروتسک استفاده می‌شود
  // تا از فراخوانی هم‌زمان setState داخل اثر جلوگیری شود.
  useEffect(() => {
    if (!open) return;

    Promise.resolve().then(() => {
      setTitle("");
      setAssignee("");
      setDescription("");
      setStatus("todo");
      setDueDate("");
    });
  }, [open]);

  const canSave = title.trim().length > 0 && assignee.trim().length > 0;

  const handleSubmit = () => {
    if (!canSave) return;

    onCreate({
      title: title.trim(),
      assignee: assignee.trim(),
      description: description.trim() || undefined,
      status,
      dueDate: dueDate ? new Date(`${dueDate}T00:00:00`) : undefined,
    });
    onClose();
  };

  return {
    title,
    assignee,
    description,
    status,
    dueDate,
    setTitle,
    setAssignee,
    setDescription,
    setStatus,
    setDueDate,
    canSave,
    handleSubmit,
  };
}

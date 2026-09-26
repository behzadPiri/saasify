"use client";

// این هوک وضعیت فرم ایجاد پروژه را نگهداری و مدیریت می‌کند.
// توضیحات:
// - مسئولیت نگهداری فیلدهای فرم (`name`, `status`, `budget`, `deadline`) است.
// - زمانی که مودال باز می‌شود، فرم را ریست می‌کند.
// - در زمان ذخیره، داده‌ها را به کال‌بک `onCreate` ارسال می‌کند.
// همه‌ی منطق فرم از کامپوننت نمایش (View) جدا شده تا Single Responsibility رعایت شود.
import {useEffect, useState} from "react";
import type {ProjectStatus} from "../types";

export interface ProjectCreateFormState {
  name: string;
  status: ProjectStatus;
  budget: string;
  deadline: string;
}

export interface UseProjectCreateFormResult extends ProjectCreateFormState {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<ProjectStatus>>;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  setDeadline: React.Dispatch<React.SetStateAction<string>>;
  canSave: boolean;
  handleSubmit: () => void;
}

// مقدار پیش‌فرض برای فیلد تاریخ: دو هفته بعد از امروز به صورت yyyy-mm-dd
function getDefaultDeadline() {
  const defaultDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  return defaultDate.toISOString().slice(0, 10);
}

export function useProjectCreateForm(
  open: boolean,
  onCreate: (project: {
    name: string;
    status: ProjectStatus;
    budget: number;
    deadline?: string;
  }) => void,
  onClose: () => void
): UseProjectCreateFormResult {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");
  const [budget, setBudget] = useState("12000");
  const [deadline, setDeadline] = useState(getDefaultDeadline());

  useEffect(() => {
    if (!open) return;

    // وقتی مودال باز می‌شود، فرم را ریست می‌کنیم.
    // از میکروتسک برای به تعویق انداختن setStateها استفاده می‌کنیم تا
    // مشکلی با قوانین هوک‌ها و هشدارهای synchronous setState پیش نیاید.
    Promise.resolve().then(() => {
      setName("");
      setStatus("active");
      setBudget("12000");
      setDeadline(getDefaultDeadline());
    });
  }, [open]);

  const canSave = name.trim().length > 0;

  // هنگام ارسال فرم: اعتبارسنجی پایه انجام می‌شود و سپس داده‌ها به
  // `onCreate` فرستاده شده و مودال بسته می‌شود.
  const handleSubmit = () => {
    if (!canSave) return;

    onCreate({
      name: name.trim(),
      status,
      budget: Number(budget) || 0,
      deadline: deadline || undefined,
    });
    onClose();
  };

  return {
    name,
    status,
    budget,
    deadline,
    setName,
    setStatus,
    setBudget,
    setDeadline,
    canSave,
    handleSubmit,
  };
}

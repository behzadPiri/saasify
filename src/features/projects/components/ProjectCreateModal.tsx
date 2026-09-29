"use client";

// مودال ایجاد پروژه — یک کامپوننت نمایشی (View) است که فقط
// مسئول رندر فرم و ارسال داده‌ها از طریق کال‌بک‌ها است.
// منطق فرم در `useProjectCreateForm` قرار دارد تا کامپوننت سبک بماند.
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {useProjectCreateForm} from "@/features/projects";
import type {ProjectStatus} from "../types";

interface ProjectCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: {
    name: string;
    status: ProjectStatus;
    budget: number;
    deadline?: string;
  }) => void;
}

// گزینه‌های وضعیت پروژه که در select نمایش داده می‌شوند.
const STATUS_OPTIONS: Array<{value: ProjectStatus; labelKey: string}> = [
  {value: "active", labelKey: "status.active"},
  {value: "completed", labelKey: "status.completed"},
  {value: "on_hold", labelKey: "status.onHold"},
  {value: "archived", labelKey: "status.archived"},
];

export function ProjectCreateModal({open, onClose, onCreate}: ProjectCreateModalProps) {
  const t = useTranslations("Projects");
  const tCommon = useTranslations("Common");
  // دریافت وضعیت و هندلرهای فرم از هوک جداگانه
  const {
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
  } = useProjectCreateForm(open, onCreate, onClose);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* پس‌زمینهٔ مودال: کلیک روی آن مودال را می‌بندد */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* کانتینر مودال: شامل هدر، فرم و اکشن‌ها */}
      <div className="relative mx-4 mb-4 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-border/40 bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:mx-0 sm:mb-0">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* هدر مودال: عنوان و توضیح کوتاه */}
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{t("newProject")}</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">{t("modal.title")}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("modal.description")}</p>
          </div>
          {/* دکمه بستن مودال */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/50 bg-card/90 text-muted-foreground transition hover:bg-muted/70 hover:text-foreground"
            aria-label={tCommon("close")}
          >
            <Icons.X size={18} />
          </button>
        </div>

        {/* فرم ورودی: نام، بودجه، مهلت و وضعیت */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">{t("modal.name")}</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t("modal.name")}
              className="mt-2 w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">{t("modal.budget")}</span>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/60 bg-card/80 px-4 py-3">
              <span className="text-sm text-muted-foreground">$</span>
              <input
                type="number"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">{t("modal.deadline")}</span>
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">{t("modal.status")}</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as ProjectStatus)}
              className="mt-2 w-full rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.labelKey)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* اکشن‌ها: لغو یا ذخیره */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            {tCommon("cancel")}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSave}
            className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {tCommon("save")}
          </button>
        </div>
      </div>
    </div>
  );
}

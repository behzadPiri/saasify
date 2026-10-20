"use client";

/**
 * مودال تغییر سطح دسترسی عضو
 * نقش‌ها به صورت کارت‌های قابل انتخاب (radio) نمایش داده می‌شوند.
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Modal} from "@/shared/components/ui";
import {TEAM_ACCESS_ROLE_OPTIONS} from "../constants";
import {useMemberAccessForm} from "@/features/team";
import type {TeamMember, TeamRole} from "../types";

interface ChangeAccessModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSubmit: (role: TeamRole) => void;
}

export function ChangeAccessModal({open, member, onClose, onSubmit}: ChangeAccessModalProps) {
  const t = useTranslations("Team");
  const tCommon = useTranslations("Common");
  const {role, setRole, canSubmit, handleSubmit} = useMemberAccessForm({open, member, onClose, onSubmit});

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={t("profile.access.title")}
      className="mx-4 mb-4 max-w-2xl rounded-[30px] sm:mx-0 sm:mb-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            {t("profile.access.badge")}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">{t("profile.access.title")}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {t("profile.access.description", {name: member?.name ?? ""})}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-card/90 text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
          aria-label={tCommon("close")}
        >
          <Icons.X size={18} />
        </button>
      </div>

      <div role="radiogroup" aria-label={t("profile.access.title")} className="mt-6 grid gap-3 sm:grid-cols-2">
        {TEAM_ACCESS_ROLE_OPTIONS.map((option) => {
          const isSelected = option.value === role;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setRole(option.value)}
              className={`flex h-full flex-col gap-2 rounded-2xl border p-4 text-start transition ${
                isSelected
                  ? "border-primary bg-primary/10 text-foreground shadow-sm"
                  : "border-border/50 bg-background/60 text-foreground hover:border-primary/30 hover:bg-accent/30"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{t(option.labelKey)}</span>
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border/70 text-transparent"
                  }`}
                >
                  <Icons.Check size={12} />
                </span>
              </span>
              <span className="text-xs leading-5 text-muted-foreground">{t(option.descriptionKey)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted/80"
        >
          {tCommon("cancel")}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icons.Shield size={16} />
          {t("profile.access.submit")}
        </button>
      </div>
    </Modal>
  );
}

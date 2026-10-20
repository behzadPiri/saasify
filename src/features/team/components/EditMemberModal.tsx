"use client";

/**
 * مودال ویرایش پروفایل عضو
 * فرم نام، ایمیل و موقعیت مکانی را با اعتبارسنجی پایه نمایش می‌دهد.
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Modal} from "@/shared/components/ui";
import {useMemberEditForm, type MemberEditValues} from "@/features/team";
import type {TeamMember} from "../types";

interface EditMemberModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSubmit: (values: MemberEditValues) => void;
}

export function EditMemberModal({open, member, onClose, onSubmit}: EditMemberModalProps) {
  const t = useTranslations("Team");
  const tCommon = useTranslations("Common");
  const {name, email, location, error, canSubmit, handleNameChange, handleEmailChange, handleLocationChange, handleSubmit} =
    useMemberEditForm({open, member, onClose, onSubmit});

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={t("profile.edit.title")}
      className="mx-4 mb-4 max-w-2xl rounded-[30px] sm:mx-0 sm:mb-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            {t("profile.edit.badge")}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">{t("profile.edit.title")}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("profile.edit.description")}</p>
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("profile.edit.name")}
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder={t("profile.edit.namePlaceholder")}
            className="mt-2 w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("profile.edit.email")}
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
            placeholder={t("profile.edit.emailPlaceholder")}
            className="mt-2 w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("profile.edit.location")}
          </span>
          <input
            type="text"
            value={location}
            onChange={(event) => handleLocationChange(event.target.value)}
            placeholder={t("profile.edit.locationPlaceholder")}
            className="mt-2 w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-500/10 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

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
          <Icons.Check size={16} />
          {t("profile.edit.submit")}
        </button>
      </div>
    </Modal>
  );
}

"use client";

/**
 * مودال تأیید حذف عضو
 * پیش از حذف، نام عضو و هشدار غیرقابل‌بازگشت بودن عملیات نمایش داده می‌شود.
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Modal} from "@/shared/components/ui";
import type {TeamMember} from "../types";

interface RemoveMemberModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function RemoveMemberModal({open, member, onClose, onConfirm}: RemoveMemberModalProps) {
  const t = useTranslations("Team");
  const tCommon = useTranslations("Common");

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={t("profile.remove.title")}
      className="mx-4 mb-4 max-w-lg rounded-[30px] sm:mx-0 sm:mb-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
            <Icons.AlertTriangle size={22} />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("profile.remove.title")}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t("profile.remove.description", {name: member?.name ?? ""})}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card/90 text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
          aria-label={tCommon("close")}
        >
          <Icons.X size={18} />
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-red-200 bg-red-500/5 px-4 py-3 text-sm text-red-700">
        {t("profile.remove.warning")}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted/80"
        >
          {t("profile.remove.cancel")}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Icons.AlertTriangle size={16} />
          {t("profile.remove.confirm")}
        </button>
      </div>
    </Modal>
  );
}

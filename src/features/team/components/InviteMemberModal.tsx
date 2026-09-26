"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {TeamRole} from "../types";

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {email: string; role: TeamRole}) => void;
}

const ROLE_OPTIONS: Array<{value: TeamRole; labelKey: string}> = [
  {value: "admin", labelKey: "roles.admin"},
  {value: "member", labelKey: "roles.member"},
  {value: "viewer", labelKey: "roles.viewer"},
];

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function InviteMemberModal({open, onClose, onSubmit}: InviteMemberModalProps) {
  const t = useTranslations("Team");
  const tCommon = useTranslations("Common");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("member");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => isValidEmail(email), [email]);

  if (!open) {
    return null;
  }

  const handleSubmit = () => {
    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setError(t("invite.validation.invalidEmail"));
      return;
    }

    onSubmit({email: trimmedEmail, role});
    setEmail("");
    setRole("member");
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative mx-4 w-full max-w-xl overflow-hidden rounded-[30px] border border-border/40 bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:mx-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{t("invite.badge")}</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">{t("invite.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("invite.description")}</p>
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

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("invite.email")}</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              placeholder="team@saasify.dev"
              className="mt-2 w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("invite.role")}</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as TeamRole)}
              className="mt-2 w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.labelKey)}
                </option>
              ))}
            </select>
          </label>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-500/10 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
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
            className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("invite.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}

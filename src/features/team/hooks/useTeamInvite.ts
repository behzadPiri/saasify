"use client";

/**
 * هوک دعوت عضو
 * مدیریت باز/بسته شدن مودال و پیام اطلاع‌رسانی پس از دعوت
 */

import {useCallback, useState} from "react";
import {useTranslations} from "next-intl";
import type {TeamMember, TeamRole} from "../types";

interface UseTeamInviteOptions {
  addMember: (payload: {email: string; role: TeamRole; locale: string}) => TeamMember;
  locale: string;
}

export function useTeamInvite({addMember, locale}: UseTeamInviteOptions) {
  const t = useTranslations("Team");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const openInvite = useCallback(() => setIsInviteOpen(true), []);
  const closeInvite = useCallback(() => setIsInviteOpen(false), []);
  const dismissNotice = useCallback(() => setNotice(null), []);

  const handleInviteSubmit = useCallback(
    ({email, role}: {email: string; role: TeamRole}) => {
      const created = addMember({email, role, locale});
      setNotice(t("invite.success", {email: created.email}));
    },
    [addMember, locale, t]
  );

  return {
    isInviteOpen,
    notice,
    openInvite,
    closeInvite,
    dismissNotice,
    handleInviteSubmit,
  };
}

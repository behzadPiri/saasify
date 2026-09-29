"use client";

/**
 * هوک فرم دعوت عضو
 * مدیریت ایمیل، نقش و اعتبارسنجی پیش از ارسال
 */

import {useCallback, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import type {TeamRole} from "../types";

interface UseInviteMemberModalOptions {
  onClose: () => void;
  onSubmit: (payload: {email: string; role: TeamRole}) => void;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function useInviteMemberModal({onClose, onSubmit}: UseInviteMemberModalOptions) {
  const t = useTranslations("Team");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("member");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => isValidEmail(email), [email]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
  }, []);

  const handleRoleChange = useCallback((value: TeamRole) => {
    setRole(value);
  }, []);

  const reset = useCallback(() => {
    setEmail("");
    setRole("member");
    setError(null);
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setError(t("invite.validation.invalidEmail"));
      return;
    }

    onSubmit({email: trimmedEmail, role});
    reset();
    onClose();
  }, [email, onClose, onSubmit, reset, role, t]);

  return {
    email,
    role,
    error,
    canSubmit,
    handleEmailChange,
    handleRoleChange,
    handleSubmit,
  };
}

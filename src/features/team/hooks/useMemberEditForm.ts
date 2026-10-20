"use client";

/**
 * هوک فرم ویرایش پروفایل عضو
 * مقداردهی اولیه از عضو انتخاب‌شده، اعتبارسنجی و ارسال مقادیر به کال‌بک
 */

import {useCallback, useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import type {TeamMember} from "../types";

export interface MemberEditValues {
  name: string;
  email: string;
  location: string;
}

interface UseMemberEditFormOptions {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSubmit: (values: MemberEditValues) => void;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function useMemberEditForm({open, member, onClose, onSubmit}: UseMemberEditFormOptions) {
  const t = useTranslations("Team");
  const [name, setName] = useState(member?.name ?? "");
  const [email, setEmail] = useState(member?.email ?? "");
  const [location, setLocation] = useState(member?.location ?? "");
  const [error, setError] = useState<string | null>(null);

  // با هر بار باز شدن مودال، فرم با اطلاعات فعلی عضو هم‌گام می‌شود.
  useEffect(() => {
    if (!open || !member) return;

    Promise.resolve().then(() => {
      setName(member.name);
      setEmail(member.email);
      setLocation(member.location);
      setError(null);
    });
  }, [open, member]);

  const clearError = useCallback(() => setError(null), []);

  const handleNameChange = useCallback(
    (value: string) => {
      setName(value);
      clearError();
    },
    [clearError]
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      clearError();
    },
    [clearError]
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      setLocation(value);
      clearError();
    },
    [clearError]
  );

  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && location.trim().length > 0;

  const handleSubmit = useCallback(() => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedLocation = location.trim();

    if (!trimmedName) {
      setError(t("profile.edit.validation.nameRequired"));
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError(t("profile.edit.validation.invalidEmail"));
      return;
    }

    if (!trimmedLocation) {
      setError(t("profile.edit.validation.locationRequired"));
      return;
    }

    onSubmit({name: trimmedName, email: trimmedEmail, location: trimmedLocation});
    onClose();
  }, [email, location, name, onClose, onSubmit, t]);

  return {
    name,
    email,
    location,
    error,
    canSubmit,
    handleNameChange,
    handleEmailChange,
    handleLocationChange,
    handleSubmit,
  };
}

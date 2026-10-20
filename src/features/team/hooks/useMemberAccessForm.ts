"use client";

/**
 * هوک فرم تغییر سطح دسترسی عضو
 * نقش فعلی را به‌عنوان مقدار اولیه می‌گیرد و تنها در صورت تغییر نقش
 * امکان ذخیره می‌دهد.
 */

import {useCallback, useEffect, useState} from "react";
import type {TeamMember, TeamRole} from "../types";

interface UseMemberAccessFormOptions {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSubmit: (role: TeamRole) => void;
}

export function useMemberAccessForm({open, member, onClose, onSubmit}: UseMemberAccessFormOptions) {
  const [role, setRole] = useState<TeamRole>(member?.role ?? "member");

  useEffect(() => {
    if (!open || !member) return;

    Promise.resolve().then(() => setRole(member.role));
  }, [open, member]);

  const handleSubmit = useCallback(() => {
    if (!member || role === member.role) return;

    onSubmit(role);
    onClose();
  }, [member, onClose, onSubmit, role]);

  return {
    role,
    setRole,
    canSubmit: Boolean(member) && role !== member?.role,
    handleSubmit,
  };
}

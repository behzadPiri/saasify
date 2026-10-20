"use client";

/**
 * هوک مرکزی تیم - مدیریت داده، فیلتر، مرتب‌سازی، جستجو و خلاصه
 * تنها منبع حقیقت برای وضعیت اعضا در صفحات تیم
 * داده از فروشگاه مشترک `team-store` خوانده می‌شود تا ویرایش/حذف عضو
 * بین صفحهٔ فهرست و صفحهٔ جزئیات هم‌زمان بازتاب پیدا کند.
 */

import {useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore} from "react";
import {
  addTeamMember,
  avatarColorForRole,
  getServerTeamMembersSnapshot,
  getTeamMembersSnapshot,
  removeTeamMember,
  subscribeTeamMembers,
  updateTeamMember,
  type TeamMemberPatch,
} from "../lib/team-store";
import type {TeamFilterOption, TeamMember, TeamRole, TeamSortOption} from "../types";

export interface TeamSummary {
  total: number;
  online: number;
  managers: number;
}

const LOADING_DELAY = 400;

export function useTeamPage() {
  const members = useSyncExternalStore(
    subscribeTeamMembers,
    getTeamMembersSnapshot,
    getServerTeamMembersSnapshot
  );

  const [statusFilter, setStatusFilter] = useState<TeamFilterOption>("all");
  const [sortBy, setSortBy] = useState<TeamSortOption>("name");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // نمایش کوتاه اسکلت بارگذاری در اولین mount (حفظ UX قبلی)
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), LOADING_DELAY);

    return () => clearTimeout(timeout);
  }, []);

  // پاک‌سازی تایمرِ refresh هنگام unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      timeoutRef.current = null;
    }, LOADING_DELAY);
  }, []);

  const filteredMembers = useMemo(() => {
    const filtered = members.filter((member) => {
      return !(statusFilter !== "all" && member.role !== statusFilter);
    });

    return [...filtered].sort((left, right) => {
      if (sortBy === "role") {
        return left.role.localeCompare(right.role);
      }

      if (sortBy === "lastActive") {
        return new Date(right.lastActiveAt).getTime() - new Date(left.lastActiveAt).getTime();
      }

      return left.name.localeCompare(right.name);
    });
  }, [members, sortBy, statusFilter]);

  const visibleMembers = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return filteredMembers;
    }

    return filteredMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch)
    );
  }, [filteredMembers, searchValue]);

  const summary = useMemo<TeamSummary>(() => {
    const total = filteredMembers.length;
    const online = filteredMembers.filter((member) => member.status === "online").length;
    const managers = filteredMembers.filter((member) => member.role === "owner" || member.role === "admin").length;

    return {total, online, managers};
  }, [filteredMembers]);

  const handleRoleFilterChange = useCallback((value: TeamFilterOption) => {
    setStatusFilter(value);
  }, []);

  const handleSortChange = useCallback((value: TeamSortOption) => {
    setSortBy(value);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchValue("");
    setStatusFilter("all");
  }, []);

  const addMember = useCallback(
    ({email, role, locale}: {email: string; role: TeamRole; locale: string}) => {
      const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
      const created: TeamMember = {
        id: `tm-${Date.now()}`,
        name,
        email,
        role,
        status: "online",
        location: locale === "fa" ? "Tehran, IR" : "Remote",
        projects: 0,
        lastActive: "just now",
        lastActiveAt: new Date().toISOString(),
        joinedAt: new Date().toISOString(),
        avatarColor: avatarColorForRole(role),
      };

      return addTeamMember(created);
    },
    []
  );

  const updateMember = useCallback((memberId: string, patch: TeamMemberPatch) => {
    return updateTeamMember(memberId, patch);
  }, []);

  const removeMember = useCallback((memberId: string) => {
    return removeTeamMember(memberId);
  }, []);

  return {
    // Data
    members,
    filteredMembers,
    visibleMembers,
    summary,

    // State
    statusFilter,
    sortBy,
    searchValue,
    isLoading,
    error,

    // Actions
    refresh,
    addMember,
    updateMember,
    removeMember,

    // Filter handlers
    handleRoleFilterChange,
    handleSortChange,
    handleSearchChange,
    clearFilters,
  };
}

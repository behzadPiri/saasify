"use client";

/**
 * هوک مرکزی تیم - مدیریت داده، فیلتر، مرتب‌سازی، جستجو و خلاصه
 * تنها منبع حقیقت برای وضعیت اعضا در صفحات تیم
 * بهینه شده برای جلوگیری از حافظه‌گرفت و رندرهای اضافی
 */

import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {createMockTeam} from "../lib/mockTeam";
import type {TeamFilterOption, TeamMember, TeamRole, TeamSortOption} from "../types";

const toAvatarColor = (role: TeamRole) => {
  if (role === "owner") return "from-violet-500 to-indigo-500";
  if (role === "admin") return "from-sky-500 to-cyan-500";
  if (role === "member") return "from-emerald-500 to-teal-500";
  return "from-stone-500 to-slate-500";
};

export interface TeamSummary {
  total: number;
  online: number;
  managers: number;
}

export function useTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [statusFilter, setStatusFilter] = useState<TeamFilterOption>("all");
  const [sortBy, setSortBy] = useState<TeamSortOption>("name");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountRef = useRef(true);

  // Initialize data immediately without calling setState in effect
  useEffect(() => {
    // Schedule the data loading but don't set state here
    timeoutRef.current = setTimeout(() => {
      try {
        setMembers(createMockTeam());
      } catch {
        setError("Unable to load team members.");
      } finally {
        if (mountRef.current) {
          setIsLoading(false);
        }
      }
    }, 400);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const loadMembers = useCallback(() => {
    setIsLoading(true);
    setError(null);

    timeoutRef.current = setTimeout(() => {
      try {
        setMembers(createMockTeam());
      } catch {
        setError("Unable to load team members.");
      } finally {
        if (mountRef.current) {
          setIsLoading(false);
        }
      }
    }, 400);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
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

  const refresh = useCallback(() => {
    loadMembers();
  }, [loadMembers]);

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
        avatarColor: toAvatarColor(role),
      };

      setMembers((current) => [created, ...current]);
      return created;
    },
    []
  );

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

    // Filter handlers
    handleRoleFilterChange,
    handleSortChange,
    handleSearchChange,
    clearFilters,
  };
}
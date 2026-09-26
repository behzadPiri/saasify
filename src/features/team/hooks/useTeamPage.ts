"use client";

import {useCallback, useEffect, useMemo, useState} from "react";
import {createMockTeam} from "../lib/mockTeam";
import type {TeamFilterOption, TeamMember, TeamRole, TeamSortOption} from "../types";

const toAvatarColor = (role: TeamRole) => {
  if (role === "owner") return "from-violet-500 to-indigo-500";
  if (role === "admin") return "from-sky-500 to-cyan-500";
  if (role === "member") return "from-emerald-500 to-teal-500";
  return "from-stone-500 to-slate-500";
};

export function useTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [statusFilter, setStatusFilter] = useState<TeamFilterOption>("all");
  const [sortBy, setSortBy] = useState<TeamSortOption>("name");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMembers = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const timeout = window.setTimeout(() => {
      try {
        setMembers(createMockTeam());
      } catch {
        setError("Unable to load team members.");
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => loadMembers());
  }, [loadMembers]);

  const filteredMembers = useMemo(() => {
    const filtered = members.filter((member) => {
      if (statusFilter !== "all" && member.role !== statusFilter) {
        return false;
      }

      return true;
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

  const handleRoleFilterChange = useCallback((value: TeamFilterOption) => {
    setStatusFilter(value);
  }, []);

  const handleSortChange = useCallback((value: TeamSortOption) => {
    setSortBy(value);
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
    members,
    filteredMembers,
    statusFilter,
    sortBy,
    isLoading,
    error,
    refresh,
    addMember,
    handleRoleFilterChange,
    handleSortChange,
  };
}

"use client";

/**
 * هوک کارت عضو تیم
 * استایل نقش، برچسب وضعیت، زمان نسبی و مقصد لینک
 */

import {useLocale, useTranslations} from "next-intl";
import {getRelativeTime} from "../lib/relative-time";
import {TEAM_ROLE_STYLE, TEAM_STATUS_STYLE} from "../constants";
import type {TeamMember} from "../types";

export function useTeamMemberCard(member: TeamMember) {
  const t = useTranslations("Team");
  const locale = useLocale();

  const roleStyle = TEAM_ROLE_STYLE[member.role];
  const statusDotClass = TEAM_STATUS_STYLE[member.status];
  const statusLabel = t(`status.${member.status}`);
  const relativeActivity = member.lastActiveAt ? getRelativeTime(member.lastActiveAt, locale) : member.lastActive;
  const href = `/team/${member.id}/projects`;

  const initials = member.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return {
    t,
    initials,
    roleBadgeClass: roleStyle.badge,
    roleLabel: t(roleStyle.labelKey),
    statusDotClass,
    statusLabel,
    relativeActivity,
    href,
  };
}

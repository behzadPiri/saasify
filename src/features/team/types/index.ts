/**
 * تایپ‌های تیم
 * شامل اعضا، نقش‌ها، فیلترها و دید صفحهٔ جزئیات عضو
 */

export type TeamRole = "owner" | "admin" | "member" | "viewer";
export type TeamMemberStatus = "online" | "away" | "offline";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamMemberStatus;
  location: string;
  projects: number;
  lastActive: string;
  lastActiveAt: string;
  joinedAt: string;
  avatarColor: string;
}

export type TeamSortOption = "name" | "role" | "lastActive";
export type TeamFilterOption = TeamRole | "all";

/** نمای فعال صفحهٔ جزئیات عضو (مسیرهای [memberId] و [memberId]/projects) */
export type TeamMemberView = "overview" | "projects";

/** فیلدهای نمای هیرو/کارت‌های آمار تیم */
export interface TeamStat {
  id: "totalMembers" | "activeNow" | "managers";
  label: string;
  value: number;
  badgeLabel: string;
  tone: "emerald" | "primary" | "violet";
  showDot?: boolean;
}

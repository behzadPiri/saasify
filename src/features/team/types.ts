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

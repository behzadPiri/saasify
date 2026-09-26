import type {TeamRole} from "./types";

export const TEAM_FILTER_OPTIONS = ["all", "owner", "admin", "member", "viewer"] as const;

export const TEAM_ROLE_STYLE: Record<TeamRole, {badge: string; labelKey: string}> = {
  owner: {
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    labelKey: "roles.owner",
  },
  admin: {
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    labelKey: "roles.admin",
  },
  member: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    labelKey: "roles.member",
  },
  viewer: {
    badge: "bg-muted text-muted-foreground",
    labelKey: "roles.viewer",
  },
};

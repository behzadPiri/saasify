/**
 * فروشگاه مشترک تیم (سمت کلاینت)
 * ------------------------------------------------------------------
 * دادهٔ نمونهٔ تیم پیش‌تر در هر بار mount شدن هوک `useTeamPage` از نو ساخته
 * می‌شد؛ در نتیجه ویرایش/حذف عضو در صفحهٔ جزئیات روی فهرست تیم اثری نداشت.
 * این ماژول یک منبع حقیقت ساده و سبک (بدون وابستگی خارجی) فراهم می‌کند تا
 * همهٔ صفحات تیم یک نسخهٔ مشترک از اعضا و پروژه‌ها را ببینند.
 *
 * - اعضا در `localStorage` نگه‌داری می‌شوند تا حذف/ویرایش پس از رفرش هم باقی بماند.
 * - پروژه‌ها فقط در حافظه نگه‌داری می‌شوند (تاریخ‌ها از نوع Date هستند و
 *   سریال‌سازی/بازگردانی آن‌ها دردسر اضافه ایجاد می‌کند).
 */

import type {ProjectSummary} from "@/features/projects";
import {TEAM_MEMBER_PROJECTS} from "../constants/member-projects";
import type {TeamMember, TeamRole} from "../types";
import {createMockTeam} from "./mockTeam";

const MEMBERS_STORAGE_KEY = "saasify:team-members:v1";

export type TeamMemberPatch = Partial<Pick<TeamMember, "name" | "email" | "location" | "role">>;

type Listener = () => void;

// ---------------------------------------------------------------------------
// اعضا
// ---------------------------------------------------------------------------

const memberListeners = new Set<Listener>();

// snapshotهایی که React (useSyncExternalStore) روی آن‌ها تکیه می‌کند باید
// مرجع پایدار داشته باشند؛ بنابراین آرایه‌ها فقط هنگام تغییر عوض می‌شوند.
const SERVER_MEMBERS: TeamMember[] = createMockTeam();
let membersSnapshot: TeamMember[] | null = null;

function readPersistedMembers(): TeamMember[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(MEMBERS_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    return parsed as TeamMember[];
  } catch {
    return null;
  }
}

function persistMembers(members: TeamMember[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  } catch {
    // در حالت‌هایی مثل حالت ناشناس یا پر بودن فضای ذخیره‌سازی، بی‌صدا رد می‌شویم.
  }
}

function notifyMembers() {
  memberListeners.forEach((listener) => listener());
}

function commitMembers(next: TeamMember[]) {
  membersSnapshot = next;
  persistMembers(next);
  notifyMembers();
}

export function getTeamMembersSnapshot(): TeamMember[] {
  if (!membersSnapshot) {
    membersSnapshot = readPersistedMembers() ?? SERVER_MEMBERS;
  }

  return membersSnapshot;
}

export function getServerTeamMembersSnapshot(): TeamMember[] {
  return SERVER_MEMBERS;
}

export function subscribeTeamMembers(listener: Listener): () => void {
  memberListeners.add(listener);
  return () => memberListeners.delete(listener);
}

export function addTeamMember(member: TeamMember): TeamMember {
  commitMembers([member, ...getTeamMembersSnapshot()]);
  return member;
}

export function updateTeamMember(memberId: string, patch: TeamMemberPatch): TeamMember | undefined {
  let updated: TeamMember | undefined;

  const next = getTeamMembersSnapshot().map((member) => {
    if (member.id !== memberId) return member;
    updated = {...member, ...patch};
    return updated;
  });

  if (!updated) return undefined;

  commitMembers(next);
  return updated;
}

export function removeTeamMember(memberId: string): TeamMember | undefined {
  const current = getTeamMembersSnapshot();
  const removed = current.find((member) => member.id === memberId);

  if (!removed) return undefined;

  commitMembers(current.filter((member) => member.id !== memberId));
  return removed;
}

/** رنگ آواتار متناسب با نقش (برای ساخت اعضای جدید) */
export function avatarColorForRole(role: TeamRole): string {
  if (role === "owner") return "from-violet-500 to-indigo-500";
  if (role === "admin") return "from-sky-500 to-cyan-500";
  if (role === "member") return "from-emerald-500 to-teal-500";
  return "from-stone-500 to-slate-500";
}

// ---------------------------------------------------------------------------
// پروژه‌های هر عضو
// ---------------------------------------------------------------------------

const projectListeners = new Set<Listener>();
const EMPTY_PROJECTS: ProjectSummary[] = [];
let projectsSnapshot: Record<string, ProjectSummary[]> | null = null;

function getProjectsState(): Record<string, ProjectSummary[]> {
  if (!projectsSnapshot) {
    projectsSnapshot = {};
    for (const [memberId, projects] of Object.entries(TEAM_MEMBER_PROJECTS)) {
      projectsSnapshot[memberId] = [...projects];
    }
  }

  return projectsSnapshot;
}

export function getMemberProjectsSnapshot(memberId: string): ProjectSummary[] {
  return getProjectsState()[memberId] ?? EMPTY_PROJECTS;
}

export function getServerMemberProjectsSnapshot(memberId: string): ProjectSummary[] {
  return TEAM_MEMBER_PROJECTS[memberId] ?? EMPTY_PROJECTS;
}

export function subscribeMemberProjects(listener: Listener): () => void {
  projectListeners.add(listener);
  return () => projectListeners.delete(listener);
}

export function addMemberProject(memberId: string, project: ProjectSummary) {
  const state = getProjectsState();

  projectsSnapshot = {
    ...state,
    [memberId]: [project, ...(state[memberId] ?? [])],
  };

  projectListeners.forEach((listener) => listener());
}

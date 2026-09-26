import type {TeamMember} from "../types";

function minutesAgo(value: number) {
  const date = new Date(Date.now() - value * 60 * 1000);
  return date.toISOString();
}

function hoursAgo(value: number) {
  const date = new Date(Date.now() - value * 60 * 60 * 1000);
  return date.toISOString();
}

function daysAgo(value: number) {
  const date = new Date(Date.now() - value * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

export function createMockTeam(): TeamMember[] {
  return [
    {
      id: "tm-101",
      name: "Behzad Piray",
      email: "behzad@saasify.dev",
      role: "owner",
      status: "online",
      location: "Tehran, IR",
      projects: 5,
      lastActive: "2 min ago",
      lastActiveAt: minutesAgo(2),
      joinedAt: "2023-01-11T09:00:00.000Z",
      avatarColor: "from-violet-500 to-indigo-500",
    },
    {
      id: "tm-102",
      name: "Ava Collins",
      email: "ava@saasify.dev",
      role: "admin",
      status: "online",
      location: "London, UK",
      projects: 4,
      lastActive: "12 min ago",
      lastActiveAt: minutesAgo(12),
      joinedAt: "2022-09-14T14:30:00.000Z",
      avatarColor: "from-sky-500 to-cyan-500",
    },
    {
      id: "tm-103",
      name: "Noah Kim",
      email: "noah@saasify.dev",
      role: "member",
      status: "away",
      location: "Seoul, KR",
      projects: 3,
      lastActive: "1 hr ago",
      lastActiveAt: hoursAgo(1),
      joinedAt: "2022-06-09T12:15:00.000Z",
      avatarColor: "from-emerald-500 to-teal-500",
    },
    {
      id: "tm-104",
      name: "Mila Garcia",
      email: "mila@saasify.dev",
      role: "member",
      status: "offline",
      location: "Madrid, ES",
      projects: 2,
      lastActive: "3 hr ago",
      lastActiveAt: hoursAgo(3),
      joinedAt: "2024-03-18T11:45:00.000Z",
      avatarColor: "from-amber-500 to-orange-500",
    },
    {
      id: "tm-105",
      name: "Leo Martin",
      email: "leo@saasify.dev",
      role: "viewer",
      status: "offline",
      location: "Toronto, CA",
      projects: 1,
      lastActive: "Yesterday",
      lastActiveAt: daysAgo(1),
      joinedAt: "2021-11-25T08:20:00.000Z",
      avatarColor: "from-stone-500 to-slate-500",
    },
    {
      id: "tm-106",
      name: "Sara Nouri",
      email: "sara@saasify.dev",
      role: "admin",
      status: "online",
      location: "Dubai, AE",
      projects: 3,
      lastActive: "6 min ago",
      lastActiveAt: minutesAgo(6),
      joinedAt: "2023-08-16T16:10:00.000Z",
      avatarColor: "from-pink-500 to-rose-500",
    },
  ];
}

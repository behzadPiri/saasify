"use client";

import {useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {ProjectCreateModal} from "@/features/projects/components/ProjectCreateModal";
import {ProjectCard} from "@/features/projects/components/ProjectCard";
import {getRelativeTime} from "./lib/relative-time";
import {createMockTeam} from "./lib/mockTeam";
import {useTeamPage} from "./hooks/useTeamPage";
import type {TeamMember} from "./types";
import type {ProjectStatus, ProjectSummary} from "@/features/projects";
import {Icons} from "@/shared/components/ui/icons";

const TEAM_PROJECTS: Record<string, ProjectSummary[]> = {
  "tm-101": [
    {id: "team-101-a", name: "Platform Rebrand", status: "active", progress: 64, members: 5, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), budget: 18000, updatedAt: new Date()},
    {id: "team-101-b", name: "Retention Dashboard", status: "completed", progress: 100, members: 3, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), budget: 12000, updatedAt: new Date()},
    {id: "team-101-c", name: "Billing Optimization", status: "on_hold", progress: 38, members: 2, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 16), budget: 9500, updatedAt: new Date()},
  ],
  "tm-102": [
    {id: "team-102-a", name: "Customer Portal", status: "active", progress: 72, members: 4, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 11), budget: 22000, updatedAt: new Date()},
    {id: "team-102-b", name: "CRM Sync", status: "active", progress: 57, members: 5, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), budget: 16800, updatedAt: new Date()},
  ],
  "tm-103": [
    {id: "team-103-a", name: "Marketing Automation", status: "active", progress: 48, members: 3, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), budget: 11000, updatedAt: new Date()},
    {id: "team-103-b", name: "Support Flow", status: "archived", progress: 100, members: 2, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), budget: 5000, updatedAt: new Date()},
  ],
  "tm-104": [
    {id: "team-104-a", name: "QA Pass", status: "completed", progress: 100, members: 2, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), budget: 7400, updatedAt: new Date()},
  ],
  "tm-105": [
    {id: "team-105-a", name: "Research Notes", status: "on_hold", progress: 27, members: 1, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20), budget: 3000, updatedAt: new Date()},
  ],
  "tm-106": [
    {id: "team-106-a", name: "Launch Campaign", status: "active", progress: 81, members: 6, deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6), budget: 25000, updatedAt: new Date()},
    {id: "team-106-b", name: "Ops Workflow", status: "completed", progress: 100, members: 3, deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9), budget: 7800, updatedAt: new Date()},
  ],
};

interface TeamMemberDetailProps {
  memberId: string;
}

export function TeamMemberDetail({memberId}: TeamMemberDetailProps) {
  const t = useTranslations("Team");
  const locale = useLocale();
  const {members} = useTeamPage();
  const teamMembers = useMemo(() => createMockTeam(), []);
  const allMembers = useMemo(
    () => [
      ...teamMembers,
      ...members.filter((item) => !teamMembers.some((teamMember) => teamMember.id === item.id)),
    ],
    [members, teamMembers]
  );
  const resolvedMember = useMemo<TeamMember | undefined>(() => {
    return allMembers.find((item) => item.id === memberId);
  }, [allMembers, memberId]);

  const [projectOverrides, setProjectOverrides] = useState<Record<string, ProjectSummary[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState<{type: "success" | "error"; message: string} | null>(null);

  const projects = useMemo(() => {
    const seededProjects = TEAM_PROJECTS[memberId] ?? [];
    return projectOverrides[memberId] ?? seededProjects;
  }, [memberId, projectOverrides]);

  const visibleProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return projects;
    }

    return projects.filter((project) => project.name.toLowerCase().includes(normalizedSearch));
  }, [projects, searchTerm]);

  const handleCreateProject = async (project: {
    name: string;
    status: ProjectStatus;
    budget: number;
    deadline?: string;
  }) => {
    const nextProject: ProjectSummary = {
      id: `team-${memberId}-${Date.now()}`,
      name: project.name,
      status: project.status,
      progress: 0,
      members: 1,
      deadline: project.deadline ? new Date(project.deadline) : undefined,
      budget: project.budget,
      updatedAt: new Date(),
    };

    setProjectOverrides((current) => {
      const existing = current[memberId] ?? TEAM_PROJECTS[memberId] ?? [];
      return {
        ...current,
        [memberId]: [nextProject, ...existing],
      };
    });
    setFeedback({
      type: "success",
      message: t("create.success", {name: project.name}),
    });
    setSearchTerm("");
  };

  if (!resolvedMember) {
    return (
      <div className="space-y-6 w-full">
        <div className="rounded-[28px] border border-dashed border-border/70 bg-card/80 p-10 text-center">
          <Icons.AlertCircle className="mx-auto text-muted-foreground" size={38} />
          <h1 className="mt-4 text-2xl font-bold text-foreground">{t("memberNotFound")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("memberNotFoundDescription")}</p>
          <Link href="/team" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
            <Icons.ArrowLeft size={16} />
            {t("backToTeam")}
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 0}).format(value);

  const activityItems = [
    {label: "Reviewed sprint goals", time: "2 hours ago"},
    {label: "Updated roadmap priorities", time: "Yesterday"},
    {label: "Closed 3 QA tickets", time: "3 days ago"},
  ];

  const relativeLastSeen = getRelativeTime(resolvedMember.lastActiveAt ?? new Date(), locale);
  const joinedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(resolvedMember.joinedAt));

  return (
    <div className="space-y-6 w-full">
      <div className="rounded-[30px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${resolvedMember.avatarColor} text-lg font-bold text-white`}>
              {resolvedMember.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? "")
                .join("")}
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                {t(`roles.${resolvedMember.role}`)}
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{resolvedMember.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{resolvedMember.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/team" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40">
              <Icons.ArrowLeft size={16} />
              {t("backToTeam")}
            </Link>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95"
            >
              <Icons.Plus size={16} />
              {t("createProject")}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("meta.location")}</p>
            <p className="mt-3 text-lg font-semibold text-foreground">{resolvedMember.location}</p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("meta.projects")}</p>
            <p className="mt-3 text-lg font-semibold text-foreground">{projects.length}</p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("meta.status")}</p>
            <div className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-foreground">
              <span className={`h-2.5 w-2.5 rounded-full ${resolvedMember.status === "online" ? "bg-emerald-500" : resolvedMember.status === "away" ? "bg-amber-500" : "bg-slate-400"}`} />
              {t(`status.${resolvedMember.status}`)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("profile.joined")}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{joinedDate}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              {relativeLastSeen}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 p-4">
              <span className="text-sm text-muted-foreground">{t("profile.activeStatus")}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className={`h-2 w-2 rounded-full ${resolvedMember.status === "online" ? "bg-emerald-500" : resolvedMember.status === "away" ? "bg-amber-500" : "bg-slate-400"}`} />
                {t(`status.${resolvedMember.status}`)}
              </span>
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
              <p className="text-sm font-medium text-muted-foreground">{t("profile.recentActivity")}</p>
              <ul className="mt-4 space-y-3">
                {activityItems.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-3 rounded-xl bg-card/60 px-3 py-2">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border/50 bg-background/60 px-4 py-3 text-left text-sm font-medium text-foreground transition hover:bg-accent/40"
            >
              <span>{t("profile.actions.edit")}</span>
              <Icons.Edit size={16} />
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border/50 bg-background/60 px-4 py-3 text-left text-sm font-medium text-foreground transition hover:bg-accent/40"
            >
              <span>{t("profile.actions.access")}</span>
              <Icons.Settings size={16} />
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-500/5 px-4 py-3 text-left text-sm font-semibold text-red-700 transition hover:bg-red-500/10"
            >
              <span>{t("profile.actions.delete")}</span>
              <Icons.AlertCircle size={16} />
            </button>
          </div>
        </aside>
      </div>

      <section className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("projects.title")}</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{t("projects.subtitle")}</h2>
          </div>

          <label className="relative block w-full max-w-md">
            <span className="sr-only">{t("projects.search")}</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t("projects.search")}
              className="w-full rounded-2xl border border-border/60 bg-background/60 py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <Icons.Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </label>
        </div>

        {feedback ? (
          <div
            className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-500/10 text-emerald-700"
                : "border-red-200 bg-red-500/10 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        {visibleProjects.length === 0 ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-border/70 bg-background/50 p-10 text-center">
            <Icons.Inbox size={42} className="mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">{t("projects.emptyTitle")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t("projects.emptyDescription")}</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                formatDate={(date) => new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", year: "numeric"}).format(date)}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        )}
      </section>

      <ProjectCreateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}

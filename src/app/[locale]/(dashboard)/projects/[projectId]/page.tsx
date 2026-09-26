import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Icons} from "@/shared/components/ui/icons";
import {PROJECT_STATUS_STYLE} from "@/features/projects/constants";
import {createMockProjects} from "@/features/projects/lib/mockProjects";

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectDetailPage({params}: ProjectDetailPageProps) {
  const t = useTranslations("Projects");
  const project = createMockProjects().find((item) => item.id === params.projectId);

  if (!project) {
    return (
      <div className="w-full space-y-6">
        <div className="rounded-[30px] border border-dashed border-border/70 bg-card/80 p-10 text-center shadow-sm backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icons.Folder size={30} />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-foreground">{t("projectNotFound")}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("projectNotFoundDescription")}</p>
          <Link
            href="/projects"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95"
          >
            <Icons.ArrowLeft size={16} />
            {t("backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  const statusStyle = PROJECT_STATUS_STYLE[project.status];
  const formatDate = (date?: Date) =>
    date ? new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", year: "numeric"}).format(date) : "—";
  const formatCurrency = (value?: number) =>
    value !== undefined ? new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 0}).format(value) : "—";

  const doneTasks = project.tasks?.filter((task) => task.status === "done").length ?? 0;
  const totalTasks = project.tasks?.length ?? 0;
  const completion = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-[30px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              <Icons.Folder size={12} />
              {t("projectDetails")}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{project.name}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{project.description ?? t("projectDetailsDescription")}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle.badge}`}>
              {t(statusStyle.labelKey)}
            </span>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40"
            >
              <Icons.ArrowLeft size={16} />
              {t("back")}
            </Link>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[26px] border border-border/40 bg-gradient-to-r from-primary/10 via-background/50 to-transparent p-5">
          <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>{t("progress")}</span>
            <span className="font-semibold text-foreground">{project.progress}%</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted/80">
            <div className="h-full rounded-full bg-primary transition-all duration-700" style={{width: `${project.progress}%`}} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("projectId")}</p>
                <p className="mt-2 text-xl font-semibold text-foreground">{project.id}</p>
              </div>
              <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">{completion}% {t("complete")}</div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("budget")}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{formatCurrency(project.budget)}</p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("members")}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{project.members}</p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("deadline")}</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{formatDate(project.deadline)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("tasks")}</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">{t("taskBoard")}</h2>
              </div>
              <div className="rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {doneTasks}/{totalTasks} {t("done")}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {(project.tasks ?? []).map((task) => (
                <div key={task.id} className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{task.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{task.assignee}</p>
                  </div>

                  <div className="flex items-center gap-2 sm:justify-end">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      task.status === "done"
                        ? "bg-emerald-500/10 text-emerald-700"
                        : task.status === "in_progress"
                          ? "bg-amber-500/10 text-amber-700"
                          : "bg-slate-500/10 text-slate-700"
                    }`}>
                      {task.status === "done" ? t("task.done") : task.status === "in_progress" ? t("task.inProgress") : t("task.todo")}
                    </span>
                    {task.dueDate ? (
                      <span className="text-xs text-muted-foreground">{formatDate(task.dueDate)}</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("timeline")}</p>
            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("startDate")}</p>
                <p className="mt-2 text-base font-semibold text-foreground">{formatDate(project.startDate)}</p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("dueDate")}</p>
                <p className="mt-2 text-base font-semibold text-foreground">{formatDate(project.dueDate)}</p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("updatedAt")}</p>
                <p className="mt-2 text-base font-semibold text-foreground">{formatDate(project.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("teamMembers")}</p>
            <div className="mt-5 space-y-3">
              {(project.teamMembers ?? []).map((member) => (
                <div key={member.id} className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/60 p-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${member.avatarColor} text-xs font-bold text-white`}>
                    {member.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase() ?? "")
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

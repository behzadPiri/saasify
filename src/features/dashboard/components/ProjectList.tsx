"use client";

/**
 * کامپوننت لیست پروژه‌ها
 * نمایش خلاصه پروژه‌ها با پیشرفت، وضعیت و اعضا
 */

import {useState, useEffect} from "react";
import {Icons} from "@/shared/components/ui/icons";
import type {ProjectSummary} from "../types";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {formatCurrency} from "@/shared/lib/number-format";
import {useProjectList} from "@/features/dashboard";

interface ProjectListProps {
    projects: ProjectSummary[];
    limit?: number;
}

export function ProjectList({projects, limit = 4}: ProjectListProps) {
    const t = useTranslations("Dashboard.projects");
    const tStatus = useTranslations("Dashboard.projects.status");
    const {displayedProjects, formatDate} = useProjectList(projects, limit);
    const [progressAnimation, setProgressAnimation] = useState<Record<string, number>>(() => {
        const initial: Record<string, number> = {};
        projects.slice(0, limit).forEach((p) => { initial[p.id] = 0; });
        return initial;
    });
    const [isMounted, setIsMounted] = useState(false);

    // Animate progress bars on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        
        displayedProjects.forEach((project, index) => {
            setTimeout(() => {
                setProgressAnimation(prev => ({...prev, [project.id]: project.progress}));
            }, index * 100 + 50);
        });

        return () => clearTimeout(timer);
    }, [displayedProjects]);

    if (displayedProjects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
                <Icons.Folder size={32} className="opacity-50" />
                <p>{t("noProjects")}</p>
            </div>
        );
    }

    const getStatusConfig = (status: ProjectSummary["status"]) => {
        switch (status) {
            case "active":
                return {labelKey: "active", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", icon: "Activity"};
            case "completed":
                return {labelKey: "completed", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", icon: "Check"};
            case "on_hold":
                return {labelKey: "onHold", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", icon: "Pause"};
            case "archived":
                return {labelKey: "archived", color: "text-muted-foreground", bg: "bg-muted", icon: "Archive"};
        }
    };

    return (
        <div className="space-y-2 sm:space-y-3">
            {displayedProjects.map((project) => {
                const statusConfig = getStatusConfig(project.status);
                const StatusIcon = Icons[statusConfig.icon as keyof typeof Icons];
                // Start from 0, animate to target when mounted
                const animatedProgress = isMounted ? (progressAnimation[project.id] ?? 0) : 0;

                return (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 transition-all hover:bg-card/50 hover:border-border/50"
                    >
                        <div className="shrink-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icons.Folder size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <h3 className="text-sm font-medium truncate">{project.name}</h3>
                                <span
                                    className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
                                >
                                    <StatusIcon size={8} />
                                    {tStatus(statusConfig.labelKey)}
                                </span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Icons.Users size={10} />
                                    <span>{project.members} {t("members")}</span>
                                </div>
                                {project.deadline && (
                                    <div className="flex items-center gap-1.5">
                                        <Icons.Calendar size={10} />
                                        <span>{formatDate(project.deadline)}</span>
                                    </div>
                                )}
                                {project.budget && (
                                    <div className="flex items-center gap-1.5 ml-auto font-medium text-foreground">
                                        <Icons.DollarSign size={10} />
                                        <span>{formatCurrency(project.budget)}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                                    style={{width: `${animatedProgress}%`}}
                                />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

"use client";

/**
 * کامپوننت اکشن‌های سریع
 * دکمه‌های عملیات رایج برای دسترسی سریع
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Link} from "@/i18n/navigation";
import type {QuickAction} from "../types";

const VARIANT_STYLES = {
    primary: "border-primary/20 bg-primary/5 text-primary shadow-[0_10px_25px_rgba(99,102,241,0.12)]",
    secondary: "border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-300 shadow-[0_10px_25px_rgba(139,92,246,0.08)]",
    outline: "border-border/70 bg-card/80 text-foreground shadow-[0_10px_25px_rgba(15,23,42,0.04)]",
} as const;

interface QuickActionsProps {
    actions: QuickAction[];
}

export function QuickActions({actions}: QuickActionsProps) {
    const t = useTranslations("Dashboard.quickActions");

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {actions.map((action) => {
                const Icon = Icons[action.icon as keyof typeof Icons];
                const label = t(action.labelKey);
                const description = t(action.descriptionKey);
                const variantStyle = VARIANT_STYLES[action.variant];

                return (
                    <Link
                        key={action.id}
                        href={action.href}
                        role="listitem"
                        className={`
                            group relative flex h-full min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl border p-3.5 text-left
                            transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_30px_rgba(15,23,42,0.08)]
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2
                            ${variantStyle}
                        `}
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.24),transparent_32%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative flex items-start justify-between gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-current/10 bg-background/70 text-current shadow-sm backdrop-blur-sm">
                                <Icon size={18} className="text-current" />
                            </div>
                            <span className="rounded-full border border-current/10 bg-background/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-current/70">
                                {t("action")}
                            </span>
                        </div>

                        <div className="relative space-y-1.5">
                            <p className="line-clamp-2 text-sm font-semibold sm:text-base">{label}</p>
                            <p className="line-clamp-2 text-xs leading-5 text-current/70">{description}</p>
                        </div>

                        <div className="relative mt-3 flex items-center justify-between gap-2 border-t border-current/10 pt-2">
                            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-current/60">{t("open")}</span>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105">
                                <Icons.ArrowRight size={14} className="text-current" />
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

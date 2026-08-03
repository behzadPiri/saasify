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
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-transparent hover:bg-accent/50",
} as const;

interface QuickActionsProps {
    actions: QuickAction[];
}

export function QuickActions({actions}: QuickActionsProps) {
    const t = useTranslations("Dashboard.quickActions");

    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3" role="list">
            {actions.map((action) => {
                const Icon = Icons[action.icon as keyof typeof Icons];
                const label = t(action.labelKey);
                const description = t(action.descriptionKey);
                const variantStyle = VARIANT_STYLES[action.variant];

                return (
                    <Link
                        key={action.id}
                        href={action.href}
                        className={`
                            flex flex-col items-center justify-center gap-1.5 rounded-xl p-2 sm:p-3
                            text-center transition-all duration-200
                            hover:shadow-sm hover:-translate-y-0.5
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                            ${variantStyle}
                        `}
                        role="listitem"
                    >
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-current/10">
                            <Icon size={16} className="text-current" />
                        </div>
                        <div>
                            <p className="font-medium text-xs sm:text-sm truncate max-w-[80px]">{label}</p>
                            <p className="text-[10px] sm:text-xs text-current/70 line-clamp-1">{description}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

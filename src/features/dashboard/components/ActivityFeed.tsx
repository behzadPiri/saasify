"use client";

/**
 * کامپوننت فید فعالیت‌ها
 * نمایش لیست فعالیت‌های اخیر با آیکون، رنگ و زمان نسبی
 */

import {Icons} from "@/shared/components/ui/icons";
import type {ActivityItem} from "../types";
import {useActivityFeed} from "../hooks/useActivityFeed";

interface ActivityFeedProps {
    activities: ActivityItem[];
    limit?: number;
}

export function ActivityFeed({activities, limit = 5}: ActivityFeedProps) {
    const {t, displayedActivities, formatTimeAgo, getActivityTypeConfig} = useActivityFeed(activities, limit);

    if (displayedActivities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
                <Icons.Inbox size={32} className="opacity-50" />
                <p>{t("noActivity")}</p>
            </div>
        );
    }

    return (
        <div className="space-y-1.5 sm:space-y-2">
            {displayedActivities.map((activity) => {
                const config = getActivityTypeConfig(activity.type);
                const Icon = Icons[config.icon as keyof typeof Icons];

                return (
                    <div
                        key={activity.id}
                        className="flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 transition-all hover:bg-card/50 hover:border-border/50"
                    >
                        <div className={`shrink-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg ${config.bg}`}>
                            <Icon size={12} className={config.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">{activity.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                                {activity.description}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                                <span className="font-medium">{activity.user.name}</span>
                                <span aria-hidden="true">·</span>
                                <time dateTime={activity.timestamp.toISOString()}>
                                    {formatTimeAgo(activity.timestamp)}
                                </time>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

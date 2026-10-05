/**
 * کامپوننت هدر بخش تایم‌لاین فعالیت‌ها
 * نمایش عنوان بخش، زیرعنوان و تعداد کل آیتم‌ها
 */

"use client";

import {useTranslations} from "next-intl";

interface ActivityTimelineHeaderProps {
  /** تعداد کل آیتم‌های فیلتر شده */
  count: number;
}

export function ActivityTimelineHeader({count}: ActivityTimelineHeaderProps) {
  const t = useTranslations("Activity");

  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("timeline")}</p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">{t("recentEvents")}</h2>
      </div>
      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
        {count} {t("itemsCount")}
      </span>
    </div>
  );
}

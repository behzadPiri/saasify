import {useLocale, useTranslations} from "next-intl";
import {useMemo} from "react";
import type {ProjectStats} from "../types";
import {Icons} from "@/shared/components/ui/icons";

interface ProjectStatsProps {
  stats: ProjectStats;
}

// کامپوننت آمار پروژه‌ها: کارت‌های خلاصه مثل تعداد کل، فعال، معوق و بودجهٔ کل
// این بخش فقط وظیفهٔ فرمت و نمایش اعداد را دارد؛ محاسبهٔ مقادیر در هوک انجام می‌شود.


const CARD_STYLES = [
  {labelKey: "stats.totalProjects", icon: "Folder", accent: "text-sky-500 bg-sky-100"},
  {labelKey: "stats.activeProjects", icon: "Activity", accent: "text-emerald-500 bg-emerald-100"},
  {labelKey: "stats.overdueProjects", icon: "AlertTriangle", accent: "text-amber-600 bg-amber-100"},
  {labelKey: "stats.totalBudget", icon: "DollarSign", accent: "text-violet-500 bg-violet-100"},
] as const;

export function ProjectStats({stats}: ProjectStatsProps) {
  const locale = useLocale();
  const t = useTranslations("Projects");
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale, {maximumFractionDigits: 0}),
    [locale]
  );
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale]
  );
  const statValues = [
    stats.totalProjects,
    stats.activeProjects,
    stats.overdueProjects,
    stats.totalBudget,
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {CARD_STYLES.map((card, index) => {
        const Icon = Icons[card.icon as keyof typeof Icons];
        const value = statValues[index];
        const formattedValue = index === 3 ? currencyFormatter.format(value) : numberFormatter.format(value);

        return (
          <div
            key={card.labelKey}
            className="rounded-3xl border border-border/40 bg-card/80 p-5 shadow-sm transition hover:shadow-md"
          >
            <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${card.accent}`}>
              <Icon size={18} />
            </div>
            <p className="text-sm text-muted-foreground">{t(card.labelKey)}</p>
            <p className="mt-3 text-2xl font-semibold text-foreground">{formattedValue}</p>
          </div>
        );
      })}
    </div>
  );
}

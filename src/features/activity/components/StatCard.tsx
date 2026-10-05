/**
 * کامپوننت پایه کارت آمار (Stat Card)
 * طراحی مدرن با Glassmorphism، hover effect و تایپوگرافی بهینه
 * قابل استفاده مجدد برای تمام انواع متریک‌ها
 */

"use client";

import {Icons} from "@/shared/components/ui/icons";

interface StatCardProps {
  /** برچسب کارت */
  label: string;
  /** مقدار اصلی نمایشی */
  value: string | number;
  /** آیکون کارت */
  icon: keyof typeof Icons;
  /** رنگ تم کارت */
  variant: "primary" | "success" | "warning" | "danger" | "info" | "purple";
  /** روند تغییر (اختیاری) */
  trend?: {
    value: number;        // مثلاً +12 یا -5
    label?: string;       // مثلاً "از هفته قبل"
    period?: string;      // مثلاً "weekly"
  };
  /** کلاس‌های CSS اضافی */
  className?: string;
  /** اگر true باشد، کارت در حالت loading است */
  isLoading?: boolean;
}

const variantStyles = {
  primary: {
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    trendColor: "text-blue-600",
    trendBg: "bg-blue-500/10",
  },
  success: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40",
    trendColor: "text-emerald-600",
    trendBg: "bg-emerald-500/10",
  },
  warning: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
    trendColor: "text-amber-600",
    trendBg: "bg-amber-500/10",
  },
  danger: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    border: "border-red-500/20",
    hoverBorder: "hover:border-red-500/40",
    trendColor: "text-red-600",
    trendBg: "bg-red-500/10",
  },
  info: {
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/40",
    trendColor: "text-cyan-600",
    trendBg: "bg-cyan-500/10",
  },
  purple: {
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    border: "border-violet-500/20",
    hoverBorder: "hover:border-violet-500/40",
    trendColor: "text-violet-600",
    trendBg: "bg-violet-500/10",
  },
} as const;

export function StatCard({
  label,
  value,
  icon: iconName,
  variant = "primary",
  trend,
  className = "",
  isLoading = false,
}: StatCardProps) {
  const styles = variantStyles[variant];
  const Icon = Icons[iconName] || Icons.Activity;

  if (isLoading) {
    return (
      <div className={`group relative overflow-hidden rounded-2xl bg-linear-to-br from-white/50 to-white/30 backdrop-blur-xl border ${styles.border} p-5 transition-all duration-300 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-muted/50" />
            <div className="h-8 w-32 animate-pulse rounded bg-muted/50" />
          </div>
          <div className={`shrink-0 p-3 rounded-xl ${styles.iconBg} animate-pulse`} />
        </div>
      </div>
    );
  }

  const trendValue = trend?.value ?? 0;
  const isPositive = trendValue >= 0;
  const trendColorClass = isPositive ? "text-emerald-600" : "text-red-600";
  const trendBgClass = isPositive ? "bg-emerald-500/10" : "bg-red-500/10";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        bg-linear-to-br from-white/60 to-white/30 dark:from-white/10 dark:to-white/5
        backdrop-blur-xl border transition-all duration-300
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5
        hover:border-transparent
        ${styles.border} ${styles.hoverBorder}
        p-5
        ${className}
      `}
    >
      {/* Decorative background blob */}
      <div
        className={`absolute -top-4 -right-4 h-24 w-24 rounded-full blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-50 ${styles.iconBg.replace("bg-", "bg-").replace("/10", "/30")}`}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </p>

          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>

            {trend && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${trendColorClass} ${trendBgClass}`}
              >
                {trendValue > 0 ? "+" : ""}{trendValue}%
                {trend.label && <span className="text-muted-foreground/70">{trend.label}</span>}
              </span>
            )}
          </div>
        </div>

        <div
          className={`shrink-0 p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${styles.iconBg} ${styles.iconColor}`}
        >
          <Icon size={24} aria-hidden="true" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${styles.iconColor.replace("text-", "from-").replace("500", "500/50")} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        aria-hidden="true"
      />
    </div>
  );
}

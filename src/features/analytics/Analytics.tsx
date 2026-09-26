"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {BarChart, PieChart, StatCard} from "@/features/dashboard/components";
import {formatCompactNumber, formatCurrency, formatNumber} from "@/shared/lib/number-format";

const chartData = [
  {label: "فروردین", value: 8200000},
  {label: "اردیبهشت", value: 10400000},
  {label: "خرداد", value: 12100000},
  {label: "تیر", value: 9000000},
  {label: "مرداد", value: 13800000},
  {label: "شهریور", value: 14800000},
  {label: "مهر", value: 13100000},
  {label: "آبان", value: 15900000},
  {label: "آذر", value: 17200000},
  {label: "دی", value: 16500000},
  {label: "بهمن", value: 18800000},
  {label: "اسفند", value: 21400000},
];

const distributionData = [
  {label: "active", value: 48},
  {label: "completed", value: 27},
  {label: "onHold", value: 17},
  {label: "archived", value: 8},
];

const performanceRows = [
  {label: "تسک‌های تکمیل‌شده", value: 1834, delta: "+11.4%", tone: "emerald"},
  {label: "نرخ تبدیل", value: "4.8%", delta: "+0.9%", tone: "primary"},
  {label: "میانگین زمان پاسخ", value: "2.4h", delta: "-18m", tone: "sky"},
  {label: "نرخ ریزش", value: "1.9%", delta: "-0.4%", tone: "amber"},
];

const topPages = [
  {name: "/dashboard", users: 12420, conversion: 8.1},
  {name: "/projects", users: 9860, conversion: 6.7},
  {name: "/billing", users: 7420, conversion: 11.4},
  {name: "/team", users: 5310, conversion: 5.9},
];

export function Analytics() {
  const t = useTranslations("Analytics");
  const [range, setRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const summary = useMemo(() => {
    const totalRevenue = chartData.reduce((sum, item) => sum + item.value, 0);
    const avgMonthly = totalRevenue / chartData.length;
    const usersActive = distributionData.reduce((sum, item) => sum + item.value, 0);

    return {
      totalRevenue,
      avgMonthly,
      usersActive,
      retentionRate: 68.5,
    };
  }, []);

  return (
    <div className="space-y-6 w-full sm:px-5 lg:px-7 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]" />

        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              <Icons.BarChart size={12} />
              {t("title")}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("subtitle")}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                مرور کلی عملکرد کسب‌وکار، رشد درآمد و آمار تعامل کاربران در یک نمای یکپارچه.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex rounded-2xl border border-border/60 bg-background/70 p-1">
              {(["7d", "30d", "90d", "1y"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRange(option)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                    range === option
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent/40"
                  }`}
                >
                  {option === "7d" ? "7 روز" : option === "30d" ? "30 روز" : option === "90d" ? "90 روز" : "1 سال"}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
            >
              <Icons.Download size={16} />
              {t("export")}
            </button>
          </div>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            value={summary.totalRevenue}
            label="درآمد کل"
            icon="DollarSign"
            trend="up"
            change={18.4}
            format={(value) => formatCurrency(value)}
          />
          <StatCard
            value={summary.avgMonthly}
            label="میانگین ماهانه"
            icon="TrendingUp"
            trend="up"
            change={12.1}
            format={(value) => formatCurrency(value)}
          />
          <StatCard
            value={summary.usersActive}
            label="کاربران فعال"
            icon="Users"
            trend="up"
            change={9.7}
            format={(value) => formatNumber(value)}
          />
          <StatCard
            value={summary.retentionRate}
            label="نرخ نگهداشت"
            icon="Activity"
            trend="up"
            change={4.2}
            format={(value) => `${value.toFixed(1)}%`}
          />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("overview")}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">روند رشد درآمد</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-600">
              <Icons.TrendingUp size={14} />
              +24.8% نسبت به دوره قبل
            </div>
          </div>

          <BarChart data={chartData} height={250} color="primary" legendLabel="درآمد" showGrid showLabels animated />
        </div>

        <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {t("performance")}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">توزیع وضعیت پروژه‌ها</h2>
          </div>
          <PieChart
            data={distributionData}
            height={220}
            showLabels={false}
            animated
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">KPIs</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">شاخص‌های عملکرد</h2>
            </div>
            <button type="button" className="text-sm font-medium text-primary hover:underline">
              نمایش همه
            </button>
          </div>

          <div className="space-y-3">
            {performanceRows.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/40 p-3.5"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.delta}</p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{item.value}</p>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                      item.tone === "emerald"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : item.tone === "primary"
                          ? "bg-primary/10 text-primary"
                          : item.tone === "sky"
                            ? "bg-sky-500/10 text-sky-600"
                            : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {item.tone === "emerald"
                      ? "خوب"
                      : item.tone === "primary"
                        ? "قوی"
                        : item.tone === "sky"
                          ? "پاسخ‌گویی"
                          : "پایدار"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Acquisition</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">برترین صفحات</h2>
          </div>

          <div className="space-y-3">
            {topPages.map((page) => (
              <div key={page.name} className="rounded-2xl border border-border/40 bg-background/40 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground">{page.name}</p>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                    {page.conversion}%
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <span className="text-xl font-bold text-foreground">{formatCompactNumber(page.users)}</span>
                  <span className="text-xs text-muted-foreground">کاربر</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

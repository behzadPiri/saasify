/**
 * کامپوننت بخش هدر (Hero) صفحه فعالیت
 * شامل عنوان، توضیحات و آیکون صفحه
 */

"use client";

import {Icons} from "@/shared/components/ui/icons";
import {useLocale, useTranslations} from "next-intl";

export function ActivityHero() {
  const t = useTranslations("Activity");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_35%)]" />

      <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <Icons.Activity size={12} />
            {t("title")}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("subtitle")}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {locale === "fa"
                ? "ردیابی وقایع مهم، تغییرات تیم و وضعیت پروژه‌ها در یک جریان زمان‌مند و قابل‌فهم."
                : "Track important events, team updates, and project health in one clear, time-based stream."}
            </p>
          </div>
        </div>

        {/* دکمه Refresh در صورت نیاز در اینجا قرار می‌گیرد */}
      </div>

      {/* کارت‌های خلاصه در اینجا رندر می‌شوند (از طریق children یا prop) */}
    </section>
  );
}
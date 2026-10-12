/**
 * بنر بالای صفحه تنظیمات (Hero)؛ کامپوننت خالص نمایشی و memoشده.
 * همه متون با useTranslations خوانده می‌شوند؛ هیچ متن هاردکدی وجود ندارد.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

/**
 * بنر معرفی صفحه تنظیمات
 * چرا memo؟ چون ایستاست و نباید با تغییر فرم‌ها ری‌رندر شود.
 */
export const SettingsHero = memo(function SettingsHero() {
  const t = useTranslations("Settings");

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]" />

      <div className="relative max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
          <Icons.Settings size={12} />
          {t("title")}
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{t("description")}</p>
        </div>
      </div>
    </section>
  );
});

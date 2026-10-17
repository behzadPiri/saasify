"use client";

/**
 * بنر بالای صفحه اعلان‌ها (Hero)
 * شامل بج عنوان، عنوان، زیرعنوان، توضیح، دکمه‌های عملیاتی و شبکه آمار است.
 * همه متون از useTranslations خوانده می‌شوند و هیچ متن هاردکدی در آن نیست.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {MarkAllReadButton} from "./MarkAllReadButton";
import {NotificationSettingsButton} from "@/features/notifications";
import {NotificationsStatsGrid} from "./NotificationsStatsGrid";
import type {NotificationsStats} from "../types";

interface NotificationsHeroProps {
  /** آمار اعلان‌ها برای نمایش در کارت‌ها */
  stats: NotificationsStats;
  /** عملیات علامت‌گذاری همه به‌عنوان خوانده‌شده */
  onMarkAllRead: () => void;
}

/**
 * بنر معرفی و کنترل‌های بالای صفحه اعلان‌ها
 * چرا memo؟ چون فقط با تغییر آمار یا تغییر تابع عملیات باید رندر شود.
 */
export const NotificationsHero = memo(function NotificationsHero({
  stats,
  onMarkAllRead,
}: NotificationsHeroProps) {
  const t = useTranslations("Notifications");

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
      {/* پس‌زمینه تزئینی؛ pointer-events-none تا هیچ تعاملی را نگیرد */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_32%)]" />

      <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <Icons.Bell size={12} />
            {t("title")}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{t("description")}</p>
          </div>
        </div>

        {/* دکمه‌ها در موبایل زیر متن و در دسکتاپ کنار آن قرار می‌گیرند */}
        <div className="flex flex-wrap items-center gap-2">
          <NotificationSettingsButton />
          <MarkAllReadButton onClick={onMarkAllRead} disabled={stats.unread === 0} />
        </div>
      </div>

      <NotificationsStatsGrid stats={stats} />
    </section>
  );
});

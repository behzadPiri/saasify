"use client";

/**
 * کامپوننت هیرو بخش صورت‌accounts
 * نمایش عنوان، توضیحات و دکمه‌های عملیاتی اصلی
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Link} from "@/i18n/navigation";

interface BillingHeroProps {
  /** تابع دانلود فاکtors فعلی */
  onDownloadCurrent: () => void;
  /** آیا در حال بارگذاری فاکtors فعلی هست؟ */
  isDownloading?: boolean;
}

export function BillingHero({onDownloadCurrent, isDownloading = false}: BillingHeroProps) {
  const t = useTranslations("Billing");

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_30%)]" />

      <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <Icons.Billing size={12} />
            {t("title")}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("subtitle")}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {t("heroDescription")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onDownloadCurrent}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icons.Download size={16} />
            {t("downloadInvoice")}
          </button>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
          >
            {t("upgrade")}
            <Icons.ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
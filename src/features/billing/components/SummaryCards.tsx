"use client";

/**
 * کامپوننت کارت‌های آمار صورت‌accounts
 * نمایش سه شاخص کلیدی: صورت‌accounts ماهانه، صرفه‌جویی سالانه و فاکtors بعدی
 */

import {useMemo} from "react";
import {useTranslations} from "next-intl";
import {buildAmountLabel} from "../lib/format";
import {useLocale} from "next-intl";

interface SummaryCardsProps {
  /** مبلغ ماهانه */
  monthly: number;
  /** مبلغ صرفه‌جویی سالانه */
  annualSavings: number;
  /** مبلغ فاکtors بعدی */
  nextInvoiceAmount: number;
  /** درصد مصرف */
  utilization: number;
}

const ACCENT_STYLES = {
  primary: {
    badge: "bg-primary/10 text-primary",
    value: "text-foreground",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-600",
    value: "text-foreground",
  },
  violet: {
    badge: "bg-violet-500/10 text-violet-600",
    value: "text-foreground",
  },
  amber: {
    badge: "bg-amber-500/10 text-amber-600",
    value: "text-foreground",
  },
} as const;

export function SummaryCards({
  monthly,
  annualSavings,
  nextInvoiceAmount,
  utilization,
}: SummaryCardsProps) {
  const t = useTranslations("Billing");
  const locale = useLocale();

  const cards = useMemo(
    () => [
      {
        id: "monthly",
        label: t("monthlyBilling"),
        value: buildAmountLabel(monthly, locale),
        badge: t("monthly"),
        accent: "primary" as const,
      },
      {
        id: "savings",
        label: t("annualSavings"),
        value: buildAmountLabel(annualSavings, locale),
        badge: t("saved"),
        accent: "emerald" as const,
      },
      {
        id: "next",
        label: t("nextInvoice"),
        value: buildAmountLabel(nextInvoiceAmount, locale),
        badge: t("autoRenew"),
        accent: "violet" as const,
      },
    ],
    [monthly, annualSavings, nextInvoiceAmount, locale, t],
  );

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((card) => {
        const styles = ACCENT_STYLES[card.accent];
        return (
          <div
            key={card.id}
            className="rounded-2xl border border-border/40 bg-background/60 p-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {card.label}
            </p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className={`text-2xl font-bold ${styles.value}`}>
                {card.value}
              </span>
              <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${styles.badge}`}>
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
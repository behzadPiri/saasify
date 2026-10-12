"use client";

/**
 * کامپوننت فعالیت صورت‌accounts
 * نمایش آخرین پرداخت و وضعیت آن به همراه مبلغ
 */

import {useMemo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {buildAmountLabel} from "../lib/format";
import {useLocale} from "next-intl";

interface BillingActivityProps {
  /** مبلغ آخرین پرداخت */
  lastPaymentAmount: number;
  /** وضعیت آخرین پرداخت */
  lastPaymentStatus: "paid" | "pending" | "failed";
}

const STATUS_CONFIG: Record<string, {bg: string; text: string; labelKey: string; icon: keyof typeof Icons}> = {
  paid: {bg: "bg-emerald-500/10", text: "text-emerald-600", labelKey: "paid", icon: "Check"},
  pending: {bg: "bg-amber-500/10", text: "text-amber-600", labelKey: "pending", icon: "Clock"},
  failed: {bg: "bg-red-500/10", text: "text-red-600", labelKey: "failed", icon: "AlertCircle"},
};

export function BillingActivity({lastPaymentAmount, lastPaymentStatus}: BillingActivityProps) {
  const t = useTranslations("Billing");
  const locale = useLocale();

  const config = useMemo(
    () => STATUS_CONFIG[lastPaymentStatus] ?? STATUS_CONFIG.pending,
    [lastPaymentStatus],
  );

  const StatusIcon = Icons[config.icon];
  const formattedAmount = useMemo(
    () => buildAmountLabel(lastPaymentAmount, locale),
    [lastPaymentAmount, locale],
  );

  return (
    <div className="rounded-2xl border border-border/40 bg-background/40 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {t("activity")}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{t("lastPayment")}</span>
        <span className="text-base font-semibold text-foreground">{formattedAmount}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{t("status")}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium ${config.bg} ${config.text}`}
        >
          <StatusIcon size={10} />
          {t(config.labelKey)}
        </span>
      </div>
    </div>
  );
}
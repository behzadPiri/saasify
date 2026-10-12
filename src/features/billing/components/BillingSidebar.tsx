"use client";

/**
 * کامپوننت سایدبار صورتحساب
 * ترکیب روش‌های پرداخت و فعالیت پرداخت در یک بخش منظم
 */

import {useTranslations} from "next-intl";
import type {PaymentMethod} from "../types";
import {PaymentMethods} from "./PaymentMethods";
import {BillingActivity} from "./BillingActivity";

interface BillingSidebarProps {
  /** لیست روش‌های پرداخت */
  paymentMethods: PaymentMethod[];
  /** مبلغ آخرین پرداخت */
  lastPaymentAmount: number;
  /** وضعیت آخرین پرداخت */
  lastPaymentStatus: "paid" | "pending" | "failed";
}

export function BillingSidebar({
  paymentMethods,
  lastPaymentAmount,
  lastPaymentStatus,
}: BillingSidebarProps) {
  const t = useTranslations("Billing");

  return (
    <aside className="space-y-4 rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("billingSummary")}
        </p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">
          {t("paymentMethods")}
        </h2>
      </div>

      <PaymentMethods methods={paymentMethods} />

      <BillingActivity
        lastPaymentAmount={lastPaymentAmount}
        lastPaymentStatus={lastPaymentStatus}
      />
    </aside>
  );
}
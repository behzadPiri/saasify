"use client";

/**
 * کامپوننت یک ردیف فاکtors در جدول تاریخچه
 * نمایش اطلاعات یک فاکtors به صورت دکمه برای دانلود
 */

import {useMemo} from "react";
import {Icons} from "@/shared/components/ui/icons";
import {buildAmountLabel, formatInvoiceDate} from "../lib/format";
import {useLocale} from "next-intl";
import {useTranslations} from "next-intl";
import type {Invoice} from "../types";

interface InvoiceRowProps {
  /** داده‌های فاکtors */
  invoice: Invoice;
  /** تابع فراخوانی هنگام کلیک برای دانلود */
  onDownload: (invoice: Invoice) => void;
}

const STATUS_STYLES: Record<Invoice["status"], {bg: string; text: string; labelKey: string}> = {
  paid: {bg: "bg-emerald-500/10", text: "text-emerald-600", labelKey: "paid"},
  pending: {bg: "bg-amber-500/10", text: "text-amber-600", labelKey: "pending"},
  failed: {bg: "bg-red-500/10", text: "text-red-600", labelKey: "failed"},
};

export function InvoiceRow({invoice, onDownload}: InvoiceRowProps) {
  const t = useTranslations("Billing");
  const locale = useLocale();

  const statusConfig = useMemo(
    () => STATUS_STYLES[invoice.status] ?? STATUS_STYLES.pending,
    [invoice.status],
  );

  const formattedAmount = useMemo(
    () => buildAmountLabel(invoice.amount, locale),
    [invoice.amount, locale],
  );

  const formattedDate = useMemo(
    () => formatInvoiceDate(invoice.date, locale),
    [invoice.date, locale],
  );

  return (
    <div className="grid w-full gap-3 border-b border-border/40 bg-background/30 px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[1.1fr_1fr_0.8fr_0.9fr] sm:items-center">
      {/* شناسه فاکtors */}
      <div className="flex min-w-0 items-center gap-2 font-medium text-foreground">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icons.FileText size={14} />
        </span>
        <span className="truncate">{invoice.id}</span>
      </div>

      {/* تاریخ */}
      <div className="flex flex-col gap-1 sm:block">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">
          {t("date")}
        </span>
        <span className="min-w-0 text-muted-foreground">{formattedDate}</span>
      </div>

      {/* مبلغ */}
      <div className="flex flex-col gap-1 sm:block">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">
          {t("amount")}
        </span>
        <span className="min-w-0 wrap-break-word font-semibold text-foreground">
          {formattedAmount}
        </span>
      </div>

      {/* وضعیت و دکمه دانلود */}
      <div className="flex flex-col gap-2 sm:text-right sm:items-end">
        <span
          className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-medium ${statusConfig.bg} ${statusConfig.text}`}
        >
          {t(statusConfig.labelKey)}
        </span>
        <button
          type="button"
          onClick={() => onDownload(invoice)}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <Icons.Download size={12} />
          {t("downloadInvoice")}
        </button>
      </div>
    </div>
  );
}
"use client";

/**
 * کامپوننت جدول تاریخچه فاکtors
 * نمایش لیست فاکtors با هدر و خطوط جداگانه
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {Invoice} from "../types";
import {InvoiceRow} from "./InvoiceRow";

interface InvoiceTableProps {
  /** لیست فاکtors برای نمایش */
  invoices: Invoice[];
  /** تابع فراخوانی هنگام دانلود یک فاکtors */
  onDownload: (invoice: Invoice) => void;
}

export function InvoiceTable({invoices, onDownload}: InvoiceTableProps) {
  const t = useTranslations("Billing");

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
        <Icons.FileText size={32} className="opacity-50" />
        <p>{t("noInvoices")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/40">
      {/* هدر جدول - فقط در نمایش دسکتاپ */}
      <div className="hidden gap-4 border-b border-border/40 bg-background/40 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:grid sm:grid-cols-[1.1fr_1fr_0.8fr_0.9fr]">
        <span>{t("invoice")}</span>
        <span>{t("date")}</span>
        <span>{t("amount")}</span>
        <span className="rtl:text-left ltr:text-right">{t("status")}</span>
      </div>

      {/* خطوط فاکtors */}
      <div>
        {invoices.map((invoice) => (
          <InvoiceRow key={invoice.id} invoice={invoice} onDownload={onDownload} />
        ))}
      </div>
    </div>
  );
}
"use client";

/**
 * کامپوننت اصلی صفحه صورتحساب
 * ترکیب تمام بخش‌های کوچک و منطقی برای نمایش صفحه اصلی
 */

import {useMemo, useCallback} from "react";
import {useBilling, useInvoices} from "./hooks";
import {downloadInvoiceHtml} from "./lib/format";
import {useLocale, useTranslations} from "next-intl";
import type {Invoice} from "./types";
import {BillingHero} from "./components/BillingHero";
import {SummaryCards} from "./components/SummaryCards";
import {PlanCard} from "./components/PlanCard";
import {BillingSidebar} from "./components/BillingSidebar";
import {InvoiceTable} from "./components/InvoiceTable";
import {Pagination} from "./components/Pagination";

export function Billing() {
  const locale = useLocale();
  const t = useTranslations("Billing");

  // منطق اصلی صورت‌accounts
  const {
    currentPlan,
    invoices,
    paymentMethods,
    summary,
    renewDate,
    planFeatures,
  } = useBilling({currentPlanId: "pro"});

  // منطق فاکtors و پجینیشن
  const {
    currentPage,
    totalPages,
    pageNumbers,
    currentInvoices,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = useInvoices({invoices});

  // محاسبه مقادیر مشتق‌شده برای نمایش
  const lastInvoice = useMemo<Invoice | undefined>(
    () => invoices[0],
    [invoices],
  );

  // تابع دانلود فاکtors - با استفاده از useCallback برای جلوگیری از re-render
  const handleDownloadInvoice = useCallback(
    (invoice: Invoice) => {
      downloadInvoiceHtml(invoice, locale);
    },
    [locale],
  );

  // تابع دانلود فاکtors فعلی(آخرین فاکtors)
  const handleDownloadCurrent = useCallback(() => {
    if (lastInvoice) {
      handleDownloadInvoice(lastInvoice);
    }
  }, [lastInvoice, handleDownloadInvoice]);

  // محاسبه شرایط پجینیشن
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      {/* بخش هیرو */}
      <BillingHero
        onDownloadCurrent={handleDownloadCurrent}
        isDownloading={false}
      />

      {/* کارت‌های آمار */}
      <SummaryCards
        monthly={summary.monthly}
        annualSavings={summary.annualSavings}
        nextInvoiceAmount={summary.nextInvoiceAmount}
      />

      {/* گرید اصلی محتوا */}
      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
        {/* ستون اصلی: پلن فعلی و تاریخچه فاکtors */}
        <div className="flex flex-col gap-4">
          <PlanCard
            planName={currentPlan?.nameKey ?? "planName"}
            monthlyAmount={summary.monthly}
            utilization={summary.utilization}
            usedSeats={summary.usedSeats}
            totalSeats={summary.totalSeats}
            renewDate={renewDate}
            features={planFeatures}
          />

          {/* بخش تاریخچه فاکtors */}
          <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {t("paymentHistory")}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">
                  {t("invoiceHistory")}
                </h2>
              </div>
            </div>

            <InvoiceTable
              invoices={currentInvoices}
              onDownload={handleDownloadInvoice}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageNumbers={pageNumbers}
              onNext={goToNextPage}
              onPrev={goToPrevPage}
              onGoToPage={goToPage}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
            />
          </div>
        </div>

        {/* ستون سایدبار: روش‌های پرداخت و فعالیت */}
        <BillingSidebar
          paymentMethods={paymentMethods}
          lastPaymentAmount={summary.monthly}
          lastPaymentStatus={lastInvoice?.status ?? "paid"}
        />
      </div>
    </div>
  );
}
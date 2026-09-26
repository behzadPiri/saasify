"use client";

import {useEffect, useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

type InvoiceStatus = "paid" | "pending";
type PaymentMethodType = "online" | "bank";

type Invoice = {
  id: string;
  date: Date;
  amount: number;
  status: InvoiceStatus;
  method: PaymentMethodType;
  cardLabel: string;
  cardNumber: string;
  dueDate: Date;
};

const formatAmountNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(value);

const buildAmountLabel = (value: number, locale: string) => {
  const amount = formatAmountNumber(value, locale);
  const unit = locale === "fa" ? "ریال" : "IRR";
  return locale === "fa" ? `${amount} ${unit} / ماه` : `${unit} ${amount}/mo`;
};

const formatInvoiceDate = (date: Date, locale: string) => {
  const localeKey = locale === "fa" ? "fa-IR-u-ca-persian" : "en-US";
  return new Intl.DateTimeFormat(localeKey, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatReceiptDate = (date: Date, locale: string) => {
  const localeKey = locale === "fa" ? "fa-IR-u-ca-persian" : "en-US";
  return new Intl.DateTimeFormat(localeKey, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export function Billing() {
  const t = useTranslations("Billing");
  const locale = useLocale();
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isModalOpen = selectedInvoiceId !== null || showAllInvoices;

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (!isModalOpen) {
      root.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
      return;
    }

    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;
    const scrollY = window.scrollY;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const wheelHandler = (event: WheelEvent) => {
      event.preventDefault();
    };

    const touchMoveHandler = (event: TouchEvent) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", wheelHandler, {passive: false});
    window.addEventListener("touchmove", touchMoveHandler, {passive: false});
    window.addEventListener("scroll", preventScroll, {passive: false});

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
      window.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
      window.removeEventListener("scroll", preventScroll);
      window.scrollTo(0, scrollY);
    };
  }, [isModalOpen]);

  const invoices = useMemo<Invoice[]>(() => [
    {
      id: "INV-2048",
      date: new Date("2026-07-12T00:00:00Z"),
      amount: 39000000,
      status: "paid",
      method: "online",
      cardLabel: "Visa •• 4242",
      cardNumber: "•••• 4242",
      dueDate: new Date("2026-08-12T00:00:00Z"),
    },
    {
      id: "INV-2037",
      date: new Date("2026-06-12T00:00:00Z"),
      amount: 39000000,
      status: "paid",
      method: "bank",
      cardLabel: "Card-to-card",
      cardNumber: "IR 6037 •••• 2841",
      dueDate: new Date("2026-07-12T00:00:00Z"),
    },
    {
      id: "INV-2025",
      date: new Date("2026-05-12T00:00:00Z"),
      amount: 39000000,
      status: "paid",
      method: "online",
      cardLabel: "Mastercard •• 8860",
      cardNumber: "•••• 8860",
      dueDate: new Date("2026-06-12T00:00:00Z"),
    },
    {
      id: "INV-2014",
      date: new Date("2026-04-12T00:00:00Z"),
      amount: 39000000,
      status: "pending",
      method: "bank",
      cardLabel: "Bank transfer",
      cardNumber: "IR 6274 •••• 9912",
      dueDate: new Date("2026-05-12T00:00:00Z"),
    },
    {
      id: "INV-1997",
      date: new Date("2026-03-12T00:00:00Z"),
      amount: 39000000,
      status: "paid",
      method: "online",
      cardLabel: "Visa •• 4242",
      cardNumber: "•••• 4242",
      dueDate: new Date("2026-04-12T00:00:00Z"),
    },
    {
      id: "INV-1983",
      date: new Date("2026-02-12T00:00:00Z"),
      amount: 39000000,
      status: "paid",
      method: "bank",
      cardLabel: "Card-to-card",
      cardNumber: "IR 6037 •••• 2841",
      dueDate: new Date("2026-03-12T00:00:00Z"),
    },
  ], []);

  const pageSize = 4;
  const totalPages = Math.ceil(invoices.length / pageSize);
  const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);
  const currentInvoices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return invoices.slice(start, start + pageSize);
  }, [currentPage, invoices]);

  const selectedInvoice = useMemo<Invoice | null>(
    () => (selectedInvoiceId ? invoices.find((invoice) => invoice.id === selectedInvoiceId) ?? null : null),
    [invoices, selectedInvoiceId],
  );

  const planFeatures = useMemo(
    () => [
      t("featureItems.unlimitedProjects"),
      t("featureItems.advancedAnalytics"),
      t("featureItems.prioritySupport"),
      t("featureItems.customIntegrations"),
    ],
    [t],
  );

  const paymentMethods = useMemo(
    () => [
      {label: "Visa •• 4242", primary: true, mode: t("onlinePayment"), note: "•••• 4242"},
      {label: "Card-to-card", primary: false, mode: t("bankTransfer"), note: "IR 6037 •••• 2841"},
    ],
    [t],
  );

  const summary = useMemo(
    () => ({
      monthly: 39000000,
      annualSavings: 48000000,
      nextInvoice: buildAmountLabel(39000000, locale),
      utilization: 72,
    }),
    [locale],
  );

  const handleDownloadInvoice = (invoice: Invoice) => {
    const receiptHtml = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Invoice ${invoice.id}</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 32px; color: #111827;">
          <div style="max-width: 760px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 18px; padding: 24px;">
            <h1 style="margin: 0 0 12px; font-size: 28px;">Invoice Receipt</h1>
            <p style="margin: 0 0 20px; color: #6b7280;">${invoice.id}</p>
            <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
              <div>
                <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: .12em;">Issued</div>
                <div>${formatReceiptDate(invoice.date, locale)}</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: .12em;">Due</div>
                <div>${formatReceiptDate(invoice.dueDate, locale)}</div>
              </div>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <div style="display: flex; justify-content: space-between; margin: 18px 0;">
              <span>Plan</span>
              <strong>Pro Plan</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 18px 0;">
              <span>Payment method</span>
              <strong>${invoice.cardLabel}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 18px 0;">
              <span>Amount</span>
              <strong>${buildAmountLabel(invoice.amount, locale)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 18px 0;">
              <span>Status</span>
              <strong>${invoice.status === "paid" ? "Paid" : "Pending"}</strong>
            </div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([receiptHtml], {type: "text/html;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoice.id.toLowerCase()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_30%)]" />

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
              onClick={() => selectedInvoice && handleDownloadInvoice(selectedInvoice)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40"
            >
              <Icons.Download size={16} />
              {t("downloadInvoice")}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
            >
              {t("upgrade")}
              <Icons.ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("monthlyBilling")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.nextInvoice}</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">{t("monthly")}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("annualSavings")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{buildAmountLabel(summary.annualSavings, locale)}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600">{t("saved")}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("nextInvoice")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{summary.nextInvoice}</span>
              <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-medium text-violet-600">{t("autoRenew")}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
        <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("currentPlan")}</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">{t("planName")}</h2>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
              {t("active")}
            </span>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-gradient-to-r from-primary/8 via-indigo-500/5 to-violet-500/8 p-4 sm:p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                  <Icons.Sparkles size={14} />
                  {t("planName")}
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{buildAmountLabel(39000000, locale)}<span className="text-base font-medium text-muted-foreground"> / {t("monthly").toLowerCase()}</span></p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("renewsOn")} {formatInvoiceDate(new Date("2026-09-30T00:00:00Z"), locale)}</p>
                </div>
              </div>

              <div className="flex min-w-[220px] flex-col gap-3 rounded-2xl border border-border/40 bg-background/50 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("usage")}</span>
                  <span className="font-semibold text-foreground">{summary.utilization}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500 transition-[width] duration-700 ease-out animate-[pulse_2s_ease-in-out_infinite]"
                    style={{width: `${summary.utilization}%`}}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>24 / 36</span>
                  <span>{t("teamSeats")}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {planFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-sm text-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <Icons.Check size={12} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-4 rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("billingSummary")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("paymentMethods")}</h2>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.label}
                className={`flex items-center justify-between rounded-2xl border p-3 ${method.primary ? "border-primary/20 bg-primary/5" : "border-border/40 bg-background/40"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary">
                    <Icons.CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.mode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">{method.note}</p>
                  {method.primary ? (
                    <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">{t("default")}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/40 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("activity")}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("lastPayment")}</span>
              <span className="text-base font-semibold text-foreground">{buildAmountLabel(39000000, locale)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("status")}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600">{t("paid")}</span>
            </div>
          </div>
        </aside>
      </div>

      <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("paymentHistory")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("invoiceHistory")}</h2>
          </div>
          <button type="button" onClick={() => setShowAllInvoices(true)} className="text-sm font-medium text-primary hover:underline">
            {t("viewAll")}
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/40">
          <div className="hidden gap-4 border-b border-border/40 bg-background/40 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:grid sm:grid-cols-[1.1fr_1fr_0.8fr_0.9fr]">
            <span>{t("invoice")}</span>
            <span>{t("date")}</span>
            <span>{t("amount")}</span>
            <span className="text-right">{t("status")}</span>
          </div>

          {currentInvoices.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedInvoiceId(item.id)}
              className="grid w-full gap-3 border-b border-border/40 bg-background/30 px-4 py-3 text-left text-sm last:border-b-0 transition hover:bg-accent/30 sm:grid-cols-[1.1fr_1fr_0.8fr_0.9fr] sm:items-center"
            >
              <div className="flex min-w-0 items-center gap-2 font-medium text-foreground">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icons.FileText size={14} />
                </span>
                <span className="truncate">{item.id}</span>
              </div>

              <div className="flex flex-col gap-1 sm:block">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">{t("date")}</span>
                <span className="min-w-0 text-muted-foreground">{formatInvoiceDate(item.date, locale)}</span>
              </div>

              <div className="flex flex-col gap-1 sm:block">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">{t("amount")}</span>
                <span className="min-w-0 break-words font-semibold text-foreground">{buildAmountLabel(item.amount, locale)}</span>
              </div>

              <div className="flex flex-col gap-1 sm:text-right">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">{t("status")}</span>
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    item.status === "paid"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {item.status === "paid" ? t("paid") : t("pending")}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("previous")}
          </button>

          <div className="flex items-center gap-2">
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                  page === currentPage
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background/60 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("next")}
          </button>
        </div>
      </section>

      {selectedInvoice && (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm">
          <button type="button" className="absolute inset-0 bg-black/30" aria-label="close modal" onClick={() => setSelectedInvoiceId(null)} />
          <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-[calc(100%-1rem)] max-w-2xl max-h-[82vh] overflow-y-auto rounded-t-[28px] rounded-b-[20px] border border-border/40 bg-card p-5 shadow-2xl sm:w-[calc(100%-3rem)] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("receipt")}</p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">{selectedInvoice.id}</h3>
              </div>
              <button type="button" onClick={() => setSelectedInvoiceId(null)} className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground">
                <Icons.X size={16} />
              </button>
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/40 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">{t("paymentMethod")}</span>
                <span className="font-semibold text-foreground">{selectedInvoice.method === "online" ? t("onlinePayment") : t("bankTransfer")}</span>
              </div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">{t("cardNumber")}</span>
                <span className="font-semibold text-foreground">{selectedInvoice.cardNumber}</span>
              </div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">{t("invoiceDate")}</span>
                <span className="font-semibold text-foreground">{formatReceiptDate(selectedInvoice.date, locale)}</span>
              </div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">{t("dueDate")}</span>
                <span className="font-semibold text-foreground">{formatReceiptDate(selectedInvoice.dueDate, locale)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-primary/5 p-3">
                <span className="text-sm font-medium text-foreground">{t("TotalAmount")}</span>
                <span className="text-xl font-bold text-primary">{buildAmountLabel(selectedInvoice.amount, locale)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setSelectedInvoiceId(null)} className="rounded-full border border-border/60 bg-background/50 px-4 py-2 text-sm font-medium text-foreground">
                {t("close")}
              </button>
              <button type="button" onClick={() => selectedInvoice && handleDownloadInvoice(selectedInvoice)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                {t("downloadInvoice")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAllInvoices && (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm">
          <button type="button" className="absolute inset-0 bg-black/30" aria-label="close modal" onClick={() => setShowAllInvoices(false)} />
          <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-[calc(100%-1rem)] max-w-4xl max-h-[84vh] overflow-y-auto rounded-t-[28px] rounded-b-[20px] border border-border/40 bg-card p-5 shadow-2xl sm:w-[calc(100%-3rem)] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("paymentHistory")}</p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">{t("allInvoices")}</h3>
              </div>
              <button type="button" onClick={() => setShowAllInvoices(false)} className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground">
                <Icons.X size={16} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/40">
              <div className="hidden gap-4 border-b border-border/40 bg-background/40 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:grid sm:grid-cols-[1.1fr_1fr_0.8fr_0.9fr_0.7fr]">
                <span>{t("invoice")}</span>
                <span>{t("date")}</span>
                <span>{t("amount")}</span>
                <span>{t("status")}</span>
                <span className="text-right">{t("receipt")}</span>
              </div>

              {invoices.map((item) => (
                <div key={item.id} className="grid gap-3 border-b border-border/40 bg-background/30 px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[1.1fr_1fr_0.8fr_0.9fr_0.7fr] sm:items-center">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="min-w-0 truncate font-medium text-foreground">{item.id}</span>
                  </div>

                  <div className="flex flex-col gap-1 sm:block">
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">{t("date")}</span>
                    <span className="min-w-0 text-muted-foreground">{formatInvoiceDate(item.date, locale)}</span>
                  </div>

                  <div className="flex flex-col gap-1 sm:block">
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">{t("amount")}</span>
                    <span className="min-w-0 break-words font-semibold text-foreground">{buildAmountLabel(item.amount, locale)}</span>
                  </div>

                  <div className="flex flex-col gap-1 sm:block">
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:hidden">{t("status")}</span>
                    <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-medium ${item.status === "paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                      {item.status === "paid" ? t("paid") : t("pending")}
                    </span>
                  </div>

                  <button type="button" onClick={() => { setSelectedInvoiceId(item.id); setShowAllInvoices(false); }} className="justify-self-end text-sm font-medium text-primary hover:underline">
                    {t("view")}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">{t("page")} {Math.min(currentPage, totalPages)} / {totalPages}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("previous")}
                </button>

                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-background/60 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("next")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

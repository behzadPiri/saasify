/**
 * ثابت‌ها و داده‌های ماک بخش صورت‌accounts
 * تمام داده‌های نمونه، پلن‌ها و روش‌های پرداخت در این فایل تعریف می‌شوند
 * تا کامپوننت‌ها و هوک‌ها فقط از این ثابت‌ها استفاده کنند
 */

import type {Invoice, PaymentMethod, Plan, BillingSummary, SummaryCardConfig} from "../types";

/** پلن‌های موجود برای انتخاب */
export const PLANS: Plan[] = [
  {
    id: "starter",
    nameKey: "plans.starter.name",
    price: 0,
    intervalKey: "free",
    features: [
      "plans.starter.features.1",
      "plans.starter.features.2",
      "plans.starter.features.3",
    ],
  },
  {
    id: "pro",
    nameKey: "plans.pro.name",
    price: 39000000,
    intervalKey: "monthly",
    features: [
      "plans.pro.features.1",
      "plans.pro.features.2",
      "plans.pro.features.3",
      "plans.pro.features.4",
    ],
    highlighted: true,
    badgeKey: "plans.pro.badge",
  },
  {
    id: "enterprise",
    nameKey: "plans.enterprise.name",
    price: 99000000,
    intervalKey: "monthly",
    features: [
      "plans.enterprise.features.1",
      "plans.enterprise.features.2",
      "plans.enterprise.features.3",
      "plans.enterprise.features.4",
      "plans.enterprise.features.5",
    ],
  },
];

/** داده‌های ماک فاکتورها */
export const MOCK_INVOICES: Invoice[] = [
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
    cardLabelKey: "bankTransfer",
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
    cardLabelKey: "bankTransfer",
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
    cardLabelKey: "bankTransfer",
    cardNumber: "IR 6037 •••• 2841",
    dueDate: new Date("2026-03-12T00:00:00Z"),
  },
];

/** روش‌های پرداخت ثبت‌شده */
export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm-1",
    label: "Visa •• 4242",
    primary: true,
    modeKey: "onlinePayment",
    note: "•••• 4242",
    icon: "CreditCard",
  },
  {
    id: "pm-2",
    labelKey: "bankTransfer",
    primary: false,
    modeKey: "bankTransfer",
    note: "IR 6037 •••• 2841",
    icon: "CreditCard",
  },
];

/** پیکربندی کارت‌های خلاصه */
export const SUMMARY_CARDS: SummaryCardConfig[] = [
  {
    id: "monthly",
    labelKey: "summary.monthlyBilling",
    valueKey: "summary.monthly",
    badgeKey: "summary.monthlyBadge",
    accent: "primary",
  },
  {
    id: "savings",
    labelKey: "summary.annualSavings",
    valueKey: "summary.savings",
    badgeKey: "summary.savingsBadge",
    accent: "emerald",
  },
  {
    id: "next",
    labelKey: "summary.nextInvoice",
    valueKey: "summary.nextInvoice",
    badgeKey: "summary.autoRenew",
    accent: "violet",
  },
];

/** تعداد آیتم در هر صفحه جدول فاکتورها */
export const INVOICE_PAGE_SIZE = 4;

/** مقادیر پیش‌فرض برای داده‌های خالی */
export const DEFAULT_BILLING_SUMMARY: BillingSummary = {
  monthly: 0,
  annualSavings: 0,
  nextInvoiceAmount: 0,
  utilization: 0,
  usedSeats: 0,
  totalSeats: 0,
};
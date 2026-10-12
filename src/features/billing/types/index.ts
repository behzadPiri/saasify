/**
 * تایپ‌های بخش صورت‌accounts
 * شامل فاکتورها، روش‌های پرداخت، پلن‌ها و داده‌های خلاصه
 */

import type {Icons} from "@/shared/components/ui/icons";

/** وضعیت یک فاکtors */
export type InvoiceStatus = "paid" | "pending" | "failed";

/** نوع روش پرداخت */
export type PaymentMethodType = "online" | "bank";

/**
 * ساختار یک فاکtors (Invoice)
 * شامل شناسه، تاریخ، مبلغ، وضعیت و روش پرداخت
 */
export interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: InvoiceStatus;
  method: PaymentMethodType;
  cardLabel: string;
  cardNumber: string;
  dueDate: Date;
}

/**
 * ساختار یک روش پرداخت
 * به همراه پیکربندی نمایشی
 */
export interface PaymentMethod {
  id: string;
  label: string;
  primary: boolean;
  modeKey: string;
  note: string;
  icon: keyof typeof Icons;
}

/**
 * ساختار یک پلن اشتراک
 * شامل نام، قیمت، ویژگی‌ها و اطلاعات مصرف
 */
export interface Plan {
  id: string;
  nameKey: string;
  price: number;
  intervalKey: string;
  features: string[];
  highlighted?: boolean;
  badgeKey?: string;
}

/**
 * داده‌های خلاصه صورت‌accounts
 */
export interface BillingSummary {
  monthly: number;
  annualSavings: number;
  nextInvoiceAmount: number;
  utilization: number;
  usedSeats: number;
  totalSeats: number;
}

/**
 * پیکربندی نمایشی برای کارت‌های آمار
 */
export interface SummaryCardConfig {
  id: string;
  labelKey: string;
  valueKey: string;
  badgeKey?: string;
  accent: "primary" | "emerald" | "violet" | "amber";
}
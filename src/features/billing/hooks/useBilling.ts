/**
 * هوک اصلی صورت‌accounts
 * مدیریت تمام منطق بخش صورت‌accounts شامل پلن فعلی، فاکتورها و روش‌های پرداخت
 */

import {useMemo} from "react";
import {useTranslations} from "next-intl";
import {MOCK_INVOICES, MOCK_PAYMENT_METHODS, PLANS, SUMMARY_CARDS, INVOICE_PAGE_SIZE, DEFAULT_BILLING_SUMMARY} from "../constants";
import type {Invoice, PaymentMethod, Plan, BillingSummary} from "../types";

interface UseBillingOptions {
  /** شناسه پلن فعلی کاربر */
  currentPlanId?: string;
}

/**
 * هوک اصلی صورت‌accounts
 * داده‌ها و منطق محاسبه‌شده را برای کامپوننت‌ها فراهم می‌کند
 */
export function useBilling({currentPlanId = "pro"}: UseBillingOptions = {}) {
  const t = useTranslations("Billing");

  // پلن فعلی
  const currentPlan = useMemo<Plan | undefined>(
    () => PLANS.find((plan) => plan.id === currentPlanId),
    [currentPlanId],
  );

  // فاکتورهای ماک
  const invoices = useMemo<Invoice[]>(() => MOCK_INVOICES, []);

  // روش‌های پرداخت
  const paymentMethods = useMemo<PaymentMethod[]>(() => MOCK_PAYMENT_METHODS, []);

  // محاسبه خلاصه صورت‌accounts
  const summary = useMemo<BillingSummary>(() => {
    const totalPaid = invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const monthlyAmount = currentPlan?.price ?? 0;
    const annualSavings = monthlyAmount * 2; // 2 ماه رایگان در سال
    const utilization = 72; // مقدار ثابت مصرف برای نمایش

    return {
      monthly: monthlyAmount,
      annualSavings,
      nextInvoiceAmount: monthlyAmount,
      utilization,
      usedSeats: 24,
      totalSeats: 36,
    };
  }, [currentPlan, invoices]);

  // تاریخ تمدید پلن
  const renewDate = useMemo(() => new Date("2026-09-30T00:00:00Z"), []);

  // ویژگی‌های پلن فعلی
  const planFeatures = useMemo(
    () => (currentPlan ? currentPlan.features.map((key) => t(key)) : []),
    [currentPlan, t],
  );

  return {
    // داده‌ها
    currentPlan,
    invoices,
    paymentMethods,
    summary,
    renewDate,
    planFeatures,
    summaryCards: SUMMARY_CARDS,

    // ثوابت
    pageSize: INVOICE_PAGE_SIZE,
    defaultSummary: DEFAULT_BILLING_SUMMARY,

    // ترجمه
    t,
  };
}
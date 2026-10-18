"use client";

/**
 * کامپوننت نمایش روش‌های پرداخت
 * نمایش کارت‌های روش‌های پرداخت ثبت‌شده با جزئیات و نشانگر پیش‌فرض
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {PaymentMethod} from "../types";

interface PaymentMethodsProps {
  /** لیست روش‌های پرداخت */
  methods: PaymentMethod[];
}

export function PaymentMethods({methods}: PaymentMethodsProps) {
  const t = useTranslations("Billing");

  if (methods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
        <Icons.CreditCard size={32} className="opacity-50" />
        <p>{t("noPaymentMethods")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {methods.map((method) => {
        const Icon = Icons[method.icon];
        return (
          <div
            key={method.id}
            className={`flex items-center justify-between rounded-2xl border p-3 ${
              method.primary
                ? "border-primary/20 bg-primary/5"
                : "border-border/40 bg-background/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{method.labelKey ? t(method.labelKey) : method.label}</p>
                <p className="text-xs text-muted-foreground">{t(method.modeKey)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">{method.note}</p>
              {method.primary ? (
                <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  {t("default")}
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
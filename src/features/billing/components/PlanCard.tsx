"use client";

/**
 * کامپوننت کارت پلن فعلی
 * نمایش اطلاعات پلن فعلی، نوار مصرف، ویژگی‌ها و دکمه ارتقا
 */

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {buildAmountLabel, formatInvoiceDate} from "../lib/format";
import {useLocale} from "next-intl";

interface PlanCardProps {
  /** نام پلن */
  planName: string;
  /** مبلغ ماهانه پلن */
  monthlyAmount: number;
  /** درصد مصرف */
  utilization: number;
  /** تعداد صندلی استفاده شده */
  usedSeats: number;
  /** تعداد کل صندلی‌ها */
  totalSeats: number;
  /** تاریخ تمدید پلن */
  renewDate: Date;
  /** لیست ویژگی‌های پلن */
  features: string[];
}

export function PlanCard({
  planName,
  monthlyAmount,
  utilization,
  usedSeats,
  totalSeats,
  renewDate,
  features,
}: PlanCardProps) {
  const t = useTranslations("Billing");
  const locale = useLocale();

  return (
    <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("currentPlan")}

          </p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t(planName)}</h2>
        </div>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
          {t("active")}
        </span>
      </div>

      <div className="rounded-3xl border border-primary/10 bg-linear-to-r from-primary/8 via-indigo-500/5 to-violet-500/8 p-4 sm:p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Icons.Sparkles size={14} />
              {t(planName)}
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {buildAmountLabel(monthlyAmount, locale)}
                <span className="text-base font-medium text-muted-foreground">
                  {" / "}
                  {t("monthly").toLowerCase()}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("renewsOn")} {formatInvoiceDate(renewDate, locale)}
              </p>
            </div>
          </div>

          <div className="flex min-w-55 flex-col gap-3 rounded-2xl border border-border/40 bg-background/50 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("usage")}</span>
              <span className="font-semibold text-foreground">{utilization}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-indigo-500 transition-[width] duration-700 ease-out"
                style={{width: `${utilization}%`}}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {usedSeats} / {totalSeats}
              </span>
              <span>{t("teamSeats")}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-sm text-foreground"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Icons.Check size={12} />
              </div>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
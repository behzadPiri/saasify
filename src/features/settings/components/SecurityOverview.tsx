/**
 * کارت نمای امنیت حساب؛ ترکیب ردیف‌های ایستا.
 * داده از useSecurityOverview می‌آید تا UI خالص بماند.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import {SecurityFieldRow} from "./SecurityFieldRow";
import type {UseSecurityOverviewReturn} from "../hooks/useSecurityOverview";

/** Props کارت امنیت */
interface SecurityOverviewProps {
  /** خروجی هوک امنیت */
  data: UseSecurityOverviewReturn;
}

/**
 * کارت امنیت حساب
 * چرا memo؟ داده ایستاست و تغییر فرم‌های دیگر نباید آن را ری‌رندر کند.
 */
export const SecurityOverview = memo(function SecurityOverview({data}: SecurityOverviewProps) {
  const t = useTranslations("Settings");

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("security")}</p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">{t("accountSecurity")}</h2>
      </div>

      <div className="space-y-3">
        {data.fields.map((field) => (
          <SecurityFieldRow key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
});

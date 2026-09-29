"use client";

/**
 * حالت پیدا نشدن عضو
 * پیام خطا و بازگشت به فهرست تیم
 */

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Icons} from "@/shared/components/ui/icons";

export function MemberNotFound() {
  const t = useTranslations("Team");

  return (
    <div className="space-y-6 w-full">
      <div className="rounded-[28px] border border-dashed border-border/70 bg-card/80 p-10 text-center">
        <Icons.AlertCircle className="mx-auto text-muted-foreground" size={38} />
        <h1 className="mt-4 text-2xl font-bold text-foreground">{t("memberNotFound")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("memberNotFoundDescription")}</p>
        <Link
          href="/team"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Icons.ArrowLeft size={16} />
          {t("backToTeam")}
        </Link>
      </div>
    </div>
  );
}

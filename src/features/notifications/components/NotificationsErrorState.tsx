"use client";

/**
 * حالت خطای دریافت اعلان‌ها
 * پیام خطا و دکمه تلاش دوباره را نمایش می‌دهد؛ متن دکمه از نیم‌اسپیس Common می‌آید.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

interface NotificationsErrorStateProps {
  /** تلاش دوباره برای دریافت لیست */
  onRetry: () => void;
}

/**
 * نمایش خطا با امکان تلاش دوباره
 * چرا memo؟ چون فقط با تغییر تابع تلاش دوباره رندر می‌شود.
 */
export const NotificationsErrorState = memo(function NotificationsErrorState({
  onRetry,
}: NotificationsErrorStateProps) {
  const t = useTranslations("Notifications");
  const tCommon = useTranslations("Common");

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <Icons.AlertCircle size={48} className="text-destructive" />
      <p className="text-destructive">{t("loadError")}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {tCommon("retry")}
      </button>
    </div>
  );
});

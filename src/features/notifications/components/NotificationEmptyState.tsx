"use client";

/**
 * حالت خالی اعلان‌ها
 * دو حالت را پوشش می‌دهد: نبود هیچ اعلانی، و نبود نتیجه برای فیلتر فعال.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

interface NotificationEmptyStateProps {
  /**
   * آیا فیلتر فعال باعث خالی شدن لیست شده است؟
   * اگر true باشد پیام «نتیجه‌ای برای این فیلتر نیست» نمایش داده می‌شود.
   */
  isFilterEmpty: boolean;
}

/**
 * حالت خالی فید اعلان‌ها
 * چرا memo؟ ایستا است و نباید با تغییر pageSize یا عملیات‌ها رندر شود.
 */
export const NotificationEmptyState = memo(function NotificationEmptyState({
  isFilterEmpty,
}: NotificationEmptyStateProps) {
  const t = useTranslations("Notifications");

  return (
    <div className="flex min-h-55 flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-background/40 px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icons.Bell size={20} />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        {isFilterEmpty ? t("noFilterResults") : t("noNotifications")}
      </h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("emptyHint")}</p>
    </div>
  );
});

"use client";

/**
 * دکمه «تنظیمات اعلان‌ها»
 * کاربر را به صفحه تنظیمات (که ترجیحات اعلان‌ها را دارد) هدایت می‌کند.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Link} from "@/i18n/navigation";

/**
 * لینک تنظیمات اعلان‌ها
 * از Link محلی‌سازی‌شده استفاده می‌کند تا مسیر در همه زبان‌ها درست ساخته شود.
 */
export const NotificationSettingsButton = memo(function NotificationSettingsButton() {
  const t = useTranslations("Notifications");

  return (
    <Link
      href="/settings"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/40"
    >
      <Icons.Settings size={16} />
      {t("settings")}
    </Link>
  );
});

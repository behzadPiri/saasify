/**
 * کارت ترجیحات اعلان‌ها؛ رندر حلقه‌ای سوئیچ‌ها از روی ترتیب ثابت.
 * هندلر هر ردیف با useCallback در همین فایل پایدار می‌شود تا ToggleRow memo بیهوده بیدار نشود.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import {NOTIFICATION_TOGGLE_ORDER} from "../constants";
import type {NotificationPreferenceKey, SettingsPreferences} from "../types";
import {NotificationToggleItem} from "./NotificationToggleItem";

/** Props کارت اعلان‌ها */
interface NotificationPreferencesProps {
  /** ترجیحات فعلی */
  preferences: SettingsPreferences;
  /** تابع toggle پایدار از هوک */
  onToggle: (key: NotificationPreferenceKey) => void;
  /** جهت نوشتار */
  isRtl: boolean;
}

/**
 * کارت ترجیحات اعلان‌ها
 */
export const NotificationPreferences = memo(function NotificationPreferences({
  preferences,
  onToggle,
  isRtl,
}: NotificationPreferencesProps) {
  const t = useTranslations("Settings");

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className={isRtl ? "text-right" : "text-left"}>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("notifications")}
          </p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t("preferences")}</h2>
        </div>
        <button type="button" className="text-sm font-medium text-primary hover:underline">
          {t("manage")}
        </button>
      </div>

      <div className="space-y-3">
        {/* ترتیب رندر از ثوابت می‌آید؛ هر آیتم هندلر پایدار خودش را می‌سازد */}
        {NOTIFICATION_TOGGLE_ORDER.map((key) => (
          <NotificationToggleItem
            key={key}
            preferenceKey={key}
            enabled={preferences[key]}
            onToggle={onToggle}
            isRtl={isRtl}
          />
        ))}
      </div>
    </div>
  );
});

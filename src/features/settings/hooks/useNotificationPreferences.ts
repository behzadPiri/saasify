/**
 * مدیریت state سوئیچ‌های ترجیحات اعلان‌ها (ViewModel بخش اعلان‌ها).
 * تمام تغییرها با useCallback پایدار می‌مانند تا فرزندهای memo ری‌رندر نشوند.
 */

"use client";

import {useCallback, useMemo, useState} from "react";
import {DEFAULT_PREFERENCES} from "../constants";
import type {NotificationPreferenceKey, SettingsPreferences} from "../types";

/**
 * هوک ترجیحات اعلان‌ها
 * @returns ترجیحات فعلی + تابع toggle پایدار برای یک کلید مشخص
 */
export function useNotificationPreferences() {
  // state تکراری نداریم؛ تنها منبع، همین آبجکت یکپارچه است.
  const [preferences, setPreferences] = useState<SettingsPreferences>(DEFAULT_PREFERENCES);

  /**
   * تغییر وضعیت یک سوئیچ مشخص؛ با useCallback تا رفرنس تابع ثابت بماند.
   * چرا تابعی set می‌کنیم؟ تا به state تازه وابسته نباشیم و در deps نیاید.
   */
  const togglePreference = useCallback((key: NotificationPreferenceKey) => {
    setPreferences((current) => ({...current, [key]: !current[key]}));
  }, []);

  // ساخت نسخه پایدار برای مصرف‌کننده؛ چون preferences خودش memo است، کپی اضافه نمی‌سازیم.
  const value = useMemo(() => ({preferences, togglePreference}), [preferences, togglePreference]);

  return value;
}

/** نوع خروجی هوک برای استفاده در فاساد useSettings */
export type UseNotificationPreferencesReturn = ReturnType<typeof useNotificationPreferences>;

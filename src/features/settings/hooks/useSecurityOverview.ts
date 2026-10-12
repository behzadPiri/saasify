/**
 * ViewModel کارت امنیت حساب؛ ردیف‌ها کاملاً ایستا هستند و فقط memo می‌شوند.
 */

"use client";

import {useMemo} from "react";
import {MOCK_SECURITY_FIELDS} from "../lib/settings.mock";

/**
 * هوک نمای امنیت حساب
 * @returns ردیف‌های ایستای امنیت (بدون state، بدون اثر جانبی)
 */
export function useSecurityOverview() {
  // آرایه ماک ثابت است؛ useMemo از ساخت مجدد در هر رندر جلوگیری می‌کند.
  const fields = useMemo(() => [...MOCK_SECURITY_FIELDS], []);

  return useMemo(() => ({fields}), [fields]);
}

/** نوع خروجی هوک برای کامپوننت SecurityOverview */
export type UseSecurityOverviewReturn = ReturnType<typeof useSecurityOverview>;

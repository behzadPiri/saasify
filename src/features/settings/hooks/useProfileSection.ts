/**
 * ViewModel کارت پروفایل؛ ساخت ردیف‌های نمایشی از روی ماک با useMemo.
 * هیچ JSX و متن هاردکدی اینجا نیست؛ فقط داده آماده برای View.
 */

"use client";

import {useMemo} from "react";
import {MOCK_PROFILE, buildProfileFields} from "../lib/settings.mock";

/**
 * هوک بخش پروفایل
 * @returns پروفایل ماک + ردیف‌های آماده رندر (memoشده چون ایستا هستند)
 */
export function useProfileSection() {
  // چون ماک ایستاست، وابستگی خالی کافی است و exhaustive-deps رعایت می‌شود.
  const fields = useMemo(() => buildProfileFields(MOCK_PROFILE), []);

  const value = useMemo(() => ({profile: MOCK_PROFILE, fields}), [fields]);

  return value;
}

/** نوع خروجی هوک برای کامپوننت ProfileSection */
export type UseProfileSectionReturn = ReturnType<typeof useProfileSection>;

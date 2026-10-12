/**
 * سکشن پروفایل؛ ترکیب کارت هویت و ردیف‌ها.
 * منطق از useProfileSection می‌آید تا این فایل فقط ترکیب UI باشد.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import {ProfileIdentityCard} from "./ProfileIdentityCard";
import {ProfileFieldRow} from "./ProfileFieldRow";
import type {UseProfileSectionReturn} from "../hooks/useProfileSection";

/** Props سکشن پروفایل */
interface ProfileSectionProps {
  /** خروجی هوک پروفایل (پروفایل + ردیف‌ها) */
  data: UseProfileSectionReturn;
  /** جهت نوشتار */
  isRtl: boolean;
}

/**
 * سکشن پروفایل کاربر
 * چرا memo؟ چون داده‌اش ایستاست و نباید با تایپ در فرم رمز بیدار شود.
 */
export const ProfileSection = memo(function ProfileSection({data, isRtl}: ProfileSectionProps) {
  const t = useTranslations("Settings");

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className={isRtl ? "text-right" : "text-left"}>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("profile")}</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t("profileDetails")}</h2>
        </div>
      </div>

      <ProfileIdentityCard profile={data.profile} isRtl={isRtl} />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {data.fields.map((field) => (
          <ProfileFieldRow key={field.id} field={field} isRtl={isRtl} />
        ))}
      </div>
    </div>
  );
});

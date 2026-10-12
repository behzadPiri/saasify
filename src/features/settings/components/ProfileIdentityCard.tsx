/**
 * کارت هویت پروفایل (آواتار + نام + سمت)؛ اتمیک و memoشده.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import type {SettingsProfile} from "../types";

/** Props کارت هویت */
interface ProfileIdentityCardProps {
  /** پروفایل ماک (داده، نه متن UI) */
  profile: SettingsProfile;
  /** جهت نوشتار */
  isRtl: boolean;
}

/**
 * کارت هویت کاربر
 * @param profile پروفایل نمایشی
 * @param isRtl جهت نوشتار برای تراز متن
 */
export const ProfileIdentityCard = memo(function ProfileIdentityCard({profile, isRtl}: ProfileIdentityCardProps) {
  const t = useTranslations("Settings");

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-background/40 p-4">
      {/* حروف اول نام؛ داده است و ترجمه نمی‌شود */}
      <div
        aria-hidden="true"
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-violet-500/10 to-emerald-500/15 text-lg font-bold text-primary"
      >
        {profile.initials}
      </div>
      <div className={isRtl ? "text-right" : "text-left"}>
        <p className="text-xl font-semibold text-foreground">{profile.fullName}</p>
        {/* سمت شغلی کلید ترجمه است */}
        <p className="text-sm text-muted-foreground">{t(profile.roleKey)}</p>
      </div>
    </div>
  );
});

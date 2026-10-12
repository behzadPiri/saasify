/**
 * فرم تغییر رمز عبور؛ ترکیب فیلدهای اتمیک با هوک usePasswordForm.
 * پیام موفقیت و حالت saving همه با کلید ترجمه نمایش داده می‌شوند.
 */

"use client";

import {memo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {PASSWORD_FIELD_CONFIG} from "../constants";
import type {UsePasswordFormReturn} from "../hooks/usePasswordForm";
import {PasswordField} from "./PasswordField";

/** Props فرم رمز */
interface PasswordFormProps {
  /** خروجی هوک فرم رمز */
  form: UsePasswordFormReturn;
}

/**
 * فرم تغییر رمز عبور
 * چرا memo؟ چون فقط با تغییر state خودش (داخل form) به‌روز می‌شود نه با سوئیچ‌های اعلان.
 */
export const PasswordForm = memo(function PasswordForm({form}: PasswordFormProps) {
  const t = useTranslations("Settings");
  const {values, errors, status, isSaving, handleChange, handleSubmit} = form;

  return (
    <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("security")}</p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">{t("changePassword")}</h2>
      </div>

      <div className="space-y-3">
        {PASSWORD_FIELD_CONFIG.map((config) => (
          <PasswordField
            key={config.id}
            id={config.id}
            labelKey={config.labelKey}
            autoComplete={config.autoComplete}
            value={values[config.id]}
            error={errors[config.id]}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* پیام موفقیت بعد از ذخیره؛ داده نمایشی و ترجمه‌شده */}
      {status === "success" ? (
        <p role="status" className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400">
          {t("passwordUpdated")}
        </p>
      ) : null}

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icons.Shield size={16} />
          {isSaving ? t("saving") : t("updatePassword")}
        </button>
      </div>
    </div>
  );
});

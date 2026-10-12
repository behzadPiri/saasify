/**
 * منطق فرم تغییر رمز عبور (ViewModel بخش امنیت).
 * شامل state کنترل‌شده، اعتبارسنجی، ارسال شبیه‌سازی‌شده و cleanup کامل تایمر.
 */

"use client";

import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {MIN_PASSWORD_LENGTH, PASSWORD_SAVE_DELAY_MS} from "../constants";
import type {PasswordFieldId, PasswordFormErrors, PasswordFormState, PasswordSubmitStatus} from "../types";

/** state خالی اولیه فرم؛ خارج از کامپوننت تا هر رندر شی جدید نسازد */
const INITIAL_FORM_STATE: PasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

/** خطای خالی اولیه */
const INITIAL_ERRORS: PasswordFormErrors = {
  currentPassword: null,
  newPassword: null,
  confirmPassword: null,
};

/**
 * هوک فرم رمز عبور
 * @returns مقادیر فرم، خطاها، وضعیت ارسال و هندلرهای پایدار
 */
export function usePasswordForm() {
  const t = useTranslations("Settings");
  const [values, setValues] = useState<PasswordFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<PasswordFormErrors>(INITIAL_ERRORS);
  const [status, setStatus] = useState<PasswordSubmitStatus>("idle");

  // نگهداری شناسه تایمر ذخیره برای cleanup هنگام unmount یا ارسال مجدد
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * پاک‌سازی تایمر معلق؛ جلوگیری از setState روی کامپوننت unmountشده (Memory Leak).
   * در cleanup اثر و قبل از هر ارسال جدید صدا زده می‌شود.
   */
  const clearPendingSave = useCallback(() => {
    if (saveTimerRef.current !== null) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
  }, []);

  // cleanup نهایی هنگام unmount کامپوننت مصرف‌کننده
  useEffect(() => {
    return () => {
      if (saveTimerRef.current !== null) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, []);

  /**
   * اعتبارسنجی فرم با پیام‌های ترجمه‌شده؛ خروجی null یعنی معتبر.
   * با useCallback و وابستگی به t تا با تغییر زبان به‌روز شود (رفع exhaustive-deps).
   */
  const validate = useCallback(
    (form: PasswordFormState): PasswordFormErrors => {
      const next: PasswordFormErrors = {currentPassword: null, newPassword: null, confirmPassword: null};
      if (!form.currentPassword) next.currentPassword = t("passwordRequired");
      if (!form.newPassword) {
        next.newPassword = t("passwordRequired");
      } else if (form.newPassword.length < MIN_PASSWORD_LENGTH) {
        next.newPassword = t("passwordTooShort");
      }
      if (!form.confirmPassword) {
        next.confirmPassword = t("passwordRequired");
      } else if (form.newPassword && form.confirmPassword !== form.newPassword) {
        next.confirmPassword = t("passwordMismatch");
      }
      return next;
    },
    [t],
  );

  /** آیا خطایی وجود دارد؟ مقدار مشتق‌شده با useMemo */
  const hasErrors = useMemo(() => Object.values(errors).some((e) => e !== null), [errors]);

  /**
   * تغییر یک فیلد خاص؛ خطای همان فیلد را هم پاک می‌کند تا بازخورد لحظه‌ای باشد.
   * چرا useCallback؟ چون به PasswordField (memo) پاس داده می‌شود.
   */
  const handleChange = useCallback((field: PasswordFieldId, value: string) => {
    setValues((current) => ({...current, [field]: value}));
    setErrors((current) => (current[field] === null ? current : {...current, [field]: null}));
  }, []);

  /**
   * ارسال فرم: اعتبارسنجی همگام، سپس شبیه‌سازی ذخیره ناهمگام با تایمر قابل کنسل.
   * ارسال مجدد در حین saving نادیده گرفته می‌شود تا چرخه بی‌نهایت پیش نیاید.
   */
  const handleSubmit = useCallback(() => {
    if (status === "saving") return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some((e) => e !== null)) return;

    clearPendingSave();
    setStatus("saving");
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = null;
      setStatus("success");
      setValues(INITIAL_FORM_STATE);
    }, PASSWORD_SAVE_DELAY_MS);
  }, [clearPendingSave, status, validate, values]);

  /** برگشت از حالت موفقیت به idle (مثلاً بعد از نمایش پیام) */
  const resetStatus = useCallback(() => {
    setStatus("idle");
  }, []);

  const value = useMemo(
    () => ({values, errors, hasErrors, status, isSaving: status === "saving", handleChange, handleSubmit, resetStatus}),
    [values, errors, hasErrors, status, handleChange, handleSubmit, resetStatus],
  );

  return value;
}

/** نوع خروجی هوک برای استفاده در فاساد و کامپوننت فرم */
export type UsePasswordFormReturn = ReturnType<typeof usePasswordForm>;

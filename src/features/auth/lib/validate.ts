/**
 * توابع اعتبارسنجی فرم احراز هویت
 */
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from "@/features/auth";
import type { LoginFormErrors } from "../types";

/**
 * اعتبارسنجی ایمیل
 * @param email - ایمیل وارد شده
 * @returns پیام خطا یا undefined در صورت معتبر بودن
 */
export function validateEmail(email: string): string | undefined {
    if (!email.trim()) return "required";
    if (!EMAIL_REGEX.test(email)) return "invalidEmail";
    return undefined;
}

/**
 * اعتبارسنجی رمز عبور
 * @param password - رمز عبور وارد شده
 * @returns پیام خطا یا undefined در صورت معتبر بودن
 */
export function validatePassword(password: string): string | undefined {
    if (!password) return "required";
    if (password.length < MIN_PASSWORD_LENGTH) return "minLength";
    return undefined;
}

/**
 * اعتبارسنجی کامل فرم ورود
 */
export function validateLoginForm(email: string, password: string): LoginFormErrors {
    const errors: LoginFormErrors = {};
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
    return errors;
}

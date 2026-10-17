/**
 * ثوابت بخش احراز هویت
 */

/** مقادیر اولیه فرم ورود */
export const INITIAL_LOGIN_FORM: { email: string; password: string; rememberMe: boolean } = {
    email: "",
    password: "",
    rememberMe: false,
};

/** قوانین اعتبارسنجی ایمیل */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** حداقل طول رمز عبور */
export const MIN_PASSWORD_LENGTH = 6;

/** کلیدهای localStorage */
export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_REMEMBER_KEY = "auth_remember";

/**
 * تایپ‌های بخش احراز هویت
 */

/** داده‌های فرم ورود */
export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

/** خطاهای اعتبارسنجی فرم */
export interface LoginFormErrors {
    email?: string;
    password?: string;
}

/** وضعیت ارسال فرم */
export type AuthStatus = "idle" | "loading" | "success" | "error";

/** پاسخ سرویس لاگین */
export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

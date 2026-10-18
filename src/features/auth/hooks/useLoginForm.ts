"use client";

/**
 * هوک مدیریت فرم ورود
 */
import { useCallback, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { INITIAL_LOGIN_FORM } from "@/features/auth";
import { validateLoginForm } from "../lib/validate";
import type { LoginFormErrors, AuthStatus } from "../types";

/**
 * هوک مدیریت state و منطق فرم ورود
 */
export function useLoginForm() {
    const router = useRouter();
    const locale = useLocale();
    const [email, setEmail] = useState(INITIAL_LOGIN_FORM.email);
    const [password, setPassword] = useState(INITIAL_LOGIN_FORM.password);
    const [rememberMe, setRememberMe] = useState(INITIAL_LOGIN_FORM.rememberMe);
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [status, setStatus] = useState<AuthStatus>("idle");
    const [showPassword, setShowPassword] = useState(false);
    const [shake, setShake] = useState(false);

    const handleEmailChange = useCallback((value: string) => {
        setEmail(value);
        setErrors((prev) => ({ ...prev, email: undefined }));
    }, []);

    const handlePasswordChange = useCallback((value: string) => {
        setPassword(value);
        setErrors((prev) => ({ ...prev, password: undefined }));
    }, []);

    const togglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const toggleRememberMe = useCallback(() => {
        setRememberMe((prev) => !prev);
    }, []);

    const submit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            const validationErrors = validateLoginForm(email, password);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setShake(true);
                setTimeout(() => setShake(false), 500);
                return;
            }
            setStatus("loading");
            // مسیر مقصد با پیشوند زبان فعلی (next-intl) تا ریدایرکت پس از لاگین معتبر باشد
            const callbackUrl = `/${locale}/dashboard`;
            try {
                const res = await signIn("credentials", {
                    email,
                    password,
                    callbackUrl,
                    redirect: false,
                });
                if (res?.error) {
                    setStatus("error");
                    setShake(true);
                    setTimeout(() => setShake(false), 500);
                    return;
                }
                setStatus("success");
                if (rememberMe) {
                    localStorage.setItem("auth_remember", "true");
                }
                setTimeout(() => router.push(callbackUrl), 600);
            } catch {
                setStatus("error");
            }
        },
        [email, password, rememberMe, router, locale]
    );

    const isFormValid = useMemo(
        () => email.trim().length > 0 && password.length >= 6,
        [email, password]
    );

    return {
        email,
        password,
        rememberMe,
        errors,
        status,
        showPassword,
        shake,
        isFormValid,
        handleEmailChange,
        handlePasswordChange,
        togglePassword,
        toggleRememberMe,
        submit,
    };
}

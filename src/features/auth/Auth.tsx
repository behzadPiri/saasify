"use client";

/**
 * کامپوننت اصلی صفحه احراز هویت
 */
import { useLoginForm } from "./hooks/useLoginForm";
import { AuthCard } from "./components/AuthCard";
import { Branding } from "./components/Branding";
import { LoginForm } from "./components/LoginForm";

export function Auth() {
    const form = useLoginForm();
    return (
        <AuthCard>
            <Branding />
            <LoginForm form={form} />
        </AuthCard>
    );
}

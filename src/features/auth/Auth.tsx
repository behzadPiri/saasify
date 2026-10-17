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
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md animate-[fadeIn_0.6s_ease-out]">
                <AuthCard>
                    <Branding />
                    <LoginForm form={form} />
                </AuthCard>
            </div>
        </div>
    );
}

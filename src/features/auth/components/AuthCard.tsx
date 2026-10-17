"use client";

/**
 * کامپوننت کارت اصلی احراز هویت با انیمیشن ورود
 */
import { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
    return (
        <div className="animate-[slideUp_0.5s_ease-out] rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900">
            {children}
        </div>
    );
}

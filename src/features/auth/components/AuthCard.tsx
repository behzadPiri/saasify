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
        <div className="rounded-2xl border border-border/60 bg-card p-6 text-foreground shadow-xl shadow-black/5 sm:p-8">
            {children}
        </div>
    );
}

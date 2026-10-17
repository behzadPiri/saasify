"use client";

/**
 * پیام وضعیت (موفقیت/خطا)
 */
import { useTranslations } from "next-intl";

interface StatusMessageProps {
    status: string;
}

export function StatusMessage({ status }: StatusMessageProps) {
    const t = useTranslations("Auth");
    if (status === "success") {
        return <p className="text-center text-sm text-green-600">{t("loginSuccess")}</p>;
    }
    if (status === "error") {
        return <p className="text-center text-sm text-red-600">{t("loginError")}</p>;
    }
    return null;
}

"use client";

/**
 * دکمه‌های ورود با شبکه‌های اجتماعی
 */
import { useTranslations } from "next-intl";

export function SocialAuth() {
    const t = useTranslations("Auth");
    return (
        <div className="space-y-3">
            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
                {t("continueWithGoogle")}
            </button>
            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
                {t("continueWithGithub")}
            </button>
        </div>
    );
}

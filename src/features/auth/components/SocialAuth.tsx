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
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
                {t("continueWithGoogle")}
            </button>
            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
                {t("continueWithGithub")}
            </button>
        </div>
    );
}

"use client";

/**
 * فرم ورود
 */
import { useTranslations } from "next-intl";
import { AuthInput } from "./AuthInput";
import { SocialAuth } from "./SocialAuth";
import { StatusMessage } from "./StatusMessage";
import type { useLoginForm } from "@/features/auth";

interface LoginFormProps {
    form: ReturnType<typeof useLoginForm>;
}

export function LoginForm({ form }: LoginFormProps) {
    const t = useTranslations("Auth");
    const {
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
    } = form;

    return (
        <form
            onSubmit={submit}
            className={`space-y-4 ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
        >
            <AuthInput
                label={t("email")}
                value={email}
                onChange={handleEmailChange}
                error={errors.email ? t(`errors.${errors.email}`) : undefined}
                placeholder={t("emailPlaceholder")}
            />
            <AuthInput
                label={t("password")}
                value={password}
                onChange={handlePasswordChange}
                error={errors.password ? t(`errors.${errors.password}`) : undefined}
                placeholder={t("passwordPlaceholder")}
                showToggle
                showPassword={showPassword}
                onToggle={togglePassword}
            />
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-foreground/80">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={toggleRememberMe}
                        className="h-4 w-4 rounded border-border accent-primary"
                    />
                    {t("rememberMe")}
                </label>
                <a href="#" className="text-primary hover:underline">
                    {t("forgotPassword")}
                </a>
            </div>
            <button
                type="submit"
                disabled={status === "loading" || !isFormValid}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
            >
                {status === "loading" && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                )}
                {t("login")}
            </button>
            <StatusMessage status={status} />
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">{t("or")}</span>
                </div>
            </div>
            <SocialAuth />
        </form>
    );
}

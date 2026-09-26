"use client";

import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";
import {Icons} from "@/shared/components/ui/icons";

function ToggleRow({label, enabled, onToggle, isRtl}: {label: string; enabled: boolean; onToggle: () => void; isRtl: boolean}) {
  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-background/40 p-3.5">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <button
        type="button"
        aria-pressed={enabled}
        aria-label={label}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition duration-200 ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute h-4 w-4 rounded-full bg-white shadow-sm transition duration-200 ${
            enabled ? (isRtl ? "-translate-x-6" : "translate-x-6") : isRtl ? "translate-x-1" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export function Settings() {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const [preferences, setPreferences] = useState({
    notificationsEnabled: true,
    marketingUpdates: true,
    securityAlerts: false,
    weeklyReports: false,
  });

  const profileFields = [
    {label: t("fullName"), value: "Ava Thompson", icon: Icons.User},
    {label: t("emailAddress"), value: "ava@saasify.io", icon: Icons.Mail},
    {label: t("role"), value: t("productLead"), icon: Icons.Users},
  ];

  const securityFields = [
    {label: t("twoFactor"), value: t("enabled"), icon: Icons.Check},
    {label: t("lastLogin"), value: t("lastLoginToday"), icon: Icons.Clock},
    {label: t("activeSessions"), value: t("activeSessionsValue"), icon: Icons.Users},
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%)]" />

        <div className="relative max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <Icons.Settings size={12} />
            {t("title")}
          </div>

          <div className={isRtl ? "text-right" : "text-left"}>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{t("description")}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className={isRtl ? "text-right" : "text-left"}>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("profile")}</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">{t("profileDetails")}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-background/40 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-violet-500/10 to-emerald-500/15 text-lg font-bold text-primary">
              AT
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <p className="text-xl font-semibold text-foreground">Ava Thompson</p>
              <p className="text-sm text-muted-foreground">{t("productLead")}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {profileFields.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-border/40 bg-background/40 p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background/80 text-foreground">
                      <Icon size={15} />
                    </div>
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
          <div className="mb-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("security")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("accountSecurity")}</h2>
          </div>

          <div className="space-y-3">
            {securityFields.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/40 p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-background/80 text-foreground">
                      <Icon size={14} />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
          <div className="mb-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("security")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("changePassword")}</h2>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{t("currentPassword")}</span>
              <input
                type="password"
                placeholder={t("currentPassword")}
                className="w-full rounded-xl border border-border/50 bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{t("newPassword")}</span>
              <input
                type="password"
                placeholder={t("newPassword")}
                className="w-full rounded-xl border border-border/50 bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{t("confirmPassword")}</span>
              <input
                type="password"
                placeholder={t("confirmPassword")}
                className="w-full rounded-xl border border-border/50 bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary"
              />
            </label>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
            >
              <Icons.Shield size={16} />
              {t("updatePassword")}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className={isRtl ? "text-right" : "text-left"}>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("notifications")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("preferences")}</h2>
          </div>
          <button type="button" className="text-sm font-medium text-primary hover:underline">
            {t("manage")}
          </button>
        </div>

        <div className="space-y-3">
          <ToggleRow
            label={t("notificationsEnabled")}
            enabled={preferences.notificationsEnabled}
            isRtl={isRtl}
            onToggle={() =>
              setPreferences((current) => ({
                ...current,
                notificationsEnabled: !current.notificationsEnabled,
              }))
            }
          />
          <ToggleRow
            label={t("marketingUpdates")}
            enabled={preferences.marketingUpdates}
            isRtl={isRtl}
            onToggle={() =>
              setPreferences((current) => ({
                ...current,
                marketingUpdates: !current.marketingUpdates,
              }))
            }
          />
          <ToggleRow
            label={t("securityAlerts")}
            enabled={preferences.securityAlerts}
            isRtl={isRtl}
            onToggle={() =>
              setPreferences((current) => ({
                ...current,
                securityAlerts: !current.securityAlerts,
              }))
            }
          />
          <ToggleRow
            label={t("weeklyReports")}
            enabled={preferences.weeklyReports}
            isRtl={isRtl}
            onToggle={() =>
              setPreferences((current) => ({
                ...current,
                weeklyReports: !current.weeklyReports,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}

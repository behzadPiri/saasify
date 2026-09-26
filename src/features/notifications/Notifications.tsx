"use client";

import {useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

type NotificationType = "success" | "info" | "warning" | "critical";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  tag: string;
};

const typeStyles: Record<NotificationType, {dot: string; badge: string; icon: keyof typeof Icons}> = {
  success: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600",
    icon: "Check",
  },
  info: {
    dot: "bg-sky-500",
    badge: "bg-sky-500/10 text-sky-600",
    icon: "Bell",
  },
  warning: {
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600",
    icon: "Activity",
  },
  critical: {
    dot: "bg-rose-500",
    badge: "bg-rose-500/10 text-rose-600",
    icon: "Support",
  },
};

const formatRelativeTime = (date: Date, locale: string) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  const rtf = new Intl.RelativeTimeFormat(locale, {numeric: "auto"});

  if (minutes < 1) return rtf.format(0, "minute");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (hours < 24) return rtf.format(-hours, "hour");
  if (days < 7) return rtf.format(-days, "day");

  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR-u-ca-persian" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export function Notifications() {
  const t = useTranslations("Notifications");
  const locale = useLocale();

  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: "n-101",
      type: "success",
      title: t("items.billing.title"),
      description: t("items.billing.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 18),
      read: false,
      tag: t("tags.billing"),
    },
    {
      id: "n-102",
      type: "info",
      title: t("items.team.title"),
      description: t("items.team.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 48),
      read: false,
      tag: t("tags.team"),
    },
    {
      id: "n-103",
      type: "warning",
      title: t("items.security.title"),
      description: t("items.security.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true,
      tag: t("tags.security"),
    },
    {
      id: "n-104",
      type: "critical",
      title: t("items.performance.title"),
      description: t("items.performance.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28),
      read: false,
      tag: t("tags.performance"),
    },
    {
      id: "n-105",
      type: "success",
      title: t("items.system.title"),
      description: t("items.system.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60),
      read: true,
      tag: t("tags.system"),
    },
    {
      id: "n-106",
      type: "info",
      title: t("items.billing.title"),
      description: t("items.billing.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 75),
      read: true,
      tag: t("tags.billing"),
    },
    {
      id: "n-107",
      type: "warning",
      title: t("items.security.title"),
      description: t("items.security.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
      read: false,
      tag: t("tags.security"),
    },
    {
      id: "n-108",
      type: "success",
      title: t("items.system.title"),
      description: t("items.system.description"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168),
      read: true,
      tag: t("tags.system"),
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);
  const thisWeekCount = useMemo(
    () => items.filter((item) => Date.now() - new Date(item.timestamp).getTime() < 1000 * 60 * 60 * 24 * 7).length,
    [items],
  );

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = items.slice(startIndex, startIndex + pageSize);

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({...item, read: true})));
  };

  const toggleReadStatus = (id: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? {...item, read: !item.read} : item)),
    );
  };

  return (
    <div dir={locale === "fa" ? "rtl" : "ltr"} className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_32%)]" />

        <div className={`relative flex flex-col gap-5 ${locale === "fa" ? "items-start" : "xl:flex-row xl:items-end xl:justify-between"}`}>
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              <Icons.Bell size={12} />
              {t("title")}
            </div>

            <div className={locale === "fa" ? "space-y-2" : "space-y-0"}>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {locale === "fa"
                  ? "پیگیری اعلان‌ها، هشدارها و رویدادهای مهم سیستم در یک مرکز یکپارچه و خوانا."
                  : "Stay on top of system alerts, updates, and priority events from a single streamlined hub."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
          >
            <Icons.Check size={16} />
            {t("markAllRead")}
          </button>
        </div>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("stats.total")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{items.length}</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">{t("stats.active")}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("stats.unread")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{unreadCount}</span>
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600 animate-pulse">
                {t("stats.new")}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("stats.thisWeek")}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">{thisWeekCount}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600">
                {t("stats.updated")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("feedTitle")}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{t("feedSubtitle")}</h2>
          </div>
          <span className="rounded-full border border-border/60 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {locale === "fa" ? `${unreadCount} خوانده‌نشده` : `${unreadCount} unread`}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[24px] border border-dashed border-border/60 bg-background/40 px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icons.Bell size={20} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t("noNotifications")}</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("emptyHint")}</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {pageItems.map((item) => {
                const Icon = Icons[typeStyles[item.type].icon];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleReadStatus(item.id)}
                    className={`group flex w-full items-start gap-3 rounded-[22px] border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                      locale === "fa" ? "flex-row-reverse text-right" : "text-left"
                    } ${
                      item.read
                        ? "border-border/50 bg-background/40"
                        : "border-primary/20 bg-primary/5 shadow-[0_10px_25px_rgba(37,99,235,0.08)]"
                    }`}
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${typeStyles[item.type].badge}`}>
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className={`flex items-center gap-2 ${locale === "fa" ? "justify-end" : "justify-start"}`}>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        {!item.read && (
                          <span className={`inline-flex h-2.5 w-2.5 rounded-full ${typeStyles[item.type].dot} animate-pulse`} />
                        )}
                      </div>

                      <p className={`text-sm leading-6 text-muted-foreground ${locale === "fa" ? "text-right" : "text-left"}`}>
                        {item.description}
                      </p>

                      <div className={`flex flex-wrap items-center gap-2 text-xs text-muted-foreground ${locale === "fa" ? "justify-end" : "justify-start"}`}>
                        <span className="rounded-full border border-border/50 bg-background/50 px-2 py-1">{item.tag}</span>
                        <span>{formatRelativeTime(item.timestamp, locale)}</span>
                      </div>
                    </div>

                    <div className={`flex shrink-0 items-start ${locale === "fa" ? "justify-start" : "justify-end"}`}>
                      <span className="rounded-full border border-border/50 bg-background/50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]">
                        {item.read ? t("read") : t("unread")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-4 sm:flex-row">
              <span className="text-sm text-muted-foreground">
                {locale === "fa"
                  ? `صفحه ${currentPage} از ${totalPages}`
                  : `Page ${currentPage} of ${totalPages}`}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("pagination.previous")}
                </button>

                {Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-background/60 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("pagination.next")}
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

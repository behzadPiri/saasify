"use client";

/**
 * سیستم اعلان (Toast) سراسری و سبک
 * ------------------------------------------------------------------
 * از Context برای در دسترس قرار دادن `showToast` در کل درخت کلاینت استفاده
 * می‌کند و ناحیهٔ نمایش را در پایین صفحه رندر می‌کند. چون Provider در لایوت
 * داشبورد قرار می‌گیرد، اعلان پس از ناوبری کلاینتی (مثلاً حذف عضو و بازگشت
 * به فهرست تیم) هم زنده می‌ماند و بلافاصله نمایش داده می‌شود.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "./icons";

export type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 4200;

const TONE_STYLES: Record<ToastTone, {container: string; icon: string}> = {
  success: {
    container: "border-emerald-200 bg-emerald-50/95 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/70 dark:text-emerald-200",
    icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  },
  error: {
    container: "border-red-200 bg-red-50/95 text-red-800 dark:border-red-500/30 dark:bg-red-950/70 dark:text-red-200",
    icon: "bg-red-500/15 text-red-600 dark:text-red-300",
  },
  info: {
    container: "border-border/60 bg-card/95 text-foreground",
    icon: "bg-primary/10 text-primary",
  },
};

export function ToastProvider({children}: {children: ReactNode}) {
  const t = useTranslations("Common");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(0);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = nextIdRef.current++;
      setToasts((current) => [...current, {id, message, tone}]);

      const timer = setTimeout(() => dismissToast(id), TOAST_DURATION);
      timersRef.current.set(id, timer);
    },
    [dismissToast]
  );

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(() => ({showToast}), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6"
      >
        {toasts.map((toast) => {
          const tone = TONE_STYLES[toast.tone];

          return (
            <div
              key={toast.id}
              role="status"
              className={`animate-in fade-in pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-lg ${tone.container}`}
            >
              <span className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}>
                {toast.tone === "success" ? <Icons.Check size={16} /> : <Icons.AlertCircle size={16} />}
              </span>

              <p className="min-w-0 flex-1 text-sm font-medium leading-6">{toast.message}</p>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl opacity-70 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
                aria-label={t("close")}
              >
                <Icons.X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
}

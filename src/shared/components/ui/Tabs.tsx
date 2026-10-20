"use client";

/**
 * تب‌بار کپسولی/لغزنده (Segmented Control)
 * ------------------------------------------------------------------
 * - نشانگر فعال با ترنزیشن نرم بین تب‌ها حرکت می‌کند.
 * - ظاهر شیشه‌ای/کپسولی با سایه‌های ملایم و هماهنگ با توکن‌های تم
 *   (Light / Dark / Afternoon) طراحی شده است.
 * - در RTL با `inset-inline-start` جهت‌گیری درست دارد.
 * - ناوبری با کلیدهای جهت‌دار، Home و End پشتیبانی می‌شود.
 */

import {useMemo, type KeyboardEvent, type ReactNode} from "react";

export interface TabItem<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

interface TabsProps<T extends string> {
  items: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  /** پیشوند شناسه‌ها برای اتصال تب به پنل محتوا */
  idPrefix?: string;
  className?: string;
}

const PADDING = "0.375rem"; // p-1.5
const PADDING_TOTAL = "0.75rem"; // left + right

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  idPrefix,
  className,
}: TabsProps<T>) {
  const activeIndex = useMemo(() => {
    const index = items.findIndex((item) => item.value === value);
    return index === -1 ? 0 : index;
  }, [items, value]);

  const count = Math.max(items.length, 1);

  const indicatorStyle = {
    insetInlineStart: `calc(${PADDING} + ${activeIndex} * (100% - ${PADDING_TOTAL}) / ${count})`,
    width: `calc((100% - ${PADDING_TOTAL}) / ${count})`,
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    const isRtl = document.documentElement.dir === "rtl";
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = isRtl ? (index - 1 + count) % count : (index + 1) % count;
    } else if (event.key === "ArrowLeft") {
      nextIndex = isRtl ? (index + 1) % count : (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else {
      nextIndex = count - 1;
    }

    const nextItem = items[nextIndex];
    if (!nextItem) return;

    onChange(nextItem.value);

    const group = event.currentTarget.parentElement;
    requestAnimationFrame(() => {
      group?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
    });
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`relative grid rounded-full border border-border/60 bg-linear-to-b from-card/95 via-card/80 to-muted/50 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_14px_34px_-18px_rgba(15,23,42,0.45)] backdrop-blur-xl ${className ?? ""}`}
      style={{gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`}}
    >
      {/* نشانگر متحرک تب فعال */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1.5 rounded-full bg-linear-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/30 ring-1 ring-primary-foreground/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={indicatorStyle}
      >
        <span className="pointer-events-none absolute inset-x-5 top-0.5 h-px rounded-full bg-primary-foreground/40" />
      </span>

      {items.map((item, index) => {
        const isActive = item.value === value;
        const tabId = idPrefix ? `${idPrefix}-tab-${item.value}` : undefined;
        const panelId = idPrefix ? `${idPrefix}-panel-${item.value}` : undefined;

        return (
          <button
            key={item.value}
            id={tabId}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`group relative z-10 flex min-w-0 items-center justify-center gap-2.5 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 ${
              isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.icon ? (
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "scale-105 bg-primary-foreground/15 text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                    : "bg-muted/80 text-muted-foreground group-hover:bg-card group-hover:text-foreground"
                }`}
              >
                {item.icon}
              </span>
            ) : null}

            <span className="truncate">{item.label}</span>

            {item.badge !== undefined && item.badge !== null ? (
              <span
                className={`inline-flex min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ring-1 transition-all duration-300 ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground ring-primary-foreground/20"
                    : "bg-muted text-muted-foreground ring-border/60 group-hover:bg-card"
                }`}
              >
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

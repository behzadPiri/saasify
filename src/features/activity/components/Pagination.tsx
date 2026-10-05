/**
 * کامپوننت صفحه‌بندی (Pagination)
 * کامپوننت اتمیک و قابل استفاده مجدد برای ناوبری بین صفحات
 * پشتیبانی از Responsive و حالت‌های مختلف
 */

"use client";

import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {PaginationState} from "@/features/activity";

export interface PaginationProps {
  /** وضعیت صفحه‌بندی از هوک */
  pagination: PaginationState;
  /** تابع تغییر صفحه */
  onPageChange: (page: number) => void;
  /** تابع تغییر سایز صفحه (اختیاری) */
  onPageSizeChange?: (size: number) => void;
  /** سایز‌های موجود برای انتخاب */
  pageSizeOptions?: number[];
  /** نمایش اطلاعات تعداد آیتم‌ها */
  showInfo?: boolean;
  /** کلاس‌های CSS اضافی */
  className?: string;
  /** غیرفعال کردن کامپوننت */
  disabled?: boolean;
}

/**
 * تولید آرایه شماره صفحات برای نمایش
 * شامل: صفحه اول، صفحات اطراف صفحه جاری، صفحه آخر
 */
function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  // نمایش صفحات اطراف صفحه جاری
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push("ellipsis");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}

export function Pagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  showInfo = true,
  className = "",
  disabled = false,
}: PaginationProps) {
  const t = useTranslations("Activity.pagination");
  const {currentPage, pageSize, totalItems, totalPages, startIndex, endIndex} = pagination;

  // در موبایل: نمایش ساده‌تر
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  if (totalPages <= 1 && totalItems === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 transition-all ${className}`}
      role="navigation"
      aria-label={t("ariaLabel")}
    >
      {/* Page Size Selector */}
      <div className="flex items-center gap-2 sm:gap-3">
        <label
          htmlFor="page-size"
          className="text-sm font-medium text-muted-foreground hidden sm:block"
        >
          {t("pageSize")}
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => {
            if (onPageSizeChange) {
              onPageSizeChange(Number(e.target.value));
            }
          }}
          disabled={disabled}
          className="appearance-none h-9 w-auto min-w-30 rounded-xl border border-border/40 bg-background/60 px-3 py-1.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label={t("pageSizeAria")}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {t("itemsPerPage", {count: size})}
            </option>
          ))}
        </select>
      </div>

      {/* Page Info */}
      {showInfo && totalItems > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground sm:flex">
          <span className="font-medium text-foreground">
            {t("showing", {start: startIndex, end: endIndex, total: totalItems})}
          </span>
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-1.5" role="group" aria-label={t("pagesAria")}>
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage <= 1}
          className="flex h-9 w-9 sm:w-10 items-center justify-center rounded-xl border border-border/40 bg-background/60 text-sm font-medium text-foreground transition-all hover:bg-accent/40 hover:border-border/60 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label={t("previous")}
          aria-disabled={currentPage <= 1 || disabled}
        >
          <Icons.ArrowLeft size={18} aria-hidden="true" />
          <span className="hidden sm:inline">{t("prev")}</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-0.5" role="group" aria-label={t("pageNumbersAria")}>
          {getPageNumbers(currentPage, totalPages).map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                disabled={disabled}
                className={`flex h-9 w-9 min-w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  page === currentPage
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background/60 text-foreground hover:bg-accent/40 hover:border-border/60 border border-transparent"
                }`}
                aria-label={t("pageAria", {page})}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage >= totalPages}
          className="flex h-9 w-9 sm:w-10 items-center justify-center rounded-xl border border-border/40 bg-background/60 text-sm font-medium text-foreground transition-all hover:bg-accent/40 hover:border-border/60 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label={t("next")}
          aria-disabled={currentPage >= totalPages || disabled}
        >
          <span className="hidden sm:inline">{t("next")}</span>
          <Icons.ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Simple Navigation */}
      {isMobile && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 w-full pt-2 border-t border-border/30 sm:hidden">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={disabled || currentPage <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-background/60 text-sm font-medium text-foreground transition-all hover:bg-accent/40 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t("previous")}
          >
            <Icons.ArrowLeft size={18} />
          </button>
          <span className="text-sm font-medium text-foreground min-w-20 text-center">
            {t("pageOf", {current: currentPage, total: totalPages})}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={disabled || currentPage >= totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-background/60 text-sm font-medium text-foreground transition-all hover:bg-accent/40 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t("next")}
          >
            <Icons.ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

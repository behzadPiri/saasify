"use client";

/**
 * کامپوننت پجینیشن فاکtors
 * نمایش دکمه‌های قبلی، بعدی و شماره صفحات برای مرور فاکtors
 */

import {useMemo} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";

interface PaginationProps {
  /** شماره صفحه فعلی */
  currentPage: number;
  /** تعداد صفحات کل */
  totalPages: number;
  /** لیست شماره‌های صفحات */
  pageNumbers: number[];
  /** تابع رفتن به صفحه بعدی */
  onNext: () => void;
  /** تابع رفتن به صفحه قبلی */
  onPrev: () => void;
  /** تابع رفتن به صفحه مشخص */
  onGoToPage: (page: number) => void;
  /** آیا صفحه فعلی اولین صفحه است؟ */
  isFirstPage: boolean;
  /** آیا صفحه فعلی آخرین صفحه است؟ */
  isLastPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  pageNumbers,
  onNext,
  onPrev,
  onGoToPage,
  isFirstPage,
  isLastPage,
}: PaginationProps) {
  const t = useTranslations("Billing");

  // نمایش متن صفحه برای موبایل
  const pageLabel = useMemo(
    () => `${Math.min(currentPage, totalPages)} / ${totalPages}`,
    [currentPage, totalPages],
  );

  return (
    <div className="mt-4 flex items-center justify-between gap-3 pt-2 rtl:flex-row-reverse">
      {/* دکمه قبلی */}
      <button
        type="button"
        disabled={isFirstPage}
        onClick={onPrev}
        className="inline-flex rtl:flex-row-reverse h-9 items-center justify-center gap-1 rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icons.ArrowLeft size={14} />
        <span className="hidden sm:inline">{t("previous")}</span>
      </button>

      {/* شماره صفحات - نمایش در دسکتاپ */}
      <div className="hidden items-center gap-2 sm:flex">
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onGoToPage(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
              page === currentPage
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-background/60 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* نمایش شماره صفحه در موبایل */}
      <div className="flex items-center gap-2 sm:hidden">
        <span className="text-sm text-muted-foreground">
          {t("page")} {pageLabel}
        </span>
      </div>

      {/* دکمه بعدی */}
      <button
        type="button"
        disabled={isLastPage}
        onClick={onNext}
        className="inline-flex rtl:flex-row-reverse h-9 items-center justify-center gap-1 rounded-full border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hidden sm:inline">{t("next")}</span>
        <Icons.ArrowRight size={14} />
      </button>
    </div>
  );
}
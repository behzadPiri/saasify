"use client";

/**
 * نوار صفحه‌بندی اعلان‌ها
 * متن «صفحه x از y»، دکمه‌های قبلی/بعدی و شماره صفحات را ترکیب می‌کند.
 * همه handlerها از بیرون (لایه هوک) می‌آیند و پایدار هستند.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {PaginationNavButton} from "./PaginationNavButton";
import {PaginationPageButton} from "./PaginationPageButton";

interface NotificationsPaginationProps {
  /** صفحه جاری */
  currentPage: number;
  /** تعداد کل صفحات */
  totalPages: number;
  /** آرایه شماره صفحات */
  pageNumbers: number[];
  /** رفتن به صفحه مشخص */
  onPageChange: (page: number) => void;
  /** صفحه بعد */
  onNext: () => void;
  /** صفحه قبل */
  onPrev: () => void;
}

/**
 * نوار صفحه‌بندی
 * چرا memo؟ چون فقط با تغییر صفحه/تعداد صفحات باید رندر شود، نه با تغییر محتوای اعلان‌ها.
 */
export const NotificationsPagination = memo(function NotificationsPagination({
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  onNext,
  onPrev,
}: NotificationsPaginationProps) {
  const t = useTranslations("Notifications.pagination");

  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-4 sm:flex-row">
      <span className="text-sm text-muted-foreground">
        {t("pageInfo", {current: currentPage, total: totalPages})}
      </span>

      <div className="flex items-center gap-2" role="group" aria-label={t("ariaLabel")}>
        <PaginationNavButton label={t("previous")} disabled={currentPage === 1} onClick={onPrev} />

        {pageNumbers.map((page) => (
          <PaginationPageButton
            key={page}
            page={page}
            isActive={page === currentPage}
            onSelect={onPageChange}
          />
        ))}

        <PaginationNavButton label={t("next")} disabled={currentPage === totalPages} onClick={onNext} />
      </div>
    </div>
  );
});

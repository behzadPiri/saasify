"use client";

/**
 * بخش فید اعلان‌ها
 * کارت اصلی لیست است: هدر + فیلتر + (حالت خالی یا لیست و صفحه‌بندی).
 * این کامپوننت فقط ترکیب‌کننده است و هیچ state یا منطقی ندارد.
 */

import {memo} from "react";
import {NotificationEmptyState} from "./NotificationEmptyState";
import {NotificationList} from "./NotificationList";
import {NotificationsFeedHeader} from "@/features/notifications";
import {NotificationsPagination} from "@/features/notifications";
import type {NotificationFilter, NotificationFilterOption, NotificationItem} from "../types";

interface NotificationsFeedProps {
  /** تعداد خوانده‌نشده‌ها برای بج هدر */
  unreadCount: number;
  /** گزینه‌های فیلتر */
  filterOptions: NotificationFilterOption[];
  /** فیلتر فعال */
  activeFilter: NotificationFilter;
  /** تغییر فیلتر (پایدار از فاساد) */
  onFilterChange: (filter: NotificationFilter) => void;
  /** آیتم‌های صفحه جاری */
  pageItems: NotificationItem[];
  /** آیا لیست اعلان‌ها (پس از فیلتر) خالی است؟ */
  isEmpty: boolean;
  /** آیا خالی‌بودن به‌خاطر فیلتر فعال است (نه نبود کل اعلان‌ها)؟ */
  isFilterEmpty: boolean;
  /** جابه‌جایی وضعیت خوانده‌شدن */
  onToggleRead: (id: string) => void;
  /** حذف یک اعلان */
  onDeleteNotification: (id: string) => void;
  /** اطلاعات صفحه‌بندی */
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * فید اعلان‌ها
 * چرا memo؟ چون فقط با تغییر فیلتر/صفحه یا عملیات ظاهری باید رندر شود.
 */
export const NotificationsFeed = memo(function NotificationsFeed({
  unreadCount,
  filterOptions,
  activeFilter,
  onFilterChange,
  pageItems,
  isEmpty,
  isFilterEmpty,
  onToggleRead,
  onDeleteNotification,
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  onNext,
  onPrev,
}: NotificationsFeedProps) {
  return (
    <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
      <NotificationsFeedHeader
        unreadCount={unreadCount}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />

      {isEmpty ? (
        <NotificationEmptyState isFilterEmpty={isFilterEmpty} />
      ) : (
        <>
          <NotificationList
            items={pageItems}
            onToggleRead={onToggleRead}
            onDelete={onDeleteNotification}
          />
          <NotificationsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPageChange={onPageChange}
            onNext={onNext}
            onPrev={onPrev}
          />
        </>
      )}
    </section>
  );
});

"use client";

/**
 * کامپوننت ریشه فیچر اعلان‌ها (Orchestration)
 * الگوبرداری از Dashboard.tsx و Settings.tsx: هیچ state یا منطقی اینجا نیست؛
 * همه‌چیز از فاساد useNotifications می‌آید و این فایل فقط چیدمان را می‌چیند.
 */

import {useNotifications} from "./hooks/useNotifications";
import {
  NotificationsErrorState,
  NotificationsFeed,
  NotificationsHero,
  NotificationsSkeleton,
} from "./components";

/**
 * صفحه اعلان‌ها
 * @returns اسکلت/خطا/محتوای کامل شامل بنر و فید اعلان‌ها
 */
export function Notifications() {
  const {
    items,
    isLoading,
    hasError,
    stats,
    activeFilter,
    filterOptions,
    filteredItemsCount,
    pageItems,
    currentPage,
    totalPages,
    pageNumbers,
    markAllRead,
    toggleReadStatus,
    deleteNotification,
    handleFilterChange,
    goToPage,
    nextPage,
    prevPage,
    refetch,
  } = useNotifications();

  // اگر کل اعلان‌ها صفر نیست ولی نتیجه فیلتر خالی است، پیام باید «بدون نتیجه فیلتر» باشد.
  const isEmpty = filteredItemsCount === 0;
  const isFilterEmpty = isEmpty && items.length > 0;

  return (
    <div  className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      {isLoading ? (
        <NotificationsSkeleton />
      ) : hasError ? (
        <NotificationsErrorState onRetry={refetch} />
      ) : (
        <>
          <NotificationsHero stats={stats} onMarkAllRead={markAllRead} />

          <NotificationsFeed
            unreadCount={stats.unread}
            filterOptions={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            pageItems={pageItems}
            isEmpty={isEmpty}
            isFilterEmpty={isFilterEmpty}
            onToggleRead={toggleReadStatus}
            onDeleteNotification={deleteNotification}
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPageChange={goToPage}
            onNext={nextPage}
            onPrev={prevPage}
          />
        </>
      )}
    </div>
  );
}

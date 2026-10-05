/**
 * کامپوننت اصلی صفحه فعالیت
 * ترکیب لایه‌های منطقی (useActivity) و ویو (کامپوننت‌های اتمیک چانک‌شده)
 * با رعایت کامل اصول پاک‌سازی، پرفورمنس و مستندسازی فارسی
 */

"use client";

import { useLocale } from "next-intl";
import { Icons } from "@/shared/components/ui/icons";
import { useTranslations } from "next-intl";
import { useActivity, DEFAULT_ACTIVITY_ITEMS } from "./hooks/useActivity";
import {
  ActivityHero,
  ActivityOverviewCards,
  FilterTabs,
  ActivityTimeline,
  ActivityTimelineHeader,
} from "./components";

/**
 * کامپوننت اصلی نمایشی صفحه فعالیت‌ها
 */
export function Activity() {
  const t = useTranslations("Activity");
  const locale = useLocale();

  // استفاده از هوک Facade برای مدیریت کامل stateها، فیلترها، آمار و صفحه‌بندی
  const {
    activeFilter,
    setActiveFilter,
    isLoading,
    error,
    isOnline,
    paginatedActivities,
    filterOptions,
    typeLabels,
    pagination,
    goToPage,
    setPageSize,
    refetch,
  } = useActivity(DEFAULT_ACTIVITY_ITEMS, { pageSize: 5 });

  // نمایش صفحه خطا در صورت بروز اختلال در دریافت اطلاعات
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <Icons.AlertCircle size={48} className="text-destructive" />
        <p className="text-destructive">{error}</p>
        {!isOnline && <p className="text-muted-foreground">شما در حالت آفلاین هستید</p>}
        <button
          onClick={refetch}
          disabled={isLoading || !isOnline}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? t("loading") : t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      {/* بخش هیرو (Hero) صفحه */}
      <ActivityHero />

      {/* کارت‌های آمار کلی (Overview Cards) با طراحی مدرن و ترندها */}
      <ActivityOverviewCards activities={paginatedActivities} isLoading={isLoading} />

      {/* تب‌های فیلتر موضوعی */}
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterOptions={filterOptions}
      />

      {/* تایم‌لاین فعالیت‌ها به همراه هدر و صفحه‌بندی */}
      <section className="rounded-[28px] border border-border/40 bg-card/80 p-4 shadow-sm sm:p-5">
        <ActivityTimelineHeader count={pagination.totalItems} />
        <ActivityTimeline
          activities={paginatedActivities}
          typeLabels={typeLabels}
          locale={locale}
          pagination={pagination}
          onPageChange={goToPage}
          onPageSizeChange={setPageSize}
        />
      </section>

      {/* نشانگر وضعیت اتصال آفلاین */}
      {!isOnline && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-amber-500/90 px-4 py-2 text-sm font-medium text-amber-900 shadow-lg animate-in slide-in-from-bottom-2">
          <Icons.AlertCircle size={16} />
          <span>حالت آفلاین - داده‌ها ممکن است بروز نباشند</span>
        </div>
      )}
    </div>
  );
}

"use client";

/**
 * اسکلت بارگذاری صفحه اعلان‌ها
 * هنگام دریافت اولیه داده نمایش داده می‌شود تا چیدمان نلرزد (کاهش Layout Shift).
 * متن نمایشی ندارد؛ فقط aria-label از ترجمه گرفته می‌شود.
 */

import {useTranslations} from "next-intl";

/** تعداد ردیف‌های اسکلت؛ یک مقدار ثابت برای حس واقعی لیست */
const SKELETON_ROWS = 4;

/**
 * اسکلت بارگذاری اعلان‌ها
 * ساختارش همان بنر + فید است تا پس از لود، پرش بصری نداشته باشیم.
 */
export function NotificationsSkeleton() {
  const t = useTranslations("Notifications");

  return (
    <div className="w-full space-y-6 animate-pulse" role="status" aria-label={t("ariaLoading")}>
      {/* اسکلت بنر بالای صفحه */}
      <div className="rounded-[28px] border border-border/50 bg-card/80 p-5 sm:p-6 lg:p-7">
        <div className="h-6 w-40 rounded-full bg-foreground/10" />
        <div className="mt-4 h-9 w-72 max-w-full rounded-xl bg-foreground/10" />
        <div className="mt-3 h-4 w-96 max-w-full rounded-lg bg-foreground/10" />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {Array.from({length: 3}, (_, index) => (
            <div key={index} className="h-24 rounded-2xl bg-foreground/10" />
          ))}
        </div>
      </div>

      {/* اسکلت فید اعلان‌ها */}
      <div className="rounded-[28px] border border-border/40 bg-card/80 p-4 sm:p-5">
        <div className="h-5 w-32 rounded-full bg-foreground/10" />
        <div className="mt-4 space-y-3">
          {Array.from({length: SKELETON_ROWS}, (_, index) => (
            <div key={index} className="h-24 rounded-[22px] bg-foreground/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

import {useSyncExternalStore} from "react";

/**
 * هوک تشخیص سیستم‌عامل مک
 * از useSyncExternalStore برای خواندن userAgent مرورگر استفاده می‌کند
 * این مقدار تغییر نمی‌کند (در طول عمر session)، بنابراین subscribe خالی است
 * مقدار اولیه سمت سرور false است تا از خطای hydration جلوگیری شود
 */

// تابع کمکی برای خواندن مقدار از مرورگر
// بررسی می‌کند آیا userAgent شامل Mac, iPhone, iPod یا iPad هست
function getIsMac() {
    if (typeof navigator === "undefined") return false;
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
}

// تابع subscribe خالی برای مقادیری که تغییر نمی‌کنند (مثل userAgent)
// چون userAgent در طول عمر session تغییر نمی‌کند، نیازی به subscribe نیست
function subscribe() {
    return () => {
    };
}

/**
 * هوک تشخیص مک - آیا کاربر از سیستم‌عامل اپل استفاده می‌کند؟
 * @returns boolean - true اگر مک/iOS باشد، false اگر ویندوز/لینوکس/اندروید باشد
 */
export function useIsMac() {
    return useSyncExternalStore(
        subscribe,
        getIsMac,       // مقداری که روی کلاینت خوانده می‌شود (مرورگر)
        () => false     // مقداری که سمت سرور (SSR) خوانده می‌شود (همیشه false)
    );
}
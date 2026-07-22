import {useSyncExternalStore} from "react";

// تابع کمکی برای خواندن مقدار از مرورگر
function getIsMac() {
    if (typeof navigator === "undefined") return false;
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
}

// تابع subscribe خالی برای مقادیری که تغییر نمی‌کنند (مثل userAgent)
function subscribe() {
    return () => {
    };
}

export function useIsMac() {
    return useSyncExternalStore(
        subscribe,
        getIsMac,       // مقداری که روی کلاینت خوانده می‌شود
        () => false     // مقداری که سمت سرور (SSR) خوانده می‌شود
    );
}
"use client";

/**
 * هوک قفل اسکرول صفحه
 * هنگام باز بودن مودال/دراور، اسکرول صفحه اصلی پشت آن را متوقف می‌کند
 * با شمارنده ماژولی، چند مودال هم‌زمان هم به‌درستی مدیریت می‌شوند
 * (قفل فقط زمانی آزاد می‌شود که آخرین مودال بسته شود)
 */

import { useEffect } from "react";

// شمارنده تعداد عناصر فعالی که نیاز به قفل اسکرول دارند
let lockCount = 0;
// مقادیر اصلی برای بازگردانی دقیق پس از بستن
let originalOverflow = "";
let originalPaddingRight = "";

export function useBodyScrollLock(active: boolean) {
    useEffect(() => {
        if (!active) return;

        lockCount += 1;

        // فقط وقتی اولین قفل فعال شد، استایل صفحه را دست‌کاری می‌کنیم
        if (lockCount === 1) {
            originalOverflow = document.body.style.overflow;
            originalPaddingRight = document.body.style.paddingRight;

            // عرض اسکرول‌بار را جبران می‌کنیم تا محتوا جابه‌جا نشود
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = "hidden";
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        }

        return () => {
            lockCount -= 1;

            // فقط وقتی آخرین قفل آزاد شد، استایل اصلی را برمی‌گردانیم
            if (lockCount === 0) {
                document.body.style.overflow = originalOverflow;
                document.body.style.paddingRight = originalPaddingRight;
            }
        };
    }, [active]);
}

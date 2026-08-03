import {useCallback, useState, useSyncExternalStore} from "react";

// کلید ذخیره‌سازی state در localStorage
const STORAGE_KEY = "saasify-sidebar-collapsed";

function useSidebarProvider() {
    // state جمع/باز بودن - مقدار اولیه از localStorage (اگر در دسترس باشد)
    const [isCollapsed, setIsCollapsed] = useState(() => {
        try {
            if (typeof window === "undefined") return false;
            return localStorage.getItem(STORAGE_KEY) === "true";
        } catch {
            // localStorage ممکن است در مرورگر غیرفعال باشد (مثلاً حالت خصوصی)
            return false;
        }
    });
    // وضعیت mount: در SSR مقدار false و در مرورگر true است (بدون نیاز به effect)
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    // تابع toggle: باز/بسته کردن سایدبار و ذخیره در localStorage
    const toggle = useCallback(() => {
        setIsCollapsed((prev) => {
            const next = !prev;
            try {
                localStorage.setItem(STORAGE_KEY, String(next));
            } catch {
                // اگر localStorage غیرفعال بود، نادیده بگیر
            }
            return next;
        });
    }, []);

    return {
        toggle, mounted, isCollapsed,
    }
}

export default useSidebarProvider
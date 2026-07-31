import {useCallback, useEffect, useState} from "react";

// کلید ذخیره‌سازی state در localStorage
const STORAGE_KEY = "saasify-sidebar-collapsed";

export function useSidebarProvider() {
    // state جمع/باز بودن - مقدار اولیه false (سایدبار باز)
    const [isCollapsed, setIsCollapsed] = useState(false);
    // وضعیت mount: تا زمانی که mount کامل نشده، مقدار از localStorage خوانده نشده
    const [mounted, setMounted] = useState(false);

    // خواندن state ذخیره‌شده از localStorage هنگام mount شدن
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored !== null) {
                setIsCollapsed(stored === "true");
            }
        } catch {
            // localStorage ممکن است در مرورگر غیرفعال باشد (مثلاً حالت خصوصی)
        }
        setMounted(true);
    }, []);

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
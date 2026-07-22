"use client";

/**
 * پروایدر مدیریت state سایدبار
 * state جمع/باز بودن سایدبار در localStorage ذخیره می‌شود
 * تا هنگام تغییر صفحه یا زبان از بین نرود
 * از الگوی React Context استفاده می‌کند تا تمام کامپوننت‌های فرزند
 * بتوانند state و تابع toggle را دریافت کنند
 */

import {createContext, useState, useEffect, useCallback, ReactNode} from "react";

// کلید ذخیره‌سازی state در localStorage
const STORAGE_KEY = "saasify-sidebar-collapsed";

// تعریف type مقادیر Context
interface SidebarContextValue {
    isCollapsed: boolean;    // آیا سایدبار جمع شده؟
    toggle: () => void;      // تابع باز/بسته کردن سایدبار
    mounted: boolean;        // آیا کامپوننت در مرورگر mount شده؟
}

// ایجاد Context با مقادیر پیش‌فرض
export const SidebarContext = createContext<SidebarContextValue>({
    isCollapsed: false,
    toggle: () => {},
    mounted: false,
});

/**
 * پروایدر سایدبار - state را در localStorage ذخیره می‌کند
 * تا هنگام تغییر صفحه یا زبان از بین نرود
 * @param children - کامپوننت‌های فرزند که به state دسترسی دارند
 */
export function SidebarProvider({children}: {children: ReactNode}) {
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

    // رندر Provider با مقادیر Context
    // اگر هنوز mount نشده باشد، مقدار پیش‌فرض false برمی‌گرداند تا از خطای hydration جلوگیری شود
    return (
        <SidebarContext.Provider value={{isCollapsed: mounted ? isCollapsed : false, toggle, mounted}}>
            {children}
        </SidebarContext.Provider>
    );
}

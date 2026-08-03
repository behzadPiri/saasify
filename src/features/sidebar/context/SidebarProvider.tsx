"use client";

/**
 * پروایدر مدیریت state سایدبار
 * state جمع/باز بودن سایدبار در localStorage ذخیره می‌شود
 * تا هنگام تغییر صفحه یا زبان از بین نرود
 * از الگوی React Context استفاده می‌کند تا تمام کامپوننت‌های فرزند
 * بتوانند state و تابع toggle را دریافت کنند
 */

import {createContext, ReactNode} from "react";
import useSidebarProvider from "@/features/sidebar/hooks/useSidebarProvider";


// تعریف type مقادیر Context
interface SidebarContextValue {
    isCollapsed: boolean;    // آیا سایدبار جمع شده؟
    toggle: () => void;      // تابع باز/بسته کردن سایدبار
    mounted: boolean;        // آیا کامپوننت در مرورگر mount شده؟
}

// ایجاد Context با مقادیر پیش‌فرض
export const SidebarContext = createContext<SidebarContextValue>({
    isCollapsed: false,
    toggle: () => {
    },
    mounted: false,
});

/**
 * پروایدر سایدبار - state را در localStorage ذخیره می‌کند
 * تا هنگام تغییر صفحه یا زبان از بین نرود
 * @param children - کامپوننت‌های فرزند که به state دسترسی دارند
 */
export function SidebarProvider({children}: { children: ReactNode }) {

    const {toggle, mounted, isCollapsed} = useSidebarProvider()

    // رندر Provider با مقادیر Context
    // اگر هنوز mount نشده باشد، مقدار پیش‌فرض false برمی‌گرداند تا از خطای hydration جلوگیری شود
    return (
        <SidebarContext.Provider value={{isCollapsed: mounted ? isCollapsed : false, toggle, mounted}}>
            {children}
        </SidebarContext.Provider>
    );
}

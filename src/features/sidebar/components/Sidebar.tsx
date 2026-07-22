"use client";

/**
 * کامپوننت سایدبار اصلی داشبورد
 * شامل لیست ناوبری (6 آیتم) و دکمه جمع‌باز کردن
 * از افکت شیشه‌ای (glassmorphism) با backdrop-blur استفاده می‌کند
 * در حالت جمع‌شده عرض 4.5rem و در حالت باز عرض 64rem است
 * فقط در صفحه‌نمایش‌های بزرگتر از md نمایش داده می‌شود
 * state جمع/باز بودن از طریق SidebarContext مدیریت می‌شود
 */

import {useTranslations} from "next-intl";
import {useSidebar} from "@/features/sidebar";
import {SidebarItem} from "./SidebarItem";
import {SIDEBAR_NAV_ITEMS} from "../constants/sidebar";
import {Icons} from "@/shared/components/ui/icons";

/**
 * کامپوننت اصلی سایدبار
 * state جمع/باز بودن از SidebarContext خوانده می‌شود
 */
export function Sidebar() {
    const t = useTranslations("Sidebar");
    // دریافت state جمع/باز بودن و تابع toggle از Context
    const {isCollapsed, toggle} = useSidebar();

    return (
        <aside
            className={`
                hidden md:flex flex-col shrink-0 self-start
                h-[calc(100vh-6.5rem)]
                relative overflow-hidden
                rounded-3xl
                shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]
                dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]
                transition-[width,padding] duration-300 ease-in-out
                ${isCollapsed ? "w-18 p-2" : "w-64 p-3"}
            `}
        >
            {/* لایه پس‌زمینه شیشه‌ای: رنگ کارت با شفافیت 60% + بلور پشت */}
            <div className="absolute inset-0 bg-card/60 backdrop-blur-2xl"/>

            {/* لایه گرادیانت ظریف: از بالا به پایین برای عمق بخشیدن */}
            <div className="absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-white/2"/>

            {/* لایه حاشیه شیشه‌ای: حاشیه داخلی ظریف برای جداسازی بصری */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/4 dark:ring-white/6"/>

            {/* محتوای اصلی سایدبار روی لایه‌های شیشه‌ای */}
            <div className="relative flex flex-col h-full z-10">
                {/* لیست ناوبری: اسکرول‌بار پنهان و فضای بین آیتم‌ها */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 pe-1 scrollbar-none">
                    {/* رندر تمام آیتم‌های ناوبری از آرایه SIDEBAR_NAV_ITEMS */}
                    {SIDEBAR_NAV_ITEMS.map((item, index) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            isCollapsed={isCollapsed}
                            index={index}
                        />
                    ))}
                </div>

                {/* جداکننده بین لیست ناوبری و دکمه toggle */}
                <div className="my-2 mx-2 h-px bg-border/40"/>

                {/* دکمه جمع‌باز کردن سایدبار */}
                <div className="shrink-0">
                    <button
                        type="button"
                        onClick={toggle}
                        className={`
                            group flex items-center gap-3 w-full
                            cursor-pointer
                            px-3.5 py-2.5 rounded-2xl
                            text-sm font-medium text-muted-foreground
                            hover:text-foreground hover:bg-accent/40
                            active:scale-[0.97]
                            transition-all duration-300 ease-out
                            ${isCollapsed ? "justify-center px-0" : ""}
                        `}
                        title={t("collapse")}
                    >
                        {/* آیکون تغییر اندازای سایدبار - سفارشی با SVG */}
                        <Icons.SidebarToggle
                            size={18}
                            className={`
                                shrink-0 transition-transform duration-300 ease-in-out
                                group-hover:scale-110
                                ${isCollapsed ? "rotate-180" : ""}
                            `}
                        />

                        {/* متن دکمه "جمع کردن" - در حالت جمع مخفی می‌شود */}
                        <span
                            className={`
                                truncate transition-all duration-200 ease-out
                                ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
                            `}
                        >
                            {t("collapse")}
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

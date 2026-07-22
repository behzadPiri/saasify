"use client";

/**
 * کامپوننت منوی کشویی موبایل
 * شامل لینک‌های ناوبری (6 آیتم) و آکاردئون‌های انتخاب تم و زبان
 * از راست به چپ (RTL) یا چپ به راست (LTR) باز می‌شود بسته به زبان فعلی
 * فقط در صفحه‌نمایش‌های کوچکتر از md نمایش داده می‌شود
 * state آکاردئون باز مدیریت می‌شود تا فقط یکی در هر زمان باز باشد
 */

import {useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {Link, usePathname} from "@/i18n/navigation";
import {MobileLanguageAccordion, MobileThemeAccordion} from "@/features/header";

// پراپ‌های کامپوننت: باز/بسته بودن و تابع بستن
interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

// آیتم‌های ناوبری منوی موبایل (6 صفحه اصلی داشبورد)
const NAV_ITEMS = [
    {id: "dashboard", translationKey: "items.dashboard", href: "/dashboard", icon: "Dashboard" as const},
    {id: "projects", translationKey: "items.projects", href: "/projects", icon: "Folder" as const},
    {id: "billing", translationKey: "items.billing", href: "/billing", icon: "Billing" as const},
    {id: "notifications", translationKey: "items.notifications", href: "/notifications", icon: "Bell" as const},
    {id: "support", translationKey: "items.support", href: "/support", icon: "Support" as const},
    {id: "settings", translationKey: "items.settings", href: "/settings", icon: "Settings" as const},
];

// نوع آکاردئون باز: "theme" | "language" | null (هیچکدام)
type AccordionType = "theme" | "language" | null;

export function MobileNav({isOpen, onClose}: MobileNavProps) {
    // تشخیص زبان فعلی برای تعیین جهت باز شدن منو (RTL یا LTR)
    const locale = useLocale();
    const isRtl = locale === "fa";
    const t = useTranslations("Sidebar");
    // مسیر فعلی برای تشخیص آیتم فعال ناوبری
    const pathname = usePathname();
    // state آکاردئون باز: فقط یکی از تم یا زبان می‌تواند همزمان باز باشد
    const [openAccordion, setOpenAccordion] = useState<AccordionType>(null);

    // تابع باز/بسته کردن آکاردئون - اگر همان آکاردئون دوباره کلیک شود، بسته می‌شود
    const toggleAccordion = (type: AccordionType) => {
        setOpenAccordion((prev) => (prev === type ? null : type));
    };

    return (
        <>
            {/* لایه پوشش نیمه‌شفاف (overlay) - با کلیک منو بسته می‌شود */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* دراور (کشو) اصلی منوی موبایل */}
            <div
                className={`
                    fixed top-0 z-50 h-full w-72 bg-card/95 backdrop-blur-xl
                    border-border shadow-2xl md:hidden
                    transform transition-transform duration-300 ease-in-out
                    ${isRtl ? "left-0 border-l" : "right-0 border-r"}
                    ${isOpen ? "translate-x-0" : isRtl ? "-translate-x-full" : "translate-x-full"}
                `}
                role="dialog"
                aria-modal="true"
                aria-label={t("title")}
            >
                {/* محتوای دراور: دکمه بستن + لینک‌ها + آکاردئون‌ها */}
                <div className="flex flex-col h-full p-6 rtl:text-right ltr:text-left">
                    {/* دکمه بستن منو - در RTL سمت راست و در LTR سمت چپ */}
                    <div className={`flex ${isRtl ? "justify-start" : "justify-end"} mb-6`}>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors active:scale-95"
                        >
                            <Icons.X size={20}/>
                        </button>
                    </div>

                    {/* بخش اصلی ناوبری: لینک‌ها + جداکننده + آکاردئون‌ها */}
                    <nav className="flex-1 overflow-y-auto scrollbar-none">
                        {/* لینک‌های ناوبری با انیمیشن ورودی و state فعال */}
                        <div className="space-y-1">
                            {NAV_ITEMS.map((item, index) => {
                                // رندر داینامیک آیکون بر اساس نام آیتم
                                const Icon = Icons[item.icon];
                                // تشخیص آیتم فعال: مسیر دقیق اگر شامل زیرمسیر باشد
                                const isActive =
                                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={onClose}
                                        // تاخیر انیمیشن ورودی بر اساس ایندکس آیتم
                                        style={{animationDelay: `${index * 30}ms`}}
                                        className={`
                                            flex items-center gap-3 px-3.5 py-2.5 rounded-2xl
                                            text-sm font-medium
                                            active:scale-[0.97]
                                            transition-all duration-200 ease-out
                                            animate-[sidebar-item-enter_0.3s_ease-out_backwards]
                                            ${isActive
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-semibold"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                                            }
                                        `}
                                    >
                                        {Icon && (
                                            <Icon
                                                size={18}
                                                className={`shrink-0 transition-transform duration-200 ${
                                                    isActive
                                                        ? "text-primary-foreground"
                                                        : "text-muted-foreground"
                                                }`}
                                            />
                                        )}
                                        <span className="truncate">{t(item.translationKey)}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* جداکننده بین لینک‌های ناوبری و آکاردئون‌ها */}
                        <div className="my-4 h-px bg-border/40"/>

                        {/* آکاردئون‌های انتخاب تم و زبان */}
                        <div className="space-y-1">
                            <MobileThemeAccordion
                                isOpen={openAccordion === "theme"}
                                onToggle={() => toggleAccordion("theme")}
                            />
                            <MobileLanguageAccordion
                                isOpen={openAccordion === "language"}
                                onToggle={() => toggleAccordion("language")}
                            />
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

"use client";

/**
 * هوک مدیریت هدر برنامه
 * شامل state و توابع مورد نیاز هدر: اسکرول، سایز صفحه، باز/بسته بودن منوی موبایل
 * این هوک 3 اثر جانبی (effect) اصلی دارد:
 * 1. تشخیص سایز صفحه و بستن خودکار منوی موبایل در حالت دسکتاپ
 * 2. مدیریت اسکرول برای تغییر ظاهر هدر (شیشه‌ای تر شدن)
 * 3. قفل کردن اسکرول صفحه هنگام باز بودن منوی موبایل
 */

import {useState, useEffect, useCallback} from "react";

// نقطه شکست (breakpoint) برای تشخیص موبایل: زیر 768px
const MOBILE_BREAKPOINT = 768;

/**
 * هوک اصلی هدر - state و توابع مورد نیاز هدر را فراهم می‌کند
 * @returns اbj شامل isScrolled, isMobile, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu
 */
export function useHeader() {
    // آیا کاربر اسکرول کرده؟ (بیشتر از 10px) - برای تغییر ظاهر هدر
    const [isScrolled, setIsScrolled] = useState(false);
    // آیا منوی موبایل باز است؟
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // آیا صفحه در حالت موبایل است؟ (null تا mount کامل شود)
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    // اثر ۱: چک کردن سایز صفحه و هندل کردن تغییر ریسپونسیو
    // اگر کاربر از موبایل به دسکتاپ برود، منوی موبایل خودکار بسته می‌شود
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < MOBILE_BREAKPOINT;
            setIsMobile(mobile);

            // اگر کاربر سایز صفحه را بزرگ کرد، منوی موبایل خودکار بسته شود
            if (!mobile) {
                setIsMobileMenuOpen(false);
            }
        };

        checkMobile();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // اثر ۲: مدیریت اسکرول با بهینه‌سازی پرفورمنس
    // فقط وقتی state تغییر کند، re-render انجام می‌شود ( مقایسه با prev )
    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY > 10;
            // فقط در صورت تغییر مقدار، state را آپدیت کن (جلوگیری از re-render غیرضروری)
            setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
        };

        // اجرا در رندر اولیه کلاینت تا state از همان ابتدا درست باشد
        onScroll();

        // passive: true برای بهینه‌سازی پرفورمنس اسکرول
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // اثر ۳: قفل کردن اسکرول صفحه هنگام باز بودن منوی موبایل
    // مقدار اصلی overflow ذخیره می‌شود تا هنگام بسته شدن منو بازگردانده شود
    useEffect(() => {
        if (isMobileMenuOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isMobileMenuOpen]);

    // تابع باز/بسته کردن منوی موبایل - با useCallback برای جلوگیری از re-render غیرضروری
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    // تابع بستن منوی موبایل - با useCallback برای جلوگیری از re-render غیرضروری
    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    // برگرداندن state و توابع مورد نیاز هدر
    return {
        isScrolled,        // آیا کاربر اسکرول کرده؟
        isMobile: !!isMobile,  // آیا صفحه موبایل است؟ (تبدیل null به false)
        isMobileMenuOpen,  // آیا منوی موبایل باز است؟
        toggleMobileMenu,  // تابع باز/بسته کردن منوی موبایل
        closeMobileMenu,   // تابع بستن منوی موبایل
    };
}
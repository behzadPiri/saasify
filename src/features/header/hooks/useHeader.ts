"use client";

import {useState, useEffect, useCallback} from "react";

const MOBILE_BREAKPOINT = 768;

export function useHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    // ۱. چک کردن سایز صفحه و هندل کردن تغییر ریسپونسیو
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

    // ۲. مدیریت اسکرول با بهینه‌سازی پرفورمنس
    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY > 10;
            setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
        };

        // اجرا در رندر اولیه کلاینت
        onScroll();

        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ۳. قفل کردن اسکرول صفحه هنگام باز بودن منو
    useEffect(() => {
        if (isMobileMenuOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return {
        isScrolled,
        isMobile: !!isMobile,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
    };
}
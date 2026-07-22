/**
 * هوک مدیریت تم برنامه
 * شامل تغییر تم (روشن/تاریک/غروب)، حالت خودکار بر اساس ساعت تهران
 * و ذخیره ترجیحات کاربر در localStorage
 */

"use client";

import { useEffect, useState, useCallback, useRef } from "react";

// نوع تم‌های قابل انتخاب
export type ThemeType = "light" | "dark" | "afternoon";

export function useTheme() {
    const [theme, setTheme] = useState<ThemeType>("light");
    const [isAuto, setIsAuto] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // تابع محاسبه تم خودکار بر اساس ساعت تهران
    // 6-17 روشن | 17-20 غروب | 20-6 تاریک
    const getTehranAutoTheme = useCallback((): ThemeType => {
        const tehranHourStr = new Date().toLocaleTimeString("en-US", {
            timeZone: "Asia/Tehran",
            hour: "2-digit",
            hour12: false,
        });
        const hour = parseInt(tehranHourStr, 10);

        if (hour >= 6 && hour < 17) return "light";
        if (hour >= 17 && hour < 20) return "afternoon";
        return "dark";
    }, []);

    // اثر ۱: خواندن تم ذخیره‌شده از localStorage هنگام mount شدن
    // از setTimeout(0) استفاده می‌شود تا عملیات به چرخه بعدی مرورگر موکول شود
    // این کار از خطای ESLint در Next.js جلوگیری می‌کند
    useEffect(() => {
        const savedAuto = localStorage.getItem("saasify-theme-auto") === "true";
        const savedTheme = (localStorage.getItem("saasify-theme") as ThemeType) || "light";

        const timer = setTimeout(() => {
            if (savedAuto) {
                setIsAuto(true);
                setTheme(getTehranAutoTheme());
            } else {
                setTheme(savedTheme);
            }
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, [getTehranAutoTheme]);

    // اثر ۲: اعمال کلاس‌ها به تگ HTML و ذخیره تغییرات در localStorage
    // این effect هر زمان که theme یا isAuto تغییر کند اجرا می‌شود
    useEffect(() => {
        if (!mounted) return;

        // تنظیم data-theme روی تگ html برای CSS custom properties
        document.documentElement.setAttribute("data-theme", theme);
        // اضافه/حذف کلاس dark روی تگ html
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // ذخیره تم و حالت خودکار در localStorage
        localStorage.setItem("saasify-theme", theme);
        localStorage.setItem("saasify-theme-auto", String(isAuto));
    }, [theme, isAuto, mounted]);

    // اثر ۳: اینتروال حالت خودکار - هر 60 ثانیه تم را بر اساس ساعت تهران بررسی می‌کند
    // اگر تم فعلی با تم محاسبه‌شده متفاوت باشد، آن را به‌روزرسانی می‌کند
    useEffect(() => {
        if (!isAuto || !mounted) return;

        const interval = setInterval(() => {
            const currentAutoTheme = getTehranAutoTheme();
            if (theme !== currentAutoTheme) {
                setTheme(currentAutoTheme);
            }
        }, 60000);  // هر 60 ثانیه (1 دقیقه)

        return () => clearInterval(interval);
    }, [isAuto, theme, mounted, getTehranAutoTheme]);

    // اثر ۴: مدیریت کلیک بیرونی برای بستن دراپ‌داون تم
    // اگر کاربر در خارج از دراپ‌داون کلیک کند، دراپ‌داون بسته می‌شود
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // تابع تغییر تم - فقط در حالت غیرخودکار اجازه تغییر می‌دهد
    const changeTheme = (themeName: ThemeType) => {
        if (isAuto) return;
        setTheme(themeName);
    };

    // تابع فعال/غیرفعال کردن حالت خودکار
    // اگر حالت خودکار فعال شود، تم فوراً بر اساس ساعت تهران تنظیم می‌شود
    const toggleAuto = (checked: boolean) => {
        setIsAuto(checked);
        if (checked) {
            setTheme(getTehranAutoTheme());
        }
    };

    // تابع دریافت نوع آیکون فعال بر اساس تم فعلی یا حالت خودکار
    const getActiveIconType = (): "auto" | "light" | "afternoon" | "dark" => {
        if (isAuto) return "auto";
        if (theme === "light") return "light";
        if (theme === "afternoon") return "afternoon";
        return "dark";
    };

    // برگرداندن state و توابع مورد نیاز کامپوننت‌های تم‌سوئیچر
    return {
        theme,              // تم فعلی (light/dark/afternoon)
        isAuto,             // آیا حالت خودکار فعال است؟
        mounted,            // آیا کامپوننت mount شده؟ (برای جلوگیری از خطای hydration)
        changeTheme,        // تابع تغییر تم
        toggleAuto,         // تابع فعال/غیرفعال کردن حالت خودکار
        isOpen,             // آیا دراپ‌داون تم باز است؟
        setIsOpen,          // تابع تنظیم وضعیت باز/بسته بودن دراپ‌داون
        dropdownRef,        // رفرنس به المان دراپ‌داون برای بستن با کلیک بیرون
        getActiveIconType   // تابع دریافت نوع آیکون فعال
    };
}
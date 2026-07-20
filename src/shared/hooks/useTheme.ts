"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export type ThemeType = "light" | "dark" | "afternoon";

export function useTheme() {
    const [theme, setTheme] = useState<ThemeType>("light");
    const [isAuto, setIsAuto] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // محاسبه تم بر اساس ساعت تهران
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

    // ۱. استفاده از ترفند هوشمندانه تو: انتقال عملیات به چرخه بعدی مرورگر برای نابود کردن ارور ESLint
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

    // ۲. اعمال کلاس‌ها به تگ HTML و ذخیره تغییرات دکمه‌ها در رندرهای بعدی
    useEffect(() => {
        if (!mounted) return;

        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("saasify-theme", theme);
        localStorage.setItem("saasify-theme-auto", String(isAuto));
    }, [theme, isAuto, mounted]);

    // ۳. اینتروال حالت خودکار
    useEffect(() => {
        if (!isAuto || !mounted) return;

        const interval = setInterval(() => {
            const currentAutoTheme = getTehranAutoTheme();
            if (theme !== currentAutoTheme) {
                setTheme(currentAutoTheme);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [isAuto, theme, mounted, getTehranAutoTheme]);

    // ۴. مدیریت کلیک بیرونی
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

    const changeTheme = (themeName: ThemeType) => {
        if (isAuto) return;
        setTheme(themeName);
    };

    const toggleAuto = (checked: boolean) => {
        setIsAuto(checked);
        if (checked) {
            setTheme(getTehranAutoTheme());
        }
    };

    const getActiveIconType = (): "auto" | "light" | "afternoon" | "dark" => {
        if (isAuto) return "auto";
        if (theme === "light") return "light";
        if (theme === "afternoon") return "afternoon";
        return "dark";
    };

    return {
        theme,
        isAuto,
        mounted,
        changeTheme,
        toggleAuto,
        isOpen,
        setIsOpen,
        dropdownRef,
        getActiveIconType
    };
}
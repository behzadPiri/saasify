"use client";

import {useEffect, useState} from "react";

export function useTheme() {
    const [theme, setTheme] = useState<string>("light");
    const [isAuto, setIsAuto] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false); // استیت کمکی برای لود

    const getTehranAutoTheme = (): string => {
        const tehranHourStr = new Date().toLocaleTimeString("en-US", {
            timeZone: "Asia/Tehran",
            hour: "2-digit",
            hour12: false,
        });
        const hour = parseInt(tehranHourStr, 10);

        if (hour >= 6 && hour < 17) return "light";
        if (hour >= 17 && hour < 20) return "afternoon";
        return "dark";
    };

    // ۱. فاز لود اولیه: فقط یک بار تنظیمات را می‌خوانیم و مونت شدن را تایید می‌کنیم
    useEffect(() => {
        const savedTheme = localStorage.getItem("saasify-theme") || "light";
        const savedAuto = localStorage.getItem("saasify-theme-auto") === "true";
        setTimeout(() => {
            setIsAuto(savedAuto);
            setTheme(savedAuto ? getTehranAutoTheme() : savedTheme);
            setMounted(true); // اعلام اینکه کامپوننت با موفقیت در مرورگر سوار شد
        }, 0)

    }, []);

    // ۲. فاز واکنش به تغییرات: فقط زمانی اجرا می‌شود که کامپوننت کاملاً مونت شده باشد
    useEffect(() => {
        if (!mounted) return; // تا قبل از لود کامل، کاری انجام نده

        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("saasify-theme", theme);
        localStorage.setItem("saasify-theme-auto", String(isAuto));
    }, [theme, isAuto, mounted]);

    const changeTheme = (themeName: string) => {
        if (isAuto) return;
        setTheme(themeName);
    };

    const toggleAuto = (checked: boolean) => {
        setIsAuto(checked);
        if (checked) {
            setTheme(getTehranAutoTheme());
        }
    };

    return {theme, isAuto, changeTheme, toggleAuto};
}
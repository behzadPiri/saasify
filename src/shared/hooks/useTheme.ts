/**
 * هوک مدیریت تم برنامه
 * شامل تغییر تم (روشن/تاریک/غروب)، حالت خودکار بر اساس ساعت تهران
 * و ذخیره ترجیحات کاربر در localStorage و کوکی
 *
 * همگام‌سازی اولیه تم قبل از اولین رنگ‌آمیزی توسط اسکریپت inline داخل
 * `src/app/layout.tsx` انجام می‌شود؛ این هوک فقط وضعیت را با DOM هماهنگ نگه می‌دارد.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    DEFAULT_THEME,
    THEME_CHANGE_EVENT,
    ThemeChangeDetail,
    ThemeType,
    applyThemeToDocument,
    getTehranAutoTheme,
    persistTheme,
    readStoredAuto,
    readStoredTheme,
} from "@/core/theme";

// نوع تم‌های قابل انتخاب (برای سازگاری با importهای قبلی)
export type { ThemeType } from "@/core/theme";

export function useTheme() {
    // وضعیت اولیه از DOM/localStorage خوانده می‌شود تا اولین رندر کلاینت هم تم صحیح را نشان دهد.
    // در سمت سرور مقدار پیش‌فرض برگردانده می‌شود و سپس اسکریپت همگام، تم را قبل از رنگ‌آمیزی اعمال می‌کند.
    const [theme, setTheme] = useState<ThemeType>(() => readInitialTheme());
    const [isAuto, setIsAuto] = useState<boolean>(() => readInitialAuto());
    const [mounted, setMounted] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // اثر ۱: علامت‌گذاری mount شدن برای جلوگیری از ناسازگاری hydration
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // اثر ۲: اعمال تم روی html و ذخیره آن در localStorage/کوکی
    // ابتدا DOM به‌صورت همگام به‌روزرسانی می‌شود تا هیچ فریم روشنی نمایش داده نشود.
    useEffect(() => {
        applyThemeToDocument(theme);
        persistTheme(theme, isAuto);
    }, [theme, isAuto]);

    // اثر ۳: همگام‌سازی همه نمونه‌های useTheme (دسکتاپ/موبایل) و سایر تب‌ها
    useEffect(() => {
        const syncFromEvent = (event: Event) => {
            const detail = (event as CustomEvent<ThemeChangeDetail>).detail;

            if (detail) {
                setTheme(detail.theme);
                setIsAuto(detail.isAuto);
                return;
            }

            // رویداد storage فقط وقتی رخ می‌دهد که تب دیگری مقدار را تغییر داده باشد
            setTheme(readStoredTheme());
            setIsAuto(readStoredAuto());
        };

        window.addEventListener(THEME_CHANGE_EVENT, syncFromEvent);
        window.addEventListener("storage", syncFromEvent);

        return () => {
            window.removeEventListener(THEME_CHANGE_EVENT, syncFromEvent);
            window.removeEventListener("storage", syncFromEvent);
        };
    }, []);

    // اثر ۴: اینتروال حالت خودکار - هر 60 ثانیه تم را بر اساس ساعت تهران بررسی می‌کند
    useEffect(() => {
        if (!isAuto || !mounted) return;

        const interval = setInterval(() => {
            const currentAutoTheme = getTehranAutoTheme();
            if (theme !== currentAutoTheme) {
                setTheme(currentAutoTheme);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [isAuto, theme, mounted]);

    // اثر ۵: مدیریت کلیک بیرونی برای بستن دراپ‌داون تم
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

    // اطلاع‌رسانی تغییر تم به سایر نمونه‌های هوک
    const publishThemeChange = useCallback((nextTheme: ThemeType, nextIsAuto: boolean) => {
        if (typeof window === "undefined") return;

        window.dispatchEvent(
            new CustomEvent<ThemeChangeDetail>(THEME_CHANGE_EVENT, {
                detail: { theme: nextTheme, isAuto: nextIsAuto },
            }),
        );
    }, []);

    // تابع تغییر تم - فقط در حالت غیرخودکار اجازه تغییر می‌دهد
    // DOM بلافاصله به‌روزرسانی می‌شود تا تغییر رنگ بدون تاخیر و بدون پرش انجام شود
    const changeTheme = (themeName: ThemeType) => {
        if (isAuto) return;

        applyThemeToDocument(themeName);
        persistTheme(themeName, false);
        setTheme(themeName);
        publishThemeChange(themeName, false);
    };

    // تابع فعال/غیرفعال کردن حالت خودکار
    // اگر حالت خودکار فعال شود، تم فوراً بر اساس ساعت تهران تنظیم می‌شود
    const toggleAuto = (checked: boolean) => {
        const nextTheme = checked ? getTehranAutoTheme() : theme;

        applyThemeToDocument(nextTheme);
        persistTheme(nextTheme, checked);
        setIsAuto(checked);
        setTheme(nextTheme);
        publishThemeChange(nextTheme, checked);
    };

    // تابع دریافت نوع آیکون فعال بر اساس تم فعلی یا حالت خودکار
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
        getActiveIconType,
    };
}

/**
 * خواندن تم اولیه در کلاینت
 * اولویت با مقدار already-applied روی html است (که اسکریپت همگام ست کرده)
 * و در نبود آن، localStorage و سپس تم پیش‌فرض.
 */
function readInitialTheme(): ThemeType {
    if (typeof document === "undefined") return DEFAULT_THEME;

    const domTheme = document.documentElement.getAttribute("data-theme");
    if (domTheme === "light" || domTheme === "dark" || domTheme === "afternoon") {
        return domTheme;
    }

    return readStoredTheme();
}

/**
 * خواندن وضعیت اولیه حالت خودکار در کلاینت
 */
function readInitialAuto(): boolean {
    if (typeof window === "undefined") return false;
    return readStoredAuto();
}

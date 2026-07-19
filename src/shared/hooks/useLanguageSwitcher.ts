"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect, useCallback } from "react";

export const LANGUAGES = [
    { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
    { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
] as const;

export type LocaleCode = typeof LANGUAGES[number]["code"];

export function useLanguageSwitcher() {
    const currentLocale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
    const closeDropdown = useCallback(() => setIsOpen(false), []);

    const handleLangChange = (targetLocale: LocaleCode) => {
        // ✨ رفع باگ ۲: اگر کاربر روی همان زبان فعلی کلیک کرد، فقط منو را ببند و خارج شو
        if (currentLocale === targetLocale) {
            setIsOpen(false);
            return;
        }

        // گرفتن مسیر فعلی مرورگر
        let cleanPath = window.location.pathname;

        // ✨ رفع باگ ۱: پاک کردن پیشوندهای زبان قبلی از آدرس برای جلوگیری از /en/en/
        // این ریجکس تمام الگوهای اول آدرس مثل /en یا /fa را پیدا و حذف می‌کند
        const localePattern = new RegExp(`^\\/(${LANGUAGES.map((l) => l.code).join("|")})(\\/|$)`);
        cleanPath = cleanPath.replace(localePattern, "/");

        // مطمئن شدن از اینکه مسیر با / شروع می‌شود
        if (!cleanPath.startsWith("/")) {
            cleanPath = "/" + cleanPath;
        }

        // با توجه به اینکه localePrefix: "as-needed" داری:
        if (targetLocale === "fa") {
            // زبان فارسی پیشوند نمی‌خواهد
            window.location.href = cleanPath;
        } else {
            // زبان انگلیسی پیشوند /en می‌خواهد
            window.location.href = cleanPath === "/" ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
        }

        setIsOpen(false);
    };

    // بستن منو با کلیک روی بیرون از آن برای UX بهتر
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

    const activeLang = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

    return {
        isOpen,
        dropdownRef,
        activeLang,
        currentLocale,
        toggleDropdown,
        closeDropdown,
        handleLangChange,
    };
}
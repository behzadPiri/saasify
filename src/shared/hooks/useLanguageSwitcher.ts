"use client";

import {useLocale} from "next-intl";
import {useState, useRef, useEffect, useCallback} from "react";

export const LANGUAGES = [
    {code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl"},
    {code: "en", name: "English", flag: "🇬🇧", dir: "ltr"},
    {code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr"},
] as const;

export type LocaleCode = typeof LANGUAGES[number]["code"];

export function useLanguageSwitcher() {
    const currentLocale = useLocale() as LocaleCode;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

    const handleLangChange = (targetLocale: LocaleCode) => {
        if (currentLocale === targetLocale) {
            setIsOpen(false);
            return;
        }

        let cleanPath = window.location.pathname;
        const localePattern = new RegExp(`^\\/(${LANGUAGES.map((l) => l.code).join("|")})(\\/|$)`);
        cleanPath = cleanPath.replace(localePattern, "/");

        if (!cleanPath.startsWith("/")) {
            cleanPath = "/" + cleanPath;
        }

        if (targetLocale === "fa") {
            window.location.href = cleanPath;
        } else {
            window.location.href = cleanPath === "/" ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
        }
        setIsOpen(false);
    };

    // بستن منو در صورت کلیک بیرون برای پرفورمنس و UX
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
        handleLangChange,
    };
}
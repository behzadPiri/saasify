// "use client";
//
// import { useLocale } from "next-intl";
// import { useState, useRef, useEffect, useCallback } from "react";
// import {Icons} from "@/shared/components/ui/icons";
//
// export const LANGUAGES = [
//     { code: "fa", name: "فارسی", flag:Icons.FlagIr, dir: "rtl" },
//     { code: "en", name: "English", flag: Icons.FlagEn, dir: "ltr" },
// ] as const;
//
// export type LocaleCode = typeof LANGUAGES[number]["code"];
//
// export function useLanguageSwitcher() {
//     const currentLocale = useLocale();
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//
//     const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
//     const closeDropdown = useCallback(() => setIsOpen(false), []);
//
//     const handleLangChange = (targetLocale: LocaleCode) => {
//         if (currentLocale === targetLocale) {
//             setIsOpen(false);
//             return;
//         }
//
//         // 🌟 تغییر سرنوشت‌ساز: آپدیت کردن کوکی برای اینکه proxy.ts متوجه تغییر زبان بشود
//         // کوکی را برای ۱ سال منقضی می‌کنیم تا با بستن تب پاک نشود
//         document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
//
//         // گرفتن مسیر فعلی مرورگر
//         let cleanPath = window.location.pathname;
//
//         // پاک کردن پیشوندهای زبان قبلی از آدرس
//         const localePattern = new RegExp(`^\\/(${LANGUAGES.map((l) => l.code).join("|")})(\\/|$)`);
//         cleanPath = cleanPath.replace(localePattern, "/");
//
//         if (!cleanPath.startsWith("/")) {
//             cleanPath = "/" + cleanPath;
//         }
//
//         // روتینگ بر اساس قوانین as-needed
//         if (targetLocale === "fa") {
//             window.location.href = cleanPath;
//         } else {
//             window.location.href = cleanPath === "/" ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
//         }
//
//         setIsOpen(false);
//     };
//
//     // بستن منو با کلیک روی بیرون
//     useEffect(() => {
//         if (!isOpen) return;
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [isOpen]);
//
//     const activeLang = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];
//
//     return {
//         isOpen,
//         dropdownRef,
//         activeLang,
//         currentLocale,
//         toggleDropdown,
//         closeDropdown,
//         handleLangChange,
//     };
// }

"use client";

import { useLocale } from "next-intl";
import { Icons } from "@/shared/components/ui/icons";
import {useState, useRef, useEffect, useCallback, ComponentType} from "react";

// تعریف تایپ دقیق برای المان‌های آرایه زبان
export interface LanguageOption {
    code: "fa" | "en";
    name: string;
    flag: ComponentType<{ size?: number; className?: string }>;
    dir: "rtl" | "ltr";
}

export const LANGUAGES: readonly LanguageOption[] = [
    { code: "fa", name: "فارسی", flag: Icons.FlagIr, dir: "rtl" },
    { code: "en", name: "English", flag: Icons.FlagEn, dir: "ltr" },
] as const;

export type LocaleCode = typeof LANGUAGES[number]["code"];

export function useLanguageSwitcher() {
    const currentLocale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
    const closeDropdown = useCallback(() => setIsOpen(false), []);

    const handleLangChange = (targetLocale: LocaleCode) => {
        if (currentLocale === targetLocale) {
            setIsOpen(false);
            return;
        }

        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

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
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

/**
 * هوک تغییر زبان - مدیریت جابجایی بین فارسی و انگلیسی
 * شامل تنظیم کوکی NEXT_LOCALE و ریدایرکت با توجه به قوانین as-needed
 */

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

    // تابع تغییر زبان: تنظیم کوکی و ریدایرکت صفحه
    const handleLangChange = (targetLocale: LocaleCode) => {
        // اگر زبان فعلی با زبان مقصد یکی باشد، فقط منو را ببند
        if (currentLocale === targetLocale) {
            setIsOpen(false);
            return;
        }

        // تنظیم کوکی NEXT_LOCALE برای شناسایی زبان در middleware
        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

        // پاک کردن پیشوند زبان فعلی از آدرس URL
        let cleanPath = window.location.pathname;
        const localePattern = new RegExp(`^\\/(${LANGUAGES.map((l) => l.code).join("|")})(\\/|$)`);
        cleanPath = cleanPath.replace(localePattern, "/");

        // اطمینان از شروع مسیر با اسلش
        if (!cleanPath.startsWith("/")) {
            cleanPath = "/" + cleanPath;
        }

        // ریدایرکت بر اساس قوانین localePrefix: "as-needed"
        // فارسی: بدون پیشوند زبان
        // انگلیسی: با پیشوند /en
        if (targetLocale === "fa") {
            window.location.href = cleanPath;
        } else {
            window.location.href = cleanPath === "/" ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
        }

        setIsOpen(false);
    };

    // بستن دراپ‌داون با کلیک در خارج از آن
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

    // زبان فعال فعلی بر اساس locale جاری
    const activeLang = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

    // برگرداندن state و توابع مورد نیاز کامپوننت‌های سوئیچر زبان
    return {
        isOpen,             // آیا دراپ‌داون زبان باز است؟
        dropdownRef,        // رفرنس به المان دراپ‌داون برای بستن با کلیک بیرون
        activeLang,         // زبان فعلی شامل کد، نام و پرچم
        currentLocale,      // کد زبان فعلی (fa یا en)
        toggleDropdown,     // تابع باز/بسته کردن دراپ‌داون
        closeDropdown,      // تابع بستن دراپ‌داون
        handleLangChange,   // تابع تغییر زبان با تنظیم کوکی و ریدایرکت
    };
}
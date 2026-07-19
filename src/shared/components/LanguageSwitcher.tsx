"use client";

import { useLanguageSwitcher, LANGUAGES } from "@/shared/hooks/useLanguageSwitcher";

export function LanguageSwitcher() {
    const { isOpen, dropdownRef, activeLang, toggleDropdown, handleLangChange } = useLanguageSwitcher();

    return (
        /* 🌟 تغییر اصلی ۱: اضافه کردن w-max تا باکس قرمز/مادر به هیچ وجه توسط کامپوننت‌های والد در صفحه کش نیاید */
        <div className="relative inline-block text-left w-max " ref={dropdownRef}>
            {/* دکمه اصلی */}
            <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2.5 sm:px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all focus:outline-none"
            >
                <span className="text-base leading-none">{activeLang.flag}</span>
                <span className="hidden sm:block whitespace-nowrap">{activeLang.name}</span>
                <svg
                    className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                </svg>
            </button>

            {/* کادر زیرمنو */}
            {isOpen && (
                <div
                    /* 🌟 تغییر اصلی ۲: با ltr:left-0 و rtl:right-0 کادر در هردو حالت فارسی و انگلیسی دقیقاً زیر خود دکمه فیکس و قفل می‌شود */
                    className="absolute ltr:left-0 rtl:right-0 mt-2 w-36 origin-top rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100"
                    role="menu"
                >
                    <div className="py-1 p-1" role="none">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLangChange(lang.code)}
                                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                                    activeLang.code === lang.code
                                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                }`}
                                role="menuitem"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-base leading-none">{lang.flag}</span>
                                    <span className="whitespace-nowrap">{lang.name}</span>
                                </div>
                                {activeLang.code === lang.code && (
                                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-bold">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
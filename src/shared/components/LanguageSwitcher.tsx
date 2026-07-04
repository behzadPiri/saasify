"use client";

import {useLanguageSwitcher, LANGUAGES} from "../hooks/useLanguageSwitcher";

export function LanguageSwitcher() {
    const {
        isOpen,
        dropdownRef,
        activeLang,
        currentLocale,
        toggleDropdown,
        handleLangChange,
    } = useLanguageSwitcher();

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* دکمه اصلی دراپ‌داون - با استایل مدرن شیشه‌ای و هاور نرم */}
            <button
                onClick={toggleDropdown}
                type="button"
                className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold border rounded-xl bg-card/80 dark:bg-card/40 backdrop-blur-md border-border/80 hover:bg-accent hover:text-accent-foreground shadow-sm transition-all duration-300 focus:outline-none active:scale-98"
            >
                <span className="text-base select-none">{activeLang.flag}</span>
                <span className="tracking-wide text-foreground/90">{activeLang.name}</span>
                <svg
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                </svg>
            </button>

            {/* منوی بازشو پاپ‌آپ - کاملاً ریسپانسیو و تراز شده */}
            {isOpen && (
                <div
                    className={`absolute z-50 mt-2.5 w-48 rounded-2xl border border-border bg-card/95 dark:bg-card/90 backdrop-blur-xl p-1.5 shadow-xl shadow-shadow/5 focus:outline-none animate-in fade-in slide-in-from-top-3 duration-200 ${
                        currentLocale === "fa"
                            ? "left-0 md:left-auto md:right-0 origin-top-left"
                            : "right-0 md:right-auto md:left-0 origin-top-right"
                    }`}
                >
                    <div className="flex flex-col gap-1">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLangChange(lang.code)}
                                type="button"
                                className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-xl transition-all duration-200 group ${
                                    currentLocale === lang.code
                                        ? "bg-primary/10 text-primary font-bold shadow-sm"
                                        : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                                }`}
                                style={{direction: lang.dir}}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="text-base transition-transform group-hover:scale-110">{lang.flag}</span>
                                    <span className="font-medium">{lang.name}</span>
                                </div>

                                {/* تیک تایید زبان فعال */}
                                {currentLocale === lang.code && (
                                    <svg className="w-4 h-4 text-primary animate-in scale-in duration-200" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
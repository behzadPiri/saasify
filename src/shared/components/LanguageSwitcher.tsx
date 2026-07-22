"use client";

import {useLanguageSwitcher} from "../hooks/useLanguageSwitcher";
import {Icons} from "@/shared/components/ui/icons";
import {LANGUAGES} from "../hooks/useLanguageSwitcher";

export function LanguageSwitcher() {
    const {
        isOpen,
        dropdownRef,
        activeLang,
        currentLocale,
        toggleDropdown,
        handleLangChange,
    } = useLanguageSwitcher();

    // اختصاص کامپوننت پرچم فعال به متغیری با حرف بزرگ جهت رندر در JSX
    const ActiveFlag = activeLang.flag;

    return (
        <div className="relative w-max flex-initial shrink-0 " ref={dropdownRef}>
            {/* دکمه اصلی دراپ‌داون */}
            <button
                onClick={toggleDropdown}
                type="button"
                className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold border rounded-xl bg-card/80 dark:bg-card/40 backdrop-blur-md border-border/80 hover:bg-accent hover:text-accent-foreground shadow-sm transition-all duration-300 focus:outline-none active:scale-[0.98] md:cursor-pointer"
            >
                <span className="flex items-center shrink-0">
                    <ActiveFlag size={18}/>
                </span>
                <span className="tracking-wide text-foreground/90">{activeLang.name}</span>
                <Icons.Arrow
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                />
            </button>

            {/* منوی بازشو پاپ‌آپ */}
            {isOpen && (
                <div
                    className="fixed top-16 right-4 w-48 sm:absolute sm:top-full sm:mt-2.5 sm:left-0 sm:right-auto sm:w-48 z-50 rounded-2xl border border-border bg-card/95 dark:bg-card/90 backdrop-blur-xl p-1.5 shadow-xl shadow-shadow/5 focus:outline-none animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="flex flex-col gap-1">
                        {LANGUAGES.map((lang) => {
                            // اختصاص به متغیر با حرف بزرگ برای رندر داینامیک درون حلقه map
                            const FlagIcon = lang.flag;

                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLangChange(lang.code)}
                                    type="button"
                                    className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-xl transition-all duration-200 group md:cursor-pointer ${
                                        currentLocale === lang.code
                                            ? "bg-primary/10 text-primary font-bold shadow-sm"
                                            : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center transition-transform group-hover:scale-105">
                                            <FlagIcon size={18}/>
                                        </span>
                                        <span className="font-medium">{lang.name}</span>
                                    </div>

                                    {/* تیک تایید زبان فعال */}
                                    {currentLocale === lang.code && (
                                        <Icons.Check className="w-4 h-4 text-primary animate-in scale-in duration-200"/>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
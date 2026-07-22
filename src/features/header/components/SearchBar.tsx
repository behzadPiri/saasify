"use client";

import {useSearch} from "@/features/header";
import {Icons} from "@/shared/components/ui/icons";
import {useTranslations} from "next-intl";
import {useIsMac} from "@/shared/hooks/useIsMac";


export function SearchBar() {
    const {query, setQuery, isExpanded, inputRef, handleSearch, toggleExpand, closeExpand} = useSearch();
    const isMac = useIsMac();
    const t = useTranslations("Header");

    return (
        <>
            {/* دکمه باز کردن جستجو در موبایل */}
            <button
                type="button"
                onClick={toggleExpand}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                aria-label={t("search")}
            >
                <Icons.Search className="w-4 h-4"/>
            </button>

            {/* پوشش جستجوی موبایل */}
            {isExpanded && (
                <div
                    className="fixed inset-x-0 top-0 z-50 h-16 flex items-center px-4 bg-background/95 backdrop-blur-xl border-b border-border md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
                        <button
                            type="button"
                            onClick={closeExpand}
                            className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors shrink-0"
                            aria-label={t("closeSearch")}
                        >
                            <Icons.X className="w-5 h-5"/>
                        </button>

                        <div className="relative flex-1">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t("placeholder")}
                                className="w-full h-10 rtl:pr-10 rtl:pl-4 ltr:pl-10 ltr:pr-4 text-sm rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                            />
                            <Icons.Search
                                className="w-4 h-4 absolute rtl:right-3 ltr:left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"/>
                        </div>
                    </form>
                </div>
            )}

            {/* اینپوت دسکتاپ با هندلینگ دقیق جهت متون */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("placeholder")}
                    className="w-48 h-9 rtl:pr-9 rtl:pl-12 ltr:pl-9 ltr:pr-12 text-sm rounded-xl border border-border/60 bg-card/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <Icons.Search
                    className="w-4 h-4 absolute rtl:right-2.5 ltr:left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"/>

                <kbd
                    className="pointer-events-none absolute rtl:left-2 ltr:right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/40 bg-muted/50 rounded-md border border-border/40 select-none">
                    <span className="text-xs">{!isMac ? "⌘" : "Ctrl"}</span>+K
                </kbd>
            </form>
        </>
    );
}
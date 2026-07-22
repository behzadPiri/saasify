"use client";

import {Icons} from "@/shared/components/ui/icons";
import {ThemeSwitcher, LanguageSwitcher} from "@/shared/components";
import {SearchBar} from "./SearchBar";
import {MobileNav} from "./MobileNav";
import {useHeader} from "@/features/header";
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

export function Header() {
    const {isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu} = useHeader();
    const t = useTranslations("Header");
    return (
        <>
            <header
                className={`sticky top-0 z-30 w-full transition-all duration-300 ${
                    isScrolled
                        ? "bg-background/85 backdrop-blur-2xl border-b border-border/40 shadow-sm"
                        : "bg-background/60 backdrop-blur-xl border-b border-border/10"
                }`}
            >
                <div className="flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto px-4 sm:px-6">
                    {/* سمت راست (در حالت RTL): لوگو + تم + زبان */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center shrink-0">
                            <span
                                className="font-black text-xl tracking-tight bg-linear-to-r from-primary via-primary to-indigo-500 bg-clip-text text-transparent">
                                Saasify
                            </span>
                        </Link>

                        {/* سوئیچرها فقط در دسکتاپ نشان داده می‌شوند (موبایل به منوی کشویی منتقل می‌شود) */}
                        <div className="hidden md:flex items-center gap-1.5">
                            <span className="w-px h-4 bg-border/40 mx-1"/>
                            <ThemeSwitcher/>
                            <LanguageSwitcher/>
                        </div>
                    </div>

                    {/* سمت چپ (در حالت RTL): سرچ بار + دکمه منوی همبرگری */}
                    <div className="flex items-center gap-2">
                        <SearchBar/>

                        <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                            aria-label={isMobileMenuOpen ? t("closeMenu") : t("closeMenu")}
                        >
                            {isMobileMenuOpen ? (
                                <Icons.X className="w-5 h-5"/>
                            ) : (
                                <Icons.Menu className="w-5 h-5"/>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu}/>
        </>
    );
}
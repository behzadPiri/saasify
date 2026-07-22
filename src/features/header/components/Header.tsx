"use client";

/**
 * کامپوننت هدر اصلی برنامه
 * شامل لوگو، سوئیچرهای تم و زبان (فقط دسکتاپ)، نوار جستجو و دکمه منوی همبرگری (فقط موبایل)
 * از افکت شیشه‌ای (glassmorphism) با backdrop-blur استفاده می‌کند
 * هنگام اسکرول، ظاهر هدر تیره‌تر و سایه‌دارتر می‌شود
 */

import {Icons} from "@/shared/components/ui/icons";
import {ThemeSwitcher, LanguageSwitcher} from "@/shared/components";
import {SearchBar} from "./SearchBar";
import {MobileNav} from "./MobileNav";
import {useHeader} from "@/features/header";
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

export function Header() {
    // دریافت state اسکرول، باز/بسته بودن منوی موبایل و توابع کنترل از هوک useHeader
    const {isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu} = useHeader();
    const t = useTranslations("Header");

    return (
        <>
            {/* هدر اصلی با افکت sticky و شیشه‌ای */}
            <header
                className={`sticky top-0 z-30 w-full transition-all duration-300 ${
                    isScrolled
                        // حالت اسکرول: پس‌زمینه تیره‌تر، حاشیه واضح‌تر و سایه ظریف
                        ? "bg-background/85 backdrop-blur-2xl border-b border-border/40 shadow-sm"
                        // حالت عادی: پس‌زمینه شفاف‌تر و حاشیه کمرنگ
                        : "bg-background/60 backdrop-blur-xl border-b border-border/10"
                }`}
            >
                {/* کانتینر اصلی هدر با حداکثر عرض 7xl و فاصله‌های ریسپونسیو */}
                <div className="flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto px-4 sm:px-6">
                    {/* سمت راست (در حالت RTL): لوگوی Saasify + جداکننده + سوئیچرهای تم و زبان */}
                    <div className="flex items-center gap-3">
                        {/* لینک لوگو - با گرادیان متنی از رنگ اصلی به ایندیگو */}
                        <Link href="/" className="flex items-center shrink-0">
                            <span
                                className="font-black text-xl tracking-tight bg-linear-to-r from-primary via-primary to-indigo-500 bg-clip-text text-transparent">
                                Saasify
                            </span>
                        </Link>

                        {/* جداکننده عمودی + سوئیچرهای تم و زبان (فقط در دسکتاپ نمایش داده می‌شود) */}
                        {/* در موبایل این المان‌ها به داخل MobileNav منتقل می‌شوند */}
                        <div className="hidden md:flex items-center gap-1.5">
                            {/* خط عمودی جداکننده بین لوگو و سوئیچرها */}
                            <span className="w-px h-4 bg-border/40 mx-1"/>
                            <ThemeSwitcher/>
                            <LanguageSwitcher/>
                        </div>
                    </div>

                    {/* سمت چپ (در حالت RTL): نوار جستجو + دکمه منوی همبرگری موبایل */}
                    <div className="flex items-center gap-2">
                        <SearchBar/>

                        {/* دکمه منوی همبرگری - فقط در موبایل نمایش داده می‌شود */}
                        {/* با کلیک، منوی کشویی MobileNav باز/بسته می‌شود */}
                        <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                            aria-label={isMobileMenuOpen ? t("closeMenu") : t("closeMenu")}
                        >
                            {/* نمایش آیکون X هنگام باز بودن منو، در غیر این صورت آیکون همبرگری */}
                            {isMobileMenuOpen ? (
                                <Icons.X className="w-5 h-5"/>
                            ) : (
                                <Icons.Menu className="w-5 h-5"/>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* منوی کشویی موبایل - با استفاده از props باز/بسته بودن و تابع بستن */}
            <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu}/>
        </>
    );
}

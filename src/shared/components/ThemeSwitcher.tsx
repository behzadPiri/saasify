"use client";

/**
 * کامپوننت سوئیچر تم (نسخه دسکتاپ)
 * شامل دکمه آیکونی با نمایش تم فعلی و منوی بازشو با 3 آپشن:
 * 1. چک‌باکس حالت خودکار (بر اساس ساعت تهران)
 * 2. گرید 3 ستونه انتخاب تم (روشن/غروب/تاریک)
 * 3. پیام هشدار در حالت خودکار
 * در موبایل با position fixed در بالای صفحه نمایش داده می‌شود
 * در دسکتاپ با position absolute زیر دکمه باز می‌شود
 */

import {ComponentType} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {useTheme, ThemeType} from "@/shared/hooks/useTheme";
import {Checkbox} from "@/shared/components/ui";

/**
 * کامپوننت سوئیچر تم دسکتاپ
 * state تم و توابع مرتبط از هوک useTheme دریافت می‌شود
 */
export function ThemeSwitcher() {
    // دریافت تمام state و توابع مورد نیاز از هوک useTheme
    const {
        theme,              // تم فعلی (light/dark/afternoon)
        changeTheme,        // تابع تغییر تم
        isAuto,             // آیا حالت خودکار فعال است؟
        toggleAuto,         // تابع فعال/غیرفعال کردن حالت خودکار
        isOpen,             // آیا منوی بازشو باز است؟
        setIsOpen,          // تابع تنظیم وضعیت باز/بسته بودن منو
        dropdownRef,        // رفرنس به المان دراپ‌داون برای بستن با کلیک بیرون
        getActiveIconType,  // تابع دریافت نوع آیکون فعال
        mounted             // آیا کامپوننت mount شده؟
    } = useTheme();

    // نوع آیکون فعال بر اساس تم فعلی یا حالت خودکار
    const iconType = getActiveIconType();
    const t = useTranslations("ThemeSwitcher");

    // تابع رندر آیکون دکمه اصلی بر اساس تم فعال
    const renderIcon = () => {
        switch (iconType) {
            case "auto":
                return <Icons.Auto className="text-primary" size={20}/>;
            case "light":
                return <Icons.Sun className="text-amber-500" size={20}/>;
            case "afternoon":
                return <Icons.Sunset className="text-orange-500" size={20}/>;
            case "dark":
                return <Icons.Moon className="text-indigo-400" size={20}/>;
        }
    };

    // اگر هنوز mount نشده، یک اسکلت (skeleton) با انیمیشن pulse نمایش بده
    if (!mounted) return <div className="w-10 h-10 rounded-xl border border-border bg-card/50 animate-pulse"/>;

    // لیست آپشن‌ها برای رندر هوشمند و داینامیک دکمه‌های تم
    const themeOptions: {
        id: ThemeType;
        label: string;
        icon: ComponentType<{ className?: string; size?: number }>
    }[] = [
        {id: "light", label: t("day"), icon: Icons.Sun},       // روشن
        {id: "afternoon", label: t("afternoon"), icon: Icons.Sunset},  // غروب
        {id: "dark", label: t("night"), icon: Icons.Moon}       // تاریک
    ];

    return (
        <div className="relative inline-block text-right rtl:text-right ltr:text-left" ref={dropdownRef}>

            {/* دکمه اصلی سوئیچر - با نمایش آیکون تم فعلی */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground hover:bg-background transition-colors text-lg shadow-sm shrink-0 md:cursor-pointer"
                type="button"
            >
                {renderIcon()}
            </button>

            {/* منوی بازشو با ساختار یکپارچه */}
            {/* در موبایل: position fixed در وسط بالای صفحه */}
            {/* در دسکتاپ: position absolute زیر دکمه */}
            {isOpen && (
                <div
                    className="fixed top-16 left-1/2 -translate-x-1/2 w-64 mx-auto sm:absolute sm:top-full sm:mt-2 sm:left-0 sm:translate-x-0 sm:w-64 sm:mx-0 bg-card border border-border rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* چک‌باکس حالت خودکار: تم را بر اساس ساعت تهران تنظیم می‌کند */}
                    <Checkbox
                        checked={isAuto}
                        onChange={toggleAuto}
                        label={t("autoMode")}

                    />

                    {/* جداکننده */}
                    <div className="h-px bg-border -mt-1"/>

                    {/* گرید 3 ستونه انتخاب تم */}
                    {/* در حالت خودکار کمرنگ و غیرقابل کلیک می‌شود */}
                    <div
                        className={`grid grid-cols-3 gap-1 p-1 bg-muted/50 rounded-xl transition-all ${isAuto ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
                        {themeOptions.map((option) => {
                            const IconComponent = option.icon;
                            // تم فعال فقط زمانی انتخاب شده است که تم فعلی با تم آیتم یکی باشد و حالت خودکار غیرفعال باشد
                            const isActive = theme === option.id && !isAuto;

                            return (
                                <button
                                    key={option.id}
                                    disabled={isAuto}
                                    onClick={() => {
                                        changeTheme(option.id);
                                        setIsOpen(false);
                                    }}
                                    className={`flex flex-col items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold transition-all md:cursor-pointer ${
                                        isActive
                                            // حالت انتخاب شده: پس‌زمینه اصلی با سایه
                                            ? "bg-background text-foreground shadow-sm scale-100"
                                            // حالت عادی: رنگ کمرنگ با هاور
                                            : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                                    }`}
                                    type="button"
                                >
                                    {/*
                                       اصلاح رنگ آیکون‌ها:
                                       اگر آیتم فعال باشد، رنگ متن اصلی (text-foreground) یا رنگ شاخص تم را می‌گیرد.
                                       اگر غیرفعال باشد، رنگ کمرنگ متناسب با تم (text-muted-foreground) را می‌گیرد که در هر دو حالت لایت و دارک خواناست.
                                    */}
                                    <IconComponent
                                        size={18}
                                        className={isActive ? (option.id === "light" ? "text-amber-500" : option.id === "afternoon" ? "text-orange-500" : "text-indigo-400") : "text-muted-foreground/80"}
                                    />
                                    {/* برچسب نام تم */}
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* پیام هشدار در حالت خودکار - توضیح نحوه کار تم خودکار بر اساس ساعت تهران */}
                    {isAuto && (
                        <p className="text-[10px] select-none text-amber-600 dark:text-amber-500 font-medium border-t border-border pt-2 leading-normal">
                            {t("warning")}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
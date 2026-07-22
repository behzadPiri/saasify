"use client";

import {ComponentType} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {useTheme, ThemeType} from "@/shared/hooks/useTheme";
import {Checkbox} from "@/shared/components/ui";

export function ThemeSwitcher() {
    const {
        theme,
        changeTheme,
        isAuto,
        toggleAuto,
        isOpen,
        setIsOpen,
        dropdownRef,
        getActiveIconType,
        mounted
    } = useTheme();

    const iconType = getActiveIconType();
    const t = useTranslations("ThemeSwitcher");

    // مدیریت رنگ و آیکون دکمه اصلی بر اساس تم فعال
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

    if (!mounted) return <div className="w-10 h-10 rounded-xl border border-border bg-card/50 animate-pulse"/>;

    // لیست آپشن‌ها برای رندر هوشمند و داینامیک دکمه‌ها
    const themeOptions: {
        id: ThemeType;
        label: string;
        icon: ComponentType<{ className?: string; size?: number }>
    }[] = [
        {id: "light", label: t("day"), icon: Icons.Sun},
        {id: "afternoon", label: t("afternoon"), icon: Icons.Sunset},
        {id: "dark", label: t("night"), icon: Icons.Moon}
    ];

    return (
        <div className="relative inline-block text-right rtl:text-right ltr:text-left" ref={dropdownRef}>

            {/* دکمه اصلی سوئیچر */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground hover:bg-background transition-colors text-lg shadow-sm shrink-0 md:cursor-pointer"
                type="button"
            >
                {renderIcon()}
            </button>

            {/* منوی بازشو با ساختار یکپارچه */}
            {isOpen && (
                <div
                    className="fixed top-16 left-1/2 -translate-x-1/2 w-64 mx-auto sm:absolute sm:top-full sm:mt-2 sm:left-0 sm:translate-x-0 sm:w-64 sm:mx-0 bg-card border border-border rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* بخش اول: فعال‌سازی حالت خودکار */}
                    <Checkbox
                        checked={isAuto}
                        onChange={toggleAuto}
                        label={t("autoMode")}

                    />

                    <div className="h-px bg-border -mt-1"/>

                    <div
                        className={`grid grid-cols-3 gap-1 p-1 bg-muted/50 rounded-xl transition-all ${isAuto ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
                        {themeOptions.map((option) => {
                            const IconComponent = option.icon;
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
                                            ? "bg-background text-foreground shadow-sm scale-100"
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
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* بخش هشدار خودکار */}
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
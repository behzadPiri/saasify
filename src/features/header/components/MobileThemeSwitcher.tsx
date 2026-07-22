"use client";

/**
 * کامپوننت آکاردئون انتخاب تم برای موبایل
 * شامل دکمه تریگر با نمایش آیکون و برچسب تم فعلی
 * و محتوای بازشونده با چک‌باکس حالت خودکار و 3 دکمه تم (روشن/غروب/تاریک)
 * انیمیشن باز/بسته شدن با transition-duration-500ms انجام می‌شود
 * در حالت خودکار، دکمه‌های تم غیرفعال و کمرنگ می‌شوند
 */

import {ComponentType} from "react";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {useTheme, ThemeType} from "@/shared/hooks/useTheme";
import {Checkbox} from "@/shared/components/ui";

// لیست 3 آپشن تم با آیکون و رنگ اختصاصی هر کدام
const THEME_OPTIONS: {
    id: ThemeType;
    labelKey: string;
    icon: ComponentType<{ className?: string; size?: number }>;
    color: string;
}[] = [
    {id: "light", labelKey: "day", icon: Icons.Sun, color: "text-amber-500"},       // روشن: آفتاب زرد
    {id: "afternoon", labelKey: "afternoon", icon: Icons.Sunset, color: "text-orange-500"},  // غروب: غروب نارنجی
    {id: "dark", labelKey: "night", icon: Icons.Moon, color: "text-indigo-400"},    // تاریک: ماه ایندیگویی
];

// پراپ‌های کامپوننت: وضعیت باز/بسته بودن و تابع تریگر
interface MobileThemeAccordionProps {
    isOpen: boolean;   // آیا آکاردئون باز است؟
    onToggle: () => void;  // تابع باز/بسته کردن آکاردئون
}

/**
 * کامپوننت آکاردئون انتخاب تم موبایل
 * @param isOpen - وضعیت باز/بسته بودن آکاردئون
 * @param onToggle - تابع تریگر برای باز/بسته کردن
 */
export function MobileThemeAccordion({isOpen, onToggle}: MobileThemeAccordionProps) {
    // دریافت state تم، تابع تغییر تم، حالت خودکار و وضعیت mount شدن
    const {theme, changeTheme, isAuto, toggleAuto, mounted, getActiveIconType} = useTheme();
    const t = useTranslations("ThemeSwitcher");

    // اگر هنوز mount نشده، چیزی رندر نکن (جلوگیری از خطای hydration)
    if (!mounted) return null;

    // نوع آیکون فعال بر اساس تم فعلی یا حالت خودکار
    const iconType = getActiveIconType();

    // تابع رندر آیکون دکمه تریگر بر اساس تم فعال
    const renderActiveIcon = () => {
        switch (iconType) {
            case "auto":
                return <Icons.Auto className="text-primary" size={18}/>;
            case "light":
                return <Icons.Sun className="text-amber-500" size={18}/>;
            case "afternoon":
                return <Icons.Sunset className="text-orange-500" size={18}/>;
            case "dark":
                return <Icons.Moon className="text-indigo-400" size={18}/>;
        }
    };

    // برچسب دکمه تریگر: اگر حالت خودکار فعال باشد "حالت خودکار"، در غیر این صورت نام تم فعلی
    const activeLabel = isAuto ? t("autoMode") : t(THEME_OPTIONS.find(o => o.id === theme)?.labelKey ?? "day");

    return (
        <div className="rounded-2xl">
            {/* دکمه تریگر آکاردئون - با نمایش آیکون تم فعلی، برچسب و فلش چرخشی */}
            <button
                type="button"
                onClick={onToggle}
                className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/40 active:scale-[0.97] transition-all duration-200"
            >
                {renderActiveIcon()}
                <span className="flex-1 text-right rtl:text-right ltr:text-left truncate whitespace-nowrap">
                    {activeLabel}
                </span>
                <Icons.Arrow
                    size={14}
                    className={`shrink-0 text-muted-foreground transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* محتوای آکاردئون - با انیمیشن باز/بسته شدن نرم */}
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: isOpen ? "300px" : "0px",     // حداکثر ارتفاع برای انیمیشن
                    opacity: isOpen ? 1 : 0,                  // محو شدن تدریجی
                    transform: isOpen ? "translateY(0)" : "translateY(-4px)",  // جابجایی ظریف عمودی
                }}
            >
                <div className="px-3 py-2 space-y-1">
                    {/* چک‌باکس حالت خودکار - تم را بر اساس ساعت تهران تنظیم می‌کند */}
                    <div className="px-3 py-2">
                        <Checkbox
                            checked={isAuto}
                            onChange={toggleAuto}
                            label={t("autoMode")}
                        />
                    </div>

                    {/* جداکننده بین چک‌باکس و دکمه‌های تم */}
                    <div className="h-px bg-border/40 mx-2"/>

                    {/* گرید 3 ستونه دکمه‌های انتخاب تم */}
                    {/* در حالت خودکار کمرنگ و غیرقابل کلیک می‌شود */}
                    <div
                        className={`grid grid-cols-3 gap-1.5 p-1 transition-all duration-500 ${isAuto ? "opacity-40 pointer-events-none" : ""}`}>
                        {THEME_OPTIONS.map((option, index) => {
                            const IconComponent = option.icon;
                            // تم فعال فقط زمانی انتخاب شده است که تم فعلی با تم آیتم یکی باشد و حالت خودکار غیرفعال باشد
                            const isActive = theme === option.id && !isAuto;

                            return (
                                <button
                                    key={option.id}
                                    disabled={isAuto}
                                    onClick={() => {
                                        changeTheme(option.id);
                                    }}
                                    // تاخیر انیمیشن ورودی بر اساس ایندکس آیتم
                                    style={{transitionDelay: isOpen ? `${index * 40}ms` : "0ms"}}
                                    className={`flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 ease-in-out active:scale-95 ${
                                        isActive
                                            // حالت انتخاب شده: پس‌زمینه اصلی با حاشیه و سایه
                                            ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
                                            // حالت عادی: رنگ کمرنگ با هاور
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    }`}
                                    type="button"
                                >
                                    {/* آیکون تم با رنگ اختصاصی اگر فعال باشد */}
                                    <IconComponent size={18}
                                                   className={isActive ? option.color : "text-muted-foreground/70"}/>
                                    {/* برچسب نام تم */}
                                    <span>{t(option.labelKey)}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* پیام هشدار در حالت خودکار - توضیح نحوه کار تم خودکار */}
                    {isAuto && (
                        <p className="text-[10px] select-none text-amber-600 dark:text-amber-500 font-medium px-2 pt-1 leading-normal">
                            {t("warning")}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

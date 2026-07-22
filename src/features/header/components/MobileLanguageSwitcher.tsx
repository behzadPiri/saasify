"use client";

/**
 * کامپوننت آکاردئون انتخاب زبان برای موبایل
 * شامل دکمه تریگر با نمایش پرچم و نام زبان فعلی
 * و محتوای بازشونده با لیست زبان‌های موجود (فارسی/انگلیسی)
 * انیمیشن باز/بسته شدن با transition-duration-500ms انجام می‌شود
 * زبان فعال با تیک تایید و حاشیه نشان داده می‌شود
 */

import {useLanguageSwitcher, LANGUAGES} from "@/shared/hooks/useLanguageSwitcher";
import {Icons} from "@/shared/components/ui/icons";

// پراپ‌های کامپوننت: وضعیت باز/بسته بودن و تابع تریگر
interface MobileLanguageAccordionProps {
    isOpen: boolean;   // آیا آکاردئون باز است؟
    onToggle: () => void;  // تابع باز/بسته کردن آکاردئون
}

/**
 * کامپوننت آکاردئون انتخاب زبان موبایل
 * @param isOpen - وضعیت باز/بسته بودن آکاردئون
 * @param onToggle - تابع تریگر برای باز/بسته کردن
 */
export function MobileLanguageAccordion({isOpen, onToggle}: MobileLanguageAccordionProps) {
    // دریافت زبان فعال، کد زبان فعلی و تابع تغییر زبان
    const {activeLang, currentLocale, handleLangChange} = useLanguageSwitcher();

    // کامپوننت پرچم زبان فعال برای نمایش در دکمه تریگر
    const ActiveFlag = activeLang.flag;

    return (
        <div className="rounded-2xl">
            {/* دکمه تریگر آکاردئون - با نمایش پرچم، نام زبان و فلش چرخشی */}
            <button
                type="button"
                onClick={onToggle}
                className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/40 active:scale-[0.97] transition-all duration-200"
            >
                {/* پرچم زبان فعلی */}
                <ActiveFlag size={18}/>
                {/* نام زبان فعلی با تراز صحیح برای RTL/LTR */}
                <span className="flex-1 text-right rtl:text-right ltr:text-left truncate">{activeLang.name}</span>
                {/* فلش چرخشی - هنگام باز بودن آکاردئون 180 درجه می‌چرخد */}
                <Icons.Arrow
                    size={14}
                    className={`shrink-0 text-muted-foreground transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* محتوای آکاردئون - با انیمیشن باز/بسته شدن نرم */}
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: isOpen ? "200px" : "0px",     // حداکثر ارتفاع برای انیمیشن
                    opacity: isOpen ? 1 : 0,                  // محو شدن تدریجی
                    transform: isOpen ? "translateY(0)" : "translateY(-4px)",  // جابجایی ظریف عمودی
                }}
            >
                <div className="px-2 py-1.5 space-y-0.5">
                    {/* لیست زبان‌های موجود با انیمیشن ورودی */}
                    {LANGUAGES.map((lang, index) => {
                        // کامپوننت پرچم زبان برای رندر داینامیک
                        const FlagIcon = lang.flag;
                        // تشخیص زبان فعال
                        const isActive = currentLocale === lang.code;

                        return (
                            <button
                                key={lang.code}
                                onClick={() => handleLangChange(lang.code)}
                                type="button"
                                // تاخیر انیمیشن ورودی بر اساس ایندکس
                                style={{transitionDelay: isOpen ? `${index * 40}ms` : "0ms"}}
                                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-300 ease-in-out active:scale-[0.97] ${
                                    isActive
                                        // حالت زبان فعال: پس‌زمینه اصلی با حاشیه و فونت بولد
                                        ? "bg-primary/10 text-primary font-bold ring-1 ring-primary/20"
                                        // حالت عادی: رنگ معمولی با هاور
                                        : "text-foreground/80 hover:bg-accent/50 hover:text-foreground"
                                }`}
                            >
                                {/* پرچم زبان */}
                                <span className="flex items-center shrink-0">
                                    <FlagIcon size={18}/>
                                </span>
                                {/* نام زبان */}
                                <span className="font-medium">{lang.name}</span>
                                {/* تیک تایید زبان فعال - با انیمیشن ظاهر شدن */}
                                {isActive && (
                                    <Icons.Check
                                        className="w-4 h-4 text-primary me-auto ms-auto animate-in scale-in duration-200"/>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

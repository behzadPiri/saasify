"use client";

/**
 * کامپوننت چک‌باکس سفارشی با افکت انیمیشن
 * شامل یک کادر با آیکون تیک متحرک و متن برچسب
 * از input hidden استاندارد برای حفظ منطق و دسترسی‌پذیری استفاده می‌کند
 * در حالت انتخاب شده: پس‌زمینه اصلی با حاشیه و سایه
 * در حالت عادی: پس‌زمینه کارت با حاشیه خاکستری
 */

import React from "react";
import { Icons } from "@/shared/components/ui/icons";

// پراپ‌های کامپوننت چک‌باکس
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    checked: boolean;       // آیا چک‌باکس انتخاب شده؟
    onChange: (checked: boolean) => void;  // تابع تغییر وضعیت
    label?: string;         // متن برچسب (اختیاری)
}

/**
 * کامپوننت چک‌باکس سفارشی
 * @param checked - وضعیت انتخاب شده
 * @param onChange - تابع تغییر وضعیت
 * @param label - متن برچسب
 * @param disabled - آیا غیرفعال است؟
 */
export function Checkbox({ checked, onChange, label, disabled, className = "", ...props }: CheckboxProps) {
    return (
        <label
            className={`flex items-center gap-2.5 select-none text-xs font-semibold text-foreground transition-opacity
                ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer group"} 
                ${className}`}
        >
            {/* اینپوت پنهان استاندارد برای حفظ منطق و دسترسی‌پذیری */}
            {/* صفحه‌کلید و صفحه‌خوان‌ها می‌توانند با این اینپوت تعامل داشته باشند */}
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => !disabled && onChange(e.target.checked)}
                className="sr-only md:cursor-pointer"
                {...props}
            />

            {/*
               کادر ثابت چک‌باکس:
               به جای آیکون مربع، خودمان کادر را با border-border می‌سازیم.
               این یعنی کادر در هر دو حالت روشن و خاموش کاملاً فیکس و بدون تغییر مکان باقی می‌ماند.
            */}
            <div
                className={`flex items-center justify-center w-5 h-5 rounded-lg border transition-all duration-200 shrink-0 md:cursor-pointer
                    ${checked
                    // حالت انتخاب شده: پس‌زمینه اصلی، حاشیه اصلی و سایه
                    ? "bg-primary border-primary text-primary-foreground shadow-sm scale-100"
                    // حالت عادی: پس‌زمینه کارت با حاشیه خاکستری
                    : "bg-card border-border text-transparent group-hover:border-primary/60"
                }`}
            >
                {/*
                   فقط آیکون تیک داخل کادر قرار دارد.
                   وقتی تیک فعال نیست، با کلاس text-transparent کاملاً مخفی و بی‌آزار است.
                   وقتی فعال می‌شود، با یک افکت انیمیشن بسیار نرم دقیقاً در مرکز کادر ظاهر می‌شود.
                */}
                <Icons.Check
                    className={`w-3.5 h-3.5 transition-all duration-200 transform
                        ${checked
                        // حالت انتخاب شده: تیک کاملاً قابل مشاهده و در اندازه اصلی
                        ? "scale-100 opacity-100"
                        // حالت عادی: تیک کاملاً مخفی و کوچک
                        : "scale-0 opacity-0"
                    }`}
                />
            </div>

            {/* متن برچسب با تراز عمودی بی‌نقص و پشتیبانی از RTL/LTR */}
            {label && (
                <span className="leading-none text-right rtl:text-right ltr:text-left flex-1 break-words">
                    {label}
                </span>
            )}
        </label>
    );
}
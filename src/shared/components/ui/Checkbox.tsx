"use client";

import React from "react";
import { Icons } from "@/shared/components/ui/icons";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export function Checkbox({ checked, onChange, label, disabled, className = "", ...props }: CheckboxProps) {
    return (
        <label
            className={`flex items-center gap-2.5 select-none text-xs font-semibold text-foreground transition-opacity
                ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer group"} 
                ${className}`}
        >
            {/* اینپوت پنهان استاندارد برای حفظ منطق و دسترسی‌پذیری */}
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
                    ? "bg-primary border-primary text-primary-foreground shadow-sm scale-100"
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
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }`}
                />
            </div>

            {/* هندل کردن هوشمند متن و تراز عمودی بی‌نقص */}
            {label && (
                <span className="leading-none text-right rtl:text-right ltr:text-left flex-1 break-words">
                    {label}
                </span>
            )}
        </label>
    );
}
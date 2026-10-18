"use client";

/**
 * کامپوننت پایه مودال
 * لایه تیره پس‌زمینه و بدنه مودال را به‌صورت Portal مستقیماً داخل `document.body` رندر می‌کند
 * دلیل استفاده از Portal: برخی اجداد (مثل کانتینرهایی که backdrop-blur دارند) به‌خاطر
 * `backdrop-filter` به containing block برای المان‌های `position: fixed` تبدیل می‌شوند و
 * باعث می‌شوند لایه پس‌زمینه همراه با محتوای اسکرول‌شونده جابه‌جا شود.
 * ویژگی‌ها:
 * - پس‌زمینه ثابت و تمام‌صفحه (`fixed inset-0 z-50 bg-black/50`)
 * - بدنه مودال با اسکرول داخلی مجزا (`max-h-[90vh] overflow-y-auto`)
 * - قفل اسکرول صفحه اصلی هنگام باز بودن مودال
 * - بستن با کلید Escape و کلیک روی پس‌زمینه
 */

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";

interface ModalProps {
    open: boolean;               // آیا مودال باز است؟
    onClose: () => void;         // تابع بستن مودال
    children: ReactNode;         // محتوای داخل مودال
    className?: string;          // کلاس‌های تکمیلی برای بدنه مودال (عرض، گردی گوشه و ...)
    ariaLabel?: string;          // برچسب دسترسی‌پذیری برای صفحه‌خوان‌ها
}

export function Modal({ open, onClose, children, className = "", ariaLabel }: ModalProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    // قفل اسکرول صفحه اصلی تا وقتی مودال باز است
    useBodyScrollLock(open);

    // بستن مودال با کلید Escape
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    // فوکوس روی بدنه مودال هنگام باز شدن (بدون اسکرول خودکار)
    useEffect(() => {
        if (!open) return;
        panelRef.current?.focus({ preventScroll: true });
    }, [open]);

    // در رندر سمت سرور یا وقتی مودال بسته است چیزی رندر نمی‌کنیم
    if (!open || typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
        >
            {/* لایه تیره پس‌زمینه: ثابت، تمام‌صفحه و با کلیک بسته می‌شود */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* بدنه مودال با اسکرول داخلی مجزا از پس‌زمینه */}
            <div
                ref={panelRef}
                tabIndex={-1}
                className={`relative z-10 w-full max-h-[90vh] overflow-y-auto overscroll-contain rounded-[2rem] border border-border/40 bg-card/95 p-6 shadow-2xl backdrop-blur-xl outline-none animate-in fade-in ${className}`}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

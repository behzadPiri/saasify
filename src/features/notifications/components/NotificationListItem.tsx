"use client";

/**
 * آیتم تکی اعلان
 * شامل دو ناحیه تعاملی است: ناحیه اصلی (کلیک = جابه‌جایی خوانده‌شدن) و دکمه حذف.
 * منطق نمایشش کاملاً در هوک useNotificationItem قرار دارد و این فایل فقط رندر می‌کند.
 */

import {memo} from "react";
import {useTranslations} from "next-intl";
import {NotificationDeleteButton} from "@/features/notifications";
import {useNotificationItem} from "@/features/notifications";
import type {NotificationItem} from "../types";

interface NotificationListItemProps {
    /** اعلان خام (با کلیدهای ترجمه) */
    item: NotificationItem;
    /** جهت نوشتار برای تراز محتوا */
    // isRtl: boolean;
    /** جابه‌جایی وضعیت خوانده‌شدن */
    onToggle: (id: string) => void;
    /** حذف اعلان */
    onDelete: (id: string) => void;
}

/**
 * ردیف اعلان
 * چرا memo؟ چون لیست می‌تواند بزرگ باشد و با تغییر وضعیت فقط همان ردیف باید رندر شود؛
 * در لایه داده هم فقط آیتم تغییر‌یافته آبجکت جدید می‌گیرد.
 */
export const NotificationListItem = memo(function NotificationListItem({
                                                                           item,
                                                                           // isRtl,
                                                                           onToggle,
                                                                           onDelete,
                                                                       }: NotificationListItemProps) {
    const t = useTranslations("Notifications");
    const {Icon, typeStyle, title, description, tag, timeLabel, statusLabel} = useNotificationItem(item);

    return (
        // ردیف دیگر خودِ button نیست؛ چون باید دکمه حذف هم داخلش باشد و button تودرتو مجاز نیست.
        <div
            className={`group flex w-full items-start gap-3 rounded-[22px] border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                item.read
                    ? "border-border/50 bg-background/40"
                    : "border-primary/20 bg-primary/5 shadow-[0_10px_25px_rgba(37,99,235,0.08)]"
            }`}
        >
            {/* ناحیه اصلی: کلیک روی آن وضعیت خوانده‌شدن را جابه‌جا می‌کند */}
            <button
                type="button"
                onClick={() => onToggle(item.id)}
                aria-pressed={item.read}
                className={`flex min-w-0 flex-1 items-start gap-3 rtl:flex-row rtl:text-right`}
            >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl  ${typeStyle.badge}`}>
                    <Icon size={18}/>
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                    <div className={`flex items-center gap-2 rtl:justify-start`}>
                        <span className="text-sm font-semibold text-foreground">{title}</span>
                        {/* نقطه چشمک‌زن فقط برای اعلان‌های خوانده‌نشده نمایش داده می‌شود */}
                        {!item.read &&
                            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${typeStyle.dot} animate-pulse`}/>}
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground rtl:text-right ltr:text-left">
                        {description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground rtl:justify-start">
                        <span className="rounded-full border border-border/50 bg-background/50 px-2 py-1">
                            {tag}
                        </span>
                        <time dateTime={item.timestamp.toISOString()}>{timeLabel}</time>
                    </div>
                </div>
            </button>

            {/* ستون کنش‌ها: وضعیت خوانده‌شدن + دکمه حذف */}
            <div className="flex shrink-0 flex-col items-center gap-2">
                <NotificationDeleteButton onClick={() => onDelete(item.id)} ariaLabel={t("deleteNotification")}/>
                <span
                    className="rounded-full border border-border/50 bg-background/50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]">
          {statusLabel}
        </span>
            </div>
        </div>
    );
});

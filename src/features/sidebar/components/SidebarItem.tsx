"use client";

/**
 * کامپوننت آیتم ناوبری سایدبار
 * هر آیتم شامل آیکون، متن ترجمه‌شده و حالت فعال/غیرفعال است
 * در حالت جمع‌شده فقط آیکون نمایش داده می‌شود و با هاور، تولتیپ ظاهر می‌شود
 * انیمیشن ورودی با تاخیر بر اساس ایندکس آیتم اعمال می‌شود
 * تشخیص آیتم فعال بر اساس مسیر فعلی URL انجام می‌شود
 */

import {Link, usePathname} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import {SidebarNavItem} from "../constants/sidebar";

// پراپ‌های کامپوننت: آیتم ناوبری، وضعیت جمع/باز بودن و ایندکس برای انیمیشن
interface SidebarItemProps {
    item: SidebarNavItem;       // آیتم ناوبری شامل id, translationKey, href, icon
    isCollapsed: boolean;       // آیا سایدبار جمع شده؟
    index: number;              // ایندکس آیتم برای محاسبه تاخیر انیمیشن
}

/**
 * کامپوننت آیتم ناوبری سایدبار
 * @param item - آیتم ناوبری شامل اطلاعات ترجمه و آدرس
 * @param isCollapsed - وضعیت جمع/باز بودن سایدبار
 * @param index - ایندکس آیتم برای انیمیشن ورودی
 */
export function SidebarItem({item, isCollapsed, index}: SidebarItemProps) {
    // مسیر فعلی URL برای تشخیص آیتم فعال
    const pathname = usePathname();
    const t = useTranslations("Sidebar");
    // رندر داینامیک آیکون بر اساس نام آیتم از آرایه Icons
    const Icon = Icons[item.icon];

    // تشخیص آیتم فعال: مسیر دقیق یا شامل زیرمسیر باشد
    const isActive =
        pathname === item.href || pathname.startsWith(`${item.href}/`);

    return (
        <Link
            href={item.href}
            // تاخیر انیمیشن ورودی بر اساس ایندکس (40ms * ایندکس)
            style={{animationDelay: `${index * 40}ms`}}
            className={`
                group relative flex items-center gap-3
                px-3.5 py-2.5 rounded-2xl
                text-sm font-medium
                active:scale-[0.97]
                transition-all duration-300 ease-out
                animate-[sidebar-item-enter_0.4s_ease-out_backwards]
                ${isCollapsed ? "justify-center px-0" : ""}
                ${isActive
                    // حالت فعال: پس‌زمینه اصلی، متن سفید و سایه اصلی
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 font-semibold"
                    // حالت عادی: رنگ کمرنگ با هاور
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
            `}
        >
            {/* آیکون آیتم ناوبری با افکت بزرگ‌ شدن در هاور */}
            {Icon && (
                <Icon
                    size={18}
                    className={`
                        shrink-0 transition-all duration-300 ease-out
                        group-hover:scale-110
                        ${isActive
                            ? "text-primary-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }
                    `}
                />
            )}

            {/* متن لینک - در حالت جمع مخفی می‌شود با opacity و width صفر */}
            <span
                className={`
                    truncate transition-all duration-200 ease-out
                    ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
                `}
            >
                {t(item.translationKey)}
            </span>

            {/* تولتیپ در حالت جمع‌شده - فقط وقتی سایدبار جمع باشد نمایش داده می‌شود */}
            {/* با هاور روی آیتم، تولتیپ با انیمیشن ظاهر می‌شود */}
            {isCollapsed && (
                <div
                    className={`
                        absolute inset-s-full ms-3 z-50
                        top-1/2 -translate-y-1/2
                        px-3 py-1.5 rounded-xl
                        bg-card/90 backdrop-blur-xl
                        border border-border/40
                        text-foreground text-xs font-medium
                        whitespace-nowrap
                        shadow-xl
                        opacity-0 scale-95
                        group-hover:opacity-100 group-hover:scale-100
                        transition-all duration-200 ease-out
                        pointer-events-none
                    `}
                >
                    {t(item.translationKey)}
                    {/* فلش تولتیپ با چرخش 45 درجه */}
                    <span className="absolute top-1/2 -translate-y-1/2 -inset-s-1 w-2 h-2 bg-card/90 border-s border-t border-border/40 rotate-45"/>
                </div>
            )}
        </Link>
    );
}

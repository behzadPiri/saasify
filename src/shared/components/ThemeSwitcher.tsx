"use client";

import {useTheme} from "@/shared/hooks/useTheme";

export function ThemeSwitcher() {

    const {theme, changeTheme, isAuto, toggleAuto} = useTheme()


    return (
        <div className="flex flex-col gap-4 p-5 bg-card border border-border rounded-2xl shadow-md max-w-sm">
            <h3 className="font-bold text-lg text-foreground">تنظیمات ظاهر پلتفرم</h3>

            {/* بخش تیک تم اتوماتیک */}
            <label className="flex items-center gap-3 cursor-pointer user-select-none">
                <input
                    type="checkbox"
                    checked={isAuto}
                    onChange={(e) => toggleAuto(e.target.checked)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                    تنظیم هوشمند و خودکار (بر اساس ساعت رسمی ایران)
                </span>
            </label>

            {/* دکمه‌های تغییر تم دستی */}
            <div
                className={`flex gap-2 p-1 bg-background rounded-xl transition-opacity ${isAuto ? "opacity-50" : "opacity-100"}`}>
                <button
                    disabled={isAuto}
                    onClick={() => changeTheme("light")}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        theme === "light"
                            ? "bg-card text-primary shadow-sm"
                            : "text-foreground hover:bg-card/50 disabled:hover:bg-transparent"
                    }`}
                >
                    ☀️ روز
                </button>

                <button
                    disabled={isAuto}
                    onClick={() => changeTheme("dark")}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        theme === "dark"
                            ? "bg-card text-primary shadow-sm"
                            : "text-foreground hover:bg-card/50 disabled:hover:bg-transparent"
                    }`}
                >
                    🌙 شب
                </button>

                <button
                    disabled={isAuto}
                    onClick={() => changeTheme("afternoon")}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        theme === "afternoon"
                            ? "bg-card text-primary shadow-sm"
                            : "text-foreground hover:bg-card/50 disabled:hover:bg-transparent"
                    }`}
                >
                    🌆 غروب
                </button>
            </div>

            {isAuto && (
                <p className="text-xs text-amber-600 font-medium">
                    ⚠️ حالت خودکار فعال است؛ تغییر دستی تم تا زمان غیرفعال‌سازی قفل می‌باشد.
                </p>
            )}
        </div>
    );
}


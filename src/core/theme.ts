/**
 * هسته مدیریت تم برنامه
 * شامل انواع تم، کلیدهای ذخیره‌سازی (localStorage/Cookie)،
 * توابع اعمال تم روی تگ html و اسکریپت همگام‌سازی اولیه
 *
 * نکته مهم: این فایل هم در Server Components (برای خواندن کوکی و ساخت اسکریپت)
 * و هم در Client Components (برای اعمال و ذخیره تم) استفاده می‌شود؛
 * بنابراین هیچ دسترسی مستقیمی به window/document در سطح ماژول ندارد.
 */

// تم‌های قابل انتخاب برنامه
export const THEMES = ["light", "dark", "afternoon"] as const;

export type ThemeType = (typeof THEMES)[number];

// تم پیش‌فرض (همان تم روشن)
export const DEFAULT_THEME: ThemeType = "light";

// کلیدهای ذخیره‌سازی تم در مرورگر
export const THEME_STORAGE_KEY = "saasify-theme";
export const THEME_AUTO_STORAGE_KEY = "saasify-theme-auto";

// نام کوکی تم؛ برای اینکه سرور بتواند تم صحیح را در همان رندر اول روی html قرار دهد
export const THEME_COOKIE_NAME = "saasify-theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // یک سال

// رنگ پس‌زمینه پایه هر تم
// برای رنگ‌آمیزی اولیه تگ html (قبل از بارگذاری کامل CSS) استفاده می‌شود
// تا حتی در فاصله بارگذاری استایل‌ها، پس‌زمینه سفید دیده نشود.
export const THEME_BACKGROUND_COLORS: Record<ThemeType, string> = {
    light: "#f9fafb",
    dark: "#0f172a",
    afternoon: "#f4eae1",
};

// رویداد سراسری برای همگام‌سازی همه نمونه‌های useTheme در یک تب
export const THEME_CHANGE_EVENT = "saasify:theme-change";

// نوع داده‌ای که همراه رویداد تغییر تم ارسال می‌شود
export interface ThemeChangeDetail {
    theme: ThemeType;
    isAuto: boolean;
}

/**
 * بررسی معتبر بودن مقدار تم
 * ورودی ممکن است از localStorage، کوکی یا ورودی کاربر آمده باشد
 */
export function isThemeType(value: unknown): value is ThemeType {
    return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/**
 * محاسبه تم خودکار بر اساس ساعت تهران
 * ۶ تا ۱۷: روشن | ۱۷ تا ۲۰: غروب | ۲۰ تا ۶: تاریک
 */
export function getTehranAutoTheme(date: Date = new Date()): ThemeType {
    const tehranHour = Number.parseInt(
        date.toLocaleTimeString("en-US", {
            timeZone: "Asia/Tehran",
            hour: "2-digit",
            hour12: false,
        }),
        10,
    );

    if (!Number.isFinite(tehranHour)) return DEFAULT_THEME;
    if (tehranHour >= 6 && tehranHour < 17) return "light";
    if (tehranHour >= 17 && tehranHour < 20) return "afternoon";
    return "dark";
}

/**
 * اعمال تم روی تگ html
 * - data-theme برای متغیرهای CSS
 * - کلاس dark برای واریانت‌های Tailwind
 * - color-scheme برای هماهنگی رنگ‌های پیش‌فرض مرورگر (اسکرول‌بار، فرم‌ها و پس‌زمینه اولیه)
 */
export function applyThemeToDocument(theme: ThemeType): void {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
    root.style.backgroundColor = THEME_BACKGROUND_COLORS[theme];
}

/**
 * ذخیره تم در localStorage و کوکی
 * کوکی باعث می‌شود سرور در درخواست بعدی (از جمله تغییر زبان که یک ناوبری کامل است)
 * تم صحیح را قبل از اولین رنگ‌آمیزی روی html قرار دهد.
 */
export function persistTheme(theme: ThemeType, isAuto: boolean): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        window.localStorage.setItem(THEME_AUTO_STORAGE_KEY, String(isAuto));
    } catch {
        // اگر localStorage در دسترس نبود (حالت private/محدود)، کوکی جایگزین می‌شود
    }

    try {
        document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
    } catch {
        // نادیده گرفتن خطای کوکی در محیط‌های محدود
    }
}

/**
 * خواندن تم ذخیره‌شده در localStorage (با اعتبارسنجی مقدار)
 */
export function readStoredTheme(): ThemeType {
    if (typeof window === "undefined") return DEFAULT_THEME;

    try {
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        return isThemeType(storedTheme) ? storedTheme : DEFAULT_THEME;
    } catch {
        return DEFAULT_THEME;
    }
}

/**
 * خواندن وضعیت حالت خودکار از localStorage
 */
export function readStoredAuto(): boolean {
    if (typeof window === "undefined") return false;

    try {
        return window.localStorage.getItem(THEME_AUTO_STORAGE_KEY) === "true";
    } catch {
        return false;
    }
}

/**
 * اسکریپت اولیه تم
 * این اسکریپت باید به صورت inline و همگام (نه با next/script) داخل <head> قرار گیرد
 * تا پیش از اولین رنگ‌آمیزی مرورگر اجرا شود و از پرش رنگ تم (Theme Flash) جلوگیری کند.
 *
 * ترتیب اولویت:
 * ۱. حالت خودکار (محاسبه ساعت تهران)
 * ۲. localStorage
 * ۳. کوکی (برای زمانی که localStorage در دسترس نیست)
 */
export const themeInitScript = `(function () {
  try {
    var root = document.documentElement;
    var theme = null;
    var isAuto = false;

    try {
      theme = window.localStorage.getItem("${THEME_STORAGE_KEY}");
      isAuto = window.localStorage.getItem("${THEME_AUTO_STORAGE_KEY}") === "true";
    } catch (error) {}

    if (!theme) {
      var match = document.cookie.match(/(?:^|; )${THEME_COOKIE_NAME}=([^;]+)/);
      if (match) {
        theme = decodeURIComponent(match[1]);
      }
    }

    if (isAuto) {
      var hour = 0;
      try {
        hour = parseInt(
          new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Tehran",
            hour: "2-digit",
            hour12: false
          }).format(new Date()),
          10
        );
      } catch (error) {
        hour = 0;
      }

      if (hour >= 6 && hour < 17) {
        theme = "light";
      } else if (hour >= 17 && hour < 20) {
        theme = "afternoon";
      } else {
        theme = "dark";
      }
    }

    if (theme !== "light" && theme !== "dark" && theme !== "afternoon") {
      theme = "${DEFAULT_THEME}";
    }

    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
    root.style.backgroundColor =
      theme === "dark"
        ? "${THEME_BACKGROUND_COLORS.dark}"
        : theme === "afternoon"
          ? "${THEME_BACKGROUND_COLORS.afternoon}"
          : "${THEME_BACKGROUND_COLORS.light}";

    // همگام‌سازی کوکی با تم واقعیِ اعمال‌شده تا رندر سروری بعدی بدون پرش باشد
    document.cookie =
      "${THEME_COOKIE_NAME}=" + theme + "; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax";
  } catch (error) {}
})();`;

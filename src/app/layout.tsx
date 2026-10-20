import {ReactNode} from "react";
import "./globals.css";
import type {Metadata} from "next";
import {cookies} from "next/headers";
import {NextIntlClientProvider} from "next-intl";
import {vazirFont, geistFont} from "@/core/fonts";
import {
    DEFAULT_THEME,
    THEME_BACKGROUND_COLORS,
    THEME_COOKIE_NAME,
    isThemeType,
    themeInitScript,
} from "@/core/theme";
import {getLocale, getMessages, getTranslations, setRequestLocale} from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function RootLayout({children}: Readonly<{ children: ReactNode; }>) {

    // زبان فعلی را از next-intl می‌گیریم (fa یا en)
    const locale = await getLocale();

    // این خط لازم است تا در Server Components هم locale درست باشد
    setRequestLocale(locale);

    // پیام‌های همان زبان (fa.json یا en.json)
    const messages = await getMessages();
    const dir = locale === "fa" ? "rtl" : "ltr";

    // خواندن تم ذخیره‌شده از کوکی تا سرور هم در همان رندر اول، تم صحیح را روی html قرار دهد.
    // این کار همراه با اسکریپت همگام پایین، از پرش رنگ تم (Theme Flash) در تغییر زبان جلوگیری می‌کند.
    const cookieStore = await cookies();
    const savedTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;
    const initialTheme = isThemeType(savedTheme) ? savedTheme : DEFAULT_THEME;

    return (
        <html
            dir={dir}
            lang={locale}
            data-theme={initialTheme}
            suppressHydrationWarning // <-- تغییر تم توسط اسکریپت همگام پایین مجاز است
            className={`${vazirFont.variable} ${geistFont.variable} ${initialTheme === "dark" ? "dark" : ""} h-full antialiased`}
            style={{
                colorScheme: initialTheme === "dark" ? "dark" : "light",
                backgroundColor: THEME_BACKGROUND_COLORS[initialTheme],
            }}
        >
        <head>
            {/* اسکریپت همگام تم: باید به صورت inline ساده (نه next/script) باشد تا
                پیش از اولین رنگ‌آمیزی مرورگر اجرا شود و از پرش رنگ جلوگیری کند. */}
            <script
                id="theme-init"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{__html: themeInitScript}}
            />
            {/* تگ تایتل دستی حذف شد تا با شیء metadata تداخل پیدا نکند */}
        </head>

        <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}

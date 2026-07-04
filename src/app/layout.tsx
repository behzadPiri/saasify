import {ReactNode} from "react";
import "./globals.css";
import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {vazirFont, geistFont} from "@/core/fonts";
import {getLocale, getMessages, setRequestLocale} from "@/i18n/server";

export const metadata: Metadata = {
    title: "SaaSify Platform",
    description: "Advanced SaaS Management Dashboard",
};

export default async function RootLayout({children}: Readonly<{ children: ReactNode; }>) {

    // زبان فعلی را از next-intl می‌گیریم (fa یا en)
    const locale = await getLocale();

    // این خط لازم است تا در Server Components هم locale درست باشد
    setRequestLocale(locale);

    // پیام‌های همان زبان (fa.json یا en.json)
    const messages = await getMessages();
    const dir = locale === "fa" ? "rtl" : "ltr";

    return (
        <html
            dir={dir}
            lang={locale}
            suppressHydrationWarning // <-- این دستور به ری‌آکت می‌گوید تغییرات تم توسط اسکریپت پایین قانونی است
            className={`${vazirFont.variable} ${geistFont.variable} h-full antialiased`}
        >
        <head>
            {/* این اسکریپت کوچک قبل از بالا آمدن بدنه سایت، تم را هماهنگ می‌کند */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              try {
                var savedTheme = localStorage.getItem("saasify-theme");
                if (savedTheme) {
                  document.documentElement.setAttribute("data-theme", savedTheme);
                }
              } catch (e) {}
            `,
                }}
            />
            {/* تگ تایتل دستی حذف شد تا با شیء metadata تداخل پیدا نکند */}
        </head>

        <body className="min-h-full flex flex-col bg-background text-foreground" >
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
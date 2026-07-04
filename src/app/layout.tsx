import { ReactNode } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { vazirFont, geistFont } from "@/core/fonts";

export const metadata: Metadata = {
    title: "SaaSify Platform",
    description: "Advanced SaaS Management Dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <html
            lang="fa"
            dir="rtl"
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

        </head>

        <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        </body>
        </html>
    );
}
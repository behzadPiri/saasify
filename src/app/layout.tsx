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
            lang="en"
            dir="ltr"
            data-theme="light"
            className={`${vazirFont.variable} ${geistFont.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        </body>
        </html>
    );
}
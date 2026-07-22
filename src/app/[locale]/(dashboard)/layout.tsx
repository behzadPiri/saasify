/**
 * لایوت اصلی داشبورد
 * شامل هدر شیشه‌ای، سایدبار جمع‌شونده و محتوای صفحات است
 * SidebarProvider state جمع/باز بودن سایدبار را مدیریت می‌کند
 */

import {ReactNode} from "react";
import {Header} from "@/features/header";
import {Sidebar, SidebarProvider} from "@/features";

export default function DashboardLayout({children}: Readonly<{children: ReactNode}>) {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            <Header/>
            <SidebarProvider>
                <div className="flex flex-1 min-h-0 gap-6 p-4">
                    <Sidebar/>
                    <main
                        className="flex-1 min-h-0 overflow-y-auto rounded-3xl bg-card/40 backdrop-blur-xl border border-border/40 p-6 shadow-xl scrollbar-none"
                    >
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}

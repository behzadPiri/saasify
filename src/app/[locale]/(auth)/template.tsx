import {ReactNode} from "react";

/**
 * قالب گروه مسیر (auth)
 *
 * این فایل بین لایوت ریشه و صفحات احراز هویت رندر می‌شود. نکست با هر جابجایی
 * بین صفحات این گروه (مثلاً /login و /register) یک key یکتا به قالب می‌دهد؛
 * بنابراین کل زیردرخت از نو mount می‌شود و state فرم‌ها ریست می‌شود.
 *
 * ظاهر: یک پوسته‌ی مینیمال، تمام‌صفحه و وسط‌چین بدون سایدبار، هدر یا المان‌های
 * داشبورد تا فرم ورود/ثبت‌نام در تمرکز کامل نمایش داده شود.
 */
export default function AuthTemplate({children}: Readonly<{children: ReactNode}>) {
    return (
        <div
            className="relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12"
        >
            {/* هاله‌های تزئینی پس‌زمینه؛ در حالت کاهش انیمیشن نیز ثابت هستند */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute -top-32 -start-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"/>
                <div
                    className="absolute -bottom-32 -end-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl sm:h-96 sm:w-96"/>
            </div>

            {/*
             * انیمیشن ورود نرم در هر بار mount شدن قالب اجرا می‌شود.
             * از کی‌فریم slideUp موجود در globals.css استفاده می‌کند و برای
             * کاربرانی که prefers-reduced-motion دارند غیرفعال می‌شود.
             */}
            <div className="w-full max-w-md motion-safe:animate-[slideUp_0.5s_ease-out] motion-reduce:animate-none">
                {children}
            </div>
        </div>
    );
}

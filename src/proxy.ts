// import { routing } from "./i18n/routing";
// import createMiddleware from "next-intl/middleware";
// import { NextRequest, NextResponse } from "next/server";
//
// // ۱. ساخت میدل‌ور استاندارد پکیج که کار شماره ۱ و ۳ را خودش به صورت نیتیو و بدون باگ هندل می‌کند
// const intlMiddleware = createMiddleware(routing);
//
// export default function proxy(req: NextRequest) {
//     const { pathname } = req.nextUrl;
//     const firstSegment = pathname.split("/")[1]; // "", "en", "fa", "fr", ...
//
//     const supportedLocales = routing.locales as readonly string[];
//
//     // ۲. کار شماره ۲: اگر سگمنت اول دوحرفی بود ولی جزو زبان‌های ما نبود (مثل /ar) → ریدایرکت به ریشه
//     if (
//         firstSegment &&
//         firstSegment.length === 2 &&
//         !supportedLocales.includes(firstSegment)
//     ) {
//         const url = req.nextUrl.clone();
//         url.pathname = "/";
//         return NextResponse.redirect(url);
//     }
//
//     // ۳. کار شماره ۱ و ۳: بقیه حالت‌ها (حذف خودکار /fa، بررسی کوکی‌ها و زبان‌ها) کاملاً به هسته پکیج سپرده می‌شود
//     return intlMiddleware(req);
// }
//
// export const config = {
//     // مچر استاندارد برای پوشش صفحات داشبورد و روت‌ها
//     matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// };


import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authSecret, sessionCookieName, useSecureCookies } from "@/auth";

const intlMiddleware = createMiddleware(routing);

// لیست مسیرهای خصوصی که نیاز به لاگین دارند
const protectedRoutes = ["/dashboard", "/settings", "/billing", "/notifications", "/analytics", "/activity"];

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const firstSegment = pathname.split("/")[1];

    const supportedLocales = routing.locales as readonly string[];

    // بررسی زبان‌های نامعتبر
    if (
        firstSegment &&
        firstSegment.length === 2 &&
        !supportedLocales.includes(firstSegment)
    ) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    const locale = supportedLocales.includes(firstSegment) ? firstSegment : routing.defaultLocale;

    const pathWithoutLocale = supportedLocales.includes(firstSegment)
        ? pathname.replace(`/${firstSegment}`, "") || "/"
        : pathname;

    // 🔥 پاس دادن همان secret و نام کوکیِ کانفیگ NextAuth به getToken
    // تا کوکی نشست (در حالت HTTP لوکال بدون پیشوند __Secure-) درست خوانده شود
    const token = await getToken({
        req,
        secret: authSecret,
        secureCookie: useSecureCookies,
        cookieName: sessionCookieName,
    });
    const isAuthenticated = !!token;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathWithoutLocale.startsWith(route)
    );

    // ۱. اگر کاربر لاگین نکرده و می‌خواهد وارد صفحه خصوصی شود -> ریدایرکت به لاگین
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = `/${locale}/login`;
        return NextResponse.redirect(loginUrl);
    }

    // ۲. اگر کاربر لاگین کرده و می‌خواهد صفحه لاگین را باز کند -> هدایت به داشبورد
    if (pathWithoutLocale.startsWith("/login") && isAuthenticated) {
        const dashboardUrl = req.nextUrl.clone();
        dashboardUrl.pathname = `/${locale}/dashboard`;
        return NextResponse.redirect(dashboardUrl);
    }

    // ۳. ادامه پردازش ترجمه‌ها توسط next-intl
    return intlMiddleware(req);
}

export const config = {
    matcher: ["/", "/(fa|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
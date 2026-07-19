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

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const firstSegment = pathname.split("/")[1];

    const supportedLocales = routing.locales as readonly string[];

    // اگر سگمنت اول دو حرفی بود اما در زبان‌های پشتیبانی شده نبود (مثل /ar)
    if (
        firstSegment &&
        firstSegment.length === 2 &&
        !supportedLocales.includes(firstSegment)
    ) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // سپردن مابقی کارها به میدل‌ور نیتیو پکیج (که حالا کوکی‌ها را هم می‌خواند)
    return intlMiddleware(req);
}

export const config = {
    // مچر استاندارد توصیه شده توسط next-intl
    matcher: ["/", "/(fa|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
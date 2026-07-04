import {routing} from "./i18n/routing";
import createMiddleware from "next-intl/middleware";
import {NextRequest, NextResponse} from "next/server";

// middleware اصلی next-intl
const intlMiddleware = createMiddleware(routing /* می‌تونیم اینجا config اضافه کنیم */);

export default function proxy(req: NextRequest) {
    const {pathname} = req.nextUrl;

    // "/", "/en", "/fa/dashboard", "/ar/..."
    const firstSegment = pathname.split("/")[1]; // "", "en", "fa", "ar", ...

    const supportedLocales = routing.locales as readonly string[]; // ["fa","en"]
    const defaultLocale = routing.defaultLocale as string;        // "fa"

    // 1) اگر /fa یا /fa/... بود → همیشه به نسخه بدون fa ریدایرکت کن
    if (firstSegment === defaultLocale) {
        const url = req.nextUrl.clone();
        // /fa         → /
        // /fa/page    → /page
        url.pathname = pathname.replace(/^\/fa(\/|$)/, "/");
        return NextResponse.redirect(url);
    }

    // 2) اگر سگمنت اول دوحرفی بود، ولی تو لیست ما نبود (مثلاً /ar, /de, /xx)
    if (
        firstSegment &&
        firstSegment.length === 2 &&
        !supportedLocales.includes(firstSegment)
    ) {
        const url = req.nextUrl.clone();
        url.pathname = "/"; // همیشه بفرست روی فارسی
        return NextResponse.redirect(url);
    }

    // 3) بقیه‌ی حالت‌ها رو بسپار به next-intl
    return intlMiddleware(req);
}

export const config = {
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

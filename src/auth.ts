import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * آدرس پایهٔ برنامه؛ هم نام‌گذاری نسخهٔ ۴ (`NEXTAUTH_URL`) و هم
 * نام‌گذاری جدید (`AUTH_URL`) پشتیبانی می‌شود.
 */
const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;

/**
 * کلید مشترک رمزنگاری/امضای توکن نشست.
 * این مقدار باید هم در کانفیگ NextAuth (برای نوشتن/رمزنگاری توکن) و هم در
 * `getToken` داخل میدل‌ور (برای خواندن/رمزگشایی توکن) دقیقاً یکسان باشد؛
 * در غیر این صورت `getToken` مقدار `null` برمی‌گرداند و کاربر فکر می‌کند لاگین نشده است.
 */
export const authSecret =
    process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "dev-secret";

/**
 * تعیین حالت Secure کوکی‌ها.
 * در محیط HTTP لوکال این مقدار `false` است تا نام کوکی
 * `next-auth.session-token` (بدون پیشوند `__Secure-`) استفاده و به‌درستی خوانده شود.
 */
export const useSecureCookies =
    authUrl?.startsWith("https://") ?? !!process.env.VERCEL;

/**
 * نام کوکی نشست، دقیقاً مطابق خروجی `defaultCookies` در NextAuth.
 */
export const sessionCookieName = `${
    useSecureCookies ? "__Secure-" : ""
}next-auth.session-token`;

/**
 * کاربران نمونه (Mock) برای احراز هویت
 */
const MOCK_USERS = [
    { id: "1", email: "admin@example.com", password: "123456", name: "Admin" },
];

/**
 * تنظیمات مشترک NextAuth
 */
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = MOCK_USERS.find(
                    (u) =>
                        u.email === credentials?.email &&
                        u.password === credentials?.password
                );
                if (!user) return null;
                return { id: user.id, email: user.email, name: user.name };
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    secret: authSecret,
    useSecureCookies,
};

import NextAuth from "next-auth";
import { authOptions } from "@/auth";

/**
 * مسیر API احراز هویت NextAuth
 * تنظیمات مشترک در `src/auth.ts` نگهداری می‌شود تا `secret` و کوکی‌ها
 * با میدل‌ور (`src/proxy.ts`) هماهنگ باشند.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

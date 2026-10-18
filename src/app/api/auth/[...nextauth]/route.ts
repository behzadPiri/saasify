import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * کاربران نمونه (Mock) برای احراز هویت
 */
const MOCK_USERS = [
    { id: "1", email: "admin@example.com", password: "123456", name: "Admin" },
];

/**
 * تنظیمات NextAuth
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
    secret: process.env.NEXTAUTH_SECRET || "dev-secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

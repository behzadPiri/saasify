import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// این مسیر مهمه: چون i18n/request.ts را به next-intl معرفی می‌کنه
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withNextIntl(nextConfig);

/**
 * صفحه پروفایل کاربری - تنظیمات اطلاعات شخصی و امنیت حساب
 */

import { getTranslations } from "@/i18n/server";

export default async function ProfilePage() {
    const t = await getTranslations("Settings");
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t("profileSettings")}</h1>
            <p className="text-muted-foreground">{t("profileSettingsDescription")}</p>
        </div>
    );
}

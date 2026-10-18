/**
 * صفحه تنظیمات عمومی - تنظیمات تم، زبان و ترجیحات پنل
 */

import { getTranslations } from "@/i18n/server";

export default async function GeneralSettingsPage() {
    const t = await getTranslations("Settings");
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t("generalSettings")}</h1>
            <p className="text-muted-foreground">{t("generalSettingsDescription")}</p>
        </div>
    );
}

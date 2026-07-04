import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
    locales: ["fa", "en", "fr"],
    defaultLocale: "fa",
    localePrefix: "as-needed", // / → fa , /en → en
    localeDetection: false
});

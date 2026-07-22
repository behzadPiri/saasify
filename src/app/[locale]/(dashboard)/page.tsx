/**
 * صفحه روت داشبورد - ریدایرکت به /dashboard
 */

import {getLocale} from "@/i18n/server";
import {redirect} from "@/i18n/navigation";


export default async function Page() {
    const locale = await getLocale();
    redirect({href: '/dashboard', locale: locale});
};
import {getLocale} from "@/i18n/server";
import {redirect} from "@/i18n/navigation";


export default async function Page() {
    const locale = await getLocale();
    console.log({locale});
    redirect({href: '/dashboard', locale: locale});
};
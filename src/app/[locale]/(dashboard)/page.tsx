import {redirect} from "@/i18n/navigation";
import {getLocale} from "@/i18n/server";


export default async function Page() {
    const locale = await getLocale();
    console.log({locale});
    return redirect({href: "/dashboard", locale: locale});
};
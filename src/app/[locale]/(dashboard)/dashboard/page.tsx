import {ThemeSwitcher, LanguageSwitcher} from "@/shared/components";


export default function Dashboard() {
    return (
        <div className="flex  w-screen ">
            <ThemeSwitcher/>

            <LanguageSwitcher/>
        </div>
    );
};
import {ThemeSwitcher} from "@/shared/components/ThemeSwitcher";

export default function Home() {


    return (
        <div className="p-10 space-y-6">
            <h1 className="text-2xl font-bold">آموزش تم هوشمند اتوماتیک</h1>
            <ThemeSwitcher />
        </div>
    );
}
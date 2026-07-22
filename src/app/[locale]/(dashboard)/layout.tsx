import {ReactNode} from "react";
import {Header} from "@/features/header";


export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <main>
            <Header/>
            {children}
        </main>
    );
}
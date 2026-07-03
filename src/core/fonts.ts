import localFont from "next/font/local";

// ۱. تنظیم فونت فارسی (وزیر متن با اعداد فارسی)
export const vazirFont = localFont({
    src: [
        {
            path: "../../public/fonts/Vazir-FD-WOL.woff2",
            weight: "400",
            style: "normal",

        },
        {
            path: "../../public/fonts/Vazir-Bold-FD-WOL.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-vazir",
    display: 'swap'
});

// ۲. تنظیم فونت انگلیسی مدرن (Geist)
export const geistFont = localFont({
    src: [
        {
            path: "../../public/fonts/Geist-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/Geist-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-geist",
    display: 'swap'
});
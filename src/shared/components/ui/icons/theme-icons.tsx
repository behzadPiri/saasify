import {IconProps} from "./types";

export const Sun = ({size = 20, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="4"/>
        <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
);

export const Moon = ({size = 20, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
);

export const Sunset = ({size = 20, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M6.34 17.66l-1.41 1.41"/>
        <path d="M22 22H2M16 14a4 4 0 0 0-8 0"/>
    </svg>
);

// آیکون اتوماتیک: نیمکت دایره + فلش چرخشی + آفتاب/ماه نیمه‌نیمه
export const Auto = ({size = 20, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {/* دایره اصلی */}
        <circle cx="12" cy="12" r="10"/>
        {/* فلش چرخشی (синک/اتوماتیک) */}
        <path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20"/>
        <path d="M18 7l-3-3-3 3M6 17l3 3 3-3"/>
        {/* نیم آفتاب (بالا) و نیم ماه (پایین) */}
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" opacity="0.2"/>
    </svg>
);
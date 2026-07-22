import {IconProps} from "@/shared/components/ui/icons/types";

export const Check = ({size = 16, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

export const Arrow = ({size = 16, ...props}: IconProps) => (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
    </svg>
);

export const ArrowLeft = ({size = 16, ...props}: IconProps) => (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
    </svg>
);

// آیکون جستجو
export const Search = ({size = 18, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
    </svg>
);

// آیکون بسته شدن (X)
export const X = ({size = 20, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
);

// آیکون منو همبرگری
export const Menu = ({size = 20, ...props}: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="4" x2="20" y1="12" y2="12"/>
        <line x1="4" x2="20" y1="6" y2="6"/>
        <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
);

// آیکون تیک فعال (Checked) - کاملاً استاندارد و ریسپانسیو
export const CheckBox = ({className, ...props}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

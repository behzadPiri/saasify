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

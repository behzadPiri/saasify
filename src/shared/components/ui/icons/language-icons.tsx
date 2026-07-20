// آیکون تیک تایید برای زبان فعال
import {IconProps} from "@/shared/components/ui/icons/types";

// پرچم ایران (وکتور مینی‌مال)
export const FlagIr = ({ size = 20, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 16" {...props}>
        <rect width="24" height="16" fill="#FFF"/>
        <rect width="24" height="5.33" fill="#228B22"/>
        <rect width="24" height="5.33" y="10.67" fill="#DA251D"/>
        {/* نشان وسط پرچم به صورت مینی‌مال */}
        <circle cx="12" cy="8" r="1.5" fill="#DA251D" />
    </svg>
);

// پرچم انگلیس/آمریکا (وکتور مینی‌مال جهانی)
export const FlagEn = ({ size = 20, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 16" {...props}>
        <rect width="24" height="16" fill="#0A192F"/>
        <path d="M0 0l24 16M24 0L0 16M12 0v16M0 8h24" stroke="#FFF" strokeWidth="2"/>
        <path d="M0 0l24 16M24 0L0 16M12 0v16M0 8h24" stroke="#B22222" strokeWidth="1.2"/>
    </svg>
);
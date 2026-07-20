import { SVGProps } from "react";

// این تایپ باعث می‌شود تمام آیکون‌ها رفتاری کاملاً شبیه به یک تگ svg بومی داشته باشند
export type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string; // امکان پاس دادن سایز سریع مثل size={24}
};
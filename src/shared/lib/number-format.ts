/**
 * کمکی برای فرمت‌بندی اعداد
 * همیشه از اعداد لاتین استفاده می‌کند (برای هر دو زبان)
 */

export function useNumberFormat() {
    return (value: number, options?: Intl.NumberFormatOptions): string => {
        return new Intl.NumberFormat("en-US", options).format(value);
    };
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatCurrency(value: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatCompactNumber(value: number): string {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(value);
}
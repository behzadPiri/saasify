"use client";

/**
 * هوک مشترک انیمیشن ورود
 * پیشرفت نرم (با easing) از ۰ تا ۱ که برای نمودارها و نوارهای پیشرفت استفاده می‌شود
 * با تغییر `key` انیمیشن از ابتدا اجرا می‌شود
 */

import {useEffect, useRef, useState} from "react";

interface ProgressAnimationOptions {
    /** مدت زمان انیمیشن به میلی‌ثانیه */
    duration?: number;
    /** غیرفعال کردن انیمیشن (مقدار نهایی ۱ بازگردانده می‌شود) */
    enabled?: boolean;
    /** تابع نرم‌سازی (باید پایدار باشد) */
    easing?: (t: number) => number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useProgressAnimation(key: string | number, options: ProgressAnimationOptions = {}): number {
    const {duration = 1000, enabled = true, easing = easeOutCubic} = options;
    const [progress, setProgress] = useState<number>(() => (enabled ? 0 : 1));
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!enabled) return;

        let startTime: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const eased = easing(Math.min(elapsed / duration, 1));
            setProgress(eased);

            if (elapsed < duration) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [key, duration, enabled, easing]);

    return progress;
}

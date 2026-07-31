// هوک جستجو - نسخه قبلی (غیرفعال)
// این نسخه از expandedRef برای جلوگیری از closure استفاده می‌کند
// نسخه فعلی در خط 60 به بعد قرار دارد


/**
 * هوک مدیریت جستجوی سراسری برنامه
 * شامل state و توابع مورد نیاز نوار جستجو:
 * - متن جستجو (query)
 * - باز/بسته بودن پوشش جستجوی موبایل (isExpanded)
 * - ارسال فرم جستجو با Enter
 * - شورتکات ⌘K / Ctrl+K برای باز کردن سریع جستجو
 * - شورتکات Escape برای بستن و پاک کردن
 * - فوکوس خودکار روی اینپوت هنگام باز شدن در موبایل
 */

"use client";

import  { useState, useCallback, useRef, useEffect,FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";

/**
 * هوک اصلی جستجو - state و توابع مورد نیاز نوار جستجو را فراهم می‌کند
 * @returns اbj شامل query, setQuery, isExpanded, inputRef, handleSearch, toggleExpand, closeExpand
 */
export function useSearch() {
  // متن جستجوی کاربر
  const [query, setQuery] = useState("");
  // آیا پوشش جستجوی موبایل باز است؟ (فقط در صفحه‌نمایش کوچک)
  const [isExpanded, setIsExpanded] = useState(false);
  // رفرنس به اینپوت جستجو برای فوکوس خودکار
  const inputRef = useRef<HTMLInputElement>(null);
  // روتر next-intl برای ناوبری به صفحه نتایج جستجو
  const router = useRouter();

  // تابع handleSearch: هندل کردن ارسال فرم جستجو با Enter
  // اگر متن خالی نباشد، به صفحه نتایج جستجو ریدایرکت می‌کند
  const handleSearch = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
          // ریدایرکت به صفحه جستجو با پارامتر q
          router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
          setIsExpanded(false);
        }
      },
      [query, router]
  );

  // اثر ۱: مدیریت کلیدهای میانبر (Ctrl+K / Cmd+K و Escape)
  // با useCapture: true در مرحله capture گرفته می‌شود تا قبل از سایر listenerها اجرا شود
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // شورتکات Ctrl+K یا Cmd+K: باز کردن سریع جستجو
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        e.stopPropagation();

        // در دسکتاپ: فوکوس روی اینپوت
        // در موبایل: باز کردن پوشش جستجو
        if (window.innerWidth >= 768) {
          inputRef.current?.focus();
        } else {
          setIsExpanded(true);
        }
      }

      // کلید Escape: بستن پوشش جستجو و پاک کردن متن
      if (e.key === "Escape") {
        setIsExpanded(false);
        setQuery("");
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  // اثر ۲: فوکوس خودکار روی اینپوت به محض باز شدن پوشش جستجو در موبایل
  // با وقفه کوتاه (50ms) جهت اطمینان از رندر کامل DOM
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // تابع toggleExpand: باز/بسته کردن پوشش جستجوی موبایل
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // تابع closeExpand: بستن پوشش جستجو و پاک کردن متن جستجو
  const closeExpand = useCallback(() => {
    setIsExpanded(false);
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    isExpanded,
    inputRef,
    handleSearch,
    toggleExpand,
    closeExpand,
  };
}
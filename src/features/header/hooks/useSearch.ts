// "use client";
//
// import { useState, useCallback, useRef, useEffect } from "react";
// import { useRouter } from "@/i18n/navigation";
//
// export function useSearch() {
//   const [query, setQuery] = useState("");
//   const [isExpanded, setIsExpanded] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const expandedRef = useRef(false);
//
//   expandedRef.current = isExpanded;
//
//   const handleSearch = useCallback(
//     (e: React.FormEvent) => {
//       e.preventDefault();
//       if (query.trim()) {
//         router.push(`/search?q=${encodeURIComponent(query.trim())}`);
//         setIsExpanded(false);
//       }
//     },
//     [query, router],
//   );
//
//   useEffect(() => {
//     function onKey(e: KeyboardEvent) {
//       if ((e.metaKey || e.ctrlKey) && e.code === "KeyK") {
//         e.preventDefault();
//         e.stopPropagation();
//         if (window.innerWidth >= 768) {
//           inputRef.current?.focus();
//         } else {
//           setIsExpanded(true);
//         }
//       }
//       if (e.key === "Escape" && expandedRef.current) {
//         setIsExpanded(false);
//         setQuery("");
//       }
//     }
//     document.addEventListener("keydown", onKey, true);
//     return () => document.removeEventListener("keydown", onKey, true);
//   }, []);
//
//   useEffect(() => {
//     if (isExpanded) inputRef.current?.focus();
//   }, [isExpanded]);
//
//   const toggleExpand = useCallback(() => setIsExpanded((v) => !v), []);
//   const closeExpand = useCallback(() => {
//     setIsExpanded(false);
//     setQuery("");
//   }, []);
//
//   return { query, setQuery, isExpanded, inputRef, handleSearch, toggleExpand, closeExpand };
// }


"use client";

import  { useState, useCallback, useRef, useEffect,FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ۱. هندل کردن ارسال فرم جستجو
  const handleSearch = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
          router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
          setIsExpanded(false);
        }
      },
      [query, router]
  );

  // ۲. مدیریت کلیدهای میانبر (Ctrl+K / Cmd+K و Escape)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // شورتکات Ctrl+K یا Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        e.stopPropagation();

        if (window.innerWidth >= 768) {
          inputRef.current?.focus();
        } else {
          setIsExpanded(true);
        }
      }

      // کلید Escape برای بستن/پاک کردن
      if (e.key === "Escape") {
        setIsExpanded(false);
        setQuery("");
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  // ۳. فوکوس روی اینپوت به محض باز شدن در موبایل (با وقفه کوتاه جهت اطمینان از رندر DOM)
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

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
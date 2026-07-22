"use client";

import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import { ThemeSwitcher, LanguageSwitcher } from "@/shared/components";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * منوی کشویی موبایل (Drawer)
 * - RTL: از چپ باز می‌شود (fa)
 * - LTR: از راست باز می‌شود (en)
 * - شامل overlay تیره + انیمیشن اسلاید
 */
export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const locale = useLocale();
  const isRtl = locale === "fa";
  const t=useTranslations("header")

  return (
    <>
      {/* Overlay پس‌زمینه تیره */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/*Drawer ناوبری*/}
      <div
        className={`fixed top-0 z-50 h-full w-72 bg-card/95 backdrop-blur-xl border-border shadow-2xl md:hidden transform transition-transform duration-300 ease-in-out ${
          isRtl ? "left-0 border-l" : "right-0 border-r"
        } ${isOpen ? "translate-x-0" : isRtl ? "-translate-x-full" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label={t("navMenu")}
      >
        <div className={`flex flex-col h-full p-6 rtl:text-right ltr:text-left`}>
          {/* دکمه بستن دراو */}
          <div className={`flex ${isRtl ? "justify-start" : "justify-end"} mb-8`}>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label={t("closeMenu")}
            >
              <Icons.X size={20} />
            </button>
          </div>

          {/* محتوای دراو: تنظیمات + کپی‌رایت */}
          <div className="flex flex-col items-center justify-center flex-1 gap-8">

            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

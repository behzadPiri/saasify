"use client";

/**
 * هوک اختصاصی نمایش یک اعلان (ViewModel آیتم)
 * تمام متن‌های ترجمه‌شده، پیکربندی آیکون/رنگ و زمان نسبی را برای یک اعلان آماده می‌کند
 * تا کامپوننت آیتم فقط داده‌های آماده را رندر کند.
 */

import {useMemo} from "react";
import type {ComponentType} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Icons} from "@/shared/components/ui/icons";
import type {IconProps} from "@/shared/components/ui/icons/types";
import {NOTIFICATION_TYPE_STYLES} from "../constants";
import {formatRelativeTime} from "../lib/format-relative-time";
import type {NotificationItem} from "../types";

/** خروجی هوک نمایش اعلان */
export interface UseNotificationItemReturn {
  /** آیکون مربوط به نوع اعلان */
  Icon: ComponentType<IconProps>;
  /** پیکربندی رنگ/آیکون نوع اعلان */
  typeStyle: (typeof NOTIFICATION_TYPE_STYLES)[NotificationItem["type"]];
  /** عنوان ترجمه‌شده */
  title: string;
  /** توضیحات ترجمه‌شده */
  description: string;
  /** برچسب دسته ترجمه‌شده */
  tag: string;
  /** متن زمان نسبی آماده نمایش */
  timeLabel: string;
  /** برچسب وضعیت (خوانده‌شده/خوانده‌نشده) */
  statusLabel: string;
}

/**
 * آماده‌سازی داده نمایشی یک اعلان
 * @param item اعلان خام (با کلیدهای ترجمه)
 * @returns محتوای ترجمه‌شده، آیکون، پیکربندی رنگ و زمان نسبی
 */
export function useNotificationItem(item: NotificationItem): UseNotificationItemReturn {
  const t = useTranslations("Notifications");
  const locale = useLocale();

  const typeStyle = NOTIFICATION_TYPE_STYLES[item.type];
  const Icon = Icons[typeStyle.icon];

  // زمان نسبی وابسته به زبان است؛ memo تا با هر رندر دوباره فرمت نشود.
  const timeLabel = useMemo(
    () => formatRelativeTime(item.timestamp, locale),
    [item.timestamp, locale],
  );

  return {
    Icon,
    typeStyle,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    tag: t(item.tagKey),
    timeLabel,
    statusLabel: item.read ? t("read") : t("unread"),
  };
}

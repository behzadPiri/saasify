/**
 * @file analytics.types.ts
 * @description تعریف انواع داده‌ها، اینترفیس‌ها و تایپ‌های مرتبط با ماژول تحلیلی و آمار (Analytics).
 * شامل بازه‌های زمانی، متریک‌های کلیدی، داده‌های سری زمانی، توزیع پروژه‌ها و جدول صفحات برتر.
 */

import { Icons } from "@/shared/components/ui/icons";

/**
 * بازه‌های زمانی قابل انتخاب در فیلتر تحلیلی سامانه
 */
export type AnalyticsTimeRange = "today" | "7d" | "30d" | "90d" | "12m";

/**
 * جهت روند تغییرات متریک (صعودی، نزولی یا خنثی)
 */
export type MetricTrendDirection = "up" | "down" | "neutral";

/**
 * تم رنگی کارت‌های شاخص آماری
 */
export type MetricVariant = "primary" | "success" | "warning" | "danger" | "purple" | "sky";

/**
 * اینترفیس کارت شاخص کلیدی عملکرد (KPI Metric Card)
 */
export interface AnalyticsMetricItem {
  /** شناسه منحصربه‌فرد متریک */
  id: string;
  /** کلید ترجمه عنوان در فایل‌های i18n */
  titleKey: string;
  /** مقدار عددی خام متریک */
  value: number;
  /** درصد تغییر نسبت به دوره قبل */
  changePercent: number;
  /** جهت روند تغییرات */
  trend: MetricTrendDirection;
  /** نوع قالب‌بندی مقدار (ارز، درصد، عدد، مدت زمان) */
  formatType: "currency" | "percent" | "number" | "duration";
  /** نام آیکون مرتبط از کتابخانه آیکون‌ها */
  icon: keyof typeof Icons;
  /** نوع رنگ‌بندی کارت */
  variant: MetricVariant;
}

/**
 * ساختار نقطه داده در نمودارهای سری زمانی
 */
export interface TimeSeriesPoint {
  /** برچسب محور افقی (مثلاً نام ماه یا روز) */
  label: string;
  /** مقدار اصلی سری اول (مثلاً درآمد ناخالص) */
  primaryValue: number;
  /** مقدار فرعی سری دوم (مثلاً سود خالص) */
  secondaryValue?: number;
}

/**
 * ساختار نقطه داده در نمودار توزیع پروژه‌ها (مشابه داشبورد)
 */
export interface ProjectDistributionItem {
  /** برچسب وضعیت (active, completed, onHold, archived) */
  label: string;
  /** مقدار عددی */
  value: number;
}

/**
 * ساختار مرحله در قیف تبدیل کاربران (Conversion Funnel)
 */
export interface FunnelStepItem {
  /** شناسه مرحله */
  id: string;
  /** نام یا کلید ترجمه مرحله */
  stepNameKey: string;
  /** تعداد بازدیدکنندگان در این مرحله */
  visitorsCount: number;
  /** درصد تبدیل نسبت به ورودی اولیه */
  conversionRate: number;
  /** درصد ریزش در این مرحله */
  dropoffRate: number;
}

/**
 * ساختار سطر در جدول پربازدیدترین صفحات سامانه
 */
export interface TopPageItem {
  /** مسیر URL صفحه */
  path: string;
  /** تعداد کل بازدیدهای صفحه */
  pageViews: number;
  /** تعداد بازدیدکنندگان یکتا */
  uniqueVisitors: number;
  /** میانگین زمان حضور کاربر به ثانیه */
  avgDurationSec: number;
  /** نرخ پرش صفحه به درصد */
  bounceRatePercent: number;
  /** درصد تغییر نسبت به دوره قبل */
  changePercent: number;
}

/**
 * ساختار کلی داده‌های تحلیلی دریافت شده از منبع داده
 */
export interface AnalyticsData {
  /** فهرست کارت‌های متریک برای بازه زمانی فعال */
  metrics: AnalyticsMetricItem[];
  /** داده‌های نمودار روند درآمد */
  revenueTrend: TimeSeriesPoint[];
  /** داده‌های نمودار ترافیک */
  trafficTrend: TimeSeriesPoint[];
  /** توزیع وضعیت پروژه‌ها */
  projectDistribution: ProjectDistributionItem[];
  /** مراحل قیف تبدیل */
  conversionFunnel: FunnelStepItem[];
  /** فهرست صفحات برتر سامانه */
  topPages: TopPageItem[];
}

/**
 * @file analytics.mock.ts
 * @description داده‌های ساختگی (Mock Data) برای ماژول تحلیل و آمار.
 * شامل متریک‌ها به تفکیک بازه‌های زمانی، روند درآمد، ترافیک، توزیع پروژه‌ها، قیف تبدیل و صفحات برتر.
 */

import type {
  AnalyticsMetricItem,
  TimeSeriesPoint,
  ProjectDistributionItem,
  FunnelStepItem,
  TopPageItem,
  AnalyticsTimeRange,
} from "../types/analytics.types";

/**
 * کارت‌های متریک شاخص کلیدی عملکرد (KPIs) به تفکیک بازه زمانی
 */
export const MOCK_METRIC_CARDS: Record<AnalyticsTimeRange, AnalyticsMetricItem[]> = {
  today: [
    {
      id: "revenue",
      titleKey: "totalRevenue",
      value: 14500000,
      changePercent: 12.4,
      trend: "up",
      formatType: "currency",
      icon: "DollarSign",
      variant: "primary",
    },
    {
      id: "visits",
      titleKey: "totalVisits",
      value: 4890,
      changePercent: 8.1,
      trend: "up",
      formatType: "number",
      icon: "Users",
      variant: "purple",
    },
    {
      id: "conversion",
      titleKey: "conversionRate",
      value: 4.85,
      changePercent: 0.6,
      trend: "up",
      formatType: "percent",
      icon: "TrendingUp",
      variant: "success",
    },
    {
      id: "bounce",
      titleKey: "bounceRate",
      value: 28.3,
      changePercent: -1.8,
      trend: "down",
      formatType: "percent",
      icon: "Activity",
      variant: "sky",
    },
  ],
  "7d": [
    {
      id: "revenue",
      titleKey: "totalRevenue",
      value: 86400000,
      changePercent: 15.2,
      trend: "up",
      formatType: "currency",
      icon: "DollarSign",
      variant: "primary",
    },
    {
      id: "visits",
      titleKey: "totalVisits",
      value: 34200,
      changePercent: 11.5,
      trend: "up",
      formatType: "number",
      icon: "Users",
      variant: "purple",
    },
    {
      id: "conversion",
      titleKey: "conversionRate",
      value: 5.12,
      changePercent: 1.2,
      trend: "up",
      formatType: "percent",
      icon: "TrendingUp",
      variant: "success",
    },
    {
      id: "bounce",
      titleKey: "bounceRate",
      value: 29.8,
      changePercent: -2.4,
      trend: "down",
      formatType: "percent",
      icon: "Activity",
      variant: "sky",
    },
  ],
  "30d": [
    {
      id: "revenue",
      titleKey: "totalRevenue",
      value: 348200000,
      changePercent: 18.7,
      trend: "up",
      formatType: "currency",
      icon: "DollarSign",
      variant: "primary",
    },
    {
      id: "visits",
      titleKey: "totalVisits",
      value: 142800,
      changePercent: 14.3,
      trend: "up",
      formatType: "number",
      icon: "Users",
      variant: "purple",
    },
    {
      id: "conversion",
      titleKey: "conversionRate",
      value: 5.48,
      changePercent: 1.5,
      trend: "up",
      formatType: "percent",
      icon: "TrendingUp",
      variant: "success",
    },
    {
      id: "bounce",
      titleKey: "bounceRate",
      value: 31.2,
      changePercent: -3.1,
      trend: "down",
      formatType: "percent",
      icon: "Activity",
      variant: "sky",
    },
  ],
  "90d": [
    {
      id: "revenue",
      titleKey: "totalRevenue",
      value: 980500000,
      changePercent: 24.2,
      trend: "up",
      formatType: "currency",
      icon: "DollarSign",
      variant: "primary",
    },
    {
      id: "visits",
      titleKey: "totalVisits",
      value: 412000,
      changePercent: 19.8,
      trend: "up",
      formatType: "number",
      icon: "Users",
      variant: "purple",
    },
    {
      id: "conversion",
      titleKey: "conversionRate",
      value: 5.65,
      changePercent: 2.1,
      trend: "up",
      formatType: "percent",
      icon: "TrendingUp",
      variant: "success",
    },
    {
      id: "bounce",
      titleKey: "bounceRate",
      value: 30.7,
      changePercent: -4.5,
      trend: "down",
      formatType: "percent",
      icon: "Activity",
      variant: "sky",
    },
  ],
  "12m": [
    {
      id: "revenue",
      titleKey: "totalRevenue",
      value: 3840000000,
      changePercent: 32.5,
      trend: "up",
      formatType: "currency",
      icon: "DollarSign",
      variant: "primary",
    },
    {
      id: "visits",
      titleKey: "totalVisits",
      value: 1680000,
      changePercent: 27.6,
      trend: "up",
      formatType: "number",
      icon: "Users",
      variant: "purple",
    },
    {
      id: "conversion",
      titleKey: "conversionRate",
      value: 5.92,
      changePercent: 2.8,
      trend: "up",
      formatType: "percent",
      icon: "TrendingUp",
      variant: "success",
    },
    {
      id: "bounce",
      titleKey: "bounceRate",
      value: 29.4,
      changePercent: -5.2,
      trend: "down",
      formatType: "percent",
      icon: "Activity",
      variant: "sky",
    },
  ],
};

/**
 * داده‌های روند درآمد (درآمد ناخالص و سود خالص ماهانه)
 */
export const MOCK_REVENUE_CHART: TimeSeriesPoint[] = [
  { label: "فروردین", primaryValue: 18500000, secondaryValue: 12200000 },
  { label: "اردیبهشت", primaryValue: 22100000, secondaryValue: 14800000 },
  { label: "خرداد", primaryValue: 26400000, secondaryValue: 18300000 },
  { label: "تیر", primaryValue: 24200000, secondaryValue: 16500000 },
  { label: "مرداد", primaryValue: 31800000, secondaryValue: 22400000 },
  { label: "شهریور", primaryValue: 35600000, secondaryValue: 25100000 },
  { label: "مهر", primaryValue: 33400000, secondaryValue: 23600000 },
  { label: "آبان", primaryValue: 38900000, secondaryValue: 27800000 },
  { label: "آذر", primaryValue: 42100000, secondaryValue: 30500000 },
  { label: "دی", primaryValue: 40500000, secondaryValue: 29100000 },
  { label: "بهمن", primaryValue: 46800000, secondaryValue: 34200000 },
  { label: "اسفند", primaryValue: 54200000, secondaryValue: 39800000 },
];

/**
 * داده‌های ترافیک و حجم نشست‌های کاربران به تفکیک روزهای هفته
 */
export const MOCK_TRAFFIC_CHART: TimeSeriesPoint[] = [
  { label: "شنبه", primaryValue: 14200, secondaryValue: 19800 },
  { label: "یکشنبه", primaryValue: 16800, secondaryValue: 22400 },
  { label: "دوشنبه", primaryValue: 18900, secondaryValue: 25100 },
  { label: "سه‌شنبه", primaryValue: 17400, secondaryValue: 23900 },
  { label: "چهارشنبه", primaryValue: 19500, secondaryValue: 27200 },
  { label: "پنجشنبه", primaryValue: 12300, secondaryValue: 16400 },
  { label: "جمعه", primaryValue: 9800, secondaryValue: 13100 },
];

/**
 * توزیع وضعیت پروژه‌ها (مشابه صفحه داشبورد برای سازگاری با PieChart)
 */
export const MOCK_PROJECT_DISTRIBUTION: ProjectDistributionItem[] = [
  { label: "active", value: 48 },
  { label: "completed", value: 27 },
  { label: "onHold", value: 17 },
  { label: "archived", value: 8 },
];

/**
 * مراحل قیف تبدیل کاربران (Conversion Funnel)
 */
export const MOCK_CONVERSION_FUNNEL: FunnelStepItem[] = [
  {
    id: "step-1",
    stepNameKey: "بازدید صفحه فرود",
    visitorsCount: 142800,
    conversionRate: 100,
    dropoffRate: 0,
  },
  {
    id: "step-2",
    stepNameKey: "مشاهده ویژگی‌ها و قیمت‌گذاری",
    visitorsCount: 84250,
    conversionRate: 59.0,
    dropoffRate: 41.0,
  },
  {
    id: "step-3",
    stepNameKey: "شروع ثبت‌نام رایگان",
    visitorsCount: 31400,
    conversionRate: 22.0,
    dropoffRate: 62.7,
  },
  {
    id: "step-4",
    stepNameKey: "راه‌اندازی فضای کاری",
    visitorsCount: 18200,
    conversionRate: 12.7,
    dropoffRate: 42.0,
  },
  {
    id: "step-5",
    stepNameKey: "خرید اشتراک و پرداخت نهایی",
    visitorsCount: 7825,
    conversionRate: 5.48,
    dropoffRate: 57.0,
  },
];

/**
 * فهرست پربازدیدترین صفحات سامانه
 */
export const MOCK_TOP_PAGES: TopPageItem[] = [
  {
    path: "/dashboard",
    pageViews: 68420,
    uniqueVisitors: 41200,
    avgDurationSec: 284,
    bounceRatePercent: 18.2,
    changePercent: 14.2,
  },
  {
    path: "/projects",
    pageViews: 45190,
    uniqueVisitors: 28900,
    avgDurationSec: 195,
    bounceRatePercent: 24.5,
    changePercent: 8.7,
  },
  {
    path: "/analytics",
    pageViews: 32800,
    uniqueVisitors: 19450,
    avgDurationSec: 320,
    bounceRatePercent: 14.1,
    changePercent: 22.4,
  },
  {
    path: "/billing",
    pageViews: 24650,
    uniqueVisitors: 16800,
    avgDurationSec: 145,
    bounceRatePercent: 32.8,
    changePercent: -3.5,
  },
  {
    path: "/settings",
    pageViews: 18200,
    uniqueVisitors: 12100,
    avgDurationSec: 110,
    bounceRatePercent: 38.6,
    changePercent: 4.1,
  },
];

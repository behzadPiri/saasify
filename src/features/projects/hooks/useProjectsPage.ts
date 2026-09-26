"use client";

// هوک `useProjectsPage` مسئول تمام منطق صفحهٔ پروژه‌ها است:
// - بارگذاری دادهٔ شبیه‌سازی‌شده پروژه‌ها
// - مدیریت فیلتر وضعیت، جستجو و ترتیب نمایش
// - محاسبهٔ آمار صفحه (تعداد، پروژه‌های فعال/معوق و مجموع بودجه)
// - فراهم کردن توابع کمکی مانند `createProject` و `refresh`
// هدف: جداسازی منطق از کامپوننت‌های نمایشی تا تست‌پذیری و نگهداری آسان‌تر شود.

// هوک صفحه‌ی پروژه‌ها: همه‌ی منطق بارگذاری، فیلتر، مرتب‌سازی و ایجاد پروژه‌ها
// را جدا از ویو (کامپوننت‌ها) نگه می‌دارد تا تست‌پذیری و خوانایی افزایش یابد.
// نکات:
// - داده‌ها از یک منبع mock بارگذاری می‌شوند (برای توسعه محلی).
// - فیلترها، جستجو و مرتب‌سازی در این سطح اعمال می‌شوند و کامپوننت‌ها
//   فقط مقدارهای محاسبه‌شده را دریافت می‌کنند.
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useLocale, useTranslations} from "next-intl";

import {ProjectFilterOption} from "../constants";
import {ProjectStatus, ProjectStats, ProjectSummary} from "@/features/projects";
import {createMockProjects} from "../lib/mockProjects";

// کمک‌فانکشن شبیه‌سازی تأخیر با پشتیبانی از AbortSignal برای تست و توسعه محلی
function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      {once: true}
    );
  });
}

export function useProjectsPage() {
  const locale = useLocale();
  const tCommon = useTranslations("Common");
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [statusFilter, setStatusFilter] = useState<ProjectFilterOption>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "deadline" | "budget">("recent");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [now, setNow] = useState<number | null>(null);

  // تابع بارگذاری پروژه‌ها: انجام کارهای async و ست‌کردن state
  // از میکروتسک برای آغاز وضعیت لودینگ استفاده می‌کنیم تا هشدارهای
  // synchronous setState در اثرها را کاهش دهیم.
  const fetchProjects = useCallback(
    async (signal: AbortSignal) => {
      Promise.resolve().then(() => {
        setError(null);
        setIsLoading(true);
      });

      try {
        await sleep(500, signal);
        if (signal.aborted) return;

        const data = createMockProjects();
        setProjects(data);
      } catch {
        if (signal.aborted) return;
        setError(tCommon("error") || "Unable to load projects.");
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [tCommon]
  );

  const loadProjects = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    void fetchProjects(controller.signal);
  }, [fetchProjects]);

  // روی مونت شدن کامپوننت، پروژه‌ها را بارگذاری می‌کنیم.
  // بارگذاری در یک میکروتسک اجرا می‌شود تا از اجرای همزمان setState در اثر جلوگیری شود.
  useEffect(() => {
    Promise.resolve().then(() => loadProjects());
    return () => {
      controllerRef.current?.abort();
    };
  }, [loadProjects]);

  // مقدار ثابت زمان (now) را یک بار پس از مونت گرفتن تعیین می‌کنیم.
  // این مقدار برای محاسباتی مثل تعیین overdue بودن پروژه‌ها استفاده می‌شود
  // و از فراخوانی Date.now() در هنگام رندر جلوگیری می‌کند.
  useEffect(() => {
    Promise.resolve().then(() => setNow(Date.now()));
  }, []);

  // فهرست پروژه‌های فیلترشده و مرتب‌شده که بر اساس state فعلی محاسبه می‌شود.
  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects
      .filter((project) => {
        if (statusFilter !== "all" && project.status !== statusFilter) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        return project.name.toLowerCase().includes(normalizedSearch);
      })
      .sort((left, right) => {
        if (sortBy === "deadline") {
          const leftDeadline = left.deadline ? left.deadline.getTime() : 0;
          const rightDeadline = right.deadline ? right.deadline.getTime() : 0;
          return leftDeadline - rightDeadline;
        }

        if (sortBy === "budget") {
          return (right.budget ?? 0) - (left.budget ?? 0);
        }

        return right.updatedAt.getTime() - left.updatedAt.getTime();
      });
  }, [projects, searchTerm, statusFilter, sortBy]);

  // آمار کلی پروژه‌ها (تعداد کل، فعال، معوق و مجموع بودجه)
  const stats = useMemo<ProjectStats>(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter((project) => project.status === "active").length;
    const overdueProjects = projects.filter(
      (project) => project.deadline !== undefined && (now !== null ? project.deadline.getTime() < now : false) && project.status !== "completed"
    ).length;
    const totalBudget = projects.reduce((sum, project) => sum + (project.budget ?? 0), 0);

    return {
      totalProjects,
      activeProjects,
      overdueProjects,
      totalBudget,
    };
  }, [projects, now]);

  // قالب‌بندی تاریخ برای نمایش در UI بر اساس لوکال جاری
  const formatDate = useCallback(
    (date: Date) => {
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    },
    [locale]
  );

  // قالب‌بندی مبلغ به عنوان ارز (USD) با استفاده از locale
  const formatCurrency = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
    },
    [locale]
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const handleStatusChange = useCallback((value: ProjectFilterOption) => {
    setStatusFilter(value);
  }, []);

  const handleSortChange = useCallback((value: "recent" | "deadline" | "budget") => {
    setSortBy(value);
  }, []);

  // ایجاد یک پروژه جدید و افزودن آن به ابتدای لیست
  const createProject = useCallback(
    (project: {name: string; status: ProjectStatus; budget: number; deadline?: string}) => {
      setProjects((current) => [
        {
          id: `new-${Date.now()}`,
          name: project.name,
          status: project.status,
          progress: 0,
          members: 1,
          deadline: project.deadline ? new Date(project.deadline) : undefined,
          budget: project.budget,
          updatedAt: new Date(),
        },
        ...current,
      ]);
      setSearchTerm("");
      setStatusFilter("all");
    },
    []
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter("all");
  }, []);

  const refresh = useCallback(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    filteredProjects,
    stats,
    statusFilter,
    searchTerm,
    sortBy,
    isLoading,
    error,
    refresh,
    createProject,
    clearFilters,
    handleSearchChange,
    handleStatusChange,
    handleSortChange,
    formatDate,
    formatCurrency,
  };
}

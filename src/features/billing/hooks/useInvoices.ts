"use client";

/**
 * هوک مدیریت فاکtors و پجینیشن
 * شامل محاسبه صفحات، برش فاکtors و مدیریت شماره صفحه فعلی
 */

import {useCallback, useMemo, useState} from "react";
import type {Invoice} from "../types";

interface UseInvoicesOptions {
  /** لیست فاکتورها */
  invoices: Invoice[];
  /** تعداد آیتم در هر صفحه */
  pageSize?: number;
}

/**
 * هوک مدیریت فاکتورها و پجینیشن
 * این هوک منطق پجینیشن و برش فاکتورها را از لایه UI جدا می‌کند
 */
export function useInvoices({invoices, pageSize = 4}: UseInvoicesOptions) {
  const [currentPage, setCurrentPage] = useState(1);

  // محاسبه تعداد صفحات کل
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(invoices.length / pageSize)),
    [invoices.length, pageSize],
  );

  // برش فاکتورهای صفحه فعلی
  const currentInvoices = useMemo<Invoice[]>(() => {
    const start = (currentPage - 1) * pageSize;
    return invoices.slice(start, start + pageSize);
  }, [currentPage, invoices, pageSize]);

  // لیست شماره‌های صفحات
  const pageNumbers = useMemo(
    () => Array.from({length: totalPages}, (_, index) => index + 1),
    [totalPages],
  );

  // رفتن به صفحه بعدی
  const goToNextPage = useCallback(() => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }, [totalPages]);

  // رفتن به صفحه قبلی
  const goToPrevPage = useCallback(() => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }, []);

  // رفتن به صفحه مشخص
  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    },
    [totalPages],
  );

  // ریست کردن به صفحه اول هنگامی که فاکتورها تغییر می‌کنند
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    pageNumbers,
    currentInvoices,
    goToNextPage,
    goToPrevPage,
    goToPage,
    resetPage,
  };
}
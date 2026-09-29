"use client";

/**
 * هوک نوار ابزار تیم
 * تشخیص فعال بودن فیلترها برای نمایش چیپ‌ها و شمارنده
 */

interface UseTeamToolbarOptions {
  searchValue: string;
  statusFilter: string;
}

export function useTeamToolbar({searchValue, statusFilter}: UseTeamToolbarOptions) {
  const hasSearch = searchValue.trim().length > 0;
  const hasRoleFilter = statusFilter !== "all";

  return {
    hasSearch,
    hasRoleFilter,
    hasFilters: hasSearch || hasRoleFilter,
  };
}

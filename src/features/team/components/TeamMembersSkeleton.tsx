"use client";

/**
 * اسکلت بارگذاری کارت‌های عضو
 * نمایش موقت هنگام دریافت دادهٔ اعضا
 */

interface TeamMembersSkeletonProps {
  count?: number;
}

export function TeamMembersSkeleton({count = 6}: TeamMembersSkeletonProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({length: count}).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted/80" />
              </div>
            </div>
            <div className="h-7 w-20 rounded-full bg-muted" />
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-3 w-full rounded bg-muted/80" />
            <div className="h-3 w-2/3 rounded bg-muted/80" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * فعالیت‌های اخیر عضو (دادهٔ موقت توسعه)
 * برچسب‌ها از طریق کلیدهای Team.profile.activity.* ترجمه می‌شوند
 */

export interface MemberActivityItem {
  id: string;
  labelKey: string;
  timeKey: string;
}

export const MEMBER_ACTIVITY: readonly MemberActivityItem[] = [
  {id: "reviewed-sprint", labelKey: "reviewedSprint", timeKey: "twoHoursAgo"},
  {id: "updated-roadmap", labelKey: "updatedRoadmap", timeKey: "yesterday"},
  {id: "closed-qa", labelKey: "closedQa", timeKey: "threeDaysAgo"},
] as const;

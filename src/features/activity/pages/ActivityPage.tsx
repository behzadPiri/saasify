/**
 * صفحه فعالیت‌ها (Legacy/Alternative)
 */

"use client";

import { useTranslations } from "next-intl";
import { ActivityItem } from '@/features/activity';
import { ActivityCards } from '../components/ActivityCards';
import { ActivityPagination } from '../components/ActivityPagination';
import { usePagination } from '../hooks/usePagination';

const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'project_created',
    titleKey: 'items.contentPanelStarted.title',
    descriptionKey: 'items.contentPanelStarted.description',
    user: {
      name: 'Ali Hosseini',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '2',
    type: 'task_completed',
    titleKey: 'items.taskCompleted.title',
    descriptionKey: 'items.taskCompleted.description',
    user: {
      name: 'Zahra Nowrouzi',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const ActivityPage = () => {
  const t = useTranslations("Activity");
  const { currentPage, paginatedData, totalPages, setPage } = usePagination({
    data: sampleActivities,
    itemsPerPage: 4
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("recentEvents")}
      </h1>

      <ActivityCards activities={paginatedData} />

      {totalPages > 1 && (
        <ActivityPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

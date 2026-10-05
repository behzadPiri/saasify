/**
 * صفحه فعالیت‌ها (Legacy/Alternative)
 */

import { ActivityItem } from '@/features/activity';
import { ActivityCards } from '../components/ActivityCards';
import { ActivityPagination } from '../components/ActivityPagination';
import { usePagination } from '../hooks/usePagination';

const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'project_created',
    title: 'پروژه جدید ایجاد شد',
    description: 'پروژه ساخت سایت وب جدید شروع شد',
    user: {
      name: 'علی حسینی',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '2',
    type: 'task_completed',
    title: 'وظیفه اصلی تکمیل شد',
    description: 'وظیفه طراحی UI اصلی پروژه تکمیل شد',
    user: {
      name: 'زهرا نوروزی',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const ActivityPage = () => {
  const { currentPage, paginatedData, totalPages, setPage } = usePagination({
    data: sampleActivities,
    itemsPerPage: 4
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        فعالیت‌های اخیر
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

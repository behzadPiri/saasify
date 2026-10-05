/**
 * کامپوننت کارت‌های فعالیت
 * نمایش فعالیت‌ها به صورت شبکه‌ای از کارت‌ها
 */

"use client";

import { ActivityItem } from '@/features/activity';
import { ACTIVITY_TYPES } from '../constants/activity-types';
import Image from "next/image";

interface ActivityCardsProps {
  activities: ActivityItem[];
}

export const ActivityCards = ({ activities }: ActivityCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {activities.map((activity) => {
        const typeConfig = ACTIVITY_TYPES[activity.type] || ACTIVITY_TYPES.project_created;
        return (
          <div
            key={activity.id}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={`mt-1 p-2 rounded-lg ${typeConfig.bg}`}>
                <span className={typeConfig.color}>●</span>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {activity.description}
                </p>

                {activity.user && (
                  <div className="flex items-center gap-2">
                    {activity.user.avatar ? (
                      <Image
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                        {activity.user.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {activity.user.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

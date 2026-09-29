"use client";

/**
 * کامپوننت جزئیات عضو تیم
 * ترکیب منطق (useTeamMemberDetail) و ویو (هدر، پروفایل، پروژه‌ها)
 * بسته به view ارسالی از مسیر، پروفایل یا پروژه‌ها نمایش داده می‌شود
 */

import {MemberHeader, MemberNotFound, MemberProfile, MemberProjects, TeamMembersSkeleton} from "./components";
import {useTeamMemberDetail} from "./hooks";
import type {TeamMemberView} from "./types";

interface TeamMemberDetailProps {
  memberId: string;
  view?: TeamMemberView;
}

export function TeamMemberDetail({memberId, view = "overview"}: TeamMemberDetailProps) {
  const {
    isLoading,
    member,
    initials,
    projects,
    visibleProjects,
    searchTerm,
    feedback,
    isCreateOpen,
    relativeLastSeen,
    joinedDate,
    activityItems,
    setSearchTerm,
    openCreateModal,
    closeCreateModal,
    handleCreateProject,
  } = useTeamMemberDetail({memberId, view});

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <TeamMembersSkeleton count={3} />
      </div>
    );
  }

  if (!member) {
    return <MemberNotFound />;
  }

  return (
    <div className="space-y-6 w-full">
      <MemberHeader member={member} initials={initials} view={view} projectCount={projects.length} />

      {view === "overview" ? (
        <MemberProfile
          member={member}
          joinedDate={joinedDate}
          relativeLastSeen={relativeLastSeen}
          activityItems={activityItems}
        />
      ) : (
        <MemberProjects
          visibleProjects={visibleProjects}
          searchTerm={searchTerm}
          feedback={feedback}
          isCreateOpen={isCreateOpen}
          onSearchChange={setSearchTerm}
          onOpenCreate={openCreateModal}
          onCloseCreate={closeCreateModal}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}

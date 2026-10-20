"use client";

/**
 * کامپوننت جزئیات عضو تیم
 * ترکیب منطق (useTeamMemberDetail) و ویو (هدر، پروفایل، پروژه‌ها)
 * تب‌های پایین صفحه به‌صورت کاملاً کلاینتی و بدون ناوبری/رفرش کامل جابه‌جا می‌شوند.
 */

import {
  ChangeAccessModal,
  EditMemberModal,
  MemberHeader,
  MemberNotFound,
  MemberProfile,
  MemberProjects,
  RemoveMemberModal,
  TeamMembersSkeleton,
} from "./components";
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
    activeTab,
    setActiveTab,
    activeModal,
    isRemoving,
    openEditModal,
    openAccessModal,
    openRemoveModal,
    closeActionModal,
    handleEditSubmit,
    handleAccessSubmit,
    handleRemoveConfirm,
  } = useTeamMemberDetail({memberId, view});

  if (isLoading || isRemoving) {
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
      <MemberHeader
        member={member}
        initials={initials}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        projectCount={projects.length}
      />

      {activeTab === "overview" ? (
        <div
          key="overview"
          id="member-panel-overview"
          role="tabpanel"
          aria-labelledby="member-tab-overview"
          className="animate-in fade-in [animation-duration:320ms] space-y-6"
        >
          <MemberProfile
            member={member}
            joinedDate={joinedDate}
            relativeLastSeen={relativeLastSeen}
            activityItems={activityItems}
            onEdit={openEditModal}
            onChangeAccess={openAccessModal}
            onRemove={openRemoveModal}
          />
        </div>
      ) : (
        <div
          key="projects"
          id="member-panel-projects"
          role="tabpanel"
          aria-labelledby="member-tab-projects"
          className="animate-in fade-in [animation-duration:320ms] space-y-6"
        >
          <MemberProjects
            memberId={memberId}
            visibleProjects={visibleProjects}
            searchTerm={searchTerm}
            feedback={feedback}
            isCreateOpen={isCreateOpen}
            onSearchChange={setSearchTerm}
            onOpenCreate={openCreateModal}
            onCloseCreate={closeCreateModal}
            onCreate={handleCreateProject}
          />
        </div>
      )}

      <EditMemberModal
        open={activeModal === "edit"}
        member={member}
        onClose={closeActionModal}
        onSubmit={handleEditSubmit}
      />

      <ChangeAccessModal
        open={activeModal === "access"}
        member={member}
        onClose={closeActionModal}
        onSubmit={handleAccessSubmit}
      />

      <RemoveMemberModal
        open={activeModal === "remove"}
        member={member}
        onClose={closeActionModal}
        onConfirm={handleRemoveConfirm}
      />
    </div>
  );
}

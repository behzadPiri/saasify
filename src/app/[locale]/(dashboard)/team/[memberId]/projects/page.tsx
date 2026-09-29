import {TeamMemberDetail} from "@/features";

/**
 * صفحهٔ پروژه‌های عضو تیم - نمای projects
 */

interface TeamMemberProjectsPageProps {
  params: Promise<{
    memberId: string;
  }>;
}

export default async function TeamMemberProjectsPage({params}: TeamMemberProjectsPageProps) {
  const {memberId} = await params;

  return <TeamMemberDetail memberId={memberId} view="projects" />;
}

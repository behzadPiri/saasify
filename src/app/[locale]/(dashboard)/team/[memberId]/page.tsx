import {TeamMemberDetail} from "@/features";

/**
 * صفحهٔ پروفایل عضو تیم - نمای overview
 */

interface TeamMemberPageProps {
  params: Promise<{
    memberId: string;
  }>;
}

export default async function TeamMemberPage({params}: TeamMemberPageProps) {
  const {memberId} = await params;

  return <TeamMemberDetail memberId={memberId} view="overview" />;
}

import {TeamMemberProjectDetail} from "@/features";

/**
 * صفحهٔ جزئیات پروژهٔ یک عضو تیم.
 *
 * برخلاف مسیر عمومی `projects/[projectId]`، این مسیر پروژه را از مجموعهٔ
 * پروژه‌های همان عضو resolve می‌کند و دکمهٔ بازگشت را به فهرست پروژه‌های
 * عضو هدایت می‌کند.
 */

interface TeamMemberProjectPageProps {
  params: Promise<{
    memberId: string;
    projectId: string;
  }>;
}

export default async function TeamMemberProjectPage({params}: TeamMemberProjectPageProps) {
  const {memberId, projectId} = await params;

  return <TeamMemberProjectDetail memberId={memberId} projectId={projectId} />;
}

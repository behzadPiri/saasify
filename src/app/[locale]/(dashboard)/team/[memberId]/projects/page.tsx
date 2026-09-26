import {TeamMemberDetail} from "@/features/team/TeamMemberDetail";

interface TeamMemberProjectsPageProps {
  params: {
    memberId: string;
  };
}

export default function TeamMemberProjectsPage({params}: TeamMemberProjectsPageProps) {
  return <TeamMemberDetail memberId={params.memberId} />;
}

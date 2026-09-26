import {TeamMemberDetail} from "@/features/team/TeamMemberDetail";

interface TeamMemberPageProps {
  params: {
    memberId: string;
  };
}

export default function TeamMemberPage({params}: TeamMemberPageProps) {
  return <TeamMemberDetail memberId={params.memberId} />;
}

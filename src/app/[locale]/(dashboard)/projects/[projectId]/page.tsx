import {ProjectDetail} from "@/features/projects";

interface ProjectDetailPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

/**
 * صفحهٔ جزئیات پروژه.
 *
 * نکتهٔ مهم (رفع باگ «پروژه یافت نشد»): از Next.js 15 به بعد مقدار `params`
 * یک Promise است و باید ابتدا با `await` مقداردهی شود. پیش‌تر دسترسی مستقیم به
 * `params.projectId` باعث می‌شد شناسه همیشه `undefined` باشد و پروژه پیدا نشود.
 */
export default async function ProjectDetailPage({params}: ProjectDetailPageProps) {
  const {projectId} = await params;

  return <ProjectDetail projectId={projectId} />;
}

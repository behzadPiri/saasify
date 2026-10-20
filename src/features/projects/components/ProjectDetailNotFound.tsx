"use client";

// حالت خالی صفحهٔ جزئیات: زمانی که پروژه‌ای با شناسهٔ داده‌شده پیدا نشود.
// انیمیشن ورود ملایم (fade + scale) برای جلوگیری از پرش ناگهانی محتوا.
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Icons} from "@/shared/components/ui/icons";

interface ProjectDetailNotFoundProps {
  backHref?: string;
  backLabel?: string;
}

export function ProjectDetailNotFound({backHref = "/projects", backLabel}: ProjectDetailNotFoundProps) {
  const t = useTranslations("Projects");

  return (
    <section className="animate-in fade-scale-in w-full space-y-6">
      <div className="rounded-[30px] border border-dashed border-border/70 bg-card/80 p-10 text-center shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icons.Folder size={30} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-foreground">{t("projectNotFound")}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("projectNotFoundDescription")}</p>
        <Link
          href={backHref}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/95"
        >
          <Icons.ArrowLeft size={16} />
          {backLabel ?? t("backToProjects")}
        </Link>
      </div>
    </section>
  );
}

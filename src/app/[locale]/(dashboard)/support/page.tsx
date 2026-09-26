"use client";

import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";
import {Icons} from "@/shared/components/ui/icons";

const supportChannels = [
  {
    id: "docs",
    labelKey: "documentation",
    descriptionKey: "documentationDesc",
    accent: "from-sky-500/15 to-sky-500/5",
    icon: "FileText",
  },
  {
    id: "chat",
    labelKey: "liveChat",
    descriptionKey: "liveChatDesc",
    accent: "from-emerald-500/15 to-emerald-500/5",
    icon: "Bell",
  },
  {
    id: "email",
    labelKey: "emailSupport",
    descriptionKey: "emailSupportDesc",
    accent: "from-violet-500/15 to-violet-500/5",
    icon: "Mail",
  },
] as const;

const faqs = [
  {
    questionKey: "faqQuestionOne",
    answerKey: "faqAnswerOne",
  },
  {
    questionKey: "faqQuestionTwo",
    answerKey: "faqAnswerTwo",
  },
  {
    questionKey: "faqQuestionThree",
    answerKey: "faqAnswerThree",
  },
  {
    questionKey: "faqQuestionFour",
    answerKey: "faqAnswerFour",
  },
] as const;

export default function SupportPage() {
  const t = useTranslations("Support");
  const locale = useLocale();
  const isRtl = locale === "fa";
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(true);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="w-full space-y-6 sm:px-5 lg:px-7 xl:px-0">
      <section className="relative overflow-hidden rounded-[28px] border border-border/50 bg-card/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_32%)]" />

        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              <Icons.Support size={12} />
              {t("title")}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("subtitle")}</h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{t("headerDescription")}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-border/40 bg-card/80 p-4 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("responseTimeLabel")}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="text-2xl font-bold text-foreground">{t("responseTimeValue")}</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600">{t("live")}</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-border/40 bg-card/80 p-4 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("satisfactionLabel")}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="text-2xl font-bold text-foreground">{t("satisfactionValue")}</span>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">{t("topRated")}</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-border/40 bg-card/80 p-4 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("uptimeLabel")}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="text-2xl font-bold text-foreground">{t("uptimeValue")}</span>
            <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-medium text-violet-600">{t("monitoring")}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
          <div className="overflow-hidden rounded-[24px] border border-border/40 bg-background/40">
            <button
              type="button"
              aria-expanded={isTicketOpen}
              onClick={() => setIsTicketOpen((current) => !current)}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("contactUs")}</p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">{t("ticketFormTitle")}</h2>
              </div>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-card text-foreground transition-transform duration-300 ${isTicketOpen ? "rotate-180" : ""}`}>
                <Icons.Arrow size={14} />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${isTicketOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 border-t border-border/40 p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{t("subject")}</span>
                      <input
                        type="text"
                        placeholder={t("subjectPlaceholder")}
                        className="w-full rounded-xl border border-border/50 bg-background/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{t("category")}</span>
                      <select className="w-full rounded-xl border border-border/50 bg-background/40 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary">
                        <option>{t("categoryBilling")}</option>
                        <option>{t("categoryTechnical")}</option>
                        <option>{t("categoryAccount")}</option>
                        <option>{t("categoryGeneral")}</option>
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{t("priority")}</span>
                    <select className="w-full rounded-xl border border-border/50 bg-background/40 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary">
                      <option>{t("priorityLow")}</option>
                      <option>{t("priorityMedium")}</option>
                      <option>{t("priorityHigh")}</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{t("message")}</span>
                    <textarea
                      rows={6}
                      placeholder={t("messagePlaceholder")}
                      className="w-full resize-none rounded-xl border border-border/50 bg-background/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary"
                    />
                  </label>

                  <button
                    type="button"
                    className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Icons.Send size={16} />
                      {t("sendTicket")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {supportChannels.map((channel) => {
            const Icon = Icons[channel.icon as keyof typeof Icons];
            return (
              <div key={channel.id} className={`rounded-[24px] border border-border/40 bg-gradient-to-br ${channel.accent} p-4 shadow-sm`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background/80 text-foreground shadow-sm">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full border border-current/10 bg-background/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-current/70">
                    {t("support")}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-foreground">{t(channel.labelKey)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(channel.descriptionKey)}</p>
                </div>

                <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  {t("openChannel")}
                  <Icons.ArrowLeft size={14} className={isRtl ? "rotate-180" : ""} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <section className="rounded-[28px] border border-border/40 bg-card/80 p-5 shadow-sm">
        <div className="mb-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("faq")}</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">{t("faqTitle")}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.questionKey} className="overflow-hidden rounded-2xl border border-border/40 bg-background/40">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-foreground"
                >
                  <span>{t(item.questionKey)}</span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-background/80 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <Icons.Arrow size={12} />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="border-t border-border/40 px-4 py-3 text-sm leading-6 text-muted-foreground">{t(item.answerKey)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

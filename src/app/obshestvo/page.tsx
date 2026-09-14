import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Society, Comparison } from "@/components/site/society";
import { Cabinet } from "@/components/site/knowledge-cabinet";
import { FinalCTA } from "@/components/site/cta-footer";
import { CommunityIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Общество — IPvsem.ru",
  description:
    "Сообщество Авторов — экспертный центр: патентные поверенные, учёные, IP-юристы, инженеры и IT-специалисты. Прозрачные статусы и личный кабинет.",
  openGraph: {
    title: "Общество — IPvsem.ru",
    description:
      "Экспертный центр, а не просто сервис. Присоединяйтесь к сообществу авторов.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function ObshestvoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Сообщество авторов"
        title={
          <>
            <span className="text-gradient">Общество</span>
          </>
        }
        description="Объединяем патентных поверенных, учёных со степенями, IP-юристов, инженеров и IT-специалистов. Понимаем технологии, конструкции, код и научную логику — и переводим это на язык права."
        icon={<CommunityIcon className="h-10 w-10" />}
      />

      <Society />
      <Comparison />
      <Cabinet />
      <FinalCTA />
    </SiteLayout>
  );
}

import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Knowledge } from "@/components/site/knowledge-cabinet";
import { FinalCTA } from "@/components/site/cta-footer";
import { CtaButtons } from "@/components/site/cta-buttons";
import { KnowledgeIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Знания — IPvsem.ru",
  description:
    "Методички, которых нет у других. Защита ПО, ноу-хау, патенты, дизайн, юридические шаблоны. Кейсы и разборы споров.",
  keywords: [
    "база знаний",
    "методички",
    "защита ПО",
    "NDA",
    "лицензионные договоры",
    "интеллектуальная собственность",
  ],
  openGraph: {
    title: "Знания — IPvsem.ru",
    description: "Методички, которых нет у других. Берите и применяйте.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function ZnaniyaPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Открытая база знаний"
        title={
          <>
            <span className="text-gradient">Знания</span>
          </>
        }
        description="Методички, которых нет у других. Мы открыто делимся опытом — берите и применяйте."
        icon={<KnowledgeIcon className="h-10 w-10" />}
        crumbs={[{ label: "База знаний" }]}
      />

      {/* Блок базы знаний (6 категорий + CTA методички) */}
      <Knowledge />
      <CtaButtons title="Применили знания — закрепите результат" />
      <FinalCTA />
    </SiteLayout>
  );
}
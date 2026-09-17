import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { ReviewsSection } from "@/components/site/reviews";
import { FinalCTA } from "@/components/site/cta-footer";
import { CtaButtons } from "@/components/site/cta-buttons";
import { CommunityIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Отзывы клиентов — IPvsem.ru",
  description:
    "Отзывы клиентов Сообщества Авторов: депонирование, патентование, товарные знаки. Оставьте свой отзыв через открытую форму.",
  keywords: ["отзывы", "клиенты", "благодарности", "ПатентВсем"],
  openGraph: {
    title: "Отзывы клиентов — IPvsem.ru",
    description: "Что говорят клиенты. Оставьте свой отзыв.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function ReviewsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Нам доверяют"
        title={
          <>
            <span className="text-gradient">Отзывы</span> клиентов
          </>
        }
        description="Живые отзывы — с открытой формой: клиенты добавляют их сами. Письма поддержки и скриншоты готовятся к публикации."
        icon={<CommunityIcon className="h-10 w-10" />}
        crumbs={[{ label: "О нас", href: "/about" }, { label: "Отзывы" }]}
      />

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ReviewsSection />
        </div>
      </section>

      <CtaButtons title="Станьте следующим довольным клиентом" />
      <FinalCTA />
    </SiteLayout>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Services } from "@/components/site/services";
import { SearchTools } from "@/components/site/search-tools";
import { Pipeline } from "@/components/site/pipeline";
import { FinalCTA } from "@/components/site/cta-footer";
import { CtaButtons } from "@/components/site/cta-buttons";
import { DepositIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Сервисы — IPvsem.ru",
  description:
    "Депонирование, патентование, стратегия и типография в одном экспертном центре. Четыре направления — одна инфраструктура защиты.",
  openGraph: {
    title: "Сервисы — IPvsem.ru",
    description:
      "Четыре направления — одна инфраструктура: депонирование, Роспатент, стратегия, типография.",
    type: "website",
    locale: "ru_RU",
  },
};

const SUBPAGES = [
  {
    title: "Поиск знаков",
    href: "/services/znak-search",
    text: "Проверка товарных знаков по реестрам Роспатента: название, номер, владелец, изображение.",
  },
  {
    title: "Определение МКТУ",
    href: "/services/mktu-search",
    text: "Подбор классов МКТУ и кодов ОКВЭД для корректной заявки на регистрацию.",
  },
  {
    title: "Поиск патентов",
    href: "/services/patent-search",
    text: "Поиск по мировому патентному фонду: оценка патентоспособности и научной новизны.",
  },
  {
    title: "Депонирование",
    href: "/deponirovanie",
    text: "Фиксация авторства за 24 часа со свидетельством, которое принимают суды.",
  },
];

export default function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Экосистема защиты"
        title={
          <>
            <span className="text-gradient">Сервисы</span> экосистемы
          </>
        }
        description="Фиксируем авторство, готовим к регистрации, строим портфель и печатаем. Все этапы работают в единой инфраструктуре и под контролем экспертов."
        icon={<DepositIcon className="h-10 w-10" />}
        crumbs={[{ label: "Услуги" }]}
      />

      <Services />

      {/* Подразделы */}
      <section id="tools" className="relative scroll-mt-20 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Инструменты и подразделы
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUBPAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-card/60"
              >
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300">
                  Открыть
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SearchTools />

      <Pipeline />
      <CtaButtons title="Выберите направление — остальное возьмём на себя" />
      <FinalCTA />
    </SiteLayout>
  );
}

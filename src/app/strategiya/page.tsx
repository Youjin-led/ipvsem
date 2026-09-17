import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { FinalCTA } from "@/components/site/cta-footer";
import { CtaButtons } from "@/components/site/cta-buttons";
import { StrategyIcon } from "@/components/site/icons";
import { SectionHeading } from "@/components/site/services";

export const metadata: Metadata = {
  title: "Стратегия и патентный портфель — IPvsem.ru",
  description:
    "Строим патентный портфель: аудит интеллектуальной собственности, депонирование, регистрация в РФ и за рубежом, ноу-хау и защита от конкурентов.",
  keywords: [
    "патентный портфель",
    "стратегия интеллектуальной собственности",
    "аудит ИС",
    "ноу-хау",
    "международное патентование",
    "РСТ",
  ],
  openGraph: {
    title: "Стратегия и патентный портфель — IPvsem.ru",
    description:
      "От идеи до портфеля активов: аудит, депонирование, патентование и защита.",
    type: "website",
    locale: "ru_RU",
  },
};

const DIRECTIONS = [
  {
    title: "Аудит интеллектуальной собственности",
    text: "Инвентаризируем разработки, код, дизайн и документы. Определяем, что уже можно защищать, а что нужно доработать.",
  },
  {
    title: "Патентный портфель",
    text: "Комбинируем патенты, товарные знаки, программы для ЭВМ и ноу-хау в единый портфель под задачи бизнеса.",
  },
  {
    title: "Ноу-хау и коммерческая тайна",
    text: "Оформляем секреты производства: положения, регламенты и договоры, которые работают в суде.",
  },
  {
    title: "Международная защита",
    text: "Планируем географию: РФ, ЕАЭС, Европа, США, Китай. Готовим подачи через РСТ и зарубежные ведомства.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Аудит",
    text: "Разбираем ваши разработки и бизнес-планы, находим охраноспособные решения.",
  },
  {
    n: "02",
    title: "Депонирование",
    text: "Фиксируем авторство и дату приоритета до любых публикаций и переговоров.",
  },
  {
    n: "03",
    title: "Регистрация",
    text: "Подаём заявки в Роспатент: патенты, товарные знаки, программы для ЭВМ.",
  },
  {
    n: "04",
    title: "Портфель",
    text: "Сводим всё в стратегию: сроки, бюджеты, география и защита от конкурентов.",
  },
];

export default function StrategiyaPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Стратегия"
        title={
          <>
            <span className="text-gradient">Стратегия</span> и патентный портфель
          </>
        }
        description="От идеи до портфеля активов: аудит, депонирование, патентование в РФ и за рубежом, ноу-хау и защита от конкурентов."
        icon={<StrategyIcon className="h-10 w-10" />}
        crumbs={[{ label: "Услуги", href: "/services" }, { label: "Стратегия" }]}
      />

      {/* Направления */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Что делаем"
            title={
              <>
                Четыре опоры <span className="text-gradient">вашей защиты</span>
              </>
            }
            description="Каждое направление ведёт профильный эксперт: патентный поверенный, учёный или IP-юрист."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {DIRECTIONS.map((d, i) => (
              <article
                key={d.title}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {d.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Этапы */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Процесс"
            title={
              <>
                Путь от идеи — <span className="text-gradient">до портфеля</span>
              </>
            }
            align="left"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <article
                key={s.n}
                className="group flex gap-4 rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/15 font-mono text-sm font-bold text-brand-300">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaButtons title="Начните со стратегии — дальше всё по плану" />
      <FinalCTA />
    </SiteLayout>
  );
}

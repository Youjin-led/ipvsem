import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { Protection } from "@/components/site/knowledge-cabinet";
import { FinalCTA } from "@/components/site/cta-footer";
import { PatentIcon } from "@/components/site/icons";
import { SectionHeading } from "@/components/site/services";

export const metadata: Metadata = {
  title: "Роспатент — IPvsem.ru",
  description:
    "Регистрация изобретений, полезных моделей, промышленных образцов, программ для ЭВМ и баз данных. Полное сопровождение от оценки до выдачи охранного документа.",
  openGraph: {
    title: "Роспатент — IPvsem.ru",
    description:
      "Превращаем разработку в официальный охранный документ. Сопровождение от оценки до выдачи.",
    type: "website",
    locale: "ru_RU",
  },
};

const DIRECTIONS = [
  {
    title: "Изобретения и полезные модели",
    text: "Оцениваем патентоспособность, готовим формулу и описание, ведём заявку до выдачи патента.",
  },
  {
    title: "Промышленные образцы",
    text: "Защищаем внешний вид изделия: чертежи, 3D-виды, перечень существенных признаков.",
  },
  {
    title: "Программы, базы данных, топологии",
    text: "Регистрируем ПО и БД, оформляем депонирование топологий интегральных микросхем.",
  },
  {
    title: "Экспертиза и переписка",
    text: "Отвечаем на запросы экспертизы, при необходимости — палата по патентным спорам.",
  },
];

export default function RospatentPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Регистрация прав"
        title={
          <>
            <span className="text-gradient">Роспатент</span>
          </>
        }
        description="Превращаем разработку в официальный охранный документ. Полное сопровождение от предварительной оценки до выдачи патента или свидетельства."
        icon={<PatentIcon className="h-10 w-10" />}
      />

      {/* Направления */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Что регистрируем"
            title={
              <>
                Официальный документ —{" "}
                <span className="text-gradient">на вашу разработку</span>
              </>
            }
            description="Работаем с объектами патентного права и объектами смежных прав. На каждом этапе — эксперт с профильной специализацией."
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

      <Protection />
      <FinalCTA />
    </SiteLayout>
  );
}

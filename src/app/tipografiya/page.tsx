import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { FinalCTA } from "@/components/site/cta-footer";
import { PrintIcon } from "@/components/site/icons";
import { SectionHeading } from "@/components/site/services";
import { FileCheck2, BookOpen, Layers, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Типография — IPvsem.ru",
  description:
    "Печать свидетельств на защищённых бланках, научных монографий, технических альбомов и каталогов. Сигнальные экземпляры и малые тиражи.",
  openGraph: {
    title: "Типография — IPvsem.ru",
    description:
      "Физическое воплощение прав: свидетельства, книги, технические альбомы и каталоги.",
    type: "website",
    locale: "ru_RU",
  },
};

const OFFERS = [
  {
    icon: FileCheck2,
    title: "Свидетельства и бланки",
    text: "Печать свидетельств депонирования на защищённых бланках с учётными признаками.",
  },
  {
    icon: BookOpen,
    title: "Монографии и сборники",
    text: "Научные монографии, сборники тезисов и материалов конференций, оформление по ГОСТ.",
  },
  {
    icon: Layers,
    title: "Технические альбомы",
    text: "Альбомы, каталоги и руководства с чертежами, схемами и таблицами.",
  },
  {
    icon: Package,
    title: "Малые тиражи",
    text: "Сигнальные экземпляры и небольшие тиражи — от одного экземпляра до сотен копий.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Макет и материалы",
    text: "Принимаем исходники, готовим макет, согласовываем формат, бумагу и переплёт.",
  },
  {
    n: "02",
    title: "Печать и сборка",
    text: "Печатаем, сшиваем и переплетаем. Контролируем цвет и качество на каждом этапе.",
  },
  {
    n: "03",
    title: "Доставка",
    text: "Передаём тираж вам или отправляем заказчику. Электронные версии — сразу в кабинете.",
  },
];

export default function TipografiyaPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Воплощение"
        title={
          <>
            <span className="text-gradient">Типография</span>
          </>
        }
        description="Превращаем цифровые свидетельства и рукописи в осязаемые документы, книги и презентационные альбомы."
        icon={<PrintIcon className="h-10 w-10" />}
      />

      {/* Что печатаем */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Продукция"
            title={
              <>
                Печатаем то, что{" "}
                <span className="text-gradient">подтверждает права</span>
              </>
            }
            description="От защищённого свидетельства до научной монографии — всё в одном месте, с контролем качества и аккуратной вёрсткой."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OFFERS.map((o) => (
              <article
                key={o.title}
                className="group rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-card/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:scale-110">
                  <o.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Процесс"
            title={
              <>
                От макета —{" "}
                <span className="text-gradient">до готового тиража</span>
              </>
            }
            align="left"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
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

      <FinalCTA />
    </SiteLayout>
  );
}

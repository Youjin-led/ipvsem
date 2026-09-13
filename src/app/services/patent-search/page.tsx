import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { AipatSearchEmbed } from "@/components/site/aipat-search-embed";

export const metadata: Metadata = {
  title: "Поиск патентов — IPvsem.ru",
  description:
    "Бесплатный поиск патентов по реестрам Роспатента. Поиск по номеру, названию, владельцу, классам МКТУ. AI-ассистент для анализа патентоспособности.",
  keywords: [
    "поиск патентов",
    "Роспатент",
    "МКТУ",
    "патентный поиск",
    "реестр патентов",
    "AIpat",
  ],
  openGraph: {
    title: "Поиск патентов — IPvsem.ru",
    description: "Бесплатный поиск патентов по открытым реестрам Роспатента.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function PatentSearchPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-20 pb-8">
        {/* Декоративный фон */}
        <div className="absolute inset-0 -z-10 dot-bg opacity-30" aria-hidden />
        <div
          className="orb anim-drift -left-20 top-10 h-72 w-72 bg-brand-500/20"
          aria-hidden
        />

        {/* Заголовок страницы */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
              </span>
              Бесплатно · по реестрам Роспатента
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Поиск <span className="text-gradient">патентов</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              Поиск изобретений, полезных моделей и промышленных образцов по
              реестрам Роспатента. AI-ассистент для анализа патентоспособности.
            </p>
          </div>
        </div>

        {/* React-компонент с iframe от AIpat.ru — на всю ширину страницы.
            Использует JSX iframe (не document.createElement),
            чтобы React не удалял его при гидратации. */}
        <div className="px-4">
          <AipatSearchEmbed />
        </div>

        {/* Подсказки под iframe */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
              <p className="text-xs font-semibold text-brand-300">По номеру</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Номер заявки или патента Роспатента
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
              <p className="text-xs font-semibold text-brand-300">По названию</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Ключевые слова из названия или формулы
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
              <p className="text-xs font-semibold text-brand-300">По владельцу</p>
              <p className="mt-1 text-xs text-muted-foreground">
                ИНН, название правообладателя или автор
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

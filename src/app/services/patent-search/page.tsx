import type { Metadata } from "next";
import { FileSearch } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
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
      <PageHero
        eyebrow="Бесплатно · по реестрам Роспатента"
        title={
          <>
            Поиск <span className="text-gradient">патентов</span>
          </>
        }
        description="Поиск изобретений, полезных моделей и промышленных образцов по реестрам Роспатента. AI-ассистент для анализа патентоспособности."
        icon={<FileSearch className="h-10 w-10 text-brand-300" />}
      />

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
    </SiteLayout>
  );
}
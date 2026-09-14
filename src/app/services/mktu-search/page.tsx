import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Определение МКТУ — IPvsem.ru",
  description:
    "Международная классификация товаров и услуг. Поиск классов МКТУ для регистрации товарных знаков. Актуальная редакция 2026 года.",
  keywords: [
    "МКТУ",
    "международная классификация товаров и услуг",
    "классы МКТУ",
    "товарные знаки",
    "Роспатент",
  ],
  openGraph: {
    title: "Определение МКТУ — IPvsem.ru",
    description: "Поиск классов МКТУ для регистрации товарных знаков.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function MktuSearchPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Редакция 2026 · бесплатно"
        title={
          <>
            Определение <span className="text-gradient">МКТУ</span>
          </>
        }
        description="Международная классификация товаров и услуг. Поиск классов для регистрации товарных знаков. Актуальная редакция 2026 года."
        icon={<Layers className="h-10 w-10 text-brand-300" />}
      />

      {/* Еслиrame с МКТУ — на всю ширину страницы */}
      <div className="px-4">
        <iframe
          src="https://мкту.рус/?theme=dark"
          style={{
            width: "100%",
            height: "800px",
            border: "none",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#141414",
          }}
          loading="lazy"
          title="МКТУ — Международная классификация товаров и услуг 2026"
          allow="clipboard-write"
        />
      </div>

      {/* Подсказки под iframe */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
            <p className="text-xs font-semibold text-brand-300">По товару</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Введите название товара — определите класс МКТУ
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
            <p className="text-xs font-semibold text-brand-300">По услуге</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Найдите класс услуг для регистрации знака
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
            <p className="text-xs font-semibold text-brand-300">По классу</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Откройте список товаров и услуг нужного класса
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";

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
              Редакция 2026 · бесплатно
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Определение <span className="text-gradient">МКТУ</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              Международная классификация товаров и услуг. Поиск классов для
              регистрации товарных знаков. Актуальная редакция 2026 года.
            </p>
          </div>
        </div>

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
      </section>
    </SiteLayout>
  );
}

import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { Knowledge } from "@/components/site/knowledge-cabinet";

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
      {/* Заголовок страницы */}
      <section className="relative overflow-hidden pt-24 pb-4">
        <div className="absolute inset-0 -z-10 dot-bg opacity-30" aria-hidden />
        <div
          className="orb anim-drift -left-20 top-10 h-72 w-72 bg-brand-500/20"
          aria-hidden
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
              </span>
              Открытая база знаний
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-gradient">Знания</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              Методички, которых нет у других. Мы открыто делимся опытом —
              берите и применяйте.
            </p>
          </div>
        </div>
      </section>

      {/* Блок базы знаний (6 категорий + CTA методички) */}
      <Knowledge />
    </SiteLayout>
  );
}

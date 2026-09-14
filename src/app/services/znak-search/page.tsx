import type { Metadata } from "next";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Поиск товарных знаков — IPvsem.ru",
  description:
    "Бесплатный поиск товарных знаков по открытым реестрам Роспатента. Поиск по названию, номеру, владельцу. Поиск по изображению. Классы МКТУ, ОКВЭД, ИНН/ОГРН.",
  keywords: [
    "поиск товарных знаков",
    "Роспатент",
    "МКТУ",
    "проверка товарного знака",
    "реестр товарных знаков",
  ],
  openGraph: {
    title: "Поиск товарных знаков — IPvsem.ru",
    description:
      "Бесплатный поиск товарных знаков по открытым реестрам Роспатента.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function ZnakSearchPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Бесплатно · по реестрам Роспатента"
        title={
          <>
            Поиск <span className="text-gradient">товарных знаков</span>
          </>
        }
        description="Проверьте товарный знак по названию, номеру заявки или владельцу. Поиск по изображению, фильтры по классам МКТУ, ОКВЭД, ИНН/ОГРН. Экспорт результатов в RTF и SVG."
        icon={<Search className="h-10 w-10 text-brand-300" />}
      />

      {/* Еслиrame с поиском от NayTea.ru — на всю ширину страницы.
          Обёртка без max-width, чтобы форма растянулась на весь экран.
          color-scheme: dark — заставляет prefers-color-scheme:dark
          внутри iframe сработать, и форма NayTea становится тёмной. */}
      <div className="naytea-search-wrapper" style={{ colorScheme: "dark" }}>
        <iframe
          src="https://naytea.ru/partners/search"
          title="Поиск товарных знаков по реестрам Роспатента"
          className="naytea-search-iframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="fullscreen"
          style={{ colorScheme: "dark" }}
        />
      </div>

      {/* Подсказки под iframe — в контейнере */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
            <p className="text-xs font-semibold text-brand-300">По названию</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Введите название бренда или части слова
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
            <p className="text-xs font-semibold text-brand-300">По номеру</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Номер заявки или свидетельства Роспатента
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur-sm">
            <p className="text-xs font-semibold text-brand-300">По владельцу</p>
            <p className="mt-1 text-xs text-muted-foreground">
              ИНН, ОГРН или название правообладателя
            </p>
          </div>
        </div>
      </div>

      {/* Стили для iframe — на всю ширину страницы, без max-width.
          CSS-фильтр invert(1) hue-rotate(180deg) применяется в обеих темах:
          инвертирует цвета формы NayTea (белый → чёрный), а hue-rotate(180°)
          возвращает синий обратно. Так форма остаётся тёмной и в светлой
          (чёрно-жёлтой), и в тёмной (синей) темах нашего сайта. */}
      <style dangerouslySetInnerHTML={{ __html: `
        .naytea-search-wrapper {
          width: 100%;
          margin: 0 auto;
          padding: 0 16px;
          box-sizing: border-box;
        }
        .naytea-search-iframe {
          width: 100%;
          height: 75vh;
          min-height: 600px;
          max-height: 1200px;
          border: 0;
          display: block;
          border-radius: 12px;
          overflow: hidden;
          /* Инвертируем цвета формы (белый фон → чёрный) — в обеих темах */
          filter: invert(1) hue-rotate(180deg);
        }
        @media (max-width: 640px) {
          .naytea-search-iframe {
            height: 85vh;
            min-height: 500px;
          }
        }
      `}} />
    </SiteLayout>
  );
}
import { AipatSearchEmbed } from "./aipat-search-embed";
import { Search } from "lucide-react";

export function SearchTools() {
  return (
    <section id="search-tools" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-400/30 bg-card/80">
            <Search className="h-5 w-5 text-brand-300" />
          </span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Поисковики по <span className="text-gradient">реестрам</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Поиск знаков, классов МКТУ и патентов — бесплатно, по открытым
              реестрам Роспатента.
            </p>
          </div>
        </div>

        {/* Поиск знаков — NayTea.ru */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border/40 px-5 py-3.5">
            <div>
              <h3 className="text-base font-bold">Поиск товарных знаков</h3>
              <p className="text-xs text-muted-foreground">
                Название, номер, владелец, изображение — по реестрам Роспатента
              </p>
            </div>
            <span className="hidden shrink-0 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300 sm:inline-block">
              naytea.ru
            </span>
          </div>
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
        </div>

        {/* Определение МКТУ — мкту.рус */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border/40 px-5 py-3.5">
            <div>
              <h3 className="text-base font-bold">Определение МКТУ</h3>
              <p className="text-xs text-muted-foreground">
                Международная классификация товаров и услуг — редакция 2026
              </p>
            </div>
            <span className="hidden shrink-0 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300 sm:inline-block">
              мкту.рус
            </span>
          </div>
          <div className="px-4 pb-4 pt-3">
            <iframe
              src="https://мкту.рус/?theme=dark"
              style={{
                width: "100%",
                height: "700px",
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
        </div>

        {/* Поиск патентов — AIpat.ru */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border/40 px-5 py-3.5">
            <div>
              <h3 className="text-base font-bold">Поиск патентов</h3>
              <p className="text-xs text-muted-foreground">
                Изобретения, полезные модели, промобразцы + AI-ассистент
              </p>
            </div>
            <span className="hidden shrink-0 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300 sm:inline-block">
              aipat.ru
            </span>
          </div>
          <div className="px-4 pb-4 pt-3">
            <AipatSearchEmbed />
          </div>
        </div>
      </div>

      {/* Стили для iframe — на всю ширину, с затемнением формы NayTea */}
      <style dangerouslySetInnerHTML={{ __html: `
        .naytea-search-wrapper {
          width: 100%;
          padding: 0 16px 16px;
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
          filter: invert(1) hue-rotate(180deg);
        }
        @media (max-width: 640px) {
          .naytea-search-iframe {
            height: 85vh;
            min-height: 500px;
          }
        }
      `}} />
    </section>
  );
}
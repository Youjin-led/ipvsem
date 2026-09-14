import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SECTIONS } from "./sections-data";

export function SectionStrip() {
  return (
    <section id="sections" className="relative pb-14 pt-4 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Разделы — одной строкой
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 min-[1100px]:grid-cols-5 sm:grid-cols-2 lg:grid-cols-3 min-[1100px]:grid-cols-5">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                id={section.id}
                href={section.href}
                className="group relative scroll-mt-24 overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-card/60 hover:shadow-lg hover:shadow-brand-500/10"
              >
                {/* Свечение при наведении */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/0 blur-3xl transition-all duration-500 group-hover:bg-brand-500/20"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-2">
                  {/* Номер + иконка */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-gradient text-3xl font-black leading-none">
                      {section.n}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-400/30 bg-card/80">
                      <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-300 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                </div>

                <h3 className="relative mt-4 text-lg font-bold tracking-tight">
                  {section.title}
                </h3>
                <p className="relative mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                  {section.subtitle}
                </p>

                <div className="relative mt-4">
                  <span className="inline-flex min-h-10 items-center gap-1.5 rounded-[9px] bg-brand-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-black shadow-md shadow-brand-400/20 transition-colors group-hover:bg-brand-300">
                    Открыть
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
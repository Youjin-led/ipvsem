"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { SECTIONS } from "./sections-data";
import { Pyramids3D } from "./pyramids-3d";

export function Hero() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = SECTIONS[activeIndex];

  React.useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
          if (idx >= 0) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-14">
      {/* Фон */}
      <div className="absolute inset-0 -z-10 dot-bg opacity-25" aria-hidden />
      <div className="orb anim-drift -left-24 top-10 h-80 w-80 bg-brand-500/25" aria-hidden />
      <div className="orb anim-drift-slow right-1/3 -top-10 h-64 w-64 bg-glow/15" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          {/* ЛЕВО — поиск, описание, цифра-факт, кнопка */}
          <div className="max-w-2xl">
            {/* Поиск */}
            <form
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 px-5 py-3 backdrop-blur-sm transition-colors focus-within:border-brand-400/60 sm:py-4"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/services");
              }}
            >
              <input
                type="search"
                placeholder="Что вы ищете?"
                aria-label="Поиск по сервисам"
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-lg"
              />
              <button
                type="submit"
                aria-label="Найти"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-400 text-black transition-transform hover:scale-105"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            {/* Описание + цифра-факт */}
            <p className="mt-7 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
              {active.subtitle}
            </p>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-gradient text-5xl font-black leading-none sm:text-6xl">
                {active.fact.value}
              </span>
              <p className="max-w-[16rem] text-sm text-muted-foreground">
                {active.fact.label}
              </p>
            </div>

            {/* Кнопка раздела */}
            <div className="mt-9 flex items-center gap-3">
              <Link
                href={active.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
              >
                Открыть «{active.label}»
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ПРАВО — логотип */}
          <div className="relative flex items-center justify-center py-4">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-144 w-144 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl"
              aria-hidden
            />
            <Pyramids3D imgClassName="h-84 sm:h-108 lg:h-144" />
          </div>
        </div>
      </div>
    </section>
  );
}
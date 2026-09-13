"use client";

import * as React from "react";
import { SectionHeading } from "./services";

const STEPS = [
  {
    n: "01",
    title: "Загрузка объекта",
    text: "Через личный кабинет или напрямую — код, чертежи, статьи, макеты, презентации. Всё, что создано умом.",
    time: "5 минут",
  },
  {
    n: "02",
    title: "Фиксация даты",
    text: "Зарегистрированная методика гарантирует неизменность контента и точную дату. Хэш зафиксирован.",
    time: "24 часа",
  },
  {
    n: "03",
    title: "Свидетельство",
    text: "Электронное свидетельство мгновенно, печатное — через типографию на защищённом бланке.",
    time: "1–3 дня",
  },
  {
    n: "04",
    title: "Регистрация",
    text: "При необходимости — подача заявки в Роспатент с сохранением приоритета депонирования.",
    time: "по запросу",
  },
  {
    n: "05",
    title: "Стратегия",
    text: "Формируем портфель: что патентуем, что держим в ноу-хау, где ставим патентные заборы.",
    time: "1–2 недели",
  },
  {
    n: "06",
    title: "Воплощение",
    text: "Печатаем свидетельства, монографии, технические альбомы, руководства и каталоги.",
    time: "3–7 дней",
  },
];

export function Pipeline() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Декоративный фон */}
      <div className="absolute inset-0 -z-10 dot-bg opacity-30" aria-hidden />
      <div
        className="orb anim-drift -left-20 top-1/3 h-72 w-72 bg-brand-600/30"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Пайплайн"
          title={
            <>
              От загрузки объекта —{" "}
              <span className="text-gradient">до физического воплощения</span>
            </>
          }
          description="Шесть этапов, которые превращают идею в защищённый актив. Каждый шаг виден в личном кабинете и подкреплён экспертным контролем."
        />

        <div className="mt-16">
          {/* Десктоп: горизонтальный поток */}
          <ol className="relative hidden lg:block">
            {/* Линия */}
            <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent">
              <div className="anim-shimmer h-px w-full" />
            </div>

            <div className="grid grid-cols-6 gap-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className="group relative flex flex-col items-center text-center"
                  style={{ animation: `float-up 8s ease-in-out infinite ${i * 0.4}s` }}
                >
                  {/* Узел */}
                  <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-brand-400/40 bg-card/90 backdrop-blur-md transition-all duration-500 group-hover:border-brand-400 group-hover:glow-md">
                    <div className="absolute inset-2 rounded-full border border-dashed border-brand-400/30 anim-spin-slow" />
                    <span className="text-xl font-bold text-gradient">
                      {s.n}
                    </span>
                    {/* Пульс при наведении */}
                    <span className="absolute inset-0 rounded-full border border-glow/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 anim-pulse-glow" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{s.text}</p>
                  <span className="mt-3 inline-flex rounded-full border border-brand-400/30 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-mono text-brand-300">
                    {s.time}
                  </span>
                </li>
              ))}
            </div>
          </ol>

          {/* Мобильный: вертикальный поток */}
          <ol className="relative space-y-6 lg:hidden">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-brand-400/40 via-brand-500/40 to-transparent" />
            {STEPS.map((s) => (
              <li key={s.n} className="relative flex gap-4">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-400/40 bg-card/90 backdrop-blur-md">
                  <span className="text-base font-bold text-gradient">
                    {s.n}
                  </span>
                </div>
                <div className="flex-1 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{s.title}</h3>
                    <span className="rounded-full border border-brand-400/30 bg-brand-500/10 px-2 py-0.5 text-[10px] font-mono text-brand-300">
                      {s.time}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

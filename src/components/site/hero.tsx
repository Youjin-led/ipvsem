"use client";

import type { ReactNode } from "react";
import { ShieldCheck, Clock, Layers } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Бейдж */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
            </span>
            IP которое работает
          </div>

          <h1 className="text-balance text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Экосистема и Сообщество</span>
            <br />
            <span className="text-foreground font-bold">
              Авторов, Изобретателей, Разработчиков, Производителей и Бизнеса
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Депонирование, патентование, стратегия и типография в одном
            экспертном центре. Мы объединили правовую защиту и инструменты
            роста для авторов, инженеров, учёных и разработчиков.
          </p>

          {/* Кнопки */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-400 px-7 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
            >
              Присоединиться к сообществу
            </a>
            <a
              href="#services"
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-brand-400/70 bg-transparent px-7 py-2.5 text-sm font-extrabold uppercase tracking-wide text-brand-300 transition-all hover:-translate-y-0.5 hover:bg-brand-500/10 hover:text-brand-200"
            >
              Сервисы
            </a>
          </div>
        </div>

        {/* Мета-факты */}
        <div className="mx-auto mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <HeroStat
            icon={<Clock className="h-5 w-5" />}
            value="24ч"
            label="срок депонирования"
          />
          <HeroStat
            icon={<ShieldCheck className="h-5 w-5" />}
            value="5 лет"
            label="поддержка записи"
          />
          <HeroStat
            icon={<Layers className="h-5 w-5" />}
            value="∞"
            label="форматов объектов"
          />
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-6 text-center backdrop-blur-sm">
      <div className="flex items-center justify-center gap-1.5 text-brand-400">
        {icon}
        <span className="text-4xl font-black text-foreground">{value}</span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ============ Блок карточки свидетельства (под Hero) ============ */
export function CertificateCard() {
  return (
    <section className="relative -mt-8 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Коническое кольцо вокруг карточки */}
          <div className="absolute inset-0 -z-10 anim-spin-slow rounded-full opacity-20 conic-ring blur-3xl" aria-hidden />

          {/* Главная стеклянная карточка */}
          <div className="glass-strong relative rounded-3xl p-6 shadow-2xl shadow-brand-900/20 sm:p-8">
            {/* Заголовок карточки */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Свидетельство
                  </p>
                  <p className="text-sm font-semibold">AS-2026-00847</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-glow/15 px-3 py-1 text-[11px] font-medium text-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-glow anim-blink" />
                АКТИВНО
              </span>
            </div>

            {/* Данные объекта — сетка на десктопе */}
            <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <CertRow label="Объект" value="Исходный код платформы" />
              <CertRow label="Хэш SHA-256" value="0x7a3f…b29c" mono />
              <CertRow label="Депонировано" value="08.08.2026 14:32" />
              <CertRow label="Методика" value="Зарегистрированная" />
            </div>

            {/* Анимированный прогресс-бар */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Статус фиксации</span>
                <span className="text-brand-300">100%</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                  style={{ width: "100%" }}
                >
                  <div className="absolute inset-0 anim-shimmer" />
                </div>
              </div>
            </div>

            {/* Подвал карточки */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
              <div className="flex -space-x-1.5">
                {["A", "B", "C"].map((l, i) => (
                  <span
                    key={l}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-gradient-to-br from-brand-400 to-brand-700 text-[11px] font-semibold text-white"
                    style={{ animation: `float-up 4s ease-in-out infinite ${i * 0.5}s` }}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-glow anim-blink" />
                Защищено blockchain-хэшем
              </div>
            </div>
          </div>

          {/* Плавающие мини-чипы вокруг */}
          <div className="absolute -right-2 top-8 anim-float sm:-right-4 sm:top-12">
            <MiniChip text="ISO 27001" />
          </div>
          <div className="absolute -left-2 bottom-16 anim-float-delay sm:-left-4">
            <MiniChip text="Доказательная база для судов" />
          </div>
          <div className="absolute right-8 -bottom-3 anim-float-slow">
            <MiniChip text="24 часа" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CertRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/30 pb-2 sm:border-0 sm:pb-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function MiniChip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/40 bg-card/80 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-glow anim-blink" />
      {text}
    </span>
  );
}
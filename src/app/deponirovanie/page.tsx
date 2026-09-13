import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { Upload, Fingerprint, FileText, Award, Check, QrCode } from "lucide-react";

export const metadata: Metadata = {
  title: "Депонирование авторских прав — IPvsem.ru",
  description:
    "Зафиксируйте авторство за 60 секунд. Загрузите архив — мы вычислим цифровой отпечаток и опубликуем свидетельство. Онлайн-верификация в любой момент.",
  keywords: [
    "депонирование",
    "авторское право",
    "свидетельство",
    "хеш MD5",
    "цифровой отпечаток",
    "фиксация авторства",
    "верификация",
  ],
  openGraph: {
    title: "Депонирование авторских прав — IPvsem.ru",
    description: "Зафиксируйте авторство за 60 секунд. Первое свидетельство — бесплатно.",
    type: "website",
    locale: "ru_RU",
  },
};

const STEPS = [
  {
    icon: Upload,
    n: "01",
    title: "Загрузите архив",
    text: "Соберите материалы произведения в ZIP-архив размером до 10 МБ и прикрепите к форме депонирования.",
  },
  {
    icon: Fingerprint,
    n: "02",
    title: "Цифровой отпечаток",
    text: "Система автоматически вычисляет уникальную хеш-сумму MD5 — неизменный цифровой код вашего файла.",
  },
  {
    icon: FileText,
    n: "03",
    title: "Заполните данные",
    text: "Укажите ФИО автора, название произведения и его тип. Эти сведения будут включены в свидетельство.",
  },
  {
    icon: Award,
    n: "04",
    title: "Свидетельство готово",
    text: "Получите персональную страницу-свидетельство с уникальным номером и QR-кодом для проверки подлинности.",
  },
];

export default function DeponirovaniePage() {
  return (
    <SiteLayout>
      {/* ===== Hero-секция ===== */}
      <section className="relative overflow-hidden pt-24 pb-10">
        <div className="absolute inset-0 -z-10 dot-bg opacity-30" aria-hidden />
        <div className="orb anim-drift -left-20 top-10 h-72 w-72 bg-brand-500/20" aria-hidden />
        <div className="orb anim-drift-slow right-0 top-1/3 h-64 w-64 bg-glow/15" aria-hidden />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Бейдж */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
              </span>
              Тестовый режим · архивы до 10 МБ · хеш MD5
            </div>

            {/* Заголовок */}
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Депонирование <span className="text-gradient">авторских прав</span>
              <br />
              <span className="text-2xl font-normal text-muted-foreground sm:text-3xl">
                за 60 секунд
              </span>
            </h1>

            {/* Описание */}
            <p className="mt-6 mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              Загрузите архив с произведением — мы вычислим уникальный цифровой
              отпечаток (хеш-сумму MD5) и опубликуем свидетельство о
              депонировании с уникальным номером. Подтверждение авторства в любой
              момент через онлайн-верификацию.
            </p>

            {/* Кнопки */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="#start"
                className="inline-block rounded-none border border-brand-400 bg-brand-500/60 px-6 py-3 text-sm font-semibold text-brand-300 shadow-lg shadow-brand-500/30 backdrop-blur-md transition-all hover:border-brand-300 hover:bg-brand-500/80 hover:text-brand-200"
              >
                Начать депонирование
              </a>
              <a
                href="#start"
                className="inline-block rounded-none border border-brand-400/40 bg-brand-500/20 px-6 py-3 text-sm font-semibold text-brand-300 backdrop-blur-md transition-all hover:border-brand-400 hover:bg-brand-500/40"
              >
                Войти
              </a>
            </div>

            {/* Преимущества */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand-400" />
                Без бумажной почты
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand-400" />
                Мгновенная публикация
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand-400" />
                1 свидетельство уже опубликовано
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Как это работает ===== */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Как это <span className="text-gradient">работает</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Четыре шага до свидетельства
            </p>
          </div>

          {/* Шаги */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="group relative rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60"
                style={{ animation: `float-up 7s ease-in-out infinite ${i * 0.3}s` }}
              >
                {/* Номер */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl font-bold text-gradient">{step.n}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:scale-110">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{step.text}</p>

                {/* Стрелка между шагами (на десктопе) */}
                {i < STEPS.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-brand-400/40 lg:block">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path d="M5 12 H19 M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Форма депонирования (заглушка) ===== */}
      <section id="start" className="relative scroll-mt-20 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-brand-400/40 bg-black/40 p-8 backdrop-blur-md shadow-2xl shadow-brand-900/20 sm:p-12">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-400/40 bg-brand-500/10">
                <Upload className="h-8 w-8 text-brand-300" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Защитите своё <span className="text-gradient">произведение</span>
              </h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Регистрация займёт меньше минуты. Первое свидетельство — бесплатно.
              </p>

              {/* Кнопки */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <a
                  href="#"
                  className="inline-block rounded-none border border-brand-400 bg-brand-500/60 px-6 py-3 text-sm font-semibold text-brand-300 shadow-lg shadow-brand-500/30 backdrop-blur-md transition-all hover:border-brand-300 hover:bg-brand-500/80 hover:text-brand-200"
                >
                  Создать аккаунт
                </a>
                <a
                  href="#"
                  className="inline-block rounded-none border border-brand-400/40 bg-brand-500/20 px-6 py-3 text-sm font-semibold text-brand-300 backdrop-blur-md transition-all hover:border-brand-400 hover:bg-brand-500/40"
                >
                  Войти
                </a>
              </div>
            </div>

            {/* Что можно депонировать */}
            <div className="mt-10 border-t border-border/60 pt-6">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-brand-300">
                Что можно депонировать
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                {[
                  "Исходный код",
                  "3D-модели",
                  "Архитектурные проекты",
                  "Научные статьи",
                  "Дизайн-макеты",
                  "Презентации",
                  "Чертежи и схемы",
                  "Рукописи",
                  "API и алгоритмы",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-brand-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA внизу ===== */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 -z-10 grid-bg grid-bg-fade opacity-30" aria-hidden />
        <div className="orb anim-drift -right-20 top-1/4 h-64 w-64 bg-brand-500/20" aria-hidden />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-400/40 bg-brand-500/10">
              <QrCode className="h-7 w-7 text-brand-300" />
            </div>
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Защитите своё произведение <span className="text-gradient">прямо сейчас</span>
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
              Регистрация займёт меньше минуты. Первое свидетельство — бесплатно.
            </p>
            <div className="mt-8">
              <a
                href="#start"
                className="inline-block rounded-none border border-brand-400 bg-brand-500/60 px-8 py-3 text-sm font-semibold text-brand-300 shadow-lg shadow-brand-500/30 backdrop-blur-md transition-all hover:border-brand-300 hover:bg-brand-500/80 hover:text-brand-200"
              >
                Создать аккаунт
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { DepoWorkspace } from "@/components/depo/depo-workspace";
import { CtaButtons } from "@/components/site/cta-buttons";
import { ALGO_1, ALGO_2 } from "@/components/depo/pipeline";
import { Archive, FileCheck2, Fingerprint, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Депонирование с верификацией — IPvsem.ru",
  description:
    "Два контейнера, две хеш-суммы SHA-256 и SHA-512, мета-PDF и реестр ИС. Депонируйте файлы прямо в браузере и проверяйте целостность для суда.",
  keywords: [
    "депонирование",
    "верификация",
    "хеш SHA-256",
    "хеш SHA-512",
    "реестр ИС",
    "свидетельство",
    "фиксация авторства",
  ],
  openGraph: {
    title: "Депонирование с верификацией — IPvsem.ru",
    description: "2 контейнера · 2 хеша · мета-PDF · реестр · проверка для суда.",
    type: "website",
    locale: "ru_RU",
  },
};

const SCHEME = [
  { n: "01", title: "Приём файлов и данных", text: "Исходные файлы + идентификационные данные автора и правообладателя." },
  { n: "02", title: "1-й контейнер", text: "Архив с паролем, сгенерированным сервером (в прототипе — браузером)." },
  { n: "03", title: "Две хеш-суммы", text: `${ALGO_1} и ${ALGO_2} первого контейнера — два разных алгоритма.` },
  { n: "04", title: "Мета-файл PDF", text: "Хеши, данные правообладателя и ссылка на страницу верификации." },
  { n: "05", title: "2-й контейнер", text: "Финальный архив: 1-й контейнер + мета-PDF (опционально с паролем)." },
  { n: "06", title: "Внешние хранилища", text: "Облако, блокчейн, торрент, соцсети — с фиксацией временной метки." },
  { n: "07", title: "Запись в реестр", text: "Хеши, данные и местоположение контейнера. Статус жизненного цикла." },
  { n: "08", title: "Пароли пользователю", text: "Пароль 1-го контейнера и доступ ко 2-му во внешних хранилищах." },
];

const VERIFY_STEPS = [
  "Запрос на верификацию",
  "Скачивание 2-го контейнера из хранилища",
  "Извлечение 1-го контейнера и мета-PDF",
  "Пересчёт контрольных хешей и сверка с PDF",
  "Отчёт о верификации для суда / эксперта",
];

export default function DeponirovaniePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-10">
        <div className="absolute inset-0 -z-10 dot-bg opacity-30" aria-hidden />
        <div className="orb anim-drift -left-20 top-10 h-72 w-72 bg-brand-500/20" aria-hidden />
        <div className="orb anim-drift-slow right-0 top-1/3 h-64 w-64 bg-glow/15" aria-hidden />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Услуги", href: "/services" }, { label: "Депонирование" }]}
          />
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
              </span>
              Рабочий прототип · 2 контейнера · {ALGO_1} + {ALGO_2}
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Депонирование <span className="text-gradient">с верификацией</span>
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              Упаковываем файлы в архив с паролем, считаем две хеш-суммы,
              выпускаем мета-PDF и финальный контейнер, ведём реестр — а суд
              или эксперт проверяют целостность за минуту.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="#start"
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
              >
                Начать депонирование
              </a>
              <a
                href="#verify"
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-brand-400/40 bg-brand-500/10 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-brand-300 transition-all hover:bg-brand-500/20"
              >
                Проверить контейнер
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Схема Фиг.1 */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Как это <span className="text-gradient">работает</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Восемь этапов — от приёма файлов до выдачи паролей
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SCHEME.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-brand-400/50"
              >
                <span className="text-gradient text-2xl font-black">{s.n}</span>
                <h3 className="mt-2 text-sm font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Устройство контейнера Фиг.2 */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Устройство <span className="text-gradient">финального контейнера</span>
          </h2>
          <div className="mt-8 rounded-3xl border-2 border-brand-400/40 bg-card/40 p-5 backdrop-blur-sm sm:p-8">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-300">
              <Archive className="h-4 w-4" /> 2-й контейнер
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <KeyRound className="h-4 w-4 text-brand-300" /> 1-й контейнер
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Архив с паролем. Исходные файлы группы.
                </p>
                <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <Fingerprint className="h-3.5 w-3.5 text-brand-400" /> {ALGO_1} + {ALGO_2}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <FileCheck2 className="h-4 w-4 text-brand-300" /> Мета-PDF
                </p>
                <ul className="mt-2 list-inside list-disc text-xs text-muted-foreground">
                  <li>Данные правообладателя</li>
                  <li>Хеш-сумма 1 и хеш-сумма 2</li>
                  <li>Ссылка на страницу верификации</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="mt-12 text-center text-xl font-bold">Проверка для суда и эксперта</h3>
          <ol className="mt-6 grid gap-3">
            {VERIFY_STEPS.map((t, i) => (
              <li key={t} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm backdrop-blur-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/15 font-mono text-xs font-bold text-brand-300">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Рабочая зона: мастер + верификация + реестр */}
      <DepoWorkspace />

      <CtaButtons title="Задепонировали? Закрепите результат патентом" />
    </SiteLayout>
  );
}

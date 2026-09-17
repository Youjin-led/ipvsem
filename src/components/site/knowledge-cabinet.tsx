"use client";

import * as React from "react";
import { SectionHeading } from "./services";
import { KnowledgeIcon, CabinetIcon, ShieldIcon } from "./icons";
import { Button } from "@/components/ui/button";
import {
  Code,
  Cpu,
  FlaskConical,
  Palette,
  FileText,
  Gavel,
  Download,
  FolderUp,
  ListChecks,
  History,
  Printer,
  BookMarked,
  MessageSquare,
} from "lucide-react";

/* ============ Знания ============ */
const KNOWLEDGE_CATEGORIES = [
  {
    icon: Code,
    title: "IT и ПО",
    text: "Защита исходного кода, лицензирование, open source и коммерция.",
    count: "23 материала",
  },
  {
    icon: Cpu,
    title: "Инженерия",
    text: "Патентование устройств, промышленных образцов и топологий.",
    count: "18 материалов",
  },
  {
    icon: FlaskConical,
    title: "Наука",
    text: "Приоритет публикации, патенты и диссертации, соавторство.",
    count: "15 материалов",
  },
  {
    icon: Palette,
    title: "Дизайн и архитектура",
    text: "Авторское право на проекты, интерфейсы, макеты и UI/UX.",
    count: "12 материалов",
  },
  {
    icon: FileText,
    title: "Юридические конструкторы",
    text: "Шаблоны NDA, лицензионных договоров и договоров отчуждения.",
    count: "9 шаблонов",
  },
  {
    icon: Gavel,
    title: "Кейсы и споры",
    text: "Реальные разбирательства и выигранные дела (обезличенно).",
    count: "7 кейсов",
  },
];

export function Knowledge() {
  return (
    <section id="znaniya" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 dot-bg opacity-25" aria-hidden />
      <div className="orb anim-drift -right-20 top-1/4 h-72 w-72 bg-brand-500/30" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeading
            align="left"
            eyebrow="База знаний"
            title={
              <>
                Методички, которых{" "}
                <span className="text-gradient">нет у других</span>
              </>
            }
            description="Мы открыто делимся опытом: как защитить ПО, как правильно оформить ноу-хау, что делать, если украли код или дизайн. Берите и применяйте."
          />
          <div className="relative hidden justify-end lg:flex">
            <KnowledgeIcon className="h-32 w-32 opacity-80" />
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KNOWLEDGE_CATEGORIES.map((c, i) => (
            <article
              key={c.title}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60 lift"
              style={{ animation: `float-up 7s ease-in-out infinite ${i * 0.3}s` }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/0 blur-3xl transition-all duration-500 group-hover:bg-brand-500/20" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-brand-400">
                    {c.count}
                  </p>
                </div>
              </div>
              <p className="relative mt-4 text-sm text-muted-foreground">
                {c.text}
              </p>
              <div className="relative mt-5 flex items-center gap-1.5 text-xs text-brand-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="h-px w-6 bg-brand-400" />
                Открыть раздел
              </div>
            </article>
          ))}
        </div>

        {/* CTA методички */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-brand-400/30 bg-gradient-to-br from-brand-500/10 to-brand-700/5 p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  5 ошибок при защите IT-продукта
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Бесплатная методичка. Реальные кейсы, чек-листы и шаблоны
                  документов для разработчиков и стартапов.
                </p>
              </div>
            </div>
            <Button
              asChild
              className="shrink-0 bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-700/30"
            >
              <a href="#cta">Скачать PDF</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Личный кабинет ============ */
const CABINET_FEATURES = [
  {
    icon: FolderUp,
    title: "Загрузка и хранение объектов",
    text: "Загружайте исходный код, чертежи, статьи — система фиксирует дату и хэш автоматически.",
  },
  {
    icon: ListChecks,
    title: "Статусы заявок в Роспатент",
    text: "Отслеживайте каждый этап: подача, экспертиза, запросы, выдача охранного документа.",
  },
  {
    icon: History,
    title: "История свидетельств и патентов",
    text: "Все объекты в одном месте с напоминаниями о продлении и подтверждении приоритета.",
  },
  {
    icon: Printer,
    title: "Заказ типографии",
    text: "Прямо из интерфейса — свидетельства на защищённых бланках, книги, альбомы и каталоги.",
  },
  {
    icon: BookMarked,
    title: "Доступ к методичкам",
    text: "Закрытые вебинары, шаблоны договоров и видеоразборы доступны только участникам общества.",
  },
  {
    icon: MessageSquare,
    title: "Связь с экспертом",
    text: "Закреплённый патентный поверенный отвечает на вопросы и сопровождает сделку.",
  },
];

export function Cabinet() {
  return (
    <section id="cabinet" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Визуальная часть — макет кабинета */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-1 backdrop-blur-sm shadow-2xl shadow-brand-900/20">
              <div className="h-full w-full rounded-[1.4rem] bg-background/60 p-5">
                {/* Шапка кабинета */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <CabinetIcon className="h-8 w-8" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Личный кабинет
                      </p>
                      <p className="text-xs font-semibold">ID: AU-2026-00847</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-glow/15 px-2 py-0.5 text-[9px] font-medium text-glow">
                    ONLINE
                  </span>
                </div>

                {/* Виджеты */}
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <Widget label="Свидетельств" value="14" trend="+2" />
                  <Widget label="Патентов" value="3" trend="+1" />
                  <Widget label="Заявок" value="5" trend="в работе" />
                  <Widget label="Активов" value="22" trend="↗" />
                </div>

                {/* График */}
                <div className="mt-4 rounded-xl border border-border/40 bg-background/40 p-3">
                  <div className="mb-2 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Активность за 6 мес.</span>
                    <span className="text-brand-300">+47%</span>
                  </div>
                  <svg viewBox="0 0 200 50" className="h-12 w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cab-chart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--brand-400)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--brand-400)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 40 L33 35 L66 28 L100 30 L133 18 L166 12 L200 8 L200 50 L0 50 Z"
                      fill="url(#cab-chart)"
                    />
                    <path
                      d="M0 40 L33 35 L66 28 L100 30 L133 18 L166 12 L200 8"
                      stroke="var(--brand-400)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        values="0 600;600 0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>

                {/* Лента событий */}
                <div className="mt-4 space-y-2">
                  {[
                    { t: "Свидетельство AS-00847 готово", c: "text-glow" },
                    { t: "Заявка №2026/1234 — экспертиза", c: "text-brand-300" },
                    { t: "Заказ печати: книга, 200 стр.", c: "text-muted-foreground" },
                  ].map((e, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/30 px-2.5 py-1.5"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-current ${e.c}`} />
                      <span className="text-[11px]">{e.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Декор */}
            <div className="absolute -left-4 -top-4 anim-float">
              <span className="rounded-full border border-brand-400/40 bg-card/80 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-md">
                Все этапы видны
              </span>
            </div>
            <div className="absolute -bottom-4 -right-4 anim-float-delay">
              <span className="rounded-full border border-brand-400/40 bg-card/80 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-md">
                Прозрачно и быстро
              </span>
            </div>
          </div>

          {/* Текст + фичи */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Личный кабинет"
              title={
                <>
                  Ваш центр управления{" "}
                  <span className="text-gradient">интеллектуальной собственностью</span>
                </>
              }
              description="В кабинете видно всё: от момента загрузки объекта до получения патента и печати свидетельства. Без кабинета тоже работаем — через обратную связь."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {CABINET_FEATURES.map((f, i) => (
                <article
                  key={f.title}
                  className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60"
                  style={{ animation: `float-up 6s ease-in-out infinite ${i * 0.3}s` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{f.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <Button
                asChild
                className="bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-700/30"
              >
                <a href="/cabinet">Создать личный кабинет</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Widget({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/40 p-2.5">
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-lg font-bold text-foreground">{value}</span>
        <span className="text-[10px] font-mono text-brand-300">{trend}</span>
      </div>
    </div>
  );
}

/* ============ Защита и споры ============ */
export function Protection() {
  return (
    <section id="protection" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-bg grid-bg-fade opacity-30" aria-hidden />
      <div className="orb anim-drift-slow left-0 top-1/3 h-72 w-72 bg-brand-700/30" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div className="absolute inset-0 -z-10 anim-spin-slow rounded-full conic-ring opacity-25 blur-2xl" />
              <ShieldIcon className="absolute inset-0 m-auto h-1/2 w-1/2" />
              {/* Орбитальные точки */}
              <div className="absolute inset-0 anim-spin-slow">
                {Array.from({ length: 4 }).map((_, i) => {
                  const a = (i * 90 * Math.PI) / 180;
                  const x = 50 + 48 * Math.cos(a);
                  const y = 50 + 48 * Math.sin(a);
                  return (
                    <span
                      key={i}
                      className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-lg"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        animation: `pulse-glow 3s ease-in-out infinite ${i * 0.5}s`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Защита и споры"
              title={
                <>
                  Если права нарушены —{" "}
                  <span className="text-gradient">мы рядом</span>
                </>
              }
              description="Досудебные претензии, контрольные закупки, представительство в судах и Палате по патентным спорам. Подкрепляем исковую позицию нашими свидетельствами и заключениями."
            />

            <div className="mt-8 space-y-4">
              {[
                {
                  t: "Досудебная работа",
                  d: "Претензии, переговоры, контрольные закупки. Часто этого достаточно — нарушитель отзывает продукт добровольно.",
                },
                {
                  t: "Судебное представительство",
                  d: "Подготовка иска, участие в заседаниях, защита позиции в судах общей юрисдикции и арбитраже.",
                },
                {
                  t: "Палата по патентным спорам",
                  d: "Оспаривание и защита патентов, возражения против действий Роспатента.",
                },
              ].map((item, i) => (
                <div
                  key={item.t}
                  className="group flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/15 font-mono text-sm font-bold text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{item.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

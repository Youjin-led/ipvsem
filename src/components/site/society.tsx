"use client";

import * as React from "react";
import { SectionHeading } from "./services";
import { CommunityIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { BookOpen, Eye, Printer, Scale, Users, Zap } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Scale,
    title: "Зарегистрированная методика",
    text: "Свидетельства депонирования принимаются судами как доказательство приоритета.",
  },
  {
    icon: BookOpen,
    title: "Открытая база знаний",
    text: "Методички, шаблоны договоров, разборы кейсов — то, чего нет у других.",
  },
  {
    icon: Eye,
    title: "Прозрачность",
    text: "Каждый шаг виден в личном кабинете. Без кабинета — через обратную связь.",
  },
  {
    icon: Printer,
    title: "Своя типография",
    text: "Физическое воплощение прав: свидетельства, книги, технические альбомы.",
  },
  {
    icon: Users,
    title: "Сообщество экспертов",
    text: "Патентные поверенные, учёные, IP-юристы, инженеры и IT-специалисты.",
  },
  {
    icon: Zap,
    title: "Скорость 24 часа",
    text: "Экспресс-депонирование для тех, кому нужно «ещё вчера».",
  },
];

const TEAM = [
  { role: "Патентный поверенный", focus: "Роспатент и европейские офисы", exp: "12+ лет" },
  { role: "Доктор наук", focus: "Научные приоритеты и публикации", exp: "20+ лет" },
  { role: "IT-юрист", focus: "Защита ПО, API и алгоритмов", exp: "9+ лет" },
  { role: "Инженер-патентовед", focus: "Чертежи, 3D, техдокументация", exp: "11+ лет" },
];

export function Society() {
  return (
    <section id="obshestvo" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      {/* Фон */}
      <div className="absolute inset-0 -z-10 grid-bg grid-bg-fade opacity-40" aria-hidden />
      <div className="orb anim-drift-slow right-0 top-20 h-80 w-80 bg-glow/25" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Левая колонка — вступление */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-glow anim-blink" />
              Сообщество авторов
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Мы —{" "}
              <span className="text-gradient">экспертный центр</span>, а не просто
              сервис
            </h2>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              «Сообщество Авторов» объединяет патентных поверенных, учёных со
              степенями, IP-юристов, инженеров и IT-специалистов. Мы понимаем
              технологии, конструкции, код и научную логику — и переводим это на
              язык права.
            </p>

            {/* Большая иконка-сообщество */}
            <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
              <CommunityIcon className="absolute inset-0 m-auto h-2/3 w-2/3 opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-brand-400/30 bg-background/70 p-3 backdrop-blur-md">
                <p className="text-xs text-muted-foreground">
                  Наша миссия — сделать так, чтобы каждый автор мог не только
                  зафиксировать своё произведение, но и грамотно выстроить
                  вокруг него правовую защиту.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                asChild
                className="bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-700/30"
              >
                <a href="#cta">Присоединиться к сообществу</a>
              </Button>
            </div>
          </div>

          {/* Правая колонка — преимущества + команда */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ADVANTAGES.map((a, i) => (
                <article
                  key={a.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60"
                  style={{ animation: `float-up 7s ease-in-out infinite ${i * 0.3}s` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:scale-110">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{a.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{a.text}</p>
                </article>
              ))}
            </div>

            {/* Команда */}
            <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Команда
                </h3>
                <span className="text-xs text-brand-300">и ещё 30+ экспертов</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {TEAM.map((t, i) => (
                  <div
                    key={t.role}
                    className="group flex items-start gap-3 rounded-xl border border-border/40 bg-background/40 p-3 transition-colors hover:border-brand-400/40"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-xs font-bold text-white"
                      style={{ animation: `float-up 5s ease-in-out infinite ${i * 0.5}s` }}
                    >
                      {t.role.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{t.role}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {t.focus}
                      </p>
                      <p className="mt-1 text-[10px] font-mono text-brand-400">
                        {t.exp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Сравнение с конкурентами ============ */
const COMPARE = [
  { feature: "Депонирование за 24 часа", us: true, others: false },
  { feature: "Сопровождение до патента", us: true, others: false },
  { feature: "Стратегия патентного портфеля", us: true, others: false },
  { feature: "Своя типография (свидетельства, книги)", us: true, others: false },
  { feature: "Открытая база знаний и методички", us: true, others: false },
  { feature: "Обеспечена доказательная база для судов РФ и в иностранных юрисдикциях", us: true, others: "partial" },
  { feature: "Личный кабинет с прозрачными статусами", us: true, others: "partial" },
  { feature: "Команда: патентные поверенные + учёные + IT", us: true, others: false },
];

export function Comparison() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Отличия"
          title={
            <>
              Чем мы отличаемся от{" "}
              <span className="text-gradient">РАО, Копирус и НРИС</span>
            </>
          }
          description="Мы не просто депонируем — мы сопровождаем автора до патента, портфеля и физического воплощения. Сравните по ключевым параметрам."
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm">
          <div className="grid grid-cols-[1fr_auto_auto] items-center border-b border-border/60 bg-background/40 px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">
            <span>Параметр</span>
            <span className="px-6 text-center font-semibold text-brand-300">
              Сообщество Авторов
            </span>
            <span className="px-6 text-center">Другие сервисы</span>
          </div>
          <ul>
            {COMPARE.map((row, i) => (
              <li
                key={row.feature}
                className={`grid grid-cols-[1fr_auto_auto] items-center px-6 py-4 text-sm transition-colors hover:bg-brand-500/5 ${
                  i % 2 === 0 ? "bg-background/20" : ""
                }`}
              >
                <span className="pr-4 text-balance leading-snug">{row.feature}</span>
                <span className="flex items-center justify-center px-6">
                  <Mark value={true} />
                </span>
                <span className="flex items-center justify-center px-6">
                  <Mark value={row.others} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Mark({ value }: { value: boolean | "partial" }) {
  if (value === true) {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M5 13 L10 18 L19 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-400">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M5 12 H19"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M6 6 L18 18 M18 6 L6 18"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

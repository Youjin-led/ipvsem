"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import {
  DepositIcon,
  PatentIcon,
  StrategyIcon,
  PrintIcon,
} from "./icons";

type Service = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  subtitle: string;
  points: string[];
  cta: string;
  href: string;
  accent: string;
};

const SERVICES: Service[] = [
  {
    id: "deponirovanie",
    icon: DepositIcon,
    tag: "01 / Фиксация",
    title: "Депонирование",
    subtitle:
      "Зафиксируйте авторство за 24 часа. Ваше свидетельство примут в суде как доказательство приоритета.",
    points: [
      "Код, 3D-модели, схемы, статьи, дизайн-макеты",
      "Зарегистрированная методика хранения",
      "Электронное + печатное свидетельство",
      "Поддержка и подтверждение 5 лет",
    ],
    cta: "Задепонировать объект",
    href: "/deponirovanie",
    accent: "from-brand-400 to-brand-600",
  },
  {
    id: "rospatent",
    icon: PatentIcon,
    tag: "02 / Регистрация",
    title: "Роспатент",
    subtitle:
      "Превращаем разработку в официальный охранный документ. Полное сопровождение от оценки до выдачи.",
    points: [
      "Изобретения, полезные модели, промобразцы",
      "Программы для ЭВМ, базы данных, топологии",
      "Предварительная оценка патентоспособности",
      "Переписка с экспертизой и ответы на запросы",
    ],
    cta: "Проверить патентоспособность",
    href: "/rospatent",
    accent: "from-brand-500 to-brand-700",
  },
  {
    id: "strategiya",
    icon: StrategyIcon,
    tag: "03 / Стратегия",
    title: "Патентный портфель",
    subtitle:
      "От одиночной идеи — к системе нематериальных активов, которая работает на бизнес и привлекает инвестиции.",
    points: [
      "Анализ продукта, рынка и конкурентов",
      "Дорожная карта защиты технологии",
      "Договоры: отчуждение, лицензии, NDA",
      "Масштабирование портфеля под рост бизнеса",
    ],
    cta: "Получить дорожную карту",
    href: "/strategiya",
    accent: "from-brand-300 to-brand-600",
  },
  {
    id: "tipografiya",
    icon: PrintIcon,
    tag: "04 / Воплощение",
    title: "Типография",
    subtitle:
      "Превращаем цифровые свидетельства и рукописи в осязаемые документы, книги и презентационные альбомы.",
    points: [
      "Свидетельства на защищённых бланках",
      "Научные монографии и сборники тезисов",
      "Технические альбомы и каталоги",
      "Сигнальные экземпляры и малые тиражи",
    ],
    cta: "Заказать печать",
    href: "/tipografiya",
    accent: "from-glow to-brand-500",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Экосистема защиты"
          title={
            <>
              Четыре направления —{" "}
              <span className="text-gradient">одна инфраструктура</span>
            </>
          }
          description="Фиксируем авторство → готовим к регистрации → строим портфель → печатаем и издаём. Все этапы работают в едином интерфейсе и под контролем экспертов."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article
      id={service.id}
      className="group relative scroll-mt-20 overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-7 backdrop-blur-sm lift gradient-border"
    >
      {/* Фоновое свечение при наведении */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} opacity-15 blur-md transition-opacity duration-500 group-hover:opacity-40`}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-400/30 bg-card/80 backdrop-blur-sm">
              <Icon className="h-10 w-10 transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-400">
              {service.tag}
            </span>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">
              {service.title}
            </h3>
          </div>
        </div>
      </div>

      <p className="relative mt-5 text-sm text-muted-foreground sm:text-base">
        {service.subtitle}
      </p>

      <ul className="relative mt-6 space-y-2.5">
        {service.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-foreground/90">{p}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-7">
        <Button
          asChild
          variant="ghost"
          className="group/btn -ml-3 text-brand-300 hover:bg-brand-500/10 hover:text-brand-200"
        >
          <a href={service.href}>
            {service.cta}
            <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </Button>
      </div>
    </article>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-glow anim-blink" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

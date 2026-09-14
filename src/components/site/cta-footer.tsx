"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/paths";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Phone } from "lucide-react";

/* ============ Финальный CTA ============ */
export function FinalCTA() {
  return (
    <section id="cta" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-20 grid-bg anim-grid-pan opacity-50" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-brand-950/10 to-background" />
      <div className="orb anim-drift -left-20 top-10 h-80 w-80 bg-brand-500/30" aria-hidden />
      <div className="orb anim-drift-slow right-0 bottom-0 h-72 w-72 bg-glow/25" aria-hidden />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-400/30 bg-card/50 p-8 backdrop-blur-md sm:p-12 lg:p-16">
          {/* Декоративные углы */}
          <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 border-l-2 border-t-2 border-brand-400/50 rounded-tl-[2rem]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 border-r-2 border-b-2 border-brand-400/50 rounded-br-[2rem]" />
          {/* Сканирующая линия */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow to-transparent anim-shimmer" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
              </span>
              Вступление в Сообщество Авторов
            </div>

            <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Перестаньте бояться за свои{" "}
              <span className="text-gradient glow-text">идеи</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              Задепонируйте объект за 24 часа, получите свидетельство, при
              необходимости зарегистрируйте патент и постройте портфель активов.
              Один экспертный центр — все инструменты защиты.
            </p>

            {/* Email-форма */}
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.querySelector("input") as HTMLInputElement;
                if (input?.value) {
                  form.reset();
                }
              }}
            >
              <Input
                type="email"
                required
                placeholder="your@email.com"
                className="border-border/70 bg-background/60 backdrop-blur-sm"
                aria-label="Email"
              />
              <Button
                type="submit"
                className="group shrink-0 bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-700/30 hover:shadow-xl hover:shadow-brand-500/40"
              >
                Задепонировать
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <p className="mt-3 text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              Без спама — только по делу.
            </p>

            {/* Альтернативные действия */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span>или напишите нам:</span>
              <a
                href="mailto:patentvsem@mail.ru"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 transition-colors hover:border-brand-400/60 hover:text-brand-300"
              >
                <Mail className="h-3.5 w-3.5" />
                patentvsem@mail.ru
              </a>
              <a
                href="tel:+79689973835"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 transition-colors hover:border-brand-400/60 hover:text-brand-300"
              >
                <Phone className="h-3.5 w-3.5" />
                +7 968 997-38-35
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer в стиле znakvsem.ru ============ */
const FOOTER_DETAILS = [
  { label: "ИП", value: "Довлатов Игорь Мамедяревич" },
  { label: "ИНН", value: "772612579857" },
  { label: "ОГРН/ОГРНИП", value: "319774600637982" },
  {
    label: "Электронная почта",
    value: "patentvsem@mail.ru",
    href: "mailto:patentvsem@mail.ru",
  },
  {
    label: "Телефон",
    value: "+7 968 997-38-35",
    href: "tel:+79689973835",
  },
  {
    label: "Биржа знаков",
    value: "znakvsem.ru",
    href: "https://znakvsem.ru",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-brand-950/10" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:px-8 lg:py-16">
        {/* Бренд */}
        <div className="grid content-start gap-3">
          <div className="flex items-center gap-3">
            <Image src={withBasePath("/LOGO.png")} alt="" aria-hidden width={2035} height={773} className="h-10 w-auto sm:h-12" />
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-400">
              IP EcoSystem · ПатентВсем
            </p>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Сообщество <span className="text-gradient">Авторов</span>
          </h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Депонирование, патентование, стратегия и типография в одном
            экспертном центре ПатентВсем. Свидетельства, которые принимают суды.
          </p>

          {/* Основные разделы */}
          <nav className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { label: "Сервисы", href: "/services" },
              { label: "Роспатент", href: "/rospatent" },
              { label: "Типография", href: "/tipografiya" },
              { label: "Общество", href: "/obshestvo" },
              { label: "Знания", href: "/znaniya" },
              { label: "Депонирование", href: "/deponirovanie" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-brand-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="tel:+79689973835"
            className="mt-2 w-fit text-base font-bold text-brand-400 underline decoration-brand-400/50 underline-offset-4 transition-colors hover:text-brand-300"
          >
            +7 968 997-38-35
          </a>
        </div>

        {/* Реквизиты */}
        <div className="grid gap-3 sm:grid-cols-2">
          {FOOTER_DETAILS.map((d) => (
            <div
              key={d.label}
              className="grid min-h-[92px] content-start gap-1.5 rounded-lg border border-brand-400/15 bg-gradient-to-br from-white to-[#f7efd8] p-4 text-[#141414] transition-colors"
            >
              <span className="text-[13px] text-[#666666]">{d.label}</span>
              {d.href ? (
                <a
                  href={d.href}
                  target={d.external ? "_blank" : undefined}
                  rel={d.external ? "noopener noreferrer" : undefined}
                  className="break-words text-sm font-bold text-[#141414] underline decoration-brand-400/60 underline-offset-3 transition-colors hover:text-brand-600"
                >
                  {d.value}
                </a>
              ) : (
                <strong className="break-words text-sm font-bold">
                  {d.value}
                </strong>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Нижняя строка */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            © 2026 IPvsem.ru — Сообщество Авторов. Все права защищены и
            задепонированы.
          </p>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-glow anim-blink" />
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </footer>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { FinalCTA } from "@/components/site/cta-footer";
import { CtaButtons } from "@/components/site/cta-buttons";
import { CommunityIcon } from "@/components/site/icons";
import { SectionHeading } from "@/components/site/services";
import { ArrowRight, Award, ExternalLink, Landmark, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "О нас — экспертный центр ПатентВсем — IPvsem.ru",
  description:
    "Сообщество Авторов: патентные поверенные, кандидаты наук, IP-юристы. 140+ патентов, 80+ товарных знаков. Команда, цифры, партнёры и кейсы.",
  keywords: [
    "о компании",
    "патентные поверенные",
    "эксперты ИС",
    "ПатентВсем",
    "команда",
  ],
  openGraph: {
    title: "О нас — экспертный центр ПатентВсем — IPvsem.ru",
    description:
      "Патентные поверенные, учёные, IP-юристы. 140+ патентов и 80+ товарных знаков.",
    type: "website",
    locale: "ru_RU",
  },
};

/* Данные с сайта patentvsem.ru (разделы «Сотрудники», «О нас») */
const STATS = [
  { value: "140+", label: "патентов подготовлено и зарегистрировано" },
  { value: "80+", label: "товарных знаков" },
  { value: "60+", label: "программ для ЭВМ" },
  { value: "40+", label: "авторских свидетельств получено" },
  { value: "260+", label: "патентных поисков проведено" },
  { value: "30+", label: "патентных исследований по ГОСТ" },
];

const KEY_EXPERTS = [
  {
    name: "Беркутова Наталья Николаевна",
    role: "Патентный поверенный, ПП №957",
    href: "https://rospatent.gov.ru/en/patent-attorneys/957",
  },
  {
    name: "Павкин Дмитрий Юрьевич",
    role: "к.т.н., эксперт своей области",
    href: "https://yras.ru/about/members/668-pavkin-dmitrij-yurevich.html",
  },
  {
    name: "Васина Марина Юрьевна",
    role: "Патентный поверенный, ПП №2246",
    href: "https://rospatent.gov.ru/en/patent-attorneys/2246",
  },
];

const MORE_EXPERTS = [
  "Туленинов Николай Николаевич — патентный поверенный, ПП №1416",
  "Благов Дмитрий Андреевич — к.б.н., эксперт",
  "Зайков Иван Александрович — патентный поверенный, ПП №2527",
  "Базаев Савр Олегович — к.с.-х.н., эксперт",
  "Комков Илья Владимирович — специалист",
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="О компании"
        title={
          <>
            <span className="text-gradient">О нас</span>
          </>
        }
        description="Сообщество Авторов — экспертный центр ПатентВсем, а не просто сервис. Понимаем технологии, конструкции, код и научную логику — и переводим это на язык права."
        icon={<CommunityIcon className="h-10 w-10" />}
        crumbs={[{ label: "О нас" }]}
      />

      {/* Цифры */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-card/40 p-4 text-center backdrop-blur-sm"
              >
                <p className="text-gradient text-3xl font-black">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Основатель */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-brand-400/25 bg-card/40 p-6 backdrop-blur-sm sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
                  Основатель
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Игорь Довлатов
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  Основатель компании «ПатентВсем» (с 2019 года). Ведёт авторский
                  блог в TenChat — более 6 000 подписчиков: разборы реальных
                  кейсов, дайджесты новостей ИС и свежих патентов РФ.
                </p>
              </div>
              <a
                href="https://tenchat.ru/Dovlatov_IM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
              >
                Блог в TenChat
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Команда"
            title={
              <>
                Ключевые <span className="text-gradient">эксперты</span>
              </>
            }
            description="Патентные поверенные из реестра Роспатента, кандидаты наук и отраслевые эксперты. Фото и биографии — с сайта ПатентВсем."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {KEY_EXPERTS.map((m) => (
              <article
                key={m.name}
                className="group rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-card/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:scale-110">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-brand-300 underline decoration-brand-400/60 underline-offset-4 hover:text-brand-200"
                >
                  Проверить в реестре
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {MORE_EXPERTS.map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                {m}
              </li>
            ))}
          </ul>
          <a
            href="https://patentvsem.ru/sotrudniki"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-300 underline decoration-brand-400/60 underline-offset-4 hover:text-brand-200"
          >
            Все сотрудники на сайте ПатентВсем
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Партнёры и аккредитация */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Экосистема"
            title={
              <>
                Партнёры и <span className="text-gradient">аккредитация</span>
              </>
            }
            align="left"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
              <Landmark className="h-6 w-6 text-brand-300" />
              <h3 className="mt-3 text-lg font-bold">ООО «Патентные Технологии»</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Партнёрская платформа и портфолио.
              </p>
              <a
                href="https://ptn.su/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-brand-300 underline decoration-brand-400/60 underline-offset-4"
              >
                ptn.su <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
            <article className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
              <Award className="h-6 w-6 text-brand-300" />
              <h3 className="mt-3 text-lg font-bold">Абраменко Олег Игоревич</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Патентный поверенный, ПП №1905.
              </p>
              <a
                href="https://rospatent.gov.ru/en/patent-attorneys/1905"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-brand-300 underline decoration-brand-400/60 underline-offset-4"
              >
                Проверить в реестре <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
            <article className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
              <Star className="h-6 w-6 text-brand-300" />
              <h3 className="mt-3 text-lg font-bold">Аккредитация</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Коллектив аккредитован Роспатентом и Евразийской патентной
                организацией (ЕАПО).
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Кейсы и отзывы — тизеры */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="text-xl font-bold">Кейсы и портфолио</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                7 разборов из практики: задача клиента и решение — от держателя
                заготовок до дозиметров. Полные тексты — в блоге TenChat.
              </p>
              <Link
                href="/cases"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-brand-400/40 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-brand-300 transition-all hover:bg-brand-500/10"
              >
                Смотреть кейсы
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="text-xl font-bold">Отзывы клиентов</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Оставьте отзыв сами — форма открыта. Письма поддержки и
                скриншоты готовятся к публикации.
              </p>
              <Link
                href="/reviews"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
              >
                Читать и оставить отзыв
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaButtons title="Познакомились — теперь защитим вашу идею" />
      <FinalCTA />
    </SiteLayout>
  );
}

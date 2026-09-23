import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { FinalCTA } from "@/components/site/cta-footer";
import { CtaButtons } from "@/components/site/cta-buttons";
import { KnowledgeIcon } from "@/components/site/icons";
import { SectionHeading } from "@/components/site/services";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Кейсы — реальные патенты клиентов — IPvsem.ru",
  description:
    "От наброска до патента: металлообработка, медицина, строительство, судмедэкспертиза, радиоэлектроника. Задача и решение по каждому кейсу.",
  keywords: ["кейсы", "патенты", "портфолио", "примеры работ"],
  openGraph: {
    title: "Кейсы — реальные патенты клиентов — IPvsem.ru",
    description: "Задача и решение: 7 реальных кейсов из практики.",
    type: "website",
    locale: "ru_RU",
  },
};

const CASES = [
  {
    tag: "Металлообработка",
    title: "От наброска на салфетке до патента",
    task: "Предприниматель Клим Породнов не мог надёжно зажать на станке профили сложного сечения — брак и потеря времени. Принёс набросок держателя с производства.",
    solution:
      "Держатель-фиксатор со сквозным отверстием под сечение профиля (3D-печать). Патентный поиск по МПК, заявка №2023107393.",
    result: "Патент на полезную модель RU219083U1 за 3 месяца. Номер патента — на сайте компании и в презентациях.",
    href: "https://tenchat.ru/media/5636847-ot-nabroska-na-salfetke-do-patenta-keys-predprinimatelya-iz-metalloobrabotki",
  },
  {
    tag: "Медицина",
    title: "Как кардиолог усовершенствовал привычный метод",
    task: "Кардиолог Элдор Абдурозиков (к.м.н.) в пик COVID-2020 захотел дистанционно оценивать состояние лёгких пациентов.",
    solution:
      "Патентный поиск, заявка, доработка формулы после замечаний экспертизы — вторая заявка с нужным объёмом прав.",
    result: "Патент выдан. Инструмент для практики и партнёрств.",
    href: "https://tenchat.ru/media/5545629-kak-kardiolog-usovershenstvoval-metod-znakomiy-kazhdomu-vrachu",
  },
  {
    tag: "Медицина / Товарный знак",
    title: "Патентный фундамент для медицины будущего",
    task: "Клиника «Академоптика» (Светлана Эдуардовна): отказ в регистрации знака Myophone из-за сходства с My iPhone (Apple) + нужен патент на способ лечения миопии у детей.",
    solution:
      "Возражение: разные сферы (медуслуги против ПО) и звучание. Патент на способ акустической рефлексотерапии: диагностика → один из трёх алгоритмов.",
    result: "Знак зарегистрирован, патент выдан. Снижение невротизации, нормализация аккомодации у пациентов.",
    href: "https://tenchat.ru/media/5424743-patentniy-fundament-dlya-meditsiny-buduschego-ot-spora-s-gigantom-do-innovatsii",
  },
  {
    tag: "Строительство",
    title: "Мобильный фундамент для быстрого строительства",
    task: "Юрий Мальцев (проект «Мобильные заводы модульных зданий»): нужны быстрые фундаменты каркасных домов на неровном грунте без тяжёлой техники, с демонтажом и переносом.",
    solution:
      "Телескопическая стойка: основание из двух секций, опорный блок со штангами, грубая регулировка скобой, точная — резьбой с гайкой и стопором.",
    result: "Сокращение времени возведения фундаментов без экскаваторов и разработки грунта.",
    href: "https://tenchat.ru/media/5104695-mobilniy-fundament-patent-na-tekhnologiyu-dlya-bystrogo-stroitelstva",
  },
  {
    tag: "Судмедэкспертиза",
    title: "Как пластина с ручкой стала патентом",
    task: "Группа судмедэкспертов: давность смерти идиомускулярной пробой определяли раздельно стержнем и линейкой — неудобно, травмоопасно, неточно.",
    solution:
      "Полезная модель: линейка 340–360 мм со скруглением, ручкой и двумя шкалами — стандартный безопасный инструмент без электроники.",
    result: "Точная воспроизводимая методика для экспертов.",
    href: "https://tenchat.ru/media/5151527-kak-prostaya-plastina-s-ruchkoy-stala-patentom-dlya-sudmedekspertov",
  },
  {
    tag: "Зоотовары",
    title: "Устройство для питомцев: от идеи до продукта",
    task: "Александр (digital-агентство SherNet): идеальной шлейки для своей собаки на рынке не было — нужна защита продукта в конкурентной нише.",
    solution:
      "Запатентована архитектура: крепление на кнопку-пин вместо липучек, хребтовый ремень с пряжкой, распределение нагрузки по связке ремней.",
    result: "Реальный продукт на рынке, готовится заявка на усовершенствованную модель.",
    href: "https://tenchat.ru/media/4961151-kak-uspeshniy-marketolog-sozdal-i-zapatentoval-ustroystvo-dlya-pitomtsev",
  },
  {
    tag: "Радиоэлектроника",
    title: "Позиции в нише радиоэлектронных измерений",
    task: "«СофтЭксперт» (сотрудничество с 2021 года): системно защитить активы, расширить портфель, повысить капитализацию.",
    solution:
      "P-I-N-диодный дозиметр, способ управления цепью питания счётчика Гейгера-Мюллера, 15 программ для ЭВМ, способ дозиметрического контроля.",
    result: "НМА поставлены на баланс. Новый договор — на 5 патентов и 10 программ.",
    href: "https://tenchat.ru/media/4194441-kak-my-pomogayem-ukreplyat-pozitsii-v-nishe-radioelektronnykh-izmereniy",
  },
];

export default function CasesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Портфолио"
        title={
          <>
            <span className="text-gradient">Кейсы</span> из практики
          </>
        }
        description="Коротко по каждому: задача клиента и предложенное решение. Полные разборы — в блоге TenChat."
        icon={<KnowledgeIcon className="h-10 w-10" />}
        crumbs={[{ label: "О нас", href: "/about" }, { label: "Кейсы" }]}
      />

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="7 кейсов"
            title={
              <>
                От задачи — <span className="text-gradient">до охранного документа</span>
              </>
            }
            align="left"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {CASES.map((c, i) => (
              <article
                key={c.href}
                className="group flex flex-col rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-brand-400/50 hover:bg-card/60 sm:p-7"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-brand-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-300">
                    {c.tag}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-bold tracking-tight">{c.title}</h3>
                <div className="mt-4 flex-1 space-y-3 text-sm">
                  <p>
                    <span className="font-semibold text-brand-300">Задача. </span>
                    <span className="text-muted-foreground">{c.task}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-brand-300">Решение. </span>
                    <span className="text-muted-foreground">{c.solution}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-brand-300">Результат. </span>
                    {c.result}
                  </p>
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-xs font-semibold text-brand-300 underline decoration-brand-400/60 underline-offset-4 hover:text-brand-200"
                >
                  Читать разбор в TenChat
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaButtons title="Ваша задача может стать следующим кейсом" />
      <FinalCTA />
    </SiteLayout>
  );
}

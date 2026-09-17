import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/site/services";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты — IPvsem.ru",
  description:
    "Свяжитесь с Сообществом Авторов: телефон +7 968 997-38-35, почта patentvsem@mail.ru, форма обратной связи. Ответим в течение рабочего дня.",
  keywords: ["контакты", "телефон", "обратная связь", "ПатентВсем"],
  openGraph: {
    title: "Контакты — IPvsem.ru",
    description:
      "Телефон, почта и форма обратной связи Сообщества Авторов.",
    type: "website",
    locale: "ru_RU",
  },
};

const CONTACTS = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 968 997-38-35",
    href: "tel:+79689973835",
  },
  {
    icon: Mail,
    label: "Электронная почта",
    value: "patentvsem@mail.ru",
    href: "mailto:patentvsem@mail.ru",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "Москва, 1-ый Институтский проезд, д. 5",
    href: "https://yandex.ru/maps/?text=Москва, 1-ый Институтский проезд, 5",
    external: true,
  },
  {
    icon: Clock,
    label: "Время работы",
    value: "Будние дни с 10:00 до 20:00",
  },
];

export default function KontaktyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="На связи"
        title={
          <>
            <span className="text-gradient">Контакты</span>
          </>
        }
        description="Позвоните, напишите или оставьте заявку — ответим в течение рабочего дня."
        crumbs={[{ label: "Контакты" }]}
      />

      {/* Контакты + форма */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Как нас найти"
                title={
                  <>
                    Всегда <span className="text-gradient">на связи</span>
                  </>
                }
              />
              <div className="mt-8 grid gap-4">
                {CONTACTS.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={"external" in c && c.external ? "_blank" : undefined}
                          rel={"external" in c && c.external ? "noopener noreferrer" : undefined}
                          className="mt-1 inline-flex min-h-11 items-center text-base font-bold underline decoration-brand-400/60 underline-offset-4 transition-colors hover:text-brand-300"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-base font-bold">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Схема проезда — заглушка под карту */}
              <div className="mt-6 flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/20 p-6 text-center">
                <p className="max-w-xs text-sm text-muted-foreground">
                  Интерактивная схема проезда будет добавлена сюда. Работаем по
                  всей России — личная встреча по договорённости.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

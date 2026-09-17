import Link from "next/link";
import { ArrowRight, MessagesSquare, Users } from "lucide-react";

const ACTIONS = [
  {
    label: "Задепонировать сейчас",
    href: "/deponirovanie#start",
    primary: true,
    icon: ArrowRight,
  },
  {
    label: "Получить консультацию",
    href: "/kontakty",
    primary: false,
    icon: MessagesSquare,
  },
  {
    label: "Вступить в сообщество",
    href: "/obshestvo#cabinet",
    primary: false,
    icon: Users,
  },
];

/**
 * Единый блок призывов к действию (ТЗ 4.3).
 * Ставится на каждую страницу. Кнопки — не менее 44px (min-h-11).
 */
export function CtaButtons({ title }: { title?: string }) {
  return (
    <section aria-label="Действия" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-400/25 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
          {title && (
            <h2 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
              {title}
            </h2>
          )}
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            {ACTIONS.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className={
                  a.primary
                    ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
                    : "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-brand-400/40 bg-brand-500/10 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-brand-300 transition-all hover:-translate-y-0.5 hover:border-brand-400/70 hover:bg-brand-500/20"
                }
              >
                <a.icon className="h-4 w-4" />
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

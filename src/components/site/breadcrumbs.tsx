"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, House } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

/**
 * Навигационная цепочка («хлебные крошки», ТЗ 2.3):
 * возврат на главную, на предыдущий раздел и на предыдущий шаг (кнопка «Назад»).
 * Интерактивные элементы — не менее 44px (min-h-11) для тач-экранов.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const router = useRouter();
  return (
    <nav aria-label="Хлебные крошки" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border/60 bg-card/40 px-3 text-sm text-muted-foreground transition-colors hover:border-brand-400/60 hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад
      </button>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link
            href="/"
            aria-label="На главную"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-muted-foreground transition-colors hover:text-brand-300"
          >
            <House className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60"
                aria-hidden
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-md px-2 text-muted-foreground transition-colors hover:text-brand-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="inline-flex min-h-11 items-center px-2 font-medium text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

/**
 * Навигационная цепочка («хлебные крошки»).
 * Всегда ведёт на главную и на предыдущий раздел.
 * Ссылки — не менее 44px по высоте (min-h-11) для тач-экранов.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-6">
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

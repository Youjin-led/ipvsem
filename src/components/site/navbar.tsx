"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Logo3D } from "@/components/site/logo-3d";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Услуги",
    href: "/services",
    children: [
      { label: "Депонирование", href: "/deponirovanie" },
      { label: "Патентование", href: "/rospatent" },
      { label: "Стратегия", href: "/strategiya" },
      { label: "Типография и дизайн", href: "/tipografiya" },
    ],
  },
  { label: "О нас", href: "/about" },
  { label: "Сообщество", href: "/obshestvo" },
  { label: "База знаний", href: "/znaniya" },
  {
    label: "Сервисы",
    href: "/services#tools",
    children: [
      { label: "Поиск знаков", href: "/services/znak-search" },
      { label: "Определение МКТУ", href: "/services/mktu-search" },
      { label: "Поиск патентов", href: "/services/patent-search" },
    ],
  },
  { label: "Контакты", href: "/kontakty" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#d4af37] text-black shadow-lg transition-shadow duration-500 ${
        scrolled ? "shadow-black/30" : "shadow-black/20"
      }`}
    >
      <div className="flex h-16 w-full items-center gap-6 px-4 sm:px-6 lg:gap-10 lg:px-8">
        {/* Логотип */}
        <Logo3D />

        {/* Десктоп навигация */}
        <nav className="hidden min-w-0 flex-1 items-center justify-between gap-2 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-lg font-extrabold text-black/85 transition-colors hover:bg-black/10 hover:text-black"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </Link>
                {/* Выпадающее меню */}
                <div className="pointer-events-none absolute left-0 top-full z-50 w-60 -translate-y-1 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mt-2 overflow-hidden rounded-lg border border-black/10 bg-white shadow-xl shadow-black/20">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block border-b border-black/5 px-4 py-2.5 text-sm text-neutral-800 transition-colors last:border-b-0 hover:bg-[#f7efd8] hover:text-black"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-3 py-2 text-lg font-extrabold text-black/85 transition-colors hover:bg-black/10 hover:text-black"
              >
                {item.label}
              </Link>
            )
          )}
          <a
            href="https://znakvsem.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-lg font-extrabold text-black/85 transition-colors hover:bg-black/10 hover:text-black"
          >
            ЗнакВсем
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>

        {/* Действия */}
        <div className="flex items-center gap-2">
          <Link
            href="/cabinet"
            className="hidden min-h-11 items-center rounded-full border border-black/30 bg-black/5 px-4 py-1.5 text-xs font-semibold text-black transition-all hover:bg-black hover:text-[#d4af37] sm:inline-flex"
          >
            Кабинет
          </Link>
          {/* Бургер для мобильных */}
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/25 bg-black/5 text-black transition-colors hover:bg-black/10 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-all ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`overflow-hidden border-t border-black/10 bg-white transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[38rem]" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3" onClick={() => setOpen(false)}>
          {NAV.map((item) =>
            item.children ? (
              <div key={item.href} className="flex flex-col">
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-[#f7efd8]"
                >
                  {item.label}
                </Link>
                <div className="ml-3 flex flex-col border-l border-black/10 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="flex min-h-11 items-center rounded-lg px-3 py-2 text-[13px] text-neutral-600 transition-colors hover:bg-[#f7efd8] hover:text-black"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm text-neutral-900 transition-colors hover:bg-[#f7efd8]"
              >
                {item.label}
              </Link>
            )}
          <a
            href="https://znakvsem.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm text-neutral-900 transition-colors hover:bg-[#f7efd8]"
          >
            ЗнакВсем
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link
            href="/cabinet"
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full border border-black/20 bg-[#d4af37] px-3 py-2.5 text-center text-sm font-semibold text-black transition-all hover:bg-black hover:text-[#d4af37]"
          >
            Кабинет
          </Link>
        </nav>
      </div>
    </header>
  );
}

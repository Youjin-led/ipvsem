import * as React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./cta-footer";

/**
 * Общий layout для страниц сайта: шапка сверху, контент, подвал снизу.
 * Используется на главной и на отдельных страницах (например, /services/znak-search),
 * чтобы шапка и подвал были одинаковыми везде.
 */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import * as React from "react";
import { Footer } from "./cta-footer";
import { HomeLogo } from "./home-logo";

/**
 * Общий layout для страниц сайта: контент, подвал снизу.
 * Плавающий логотип в левом углу (клик — на главную) показывается
 * на всех страницах кроме главной.
 */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HomeLogo />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
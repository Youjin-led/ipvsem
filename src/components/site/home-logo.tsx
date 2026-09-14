"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/paths";

export function HomeLogo() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <Link
      href="/"
      aria-label="На главную"
      className="group/fixed fixed left-4 top-4 z-50 flex items-center gap-2.5 overflow-hidden rounded-xl border border-border/50 bg-card/70 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:border-brand-400/50 hover:bg-card/90 hover:shadow-lg hover:shadow-brand-500/10 sm:left-6 sm:top-6 sm:px-4 sm:py-2.5"
    >
      <Image
        src={withBasePath("/LOGO.png")}
        alt=""
        aria-hidden
        width={2035}
        height={773}
        priority
        className="h-7 w-auto sm:h-8"
      />
      <span className="hidden text-xs font-bold tracking-tight text-foreground/80 transition-colors group-hover/fixed:text-brand-300 sm:inline">
        IPvsem
      </span>
    </Link>
  );
}

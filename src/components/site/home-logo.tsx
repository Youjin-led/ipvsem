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
      className="group/fixed fixed left-4 top-4 z-50 flex items-center overflow-hidden rounded-xl border border-border/50 bg-card/70 px-2.5 py-2 backdrop-blur-md transition-all duration-300 hover:border-brand-400/50 hover:bg-card/90 hover:shadow-lg hover:shadow-brand-500/10 sm:left-6 sm:top-6 sm:px-3 sm:py-2.5"
    >
      <Image
        src={withBasePath("/pyramids.png")}
        alt="На главную — IPvsem.ru"
        width={750}
        height={678}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}

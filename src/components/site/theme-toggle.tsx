"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 backdrop-blur-md transition-all hover:border-brand-400/60 hover:glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Sun rays */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--glow) 25%, transparent) 0%, transparent 70%)",
        }}
      />
      <Sun
        className={`h-[18px] w-[18px] transition-all duration-500 ${
          mounted && isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}

import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  icon,
  crumbs,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  icon?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-6 sm:pt-32">
      <div className="absolute inset-0 -z-10 dot-bg opacity-30" aria-hidden />
      <div
        className="orb anim-drift -left-20 top-10 h-72 w-72 bg-brand-500/20"
        aria-hidden
      />
      <div
        className="orb anim-drift-slow -right-10 top-0 h-64 w-64 bg-glow/15"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
            </span>
            {eyebrow}
          </div>

          {icon && (
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-400/30 bg-card/60 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-2xl bg-brand-500/10 blur-md" />
              <span className="relative">{icon}</span>
            </div>
          )}

          <h1 className="text-balance text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

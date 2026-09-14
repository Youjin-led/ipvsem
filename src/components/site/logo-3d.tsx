"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";

const MAX_TILT = 12;

export function Logo3D({ imgClassName = "h-11" }: { imgClassName?: string }) {
  const tiltRef = React.useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = React.useState(
    "perspective(900px) rotateX(0deg) rotateY(0deg)"
  );
  const [glare, setGlare] = React.useState({ x: 50, y: 50, o: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const rx = (0.5 - py) * MAX_TILT;
    const ry = (px - 0.5) * MAX_TILT;
    setRotate(
      `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
    );
    setGlare({ x: px * 100, y: py * 100, o: 1 });
  };

  const onLeave = () => {
    setRotate("perspective(900px) rotateX(0deg) rotateY(0deg)");
    setGlare((g) => ({ ...g, o: 0 }));
  };

  return (
    <Link
      href="/"
      aria-label="IPvsem.ru — Сообщество Авторов"
      className="group relative block transition-transform duration-500 hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#d4af37]"
    >
      <div className="anim-logo-3d">
        <div
          ref={tiltRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative [transform-style:preserve-3d] will-change-transform"
          style={{ transform: rotate, transition: "transform 120ms ease-out" }}
        >
          <Image
            src={withBasePath("/LOGO.png")}
            alt=""
            aria-hidden
            width={2035}
            height={773}
            priority
            className={`absolute left-0 top-0 ${imgClassName} w-auto translate-y-1 opacity-20 blur-[2px] brightness-0 [transform:translate3d(0,3px,-14px)]`}
          />
          <Image
            src={withBasePath("/LOGO.png")}
            alt="IPvsem.ru — Сообщество Авторов"
            width={2035}
            height={773}
            priority
            className={`relative ${imgClassName} w-auto drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)] [transform:translateZ(22px)]`}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg [transform:translateZ(30px)]"
            style={{
              opacity: glare.o,
              transition: "opacity 300ms ease-out",
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6), rgba(255,255,255,0) 50%)`,
            }}
          />
        </div>
      </div>
    </Link>
  );
}

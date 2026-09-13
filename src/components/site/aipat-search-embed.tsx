"use client";

import { useEffect, useState } from "react";

/**
 * React-компонент для встраивания поиска AIpat.ru.
 * Использует <iframe> прямо в JSX — это безопасно для React-гидратации.
 * Авто-высота через postMessage от aipat.ru/embed/search.
 */
export function AipatSearchEmbed() {
  const [height, setHeight] = useState(900);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin === "https://aipat.ru" && e.data?.type === "aipat-resize") {
        setHeight(e.data.height);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      src="https://aipat.ru/embed/search"
      title="AIpat.ru — Поиск патентов"
      loading="lazy"
      allow="clipboard-write"
      referrerPolicy="strict-origin-when-cross-origin"
      style={{
        width: "100%",
        height: `${height}px`,
        border: "0",
        borderRadius: "16px",
        background: "#141414",
        display: "block",
        transition: "height 0.2s ease",
      }}
    />
  );
}

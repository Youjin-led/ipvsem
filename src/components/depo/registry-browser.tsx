"use client";

import * as React from "react";
import { ExternalLink, Search } from "lucide-react";
import {
  STATUSES,
  loadRegistry,
  saveRegistry,
  searchRegistry,
  type RegistryEntry,
} from "./registry";

/** Публичный интерфейс реестра (п.4 формулы): поиск, теги, статусы жизненного цикла */
export function RegistryBrowser({ refreshKey }: { refreshKey?: number }) {
  const [entries, setEntries] = React.useState<RegistryEntry[]>([]);
  const [q, setQ] = React.useState("");

  const reload = React.useCallback(() => setEntries(loadRegistry()), []);
  React.useEffect(() => {
    reload();
  }, [reload, refreshKey]);

  const setStatus = (id: string, status: RegistryEntry["status"]) => {
    const next = entries.map((e) => (e.id === id ? { ...e, status } : e));
    setEntries(next);
    saveRegistry(next);
  };

  const visible = searchRegistry(entries, q);

  return (
    <div>
      <label className="relative block max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск: название, автор, хеш, тег…"
          aria-label="Поиск по реестру"
          className="h-11 w-full rounded-xl border border-border/70 bg-background/60 pl-11 pr-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
        />
      </label>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border/70 bg-card/20 p-8 text-center text-sm text-muted-foreground">
          {entries.length === 0
            ? "Реестр пуст — первая запись появится после депонирования выше."
            : "Ничего не найдено — измените запрос."}
        </p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {visible.map((e) => (
            <li key={e.id} className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-sm font-bold text-brand-300">{e.id}</p>
                <select
                  value={e.status}
                  onChange={(ev) => setStatus(e.id, ev.target.value as RegistryEntry["status"])}
                  aria-label="Статус жизненного цикла"
                  className="h-11 rounded-lg border border-border/60 bg-background/60 px-3 text-xs font-semibold outline-none focus:border-brand-400/60"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <h3 className="mt-2 text-lg font-bold">{e.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {e.author} · правообладатель: {e.holder} · {e.createdAt} · файлов: {e.filesCount}
              </p>
              {e.tags.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-full bg-brand-500/15 px-2.5 py-1 text-[11px] text-brand-300">{t}</span>
                  ))}
                </p>
              )}
              <div className="mt-3 grid gap-1 font-mono text-[11px] text-muted-foreground">
                <p className="break-all">{e.algo1}: {e.hash1}</p>
                <p className="break-all">{e.algo2}: {e.hash2}</p>
              </div>
              {e.storages.some((s) => s.ref) && (
                <div className="mt-3 space-y-1">
                  {e.storages.filter((s) => s.ref).map((s) => (
                    <p key={s.name} className="flex items-start gap-1.5 text-xs">
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-300" />
                      <span>
                        {s.name} ({s.stampedAt}): <span className="break-all font-mono">{s.ref}</span>
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

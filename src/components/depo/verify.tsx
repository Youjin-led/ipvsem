"use client";

import * as React from "react";
import { Check, FileUp, Loader2, ShieldCheck, X } from "lucide-react";
import { loadRegistry, type RegistryEntry } from "./registry";
import { readZip, sha256, sha512 } from "./pipeline";

interface CheckRow {
  label: string;
  ok: boolean;
  detail?: string;
}

/** Верификация целостности (Фиг.3): скачать → извлечь → пересчитать → сверить → отчёт */
export function VerifyBox() {
  const [entries, setEntries] = React.useState<RegistryEntry[]>([]);
  const [recordId, setRecordId] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [rows, setRows] = React.useState<CheckRow[] | null>(null);

  React.useEffect(() => {
    setEntries(loadRegistry());
    const m = window.location.hash.match(/[?&]id=([^&]+)/);
    if (m) setRecordId(decodeURIComponent(m[1]));
  }, []);

  const run = async () => {
    setErr("");
    setRows(null);
    const rec = entries.find((e) => e.id === recordId);
    if (!rec) return setErr("Выберите запись реестра.");
    if (!file) return setErr("Прикрепите 2-й контейнер.");
    setBusy(true);
    const out: CheckRow[] = [];
    try {
      // Этап 2–3: скачивание (файл уже у пользователя) и извлечение
      let inner: { name: string; blob: Blob }[];
      try {
        inner = await readZip(file, password || undefined);
      } catch {
        out.push({ label: "2-й контейнер открыт", ok: false, detail: "Неверный пароль или повреждённый архив" });
        setRows(out);
        setBusy(false);
        return;
      }
      out.push({ label: "2-й контейнер открыт", ok: true, detail: `${inner.length} файла внутри` });

      const c1 = inner.find((f) => f.name.includes("container-1"));
      const meta = inner.find((f) => f.name.endsWith(".pdf"));
      out.push({ label: "Извлечены 1-й контейнер и мета-PDF", ok: Boolean(c1 && meta), detail: c1 && meta ? `${c1.name}, ${meta.name}` : "Состав не распознан" });
      if (!c1) {
        setRows(out);
        setBusy(false);
        return;
      }

      // Этап 4: контрольные хеши и сверка
      const h1 = await sha256(c1.blob);
      const h2 = await sha512(c1.blob);
      out.push({
        label: `${rec.algo1}: сверка с реестром (дублирует мета-PDF)`,
        ok: h1 === rec.hash1,
        detail: `${h1.slice(0, 24)}…`,
      });
      out.push({
        label: `${rec.algo2}: сверка с реестром (дублирует мета-PDF)`,
        ok: h2 === rec.hash2,
        detail: `${h2.slice(0, 24)}…`,
      });
      setRows(out);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка верификации");
    }
    setBusy(false);
  };

  const verdict = rows ? (rows.every((r) => r.ok) ? "good" : "bad") : null;
  const inputCls =
    "h-11 w-full rounded-xl border border-border/70 bg-background/60 px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60";

  return (
    <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
      <div className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Запись реестра *</span>
          <select value={recordId} onChange={(e) => setRecordId(e.target.value)} className={inputCls}>
            <option value="">— выбрать —</option>
            {entries.map((e) => (
              <option key={e.id} value={e.id}>
                {e.id} · {e.title}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-1.5 block text-sm font-medium">2-й контейнер *</span>
            <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-brand-400/50 bg-brand-500/5 px-4 py-3 text-sm font-medium text-brand-300 hover:bg-brand-500/10">
              <FileUp className="h-4 w-4" />
              {file ? file.name : "Выбрать ZIP"}
              <input type="file" accept=".zip" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
          </div>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Пароль 2-го контейнера</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Если задан" className={inputCls} />
          </label>
        </div>

        {err && <p role="alert" className="text-sm font-medium text-red-500">{err}</p>}

        <button
          type="button"
          onClick={run}
          disabled={busy}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg transition-all hover:bg-brand-300 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          Проверить целостность
        </button>

        {rows && (
          <div className={`rounded-2xl border p-5 ${verdict === "good" ? "border-glow/40 bg-glow/10" : "border-red-500/40 bg-red-500/10"}`}>
            <p className="flex items-center gap-2 font-black">
              {verdict === "good" ? <Check className="h-5 w-5 text-glow" /> : <X className="h-5 w-5 text-red-500" />}
              {verdict === "good" ? "Целостность подтверждена" : "Нарушение целостности"}
            </p>
            <ul className="mt-3 space-y-2">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-2 text-sm">
                  {r.ok ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-glow" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />}
                  <span>
                    {r.label}
                    {r.detail && <span className="block font-mono text-[11px] text-muted-foreground">{r.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

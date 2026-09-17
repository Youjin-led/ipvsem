"use client";

import * as React from "react";
import {
  Check,
  Download,
  FileUp,
  KeyRound,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";
import { withBasePath } from "@/lib/paths";
import {
  ALGO_1,
  ALGO_2,
  downloadBlob,
  makeContainer1,
  makeContainer2,
  makeMetaPdf,
  randomPassword,
  recordId,
  sha256,
  sha512,
  type SourceFile,
} from "./pipeline";
import {
  loadRegistry,
  saveRegistry,
  type RegistryEntry,
  type StorageRef,
} from "./registry";

const STORAGE_OPTIONS = [
  "Облачное хранилище",
  "Блокчейн-сеть",
  "Торрент-сеть",
  "Сервер соцсети",
];

const MAX_TOTAL = 100 * 1024 * 1024;

interface DoneState {
  entry: RegistryEntry;
  pass1: string;
  pass2: string | null;
  c1: Blob;
  c2: Blob;
  meta: Uint8Array;
}

export function DepositWizard({ onDone }: { onDone?: () => void }) {
  const [files, setFiles] = React.useState<SourceFile[]>([]);
  const [author, setAuthor] = React.useState("");
  const [holder, setHolder] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [storages, setStorages] = React.useState<string[]>(["Облачное хранилище"]);
  const [protect2, setProtect2] = React.useState(true);
  const [phase, setPhase] = React.useState<"form" | "working" | "done">("form");
  const [log, setLog] = React.useState<string[]>([]);
  const [err, setErr] = React.useState("");
  const [done, setDone] = React.useState<DoneState | null>(null);
  const [refs, setRefs] = React.useState<Record<string, string>>({});

  const inputCls =
    "h-11 w-full rounded-xl border border-border/70 bg-background/60 px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60";

  const say = (s: string) => setLog((l) => [...l, s]);
  const pause = () => new Promise((r) => setTimeout(r, 250));

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []).map((b) => ({ name: b.name, blob: b }));
    const total = [...files, ...list].reduce((s, f) => s + f.blob.size, 0);
    if (total > MAX_TOTAL) {
      setErr("Суммарный объём — до 100 МБ.");
      return;
    }
    setErr("");
    setFiles((f) => [...f, ...list].slice(0, 100));
    e.target.value = "";
  };

  const start = async () => {
    if (files.length === 0) return setErr("Прикрепите хотя бы один файл.");
    if (author.trim().length < 2) return setErr("Укажите автора.");
    if (holder.trim().length < 2) return setErr("Укажите правообладателя.");
    if (title.trim().length < 2) return setErr("Укажите название объекта.");
    if (storages.length === 0) return setErr("Выберите хотя бы одно внешнее хранилище.");
    setErr("");
    setPhase("working");
    setLog([]);
    try {
      const id = recordId();
      const pass1 = randomPassword();
      const pass2 = protect2 ? randomPassword() : null;
      const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const now = new Date().toLocaleString("ru-RU");

      say("Этап 2. Упаковка исходных файлов в 1-й контейнер (пароль, AES-256)…");
      await pause();
      const c1 = await makeContainer1(files, pass1);
      say(`→ 1-й контейнер готов (${(c1.size / 1024).toFixed(1)} КБ)`);

      say(`Этап 3. Хеш-суммы: ${ALGO_1} + ${ALGO_2}…`);
      await pause();
      const h1 = await sha256(c1);
      const h2 = await sha512(c1);
      say("→ обе хеш-суммы вычислены");

      const verifyUrl = `${window.location.origin}${withBasePath(`/deponirovanie#verify?id=${id}`)}`;
      say("Этап 4. Формирование мета-файла PDF…");
      await pause();
      const meta = await makeMetaPdf(
        {
          recordId: id,
          createdAt: now,
          author: author.trim(),
          holder: holder.trim(),
          title: title.trim(),
          tags: tagList,
          hash1: h1,
          hash2: h2,
          verifyUrl,
          storages: storages.map((s) => ({ name: s, ref: "", stampedAt: now })),
        },
        withBasePath("/fonts/PTSans-Regular.ttf")
      );
      say("→ мета-PDF сформирован");

      say("Этап 5. Упаковка во 2-й (финальный) контейнер…");
      await pause();
      const c2 = await makeContainer2(
        c1,
        meta,
        { c1: `${id}-container-1.zip`, meta: `${id}-svidetelstvo.pdf` },
        pass2 ?? undefined
      );
      say(`→ 2-й контейнер готов (${(c2.size / 1024).toFixed(1)} КБ)`);

      say("Этапы 6–7. Загрузка во внешние хранилища — вручную (прототип без сервера)…");
      await pause();
      const entry: RegistryEntry = {
        id,
        createdAt: now,
        author: author.trim(),
        holder: holder.trim(),
        title: title.trim(),
        tags: tagList,
        hash1: h1,
        algo1: ALGO_1,
        hash2: h2,
        algo2: ALGO_2,
        verifyUrl,
        status: "Депонирован",
        storages: storages.map((s) => ({ name: s, ref: "", stampedAt: now })),
        container2Name: `${id}-container-2.zip`,
        filesCount: files.length,
      };
      const reg = loadRegistry();
      saveRegistry([entry, ...reg]);
      say("→ запись создана в реестре ИС");

      setDone({ entry, pass1, pass2, c1, c2, meta });
      setRefs({});
      setPhase("done");
      onDone?.();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка обработки");
      setPhase("form");
    }
  };

  const saveRef = (storageName: string) => {
    if (!done) return;
    const ref = (refs[storageName] ?? "").trim();
    const stampedAt = new Date().toLocaleString("ru-RU");
    const entry: RegistryEntry = {
      ...done.entry,
      storages: done.entry.storages.map((s) =>
        s.name === storageName ? { ...s, ref, stampedAt } : s
      ),
    };
    const reg = loadRegistry().map((e) => (e.id === entry.id ? entry : e));
    saveRegistry(reg);
    setDone({ ...done, entry });
  };

  const reset = () => {
    setFiles([]);
    setAuthor("");
    setHolder("");
    setTitle("");
    setTags("");
    setStorages(["Облачное хранилище"]);
    setPhase("form");
    setLog([]);
    setErr("");
    setDone(null);
  };

  if (phase === "working") {
    return (
      <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
        <p className="flex items-center gap-2 font-semibold">
          <Loader2 className="h-5 w-5 animate-spin text-brand-300" />
          Центральный сервер работает…
        </p>
        <ul className="mt-4 space-y-1.5 font-mono text-xs text-muted-foreground">
          {log.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (phase === "done" && done) {
    const e = done.entry;
    return (
      <div className="grid gap-5">
        <div className="rounded-3xl border border-brand-400/40 bg-brand-500/10 p-6 backdrop-blur-sm sm:p-8">
          <p className="flex items-center gap-2 text-lg font-black">
            <ShieldCheck className="h-6 w-6 text-glow" />
            Депонировано · {e.id}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Этап 8. Сохраните пароли и скачайте контейнеры. Загрузите 2-й контейнер
            в выбранные хранилища и впишите ссылки ниже — они попадут в реестр.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-300">
                <KeyRound className="h-3.5 w-3.5" /> Пароль 1-го контейнера
              </p>
              <p className="mt-2 select-all font-mono text-base font-bold">{done.pass1}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-300">
                <KeyRound className="h-3.5 w-3.5" /> Пароль 2-го контейнера
              </p>
              <p className="mt-2 select-all font-mono text-base font-bold">
                {done.pass2 ?? "без пароля"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => downloadBlob(done.c2, e.container2Name)}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-brand-400 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-black shadow-lg transition-all hover:bg-brand-300"
            >
              <Download className="h-4 w-4" /> 2-й контейнер
            </button>
            <button
              type="button"
              onClick={() => downloadBlob(new Blob([new Uint8Array(done.meta)], { type: "application/pdf" }), `${e.id}-svidetelstvo.pdf`)}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-brand-400/40 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-brand-300 transition-all hover:bg-brand-500/10"
            >
              <Download className="h-4 w-4" /> Мета-PDF
            </button>
            <button
              type="button"
              onClick={() => downloadBlob(done.c1, `${e.id}-container-1.zip`)}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border/60 px-5 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Download className="h-4 w-4" /> 1-й контейнер
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {e.storages.map((s) => (
              <div key={s.name} className="rounded-xl border border-border/50 bg-background/40 p-3">
                <p className="text-sm font-semibold">{s.name}</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={refs[s.name] ?? ""}
                    onChange={(ev) => setRefs({ ...refs, [s.name]: ev.target.value })}
                    placeholder="Ссылка на скачивание или id блокчейн-транзакции"
                    className="h-11 flex-1 rounded-xl border border-border/70 bg-background/60 px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand-400/60"
                  />
                  <button
                    type="button"
                    onClick={() => saveRef(s.name)}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-brand-400/40 px-4 text-xs font-bold text-brand-300 hover:bg-brand-500/10"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {s.ref ? "Обновлено" : "В реестр"}
                  </button>
                </div>
                {s.ref && <p className="mt-1 break-all font-mono text-[11px] text-muted-foreground">{s.ref}</p>}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-border/70 px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          Депонировать ещё
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
      <div className="grid gap-5">
        <div>
          <span className="mb-1.5 block text-sm font-medium">
            Исходные файлы (этап 1)
            <span className="block text-xs font-normal text-muted-foreground">До 100 МБ суммарно</span>
          </span>
          <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-brand-400/50 bg-brand-500/5 px-4 py-4 text-sm font-medium text-brand-300 hover:bg-brand-500/10">
            <FileUp className="h-4 w-4" />
            Выбрать файлы
            <input type="file" multiple className="sr-only" onChange={onPick} />
          </label>
          {files.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex min-h-11 items-center justify-between gap-2 rounded-lg border border-border/50 bg-background/40 px-3 text-sm">
                  <span className="truncate">{f.name}</span>
                  <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted-foreground">
                    {(f.blob.size / 1024).toFixed(0)} КБ
                    <button type="button" aria-label={`Убрать ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Автор *</span>
            <input className={inputCls} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="ФИО автора" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Правообладатель *</span>
            <input className={inputCls} value={holder} onChange={(e) => setHolder(e.target.value)} placeholder="ФИО / организация" />
          </label>
        </div>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Название объекта *</span>
          <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Для титула свидетельства" />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Теги (через запятую)</span>
          <input className={inputCls} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="устройство, способ, дизайн" />
        </label>

        <div>
          <span className="mb-1.5 block text-sm font-medium">Внешние хранилища (этап 6)</span>
          <div className="flex flex-wrap gap-2">
            {STORAGE_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={storages.includes(s)}
                onClick={() => setStorages(storages.includes(s) ? storages.filter((x) => x !== s) : [...storages, s])}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                  storages.includes(s)
                    ? "border-brand-400 bg-brand-500/25 text-brand-200"
                    : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {storages.includes(s) && <Check className="h-3.5 w-3.5" />}
                {s}
              </button>
            ))}
          </div>
        </div>

        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
          <input type="checkbox" checked={protect2} onChange={(e) => setProtect2(e.target.checked)} className="h-5 w-5 accent-[#d4af37]" />
          Защитить 2-й контейнер паролем (п.3 формулы)
        </label>

        {err && <p role="alert" className="text-sm font-medium text-red-500">{err}</p>}

        <button
          type="button"
          onClick={start}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
        >
          <ShieldCheck className="h-4 w-4" />
          Запустить депонирование
        </button>
        <p className="text-xs text-muted-foreground">
          Прототип: всё считается в вашем браузере. Хеши — {ALGO_1} и {ALGO_2}
          (ГОСТ 34.11-2012, SHA-3, Blake2 — на серверной версии).
        </p>
      </div>
    </div>
  );
}

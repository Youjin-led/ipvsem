"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileUp,
  Send,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  EMPTY_FORM,
  CHANNEL_LABEL,
  GEO_LABEL,
  IP_LABEL,
  SPHERE_LABEL,
  STAFF_LABEL,
  STAGE_LABEL,
  SUBJECT_LABEL,
  TERMS_LABEL,
  TURNOVER_LABEL,
  type CabinetForm,
  type Channel,
  type Competitors,
  type Disclosure,
  type Geo,
  type IpType,
  type Sphere,
  type Staff,
  type Stage,
  type SubjectType,
  type Terms,
  type Turnover,
} from "./types";
import { buildPortfolios, formatRub } from "./portfolio";

const DRAFT_KEY = "ipvsem-cabinet-v1";
const MAX_FILES_SIZE = 100 * 1024 * 1024; // 100 МБ

const STEPS = ["Заявитель", "Бизнес", "Объект ИС", "Рынок", "Бюджет", "Допы"];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const innOk = (v: string) => /^(\d{10}|\d{12})$/.test(v.replace(/\D/g, ""));
const urlOk = (v: string) => v.trim() === "" || /^https?:\/\/.+\..+/.test(v.trim());

function progressOf(f: CabinetForm): number {
  const checks = [
    f.subject !== "",
    f.fullName.trim().length >= 2,
    innOk(f.inn),
    f.phone.trim().length >= 6,
    emailOk(f.email),
    f.channel !== "",
    f.sphere !== "",
    f.stage !== "",
    f.staff !== "",
    f.turnover !== "",
    f.ipTypes.length > 0,
    f.projectName.trim().length >= 2,
    f.projectDesc.trim().length >= 10,
    f.geo.length > 0,
    f.competitors !== "",
    f.disclosure !== "",
    f.terms !== "",
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function stepError(f: CabinetForm, step: number): string {
  switch (step) {
    case 0:
      if (!f.subject) return "Выберите тип субъекта.";
      if (f.fullName.trim().length < 2) return "Укажите ФИО или наименование.";
      if (!innOk(f.inn)) return "ИНН — 10 или 12 цифр.";
      if (f.phone.trim().length < 6) return "Укажите контактный телефон.";
      if (!emailOk(f.email)) return "Проверьте e-mail.";
      if (!f.channel) return "Выберите предпочтительный канал связи.";
      return "";
    case 1:
      if (!f.sphere || !f.stage || !f.staff || !f.turnover)
        return "Заполните все поля этого шага.";
      return "";
    case 2:
      if (f.ipTypes.length === 0) return "Выберите хотя бы один тип ИС.";
      if (f.projectName.trim().length < 2) return "Укажите название проекта.";
      if (f.projectDesc.trim().length < 10)
        return "Опишите суть парой предложений (от 10 символов).";
      return "";
    case 3:
      if (f.geo.length === 0) return "Выберите географию защиты.";
      if (!f.competitors) return "Ответьте про патенты конкурентов.";
      if (!f.disclosure) return "Ответьте про публичные раскрытия.";
      if (!urlOk(f.siteUrl)) return "Ссылка на сайт — с https://.";
      if (!urlOk(f.marketUrl)) return "Ссылка на маркетплейс — с https://.";
      return "";
    case 4:
      if (!f.terms) return "Выберите желаемые сроки.";
      return "";
    default:
      return "";
  }
}

/* ---------- мелкие UI-примитивы ---------- */

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="mb-1.5 block text-sm font-medium">
      {children}
      {hint && <span className="block text-xs font-normal text-muted-foreground">{hint}</span>}
    </span>
  );
}

function Pill<T extends string>({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "border-brand-400 bg-brand-500/25 text-brand-200 shadow-md shadow-brand-500/20"
          : "border-border/70 bg-background/40 text-muted-foreground hover:border-brand-400/50 hover:text-foreground"
      }`}
    >
      {active && <Check className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  desc,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-11 w-full items-center justify-between gap-4 rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-left transition-colors hover:border-brand-400/50"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-brand-400" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-border/70 bg-background/60 px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60";

/* ---------- мастер ---------- */

export function CabinetWizard() {
  const [form, setForm] = React.useState<CabinetForm>(EMPTY_FORM);
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const topRef = React.useRef<HTMLDivElement>(null);

  const set = <K extends keyof CabinetForm>(k: K, v: CabinetForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleIn = <T extends string>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  // Загрузка черновика
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as { form?: CabinetForm; step?: number; done?: boolean };
        if (d.form) setForm({ ...EMPTY_FORM, ...d.form });
        if (typeof d.step === "number") setStep(Math.min(Math.max(d.step, 0), 5));
        if (d.done) setDone(true);
      }
    } catch {
      /* черновик повреждён — начинаем с чистого */
    }
    setLoaded(true);
  }, []);

  // Автосохранение черновика
  React.useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, step, done }));
    } catch {
      /* localStorage переполнен — пропускаем */
    }
  }, [form, step, done, loaded]);

  const pct = progressOf(form);

  const next = () => {
    const e = stepError(form, step);
    if (e) {
      setErr(e);
      return;
    }
    setErr("");
    if (step < 5) {
      setStep(step + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setDone(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const back = () => {
    setErr("");
    if (done) setDone(false);
    else if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setStep(0);
    setDone(false);
    setErr("");
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    const total = list.reduce((s, f) => s + f.size, 0);
    if (total > MAX_FILES_SIZE) {
      setErr("Суммарный объём файлов — до 100 МБ.");
      return;
    }
    setErr("");
    setForm((f) => ({
      ...f,
      files: [...f.files, ...list.map((x) => ({ name: x.name, size: x.size }))].slice(0, 50),
    }));
    e.target.value = "";
  };

  const sendToManager = () => {
    const L: string[] = [
      `Заявитель: ${form.subject ? SUBJECT_LABEL[form.subject as SubjectType] : "—"} — ${form.fullName}`,
      `ИНН: ${form.inn}, тел: ${form.phone}, e-mail: ${form.email}`,
      `Канал связи: ${form.channel ? CHANNEL_LABEL[form.channel as Channel] : "—"}`,
      `Сфера: ${form.sphere ? SPHERE_LABEL[form.sphere as Sphere] : "—"}`,
      `Стадия: ${form.stage ? STAGE_LABEL[form.stage as Stage] : "—"}`,
      `Сотрудники: ${form.staff ? STAFF_LABEL[form.staff as Staff] : "—"}, оборот: ${form.turnover ? TURNOVER_LABEL[form.turnover as Turnover] : "—"}`,
      `Тип ИС: ${form.ipTypes.map((t) => IP_LABEL[t]).join("; ") || "—"}`,
      `Проект: ${form.projectName} — ${form.projectDesc}`,
      `Файлы: ${form.files.map((f) => f.name).join(", ") || "нет"}`,
      `Сайт: ${form.siteUrl || "—"}, маркетплейс: ${form.marketUrl || "—"}`,
      `География: ${form.geo.map((g) => GEO_LABEL[g]).join(", ") || "—"}`,
      `Конкуренты: ${form.competitors}, раскрытия: ${form.disclosure}`,
      `Бюджет: ${form.budget >= 1000000 ? "1 000 000+ ₽" : `${new Intl.NumberFormat("ru-RU").format(form.budget)} ₽`}, сроки: ${form.terms ? TERMS_LABEL[form.terms as Terms] : "—"}`,
      `Допы: поиск=${form.needSearch ? "да" : "нет"}, чертежи=${form.needDesign ? "да" : "нет"}, поверенный=${form.needAttorney ? "да" : "нет"}`,
      `Заполнение анкеты: ${pct}%`,
    ];
    const subject = encodeURIComponent(`Портфель ИС — ${form.projectName || form.fullName}`);
    const body = encodeURIComponent(`Прошу рассчитать патентный портфель.\n\n${L.join("\n")}`);
    window.location.href = `mailto:patentvsem@mail.ru?subject=${subject}&body=${body}`;
  };

  const result = React.useMemo(() => (done ? buildPortfolios(form) : null), [done, form]);

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Статус + прогресс */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex min-h-11 items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
              done ? "bg-glow/15 text-glow" : "bg-brand-500/15 text-brand-300"
            }`}
          >
            {done ? "Портфель предложен" : `Анкета заполнена на ${pct}%`}
          </span>
          {loaded && pct > 0 && !done && (
            <span className="text-xs text-muted-foreground">черновик сохранён</span>
          )}
        </div>
        {!done && (
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted sm:w-56">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
        {done && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg px-3 text-xs text-muted-foreground transition-colors hover:text-foreground sm:self-auto"
          >
            <X className="h-3.5 w-3.5" />
            Начать заново
          </button>
        )}
      </div>

      {done && result ? (
        /* ===== Результат: 3 портфеля ===== */
        <div>
          {result.warnings.length > 0 && (
            <div className="mb-6 grid gap-3">
              {result.warnings.map((w) => (
                <p
                  key={w.slice(0, 24)}
                  className="flex items-start gap-2.5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm"
                >
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                  {w}
                </p>
              ))}
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-3">
            {result.portfolios.map((p) => (
              <article
                key={p.id}
                className={`relative flex flex-col rounded-3xl border p-6 backdrop-blur-sm ${
                  p.recommended
                    ? "border-brand-400/60 bg-brand-500/10 shadow-xl shadow-brand-500/10"
                    : "border-border/60 bg-card/40"
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black">
                    Рекомендуем
                  </span>
                )}
                <h3 className="text-xl font-black tracking-tight">{p.name}</h3>
                <p className="text-sm font-medium text-brand-300">{p.tagline}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.forWhom}</p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {p.items.map((i) => (
                    <li key={i.label} className="flex items-start justify-between gap-2 text-sm">
                      <span className="flex items-start gap-1.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                        {i.label}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {formatRub(i.priceFrom)}
                      </span>
                    </li>
                  ))}
                </ul>
                {p.note && (
                  <p className="mt-4 rounded-xl bg-background/50 p-3 text-xs text-muted-foreground">
                    {p.note}
                  </p>
                )}
                <div className="mt-5 border-t border-border/60 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Итого</span>
                    <span className="text-xl font-black">
                      {p.totalFrom === 0 ? "0 ₽" : `от ${new Intl.NumberFormat("ru-RU").format(p.totalFrom)} ₽`}
                    </span>
                  </div>
                  <p className={`mt-1 text-xs font-medium ${p.fitsBudget ? "text-glow" : "text-yellow-500"}`}>
                    {p.fitsBudget ? "Вписывается в ваш бюджет" : "Выше указанного бюджета — обсудим"}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Цены ориентировочные, точный расчёт — у менеджера.
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={sendToManager}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
            >
              <Send className="h-4 w-4" />
              Отправить менеджеру
            </button>
            <button
              type="button"
              onClick={back}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-brand-400/40 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-brand-300 transition-all hover:bg-brand-500/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Редактировать анкету
            </button>
          </div>
        </div>
      ) : (
        /* ===== Шаги анкеты ===== */
        <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
          {/* Индикатор шагов */}
          <ol className="mb-8 flex flex-wrap items-center gap-2">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setErr("");
                    setStep(i);
                  }}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    i === step
                      ? "border-brand-400 bg-brand-500/20 text-brand-200"
                      : i < step
                        ? "border-brand-400/30 text-brand-300"
                        : "border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] ${
                      i === step ? "bg-brand-400 text-black" : "bg-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {s}
                </button>
                {i < STEPS.length - 1 && <span className="text-muted-foreground/40">·</span>}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div className="grid gap-5">
              <div>
                <Label>Тип субъекта *</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(SUBJECT_LABEL) as SubjectType[]).map((v) => (
                    <Pill key={v} active={form.subject === v} onClick={() => set("subject", v)}>
                      {SUBJECT_LABEL[v]}
                    </Pill>
                  ))}
                </div>
              </div>
              <label className="grid gap-1.5">
                <Label hint="Для юрлиц — полное название, для ФЛ — ФИО">
                  Полное наименование *
                </Label>
                <input
                  className={inputCls}
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  autoComplete="name"
                />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <Label hint="10 или 12 цифр — нужно для корректного портфеля">
                    ИНН / ОГРНИП *
                  </Label>
                  <input
                    className={inputCls}
                    value={form.inn}
                    inputMode="numeric"
                    onChange={(e) => set("inn", e.target.value.replace(/[^\d]/g, "").slice(0, 15))}
                    placeholder="772612579857"
                  />
                </label>
                <label className="grid gap-1.5">
                  <Label>Контактный телефон *</Label>
                  <input
                    className={inputCls}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+7 ___ ___-__-__"
                    autoComplete="tel"
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <Label>E-mail *</Label>
                  <input
                    className={inputCls}
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </label>
                <div>
                  <Label>Предпочтительный канал связи *</Label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(CHANNEL_LABEL) as Channel[]).map((v) => (
                      <Pill key={v} active={form.channel === v} onClick={() => set("channel", v)}>
                        {CHANNEL_LABEL[v]}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5">
              <div>
                <Label>Сфера деятельности</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(SPHERE_LABEL) as Sphere[]).map((v) => (
                    <Pill key={v} active={form.sphere === v} onClick={() => set("sphere", v)}>
                      {SPHERE_LABEL[v]}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <Label>Стадия проекта</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STAGE_LABEL) as Stage[]).map((v) => (
                    <Pill key={v} active={form.stage === v} onClick={() => set("stage", v)}>
                      {STAGE_LABEL[v]}
                    </Pill>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Количество сотрудников</Label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(STAFF_LABEL) as Staff[]).map((v) => (
                      <Pill key={v} active={form.staff === v} onClick={() => set("staff", v)}>
                        {STAFF_LABEL[v]}
                      </Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Годовой оборот (приблизительно)</Label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(TURNOVER_LABEL) as Turnover[]).map((v) => (
                      <Pill key={v} active={form.turnover === v} onClick={() => set("turnover", v)}>
                        {TURNOVER_LABEL[v]}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5">
              <div>
                <Label>Тип интеллектуальной собственности (можно несколько)</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(IP_LABEL) as IpType[]).map((v) => (
                    <Pill
                      key={v}
                      active={form.ipTypes.includes(v)}
                      onClick={() => set("ipTypes", toggleIn(form.ipTypes, v))}
                    >
                      {IP_LABEL[v]}
                    </Pill>
                  ))}
                </div>
              </div>
              <label className="grid gap-1.5">
                <Label hint="Короткое название — для титула свидетельства">
                  Название проекта / идеи *
                </Label>
                <input
                  className={inputCls}
                  value={form.projectName}
                  onChange={(e) => set("projectName", e.target.value)}
                  placeholder="Умный замок для велосипеда"
                />
              </label>
              <label className="grid gap-1.5">
                <Label hint="2–3 предложения о том, в чём инновация. Менеджер уточнит вручную.">
                  Краткое описание сути *
                </Label>
                <textarea
                  className="min-h-28 w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
                  value={form.projectDesc}
                  onChange={(e) => set("projectDesc", e.target.value)}
                  placeholder="Чем решение отличается от существующих?"
                  rows={4}
                />
              </label>
              <div>
                <Label hint="PDF, Word, JPEG, PNG, ZIP. До 100 МБ суммарно.">
                  Загрузка файлов
                </Label>
                <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-brand-400/50 bg-brand-500/5 px-4 py-4 text-sm font-medium text-brand-300 transition-colors hover:bg-brand-500/10">
                  <FileUp className="h-4 w-4" />
                  Выбрать файлы
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                    className="sr-only"
                    onChange={onFiles}
                  />
                </label>
                {form.files.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {form.files.map((f) => (
                      <li
                        key={`${f.name}-${f.size}`}
                        className="flex min-h-11 items-center justify-between gap-2 rounded-lg border border-border/50 bg-background/40 px-3 py-1.5 text-sm"
                      >
                        <span className="truncate">{f.name}</span>
                        <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted-foreground">
                          {(f.size / 1024).toFixed(0)} КБ
                          <button
                            type="button"
                            aria-label={`Убрать ${f.name}`}
                            onClick={() =>
                              set(
                                "files",
                                form.files.filter((x) => x !== f)
                              )
                            }
                            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <Label>Ссылка на ваш сайт</Label>
                  <input
                    className={inputCls}
                    value={form.siteUrl}
                    inputMode="url"
                    onChange={(e) => set("siteUrl", e.target.value)}
                    placeholder="https://…"
                  />
                </label>
                <label className="grid gap-1.5">
                  <Label hint="Ozon, Wildberries, AliExpress и др.">
                    Ссылка на карточку маркетплейса
                  </Label>
                  <input
                    className={inputCls}
                    value={form.marketUrl}
                    inputMode="url"
                    onChange={(e) => set("marketUrl", e.target.value)}
                    placeholder="https://…"
                  />
                </label>
              </div>
              <div>
                <Label hint="Влияет на стоимость портфеля в разы">
                  Планируемая география защиты
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(GEO_LABEL) as Geo[]).map((v) => (
                    <Pill
                      key={v}
                      active={form.geo.includes(v)}
                      onClick={() => set("geo", toggleIn(form.geo, v))}
                    >
                      {GEO_LABEL[v]}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <Label>Наличие патентов у конкурентов</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["yes", "Да, знаю"],
                      ["no", "Нет, не знаю"],
                      ["unknown", "Не проверял"],
                    ] as [Competitors, string][]
                  ).map(([v, label]) => (
                    <Pill key={v} active={form.competitors === v} onClick={() => set("competitors", v)}>
                      {label}
                    </Pill>
                  ))}
                </div>
                {form.competitors === "yes" && (
                  <input
                    className={`${inputCls} mt-3`}
                    value={form.competitorsNames}
                    onChange={(e) => set("competitorsNames", e.target.value)}
                    placeholder="Названия конкурентов"
                  />
                )}
              </div>
              <div>
                <Label hint="Влияет на возможность патентования">
                  Публиковали ли информацию о разработке до подачи заявки?
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["yes", "Да"],
                      ["no", "Нет"],
                    ] as [Disclosure, string][]
                  ).map(([v, label]) => (
                    <Pill key={v} active={form.disclosure === v} onClick={() => set("disclosure", v)}>
                      {label}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-5">
              <div>
                <Label hint="Система не покажет дорогие зарубежные портфели при малом бюджете">
                  Бюджет на патентную защиту (приблизительно)
                </Label>
                <div className="rounded-2xl border border-border/70 bg-background/40 p-5">
                  <p className="text-center text-3xl font-black">
                    {form.budget >= 1000000
                      ? "1 000 000+ ₽"
                      : `${new Intl.NumberFormat("ru-RU").format(form.budget)} ₽`}
                  </p>
                  <input
                    type="range"
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={form.budget}
                    onChange={(e) => set("budget", Number(e.target.value))}
                    className="mt-4 h-11 w-full accent-[#d4af37]"
                    aria-label="Бюджет на патентную защиту"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10 000 ₽</span>
                    <span>1 000 000+ ₽</span>
                  </div>
                </div>
              </div>
              <div>
                <Label>Желаемые сроки получения</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(TERMS_LABEL) as Terms[]).map((v) => (
                    <Pill key={v} active={form.terms === v} onClick={() => set("terms", v)}>
                      {TERMS_LABEL[v]}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid gap-3">
              <Toggle
                checked={form.needSearch}
                onChange={(v) => set("needSearch", v)}
                label="Нужен патентный поиск?"
                desc="Добавим анализ патентной чистоты в портфель"
              />
              <Toggle
                checked={form.needDesign}
                onChange={(v) => set("needDesign", v)}
                label="Нужна помощь с чертежами / дизайном?"
                desc="Добавится типографская и дизайнерская услуга"
              />
              <Toggle
                checked={form.needAttorney}
                onChange={(v) => set("needAttorney", v)}
                label="Передать ведение дел патентному поверенному?"
                desc="В портфеле появится «Полное сопровождение под ключ»"
              />
            </div>
          )}

          {err && (
            <p role="alert" className="mt-5 text-sm font-medium text-red-500">
              {err}
            </p>
          )}

          {/* Навигация */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-border/70 px-6 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
            >
              {step === 5 ? "Рассчитать портфель" : "Далее"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Данные хранятся только в вашем браузере (черновик). Никуда не отправляются, пока вы сами
        не нажмёте «Отправить менеджеру».{" "}
        <Link href="/kontakty" className="underline underline-offset-4 hover:text-brand-300">
          Политика обработки данных — по запросу
        </Link>
      </p>
    </div>
  );
}

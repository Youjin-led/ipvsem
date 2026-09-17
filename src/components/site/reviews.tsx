"use client";

import * as React from "react";
import { ExternalLink, Shuffle, Star } from "lucide-react";

/**
 * Отзывы (ТЗ 3.2): форма добавления, фильтр по оценке,
 * вывод в случайном порядке. Хранение — localStorage
 * (на боевом сайте заменить на бэкенд с модерацией).
 * Стартовое наполнение (письма, скриншоты ВБЦ) — за Ольгой.
 */

interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  text: string;
  date: string;
  mine: boolean;
}

const KEY = "ipvsem-reviews-v1";

function Stars({ value, onPick }: { value: number; onPick?: (v: number) => void }) {
  return (
    <span className="flex items-center gap-1" role={onPick ? "radiogroup" : undefined} aria-label="Оценка">
      {[1, 2, 3, 4, 5].map((v) =>
        onPick ? (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            aria-label={`${v} из 5`}
            onClick={() => onPick(v)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md transition-transform hover:scale-110"
          >
            <Star
              className={`h-5 w-5 ${v <= value ? "fill-brand-400 text-brand-400" : "text-muted-foreground/40"}`}
            />
          </button>
        ) : (
          <Star
            key={v}
            className={`h-4 w-4 ${v <= value ? "fill-brand-400 text-brand-400" : "text-muted-foreground/40"}`}
          />
        )
      )}
    </span>
  );
}

export function ReviewsSection() {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [filter, setFilter] = React.useState<0 | 5 | 4 | 3>(0);
  const [shuffled, setShuffled] = React.useState<Review[] | null>(null);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [text, setText] = React.useState("");
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setReviews(JSON.parse(raw) as Review[]);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(reviews));
    } catch {
      /* ignore */
    }
  }, [reviews, loaded]);

  const visible = React.useMemo(() => {
    const base = shuffled ?? reviews;
    return filter === 0 ? base : base.filter((r) => r.rating >= filter);
  }, [reviews, shuffled, filter]);

  const shuffle = () => {
    const arr = [...reviews];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setErr("Укажите имя или название компании.");
      return;
    }
    if (text.trim().length < 10) {
      setErr("Расскажите чуть подробнее (от 10 символов).");
      return;
    }
    setErr("");
    const r: Review = {
      id: `${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("ru-RU"),
      mine: true,
    };
    setReviews((prev) => [r, ...prev]);
    setShuffled(null);
    setName("");
    setCompany("");
    setText("");
    setRating(5);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
      {/* Список */}
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Показать:</span>
          {(
            [
              [0, "Все"],
              [5, "5 звёзд"],
              [4, "4+"],
              [3, "3+"],
            ] as [0 | 5 | 4 | 3, string][]
          ).map(([v, label]) => (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(v)}
              aria-pressed={filter === v}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                filter === v
                  ? "border-brand-400 bg-brand-500/20 text-brand-200"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={shuffle}
            disabled={reviews.length < 2}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/60 px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <Shuffle className="h-3.5 w-3.5" />
            В случайном порядке
          </button>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/70 bg-card/20 p-8 text-center">
            <p className="font-semibold">Пока нет опубликованных отзывов</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Письма поддержки и скриншоты готовятся к публикации. Станьте первым
              — форма справа. А пока можно посмотреть письма благодарности на
              сайте ПатентВсем:
            </p>
            <a
              href="https://patentvsem.ru/primery-rabot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-300 underline decoration-brand-400/60 underline-offset-4"
            >
              Портфолио и благодарности
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <ul className="grid gap-4">
            {visible.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <Stars value={r.rating} />
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="mt-3 text-sm">{r.text}</p>
                <p className="mt-3 text-xs font-semibold">
                  {r.name}
                  {r.company && <span className="font-normal text-muted-foreground"> · {r.company}</span>}
                  {r.mine && <span className="ml-2 text-brand-300">· ваш отзыв</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Форма */}
      <form
        onSubmit={submit}
        className="h-fit rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8 lg:sticky lg:top-24"
      >
        <h3 className="text-xl font-bold tracking-tight">Оставить отзыв</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Отзыв появится в списке сразу. На боевом сайте — после проверки менеджером.
        </p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Имя / компания *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван, ООО «Пример»"
              className="h-11 rounded-xl border border-border/70 bg-background/60 px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Компания (необязательно)</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="ООО «Пример»"
              className="h-11 rounded-xl border border-border/70 bg-background/60 px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
            />
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-medium">Оценка</span>
            <Stars value={rating} onPick={setRating} />
          </div>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Ваш отзыв *</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Что депонировали или патентовали? Как всё прошло?"
              rows={4}
              className="min-h-28 rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
            />
          </label>
          {err && (
            <p role="alert" className="text-sm font-medium text-red-500">
              {err}
            </p>
          )}
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
          >
            Опубликовать отзыв
          </button>
        </div>
      </form>
    </div>
  );
}

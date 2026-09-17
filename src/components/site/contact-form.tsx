"use client";

import * as React from "react";
import { Send } from "lucide-react";

/**
 * Форма обратной связи (ТЗ 5.1).
 * Статический сайт без бэкенда: заявка открывается в почтовом
 * клиенте пользователя через mailto. После подключения бэкенда
 * заменить onSubmit на POST-запрос.
 */
export function ContactForm() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Укажите, как к вам обращаться.");
      return;
    }
    if (phone.trim().length < 6 && message.trim().length < 10) {
      setError("Оставьте телефон или опишите задачу (от 10 символов).");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Заявка с сайта IPvsem.ru — ${name.trim()}`);
    const body = encodeURIComponent(
      `Имя: ${name.trim()}\nТелефон: ${phone.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:patentvsem@mail.ru?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-brand-400/40 bg-brand-500/10 p-8 text-center backdrop-blur-sm">
        <h3 className="text-xl font-bold">Заявка готова к отправке</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Открылся ваш почтовый клиент с заполненным письмом — нажмите
          «Отправить». Или позвоните нам:{" "}
          <a
            href="tel:+79689973835"
            className="font-semibold text-brand-300 underline underline-offset-4"
          >
            +7 968 997-38-35
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex min-h-11 items-center rounded-[10px] border border-brand-400/40 px-6 py-2.5 text-sm font-semibold text-brand-300 transition-colors hover:bg-brand-500/20"
        >
          Заполнить ещё раз
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8"
    >
      <h3 className="text-xl font-bold tracking-tight">Форма обратной связи</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Ответим в течение рабочего дня. Без спама — только по делу.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Как к вам обращаться *</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            autoComplete="name"
            className="h-11 rounded-xl border border-border/70 bg-background/60 px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Телефон</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 ___ ___-__-__"
              autoComplete="tel"
              className="h-11 rounded-xl border border-border/70 bg-background/60 px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
            />
          </label>
          <div className="grid content-end gap-1.5">
            <span className="text-sm font-medium">Почта для ответа</span>
            <a
              href="mailto:patentvsem@mail.ru"
              className="inline-flex h-11 items-center rounded-xl border border-border/70 bg-background/60 px-4 text-base text-brand-300 transition-colors hover:border-brand-400/60"
            >
              patentvsem@mail.ru
            </a>
          </div>
        </div>

        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Опишите задачу</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Что нужно задепонировать или запатентовать?"
            rows={4}
            className="min-h-28 rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400/60"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-400 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-lg shadow-brand-400/25 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
        >
          <Send className="h-4 w-4" />
          Отправить заявку
        </button>
        <p className="text-xs text-muted-foreground">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
        </p>
      </div>
    </form>
  );
}

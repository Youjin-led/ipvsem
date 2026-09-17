"use client";

import * as React from "react";
import { DepositWizard } from "./deposit-wizard";
import { VerifyBox } from "./verify";
import { RegistryBrowser } from "./registry-browser";

/** Клиентская обвязка: после депонирования обновляем реестр и верификацию */
export function DepoWorkspace() {
  const [depKey, setDepKey] = React.useState(0);
  return (
    <>
      <section id="start" className="relative scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <DepositWizard onDone={() => setDepKey((k) => k + 1)} />
        </div>
      </section>

      <section id="verify" className="relative scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Верификация <span className="text-gradient">целостности</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Для суда и эксперта: приложите 2-й контейнер — извлечём 1-й контейнер
            и мета-PDF, пересчитаем хеши и сверим с реестром.
          </p>
          <div className="mt-6" key={depKey}>
            <VerifyBox />
          </div>
        </div>
      </section>

      <section id="registry" className="relative scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Реестр объектов <span className="text-gradient">ИС</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Публичный интерфейс: поиск по названиям, авторам, хешам и тегам.
            Статус отражает этап жизненного цикла объекта.
          </p>
          <div className="mt-6">
            <RegistryBrowser refreshKey={depKey} />
          </div>
        </div>
      </section>
    </>
  );
}

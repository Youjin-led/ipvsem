import type { CabinetForm } from "./types";

/**
 * Логика подбора портфеля (ТЗ 6.1, этап 7).
 * Цены — ОРИЕНТИРОВОЧНЫЕ («от»), точный расчёт делает менеджер
 * по таблице тарифов в админке (пока админки нет).
 */

export interface PortfolioItem {
  label: string;
  priceFrom: number;
}

export interface Portfolio {
  id: "start" | "business" | "premium";
  name: string;
  tagline: string;
  forWhom: string;
  items: PortfolioItem[];
  totalFrom: number;
  fitsBudget: boolean;
  note?: string;
  recommended?: boolean;
}

export interface PortfolioResult {
  portfolios: Portfolio[];
  warnings: string[];
}

const PRICE = {
  depositFree: 0,
  depositPro: 15000,
  patentRf: 70000,
  patentSearch: 30000,
  trademark: 35000,
  expedited: 40000,
  softwareReg: 25000,
  knowhow: 25000,
  pct: 180000,
  minprom: 50000,
  designHelp: 20000,
  attorney: 60000,
} as const;

export function formatRub(n: number): string {
  return n === 0 ? "бесплатно" : `от ${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

export function buildPortfolios(form: CabinetForm): PortfolioResult {
  const ip = form.ipTypes;
  const hasTM = ip.includes("trademark");
  const hasSoftware = ip.includes("software");
  const patentable = ip.some((t) =>
    ["design", "invention", "utility", "software", "topology"].includes(t)
  );
  const onlyTM = hasTM && !patentable;
  const isIdea = form.stage === "idea";
  const unlimited = form.budget >= 1000000;
  const warnings: string[] = [];

  if (form.disclosure === "yes") {
    warnings.push(
      "Вы указали публичное раскрытие разработки. Это может помешать патентованию — обсудите с поверенным льготный период перед подачей заявки."
    );
  }
  if (form.competitors === "yes") {
    warnings.push(
      "У конкурентов есть патенты — в портфели добавлен патентный поиск для проверки чистоты."
    );
  }
  if (form.competitors === "unknown") {
    warnings.push(
      "Вы не проверяли патенты конкурентов — рекомендуем патентный поиск перед подачей заявки."
    );
  }

  // Ядро: патент или товарный знак
  const core: PortfolioItem = onlyTM
    ? { label: "Регистрация товарного знака под ключ", priceFrom: PRICE.trademark }
    : { label: "Патент РФ под ключ (заявка + переписка с экспертизой)", priceFrom: PRICE.patentRf };

  const search: PortfolioItem = {
    label: "Патентный поиск и анализ патентной чистоты",
    priceFrom: PRICE.patentSearch,
  };
  const needSearch = form.needSearch || form.competitors !== "no";

  const design: PortfolioItem = {
    label: "Чертежи и дизайн (типография)",
    priceFrom: PRICE.designHelp,
  };
  const attorney: PortfolioItem = {
    label: "Полное сопровождение патентным поверенным",
    priceFrom: PRICE.attorney,
  };

  // --- 1. Стартовый ---
  const startItems: PortfolioItem[] = [
    { label: "Депонирование — экспресс-свидетельство", priceFrom: PRICE.depositFree },
  ];
  let startNote: string | undefined;
  if (onlyTM) {
    startItems.push(core);
  } else if (isIdea) {
    startItems.push({ label: "Пакет ноу-хау (регламенты, NDA)", priceFrom: PRICE.knowhow });
    startNote =
      "Акцент на депонировании и ноу-хау: стадия идеи, формула изобретения ещё не готова к полноценному патенту.";
  } else {
    startItems.push(core);
  }
  if (needSearch) startItems.push(search);
  if (form.needDesign) startItems.push(design);

  // --- 2. Бизнес ---
  const businessItems: PortfolioItem[] = [
    { label: "Депонирование PRO (блокчейн + нотариальное удостоверение)", priceFrom: PRICE.depositPro },
    core,
    search,
    { label: "Ускоренная экспертиза", priceFrom: PRICE.expedited },
  ];
  if (hasTM && !onlyTM) {
    businessItems.push({ label: "Заявка на товарный знак", priceFrom: PRICE.trademark });
  }
  if (hasSoftware && !onlyTM) {
    businessItems.push({ label: "Регистрация программы для ЭВМ / БД", priceFrom: PRICE.softwareReg });
  }
  if (form.needDesign) businessItems.push(design);
  if (form.needAttorney) businessItems.push(attorney);

  // --- 3. Премиум ---
  const premiumItems: PortfolioItem[] = [
    { label: "Депонирование PRO (блокчейн + нотариальное удостоверение)", priceFrom: PRICE.depositPro },
    core,
    { label: "Международная заявка PCT", priceFrom: PRICE.pct },
    search,
    { label: "Реестр Минпромторга + полный аудит ИС", priceFrom: PRICE.minprom },
  ];
  if (hasTM && !onlyTM) {
    premiumItems.push({ label: "Заявка на товарный знак", priceFrom: PRICE.trademark });
  }
  if (hasSoftware && !onlyTM) {
    premiumItems.push({ label: "Регистрация программы для ЭВМ / БД", priceFrom: PRICE.softwareReg });
  }
  if (form.needDesign) premiumItems.push(design);
  if (form.needAttorney) premiumItems.push(attorney);

  // Правило: только РФ + бюджет < 50 000 → убираем Премиум
  const onlyRf = form.geo.length > 0 && form.geo.every((g) => g === "rf");
  const showPremium = !(onlyRf && form.budget < 50000);

  const total = (items: PortfolioItem[]) => items.reduce((s, i) => s + i.priceFrom, 0);
  const fits = (t: number) => unlimited || t <= form.budget;

  const portfolios: Portfolio[] = [
    {
      id: "start",
      name: "Стартовый",
      tagline: "Быстрая фиксация прав",
      forWhom: "Физлица и стартапы с оборотом до 1 млн руб.",
      items: startItems,
      totalFrom: total(startItems),
      fitsBudget: fits(total(startItems)),
      note: startNote,
      recommended: form.subject === "fl" || form.turnover === "to1",
    },
    {
      id: "business",
      name: "Бизнес",
      tagline: "Оптимальная защита в РФ",
      forWhom: "ИП и малый бизнес",
      items: businessItems,
      totalFrom: total(businessItems),
      fitsBudget: fits(total(businessItems)),
      recommended: form.subject === "ip",
    },
  ];

  if (showPremium) {
    const t = total(premiumItems);
    portfolios.push({
      id: "premium",
      name: "Премиум",
      tagline: "Экспортный уровень",
      forWhom: "Крупные компании и выход за рубеж",
      items: premiumItems,
      totalFrom: t,
      fitsBudget: fits(t),
      recommended:
        form.turnover === "t50plus" ||
        form.geo.some((g) => ["world", "us", "cn", "eu"].includes(g)),
    });
  }

  if (!portfolios.some((p) => p.recommended) && portfolios.length > 0) {
    portfolios[portfolios.length > 1 ? 1 : 0].recommended = true;
  }

  return { portfolios, warnings };
}

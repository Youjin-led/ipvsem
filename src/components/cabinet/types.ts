/** Типы анкеты личного кабинета (ТЗ 6.1, этапы 1–6). */

export type SubjectType = "fl" | "ip" | "ooo";
export type Channel = "telegram" | "whatsapp" | "email" | "phone";
export type Sphere = "it" | "industry" | "design" | "pharma" | "fmcg" | "services" | "other";
export type Stage = "idea" | "mvp" | "market" | "active" | "scale";
export type Staff = "s5" | "s20" | "s100" | "s101";
export type Turnover = "to1" | "t5" | "t50" | "t50plus";
export type IpType =
  | "design"
  | "invention"
  | "utility"
  | "trademark"
  | "software"
  | "knowhow"
  | "topology";
export type Geo = "rf" | "eaes" | "eu" | "us" | "cn" | "world";
export type Competitors = "yes" | "no" | "unknown";
export type Disclosure = "yes" | "no";
export type Terms = "standard" | "fast" | "norush";

export interface FileMeta {
  name: string;
  size: number;
}

export interface CabinetForm {
  // Этап 1. Заявитель
  subject: SubjectType | "";
  fullName: string;
  inn: string;
  phone: string;
  email: string;
  channel: Channel | "";
  // Этап 2. Контекст
  sphere: Sphere | "";
  stage: Stage | "";
  staff: Staff | "";
  turnover: Turnover | "";
  // Этап 3. Объект ИС
  ipTypes: IpType[];
  projectName: string;
  projectDesc: string;
  files: FileMeta[];
  // Этап 4. Рынок
  siteUrl: string;
  marketUrl: string;
  geo: Geo[];
  competitors: Competitors | "";
  competitorsNames: string;
  disclosure: Disclosure | "";
  // Этап 5. Бюджет и сроки
  budget: number;
  terms: Terms | "";
  // Этап 6. Допы
  needSearch: boolean;
  needDesign: boolean;
  needAttorney: boolean;
}

export const EMPTY_FORM: CabinetForm = {
  subject: "",
  fullName: "",
  inn: "",
  phone: "",
  email: "",
  channel: "",
  sphere: "",
  stage: "",
  staff: "",
  turnover: "",
  ipTypes: [],
  projectName: "",
  projectDesc: "",
  files: [],
  siteUrl: "",
  marketUrl: "",
  geo: [],
  competitors: "",
  competitorsNames: "",
  disclosure: "",
  budget: 100000,
  terms: "",
  needSearch: false,
  needDesign: false,
  needAttorney: false,
};

export const SUBJECT_LABEL: Record<SubjectType, string> = {
  fl: "Физическое лицо",
  ip: "ИП",
  ooo: "ООО / Юрлицо",
};

export const CHANNEL_LABEL: Record<Channel, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  email: "Эл. почта",
  phone: "Телефонный звонок",
};

export const SPHERE_LABEL: Record<Sphere, string> = {
  it: "IT / Программирование",
  industry: "Промышленность / Машиностроение",
  design: "Дизайн / Мода",
  pharma: "Фармацевтика / Химия",
  fmcg: "Товары народного потребления",
  services: "Услуги",
  other: "Другое",
};

export const STAGE_LABEL: Record<Stage, string> = {
  idea: "Идея / Концепция",
  mvp: "Прототип / MVP",
  market: "Товар на рынке (менее года)",
  active: "Активный бизнес (более 1 года)",
  scale: "Масштабирование / Экспорт",
};

export const STAFF_LABEL: Record<Staff, string> = {
  s5: "Не более 5",
  s20: "5–20",
  s100: "20–100",
  s101: "Более 100",
};

export const TURNOVER_LABEL: Record<Turnover, string> = {
  to1: "До 1 млн руб.",
  t5: "1–5 млн руб.",
  t50: "5–50 млн руб.",
  t50plus: "50+ млн руб.",
};

export const IP_LABEL: Record<IpType, string> = {
  design: "Промышленный образец (дизайн)",
  invention: "Изобретение (устройство, способ)",
  utility: "Полезная модель",
  trademark: "Товарный знак / Бренд",
  software: "Программа для ЭВМ / База данных",
  knowhow: "Ноу-хау (секрет производства)",
  topology: "Топология микросхем",
};

export const GEO_LABEL: Record<Geo, string> = {
  rf: "Только РФ",
  eaes: "Страны ЕАЭС",
  eu: "Европа",
  us: "США",
  cn: "Китай",
  world: "Весь мир",
};

export const TERMS_LABEL: Record<Terms, string> = {
  standard: "Стандартный (12–18 мес.)",
  fast: "Ускоренный (2–6 мес., платно)",
  norush: "Мне не срочно",
};

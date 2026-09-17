/**
 * Реестр объектов ИС (п.7 формулы + п.4: публичный поиск, п.6: статусы,
 * п.7: ссылки на скачивание / идентификаторы блокчейн-транзакций).
 * Прототип: хранение в localStorage, на боевом сайте — серверная БД.
 */

export type LifecycleStatus =
  | "Депонирован"
  | "Заявка подана"
  | "Патент выдан"
  | "Опубликован";

export const STATUSES: LifecycleStatus[] = [
  "Депонирован",
  "Заявка подана",
  "Патент выдан",
  "Опубликован",
];

export interface StorageRef {
  name: string;
  ref: string; // ссылка на скачивание или id транзакции
  stampedAt: string; // временная метка хранилища
}

export interface RegistryEntry {
  id: string;
  createdAt: string;
  author: string;
  holder: string;
  title: string;
  tags: string[];
  hash1: string;
  algo1: string;
  hash2: string;
  algo2: string;
  verifyUrl: string;
  status: LifecycleStatus;
  storages: StorageRef[];
  container2Name: string;
  filesCount: number;
}

const KEY = "ipvsem-depo-registry-v1";

export function loadRegistry(): RegistryEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as RegistryEntry[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveRegistry(entries: RegistryEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    /* переполнение — пропускаем */
  }
}

export function searchRegistry(entries: RegistryEntry[], q: string): RegistryEntry[] {
  const s = q.trim().toLowerCase();
  if (!s) return entries;
  return entries.filter((e) =>
    [e.id, e.title, e.author, e.holder, e.hash1, e.hash2, ...e.tags]
      .join(" ")
      .toLowerCase()
      .includes(s)
  );
}

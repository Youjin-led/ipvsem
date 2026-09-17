/**
 * Ядро депонирования по формуле (Фиг.1–Фиг.2).
 * Всё выполняется локально в браузере — прототип без сервера:
 * упаковка, хеши, мета-PDF, финальный контейнер.
 */
import {
  BlobReader,
  BlobWriter,
  Uint8ArrayReader,
  ZipReader,
  ZipWriter,
  configure,
} from "@zip.js/zip.js";
import { jsPDF } from "jspdf";

// Без воркеров: надёжнее собирается в статическом экспорте Next.js
configure({ useWebWorkers: false });

export const ALGO_1 = "SHA-256";
export const ALGO_2 = "SHA-512";

export interface SourceFile {
  name: string;
  blob: Blob;
}

export interface MetaData {
  recordId: string;
  createdAt: string;
  author: string;
  holder: string;
  title: string;
  tags: string[];
  hash1: string;
  hash2: string;
  verifyUrl: string;
  storages: { name: string; ref: string; stampedAt: string }[];
}

/** Пароль без неоднозначных символов */
export function randomPassword(len = 16): string {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!#%+";
  const buf = new Uint32Array(len);
  crypto.getRandomValues(buf);
  return Array.from(buf, (x) => abc[x % abc.length]).join("");
}

export function recordId(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `IPV-${new Date().getFullYear()}-${n}`;
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function digest(algo: string, data: Blob | Uint8Array): Promise<string> {
  const bytes =
    data instanceof Blob ? new Uint8Array(await data.arrayBuffer()) : data;
  // crypto.subtle требует Uint8Array (не SharedArrayBuffer-подобные вью)
  const clean = new Uint8Array(bytes.byteLength);
  clean.set(bytes);
  return toHex(await crypto.subtle.digest(algo, clean));
}

export const sha256 = (d: Blob | Uint8Array) => digest("SHA-256", d);
export const sha512 = (d: Blob | Uint8Array) => digest("SHA-512", d);

/** Первый контейнер: архив с паролем из исходных файлов */
export async function makeContainer1(files: SourceFile[], password: string): Promise<Blob> {
  const writer = new ZipWriter(new BlobWriter("application/zip"), {
    password,
    encryptionStrength: 3, // AES-256
  });
  for (const f of files) {
    await writer.add(f.name, new BlobReader(f.blob), { password });
  }
  return writer.close();
}

/** Чтение ZIP (с паролем или без) */
export async function readZip(
  blob: Blob,
  password?: string
): Promise<{ name: string; blob: Blob }[]> {
  const reader = new ZipReader(new BlobReader(blob), password ? { password } : {});
  const entries = await reader.getEntries();
  const out: { name: string; blob: Blob }[] = [];
  for (const e of entries) {
    if (e.directory) continue;
    const data = await e.getData?.(new BlobWriter());
    if (data) out.push({ name: e.filename, blob: data as Blob });
  }
  await reader.close();
  return out;
}

function bufToB64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(s);
}

/** Мета-файл PDF (читаемый человеком) с кириллическим шрифтом */
export async function makeMetaPdf(meta: MetaData, fontUrl: string): Promise<Uint8Array> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const res = await fetch(fontUrl);
  if (!res.ok) throw new Error("Не загрузился шрифт для PDF");
  const b64 = bufToB64(await res.arrayBuffer());
  doc.addFileToVFS("PTSans.ttf", b64);
  doc.addFont("PTSans.ttf", "PTSans", "normal");
  doc.setFont("PTSans");

  const M = 18;
  let y = 20;
  const line = (t: string, size = 11, gap = 6) => {
    doc.setFontSize(size);
    const parts = doc.splitTextToSize(t, 210 - M * 2);
    doc.text(parts, M, y);
    y += parts.length * (size * 0.45) + gap;
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
  };

  line("СВИДЕТЕЛЬСТВО О ДЕПОНИРОВАНИИ", 18, 8);
  line(`Реестровый номер: ${meta.recordId}`, 13, 4);
  line(`Дата депонирования: ${meta.createdAt}`, 11, 8);
  line(`Название объекта: ${meta.title}`, 12, 4);
  line(`Автор: ${meta.author}`, 11, 2);
  line(`Правообладатель: ${meta.holder}`, 11, 2);
  line(`Теги: ${meta.tags.join(", ") || "—"}`, 11, 8);
  line("Контрольные хеш-суммы первого контейнера:", 12, 4);
  line(`${ALGO_1}:`, 10, 1);
  line(meta.hash1, 9, 3);
  line(`${ALGO_2}:`, 10, 1);
  line(meta.hash2, 9, 8);
  line("Проверка подлинности:", 12, 4);
  line(`Верификация: ${meta.verifyUrl}`, 10, 4);
  line(
    "Скачайте финальный контейнер из хранилища, извлеките первый контейнер и мета-файл, " +
      "вычислите хеш-суммы первого контейнера и сверьте со значениями выше.",
    10,
    8
  );
  if (meta.storages.length > 0) {
    line("Хранилища:", 12, 4);
    meta.storages.forEach((s) =>
      line(`• ${s.name} — ${s.ref || "ссылка вносится вручную"} (${s.stampedAt})`, 10, 2)
    );
  }
  return new Uint8Array(doc.output("arraybuffer"));
}

/** Второй (финальный) контейнер: первый контейнер + мета-PDF */
export async function makeContainer2(
  container1: Blob,
  metaPdf: Uint8Array,
  fileNames: { c1: string; meta: string },
  password?: string
): Promise<Blob> {
  const writer = new ZipWriter(
    new BlobWriter("application/zip"),
    password ? { password, encryptionStrength: 3 } : {}
  );
  const opts = password ? { password } : {};
  await writer.add(fileNames.c1, new BlobReader(container1), opts);
  await writer.add(fileNames.meta, new Uint8ArrayReader(metaPdf), opts);
  return writer.close();
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

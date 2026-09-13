"use client";

import * as React from "react";

/**
 * Оригинальные анимированные SVG-иконки для экосистемы «Сообщество Авторов».
 * Каждая иконка — уникальная геометрическая композиция с CSS/SVG-анимацией.
 * Все иконки используют currentColor и переменную --glow / --brand-*,
 * чтобы корректно отображаться в светлой и тёмной темах.
 */

type IconProps = {
  className?: string;
};

/* ============ 1. Депонирование — фиксация факта (щит с голографической печатью) ============ */
export function DepositIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="dep-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-300)" />
          <stop offset="100%" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      {/* Щит */}
      <path
        d="M32 4 L54 12 V30 C54 44 44 54 32 60 C20 54 10 44 10 30 V12 Z"
        stroke="url(#dep-grad)"
        strokeWidth="2"
        fill="color-mix(in oklch, var(--brand-500) 8%, transparent)"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 200;200 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      {/* Внутренний контур */}
      <path
        d="M32 11 L48 17 V30 C48 40 41 48 32 53 C23 48 16 40 16 30 V17 Z"
        stroke="var(--brand-400)"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      />
      {/* Печать — голографическая шестерёнка с подписью */}
      <g transform="translate(32 32)">
        <circle r="10" fill="none" stroke="url(#dep-grad)" strokeWidth="1.5" />
        <circle
          r="6"
          fill="none"
          stroke="var(--glow)"
          strokeWidth="1"
          strokeDasharray="3 2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Ключ/подпись */}
        <path
          d="M-4 0 L-1 3 L4 -3"
          stroke="var(--glow)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="20;0"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      {/* Мерцающие точки приоритета */}
      <circle cx="32" cy="4" r="1.5" fill="var(--glow)">
        <animate
          attributeName="opacity"
          values="1;0.2;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="54" cy="12" r="1.2" fill="var(--glow)">
        <animate
          attributeName="opacity"
          values="0.2;1;0.2"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/* ============ 2. Роспатент — официальный документ с печатью ============ */
// Предвычисленные координаты зубцов печати (фиксированные строки, чтобы
// избежать hydration mismatch между серверным и клиентским рендером).
const PATENT_TEETH = Array.from({ length: 12 }).map((_, i) => {
  const a = (i * 30 * Math.PI) / 180;
  return {
    x1: (Math.cos(a) * 11).toFixed(3),
    y1: (Math.sin(a) * 11).toFixed(3),
    x2: (Math.cos(a) * 13.5).toFixed(3),
    y2: (Math.sin(a) * 13.5).toFixed(3),
  };
});

export function PatentIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="pat-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-400)" />
          <stop offset="100%" stopColor="var(--brand-700)" />
        </linearGradient>
      </defs>
      {/* Документ */}
      <rect
        x="12"
        y="8"
        width="32"
        height="42"
        rx="3"
        stroke="url(#pat-grad)"
        strokeWidth="2"
        fill="color-mix(in oklch, var(--brand-500) 6%, transparent)"
      />
      {/* Текстовые строки документа */}
      <line x1="18" y1="18" x2="38" y2="18" stroke="var(--brand-400)" strokeWidth="1.5" opacity="0.7">
        <animate attributeName="x2" values="38;18;38" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="18" y1="24" x2="34" y2="24" stroke="var(--brand-400)" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="x2" values="34;20;34" dur="3s" begin="0.4s" repeatCount="indefinite" />
      </line>
      <line x1="18" y1="30" x2="36" y2="30" stroke="var(--brand-400)" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="x2" values="36;22;36" dur="3s" begin="0.8s" repeatCount="indefinite" />
      </line>
      <line x1="18" y1="36" x2="30" y2="36" stroke="var(--brand-400)" strokeWidth="1.5" opacity="0.4">
        <animate attributeName="x2" values="30;18;30" dur="3s" begin="1.2s" repeatCount="indefinite" />
      </line>
      {/* Печать — круговая с зубцами */}
      <g transform="translate(44 46)">
        <circle r="11" fill="color-mix(in oklch, var(--brand-600) 12%, transparent)" stroke="url(#pat-grad)" strokeWidth="2" />
        {/* Зубцы печати */}
        <g>
          {PATENT_TEETH.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="url(#pat-grad)"
              strokeWidth="1.6"
            />
          ))}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="22s"
            repeatCount="indefinite"
          />
        </g>
        {/* Внутренняя звезда */}
        <path
          d="M0 -6 L1.8 -1.8 L6 -1.8 L2.6 1 L3.8 5.5 L0 3 L-3.8 5.5 L-2.6 1 L-6 -1.8 L-1.8 -1.8 Z"
          fill="var(--glow)"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}

/* ============ 3. Стратегия — шахматная карта / узлы портфеля ============ */
export function StrategyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="strat-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-300)" />
          <stop offset="100%" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      {/* Сетка стратегии */}
      <g opacity="0.35">
        {[12, 24, 36, 48].map((v) => (
          <line key={`h${v}`} x1="8" y1={v} x2="56" y2={v} stroke="var(--brand-400)" strokeWidth="0.6" />
        ))}
        {[12, 24, 36, 48].map((v) => (
          <line key={`v${v}`} x1={v} y1="8" x2={v} y2="56" stroke="var(--brand-400)" strokeWidth="0.6" />
        ))}
      </g>
      {/* Соединения (стратегические линии) */}
      <path
        d="M14 50 L26 36 L40 42 L50 22"
        stroke="url(#strat-grad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-14"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      {/* Узлы портфеля */}
      <g>
        <circle cx="14" cy="50" r="3.5" fill="var(--brand-600)" />
        <circle cx="14" cy="50" r="3.5" fill="none" stroke="var(--glow)" strokeWidth="1.2">
          <animate attributeName="r" values="3.5;7;3.5" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
      <circle cx="26" cy="36" r="3" fill="var(--brand-500)" />
      <circle cx="40" cy="42" r="3" fill="var(--brand-500)" />
      <g>
        <circle cx="50" cy="22" r="4" fill="url(#strat-grad)" />
        <circle cx="50" cy="22" r="4" fill="none" stroke="var(--glow)" strokeWidth="1.2">
          <animate attributeName="r" values="4;8;4" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* Компас сверху */}
      <g transform="translate(50 22)">
        <path d="M0 -8 L2 0 L0 2 L-2 0 Z" fill="var(--glow)" opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

/* ============ 4. Типография — печатная машина / листы ============ */
export function PrintIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="prn-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-300)" />
          <stop offset="100%" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      {/* Листы, выходящие из принтера */}
      <rect x="16" y="6" width="24" height="16" rx="1.5" stroke="var(--brand-400)" strokeWidth="1.5" fill="color-mix(in oklch, var(--brand-400) 8%, transparent)">
        <animateTransform attributeName="transform" type="translate" values="0 -2;0 2;0 -2" dur="3s" repeatCount="indefinite" />
      </rect>
      <line x1="20" y1="11" x2="36" y2="11" stroke="var(--brand-500)" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="15" x2="32" y2="15" stroke="var(--brand-500)" strokeWidth="1" opacity="0.4" />
      {/* Корпус принтера */}
      <rect x="8" y="24" width="48" height="20" rx="3" stroke="url(#prn-grad)" strokeWidth="2" fill="color-mix(in oklch, var(--brand-500) 8%, transparent)" />
      {/* Выходной паз */}
      <rect x="20" y="22" width="24" height="3" rx="1" fill="var(--brand-700)" opacity="0.6" />
      {/* Готовый документ снизу */}
      <rect x="16" y="44" width="32" height="16" rx="2" stroke="url(#prn-grad)" strokeWidth="1.5" fill="color-mix(in oklch, var(--brand-400) 10%, transparent)">
        <animate attributeName="y" values="46;42;46" dur="3s" repeatCount="indefinite" />
      </rect>
      <line x1="20" y1="50" x2="44" y2="50" stroke="var(--brand-500)" strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="54" x2="38" y2="54" stroke="var(--brand-500)" strokeWidth="1" opacity="0.4" />
      {/* Мигающий индикатор печати */}
      <circle cx="46" cy="30" r="2.4" fill="var(--glow)">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="46" cy="30" r="2.4" fill="none" stroke="var(--glow)" strokeWidth="1">
        <animate attributeName="r" values="2.4;6;2.4" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.4s" repeatCount="indefinite" />
      </circle>
      {/* Валики */}
      <circle cx="20" cy="34" r="2" fill="url(#prn-grad)" />
      <circle cx="44" cy="34" r="2" fill="url(#prn-grad)" />
    </svg>
  );
}

/* ============ 5. Сообщество — переплетённые узлы ============ */
export function CommunityIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="com-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-300)" />
          <stop offset="100%" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      {/* Связи */}
      <g stroke="url(#com-grad)" strokeWidth="1.4" fill="none" opacity="0.7">
        <line x1="14" y1="14" x2="50" y2="50">
          <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite" />
          <set attributeName="stroke-dasharray" to="3 3" />
        </line>
        <line x1="50" y1="14" x2="14" y2="50">
          <animate attributeName="stroke-dashoffset" values="0;12" dur="3s" repeatCount="indefinite" />
          <set attributeName="stroke-dasharray" to="3 3" />
        </line>
        <line x1="32" y1="8" x2="32" y2="56" />
      </g>
      {/* Узлы (3 автора + центр) */}
      <g>
        <circle cx="14" cy="14" r="4.5" fill="url(#com-grad)" />
        <circle cx="50" cy="14" r="4.5" fill="url(#com-grad)" />
        <circle cx="14" cy="50" r="4.5" fill="url(#com-grad)" />
        <circle cx="50" cy="50" r="4.5" fill="url(#com-grad)" />
        {/* Центр — общество */}
        <circle cx="32" cy="32" r="7" fill="color-mix(in oklch, var(--glow) 18%, transparent)" stroke="var(--glow)" strokeWidth="2" />
        <circle cx="32" cy="32" r="7" fill="none" stroke="var(--glow)" strokeWidth="1.2">
          <animate attributeName="r" values="7;12;7" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d="M28 32 L31 35 L36 29" stroke="var(--glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* Орбитальные точки */}
      <g transform="translate(32 32)">
        <circle r="22" fill="none" stroke="var(--brand-400)" strokeWidth="0.8" opacity="0.3" />
        <circle r="22" fill="none" stroke="var(--brand-400)" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 4" />
        <g>
          <circle cx="22" cy="0" r="1.6" fill="var(--glow)" />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
        </g>
      </g>
    </svg>
  );
}

/* ============ 6. Защита и споры — щит с мечом ============ */
export function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="shd-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-300)" />
          <stop offset="100%" stopColor="var(--brand-700)" />
        </linearGradient>
        <linearGradient id="shd-blade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--glow)" />
          <stop offset="100%" stopColor="var(--brand-500)" />
        </linearGradient>
      </defs>
      {/* Внешний пульсирующий круг */}
      <circle cx="32" cy="32" r="26" fill="none" stroke="var(--glow)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="26;30;26" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Щит */}
      <path
        d="M32 8 L48 14 V30 C48 40 41 48 32 52 C23 48 16 40 16 30 V14 Z"
        stroke="url(#shd-grad)"
        strokeWidth="2"
        fill="color-mix(in oklch, var(--brand-500) 10%, transparent)"
      />
      {/* Меч — диагональный клинок остриём вверх-вправо */}
      <g transform="translate(32 32) rotate(45)">
        {/* Клинок — длинный вытянутый треугольник с остриём */}
        <path
          d="M0 -22 L2.2 -16 L2.2 4 L0 6 L-2.2 4 L-2.2 -16 Z"
          fill="url(#shd-blade)"
          stroke="var(--glow)"
          strokeWidth="0.5"
        >
          <animate attributeName="opacity" values="0.85;1;0.85" dur="2.4s" repeatCount="indefinite" />
        </path>
        {/* Блик на клинке */}
        <line x1="-0.6" y1="-15" x2="-0.6" y2="2" stroke="rgba(255,255,255,0.7)" strokeWidth="0.6" />
        {/* Гарда — поперечная перекладина */}
        <rect x="-7" y="4" width="14" height="2.4" rx="0.6" fill="var(--brand-600)" stroke="var(--brand-300)" strokeWidth="0.5" />
        {/* Рукоять */}
        <rect x="-1.2" y="6.4" width="2.4" height="7" rx="0.6" fill="var(--brand-700)" />
        {/* Навершие (шар на конце рукояти) */}
        <circle cx="0" cy="14.5" r="2" fill="var(--brand-600)" stroke="var(--brand-300)" strokeWidth="0.5" />
      </g>
      {/* Зубцы крепления */}
      <circle cx="32" cy="14" r="1.6" fill="var(--brand-300)" />
    </svg>
  );
}

/* ============ 7. Знания — открытая книга со светом ============ */
export function KnowledgeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="knw-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-300)" />
          <stop offset="100%" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      {/* Светящееся облако знаний */}
      <ellipse cx="32" cy="20" rx="20" ry="6" fill="color-mix(in oklch, var(--glow) 20%, transparent)" opacity="0.7">
        <animate attributeName="ry" values="6;8;6" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Левая страница */}
      <path
        d="M32 22 C26 18 18 18 10 22 V48 C18 44 26 44 32 48 Z"
        stroke="url(#knw-grad)"
        strokeWidth="2"
        fill="color-mix(in oklch, var(--brand-400) 8%, transparent)"
      />
      {/* Правая страница */}
      <path
        d="M32 22 C38 18 46 18 54 22 V48 C46 44 38 44 32 48 Z"
        stroke="url(#knw-grad)"
        strokeWidth="2"
        fill="color-mix(in oklch, var(--brand-400) 8%, transparent)"
      />
      {/* Текст на страницах */}
      <g stroke="var(--brand-500)" strokeWidth="1" opacity="0.6">
        <line x1="14" y1="28" x2="28" y2="28" />
        <line x1="14" y1="32" x2="26" y2="32" />
        <line x1="14" y1="36" x2="28" y2="36" />
        <line x1="36" y1="28" x2="50" y2="28" />
        <line x1="36" y1="32" x2="48" y2="32" />
        <line x1="36" y1="36" x2="50" y2="36" />
      </g>
      {/* Исходящие лучи знаний */}
      <g stroke="var(--glow)" strokeWidth="1.4" strokeLinecap="round">
        <line x1="32" y1="14" x2="32" y2="6">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="22" y1="16" x2="18" y2="10">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="42" y1="16" x2="46" y2="10">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </line>
      </g>
      {/* Центральная закладка */}
      <rect x="30" y="44" width="4" height="8" fill="var(--glow)" opacity="0.8" />
    </svg>
  );
}

/* ============ 8. Личный кабинет — дашборд ============ */
export function CabinetIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="cab-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-300)" />
          <stop offset="100%" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      {/* Окно кабинета */}
      <rect x="6" y="8" width="52" height="48" rx="4" stroke="url(#cab-grad)" strokeWidth="2" fill="color-mix(in oklch, var(--brand-500) 5%, transparent)" />
      {/* Заголовок окна */}
      <line x1="6" y1="16" x2="58" y2="16" stroke="var(--brand-400)" strokeWidth="1" opacity="0.5" />
      <circle cx="11" cy="12" r="1.4" fill="var(--glow)" />
      <circle cx="16" cy="12" r="1.4" fill="var(--brand-400)" />
      <circle cx="21" cy="12" r="1.4" fill="var(--brand-400)" />
      {/* Боковое меню */}
      <rect x="10" y="20" width="12" height="32" rx="2" fill="color-mix(in oklch, var(--brand-400) 10%, transparent)" stroke="var(--brand-400)" strokeWidth="0.8" opacity="0.7" />
      <line x1="13" y1="26" x2="20" y2="26" stroke="var(--brand-500)" strokeWidth="1.2" />
      <line x1="13" y1="30" x2="20" y2="30" stroke="var(--brand-500)" strokeWidth="1.2" opacity="0.6" />
      <line x1="13" y1="34" x2="20" y2="34" stroke="var(--brand-500)" strokeWidth="1.2" opacity="0.6" />
      <line x1="13" y1="38" x2="18" y2="38" stroke="var(--brand-500)" strokeWidth="1.2" opacity="0.6" />
      {/* График в主要内容 */}
      <path
        d="M28 44 L34 38 L40 40 L46 30 L52 32"
        stroke="url(#cab-grad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="3s" repeatCount="indefinite" />
      </path>
      {/* Карточки статистики */}
      <rect x="28" y="22" width="11" height="6" rx="1" fill="color-mix(in oklch, var(--brand-400) 15%, transparent)" stroke="var(--brand-400)" strokeWidth="0.8" />
      <rect x="41" y="22" width="11" height="6" rx="1" fill="color-mix(in oklch, var(--glow) 18%, transparent)" stroke="var(--glow)" strokeWidth="0.8">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
      </rect>
      {/* Точка-индикатор */}
      <circle cx="46" cy="30" r="2" fill="var(--glow)">
        <animate attributeName="r" values="2;3;2" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ============ Декоративный логотип общества ============ */
export function SocietyLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--glow)" />
          <stop offset="100%" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      {/* Внешний ромб-щит */}
      <path
        d="M24 3 L43 14 V28 C43 36 35 42 24 45 C13 42 5 36 5 28 V14 Z"
        stroke="url(#logo-grad)"
        strokeWidth="2"
        fill="color-mix(in oklch, var(--brand-500) 10%, transparent)"
      />
      {/* Композиция «Iv» — I по центру, v за I (увеличенная, не касается полок). */}
      {/* Прописная буква v — позади I, по центру (x=24).
          Увеличена: диагонали (19, 20) → (24, 28) → (29, 20).
          Зазоры от полок I: сверху 20-13=7px, снизу 35-28=7px.
          Белая, полупрозрачная (opacity 0.8). */}
      <path
        d="M19 20 L24 28 L29 20"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      {/* Буква I (заглавная, с засечками) — на переднем плане, по центру (x=24).
          Вертикальная черта + две полочки (засечки) сверху/снизу. */}
      <line
        x1="24" y1="13" x2="24" y2="35"
        stroke="var(--glow)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Верхняя полочка I */}
      <line x1="17" y1="13" x2="31" y2="13" stroke="var(--glow)" strokeWidth="3" strokeLinecap="round" />
      {/* Нижняя полочка I */}
      <line x1="17" y1="35" x2="31" y2="35" stroke="var(--glow)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

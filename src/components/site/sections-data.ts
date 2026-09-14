import type { ComponentType } from "react";
import {
  CommunityIcon,
  DepositIcon,
  KnowledgeIcon,
  PatentIcon,
  PrintIcon,
} from "./icons";

export type SectionMeta = {
  id: string;
  n: string;
  label: string;
  kicker: string;
  title: string;
  subtitle: string;
  points: string[];
  fact: { value: string; label: string };
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const SECTIONS: SectionMeta[] = [
  {
    id: "services",
    n: "01",
    label: "Сервисы",
    kicker: "Экосистема",
    title: "Сервисы",
    subtitle:
      "Фиксируем авторство, готовим к регистрации, строим портфель и печатаем — четыре направления в единой инфраструктуре.",
    points: [
      "Депонирование авторства за 24 часа",
      "Патентование и регистрация в Роспатенте",
      "Стратегия и патентный портфель",
      "Собственная типография и издание",
    ],
    fact: { value: "24ч", label: "срок депонирования авторства" },
    href: "/services",
    icon: DepositIcon,
  },
  {
    id: "rospatent",
    n: "02",
    label: "Роспатент",
    kicker: "Регистрация",
    title: "Роспатент",
    subtitle:
      "Превращаем разработку в официальный охранный документ. Полное сопровождение от оценки до выдачи.",
    points: [
      "Изобретения, полезные модели, промобразцы",
      "Программы для ЭВМ, базы данных, топологии",
      "Предварительная оценка патентоспособности",
      "Переписка с экспертизой и ответы на запросы",
    ],
    fact: { value: "12+", label: "экспертов ведут вашу заявку" },
    href: "/rospatent",
    icon: PatentIcon,
  },
  {
    id: "tipografiya",
    n: "03",
    label: "Типография",
    kicker: "Воплощение",
    title: "Типография",
    subtitle:
      "Превращаем цифровые свидетельства и рукописи в осязаемые документы, книги и презентационные альбомы.",
    points: [
      "Свидетельства на защищённых бланках",
      "Научные монографии и сборники тезисов",
      "Технические альбомы и каталоги",
      "Сигнальные экземпляры и малые тиражи",
    ],
    fact: { value: "3–7", label: "дней на печать и переплёт" },
    href: "/tipografiya",
    icon: PrintIcon,
  },
  {
    id: "obshestvo",
    n: "04",
    label: "Общество",
    kicker: "Сообщество",
    title: "Общество",
    subtitle:
      "Экспертный центр, а не просто сервис: патентные поверенные, учёные, IP-юристы, инженеры и IT-специалисты.",
    points: [
      "Патентные поверенные и IP-юристы",
      "Учёные со степенями и инженеры",
      "Открытая база знаний и методички",
      "Прозрачные статусы в личном кабинете",
    ],
    fact: { value: "30+", label: "экспертов в сообществе авторов" },
    href: "/obshestvo",
    icon: CommunityIcon,
  },
  {
    id: "znaniya",
    n: "05",
    label: "Знания",
    kicker: "База знаний",
    title: "Знания",
    subtitle:
      "Методички, шаблоны и разборы кейсов, которых нет у других. Берите и применяйте.",
    points: [
      "IT и ПО: код, лицензии, open source",
      "Инженерия: устройства и промобразцы",
      "Наука: приоритет, патенты, диссертации",
      "Юридические шаблоны и разборы кейсов",
    ],
    fact: { value: "84", label: "материала и шаблона в базе" },
    href: "/znaniya",
    icon: KnowledgeIcon,
  },
];

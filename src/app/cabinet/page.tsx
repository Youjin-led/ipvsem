import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/site-layout";
import { PageHero } from "@/components/site/page-hero";
import { CabinetWizard } from "@/components/cabinet/wizard";
import { CabinetIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Личный кабинет — подбор патентного портфеля — IPvsem.ru",
  description:
    "Заполните анкету из 6 шагов и получите 3 варианта патентного портфеля: Стартовый, Бизнес и Премиум. Депонирование, патентование и стратегия.",
  keywords: [
    "личный кабинет",
    "патентный портфель",
    "депонирование",
    "анкета",
    "патентование",
  ],
  openGraph: {
    title: "Личный кабинет — подбор патентного портфеля — IPvsem.ru",
    description:
      "Анкета из 6 шагов → 3 варианта портфеля: Стартовый, Бизнес, Премиум.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function CabinetPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Личный кабинет"
        title={
          <>
            Подбор <span className="text-gradient">патентного портфеля</span>
          </>
        }
        description="Ответьте на 6 блоков вопросов — система предложит 3 варианта портфеля: от Стартового до Максимального. Менеджер проверит и уточнит предложение вручную."
        icon={<CabinetIcon className="h-10 w-10" />}
        crumbs={[{ label: "Личный кабинет" }]}
      />

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CabinetWizard />
        </div>
      </section>
    </SiteLayout>
  );
}

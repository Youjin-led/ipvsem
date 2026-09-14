import { SiteLayout } from "@/components/site/site-layout";
import { Hero } from "@/components/site/hero";
import { SectionStrip } from "@/components/site/section-strip";
import { FinalCTA } from "@/components/site/cta-footer";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />

      <SectionStrip />

      <FinalCTA />
    </SiteLayout>
  );
}

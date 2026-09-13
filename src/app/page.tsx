import { SiteLayout } from "@/components/site/site-layout";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Pipeline } from "@/components/site/pipeline";
import { Society } from "@/components/site/society";
import { Cabinet, Protection } from "@/components/site/knowledge-cabinet";
import { FinalCTA } from "@/components/site/cta-footer";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Services />
      <Pipeline />
      <Society />
      <Cabinet />
      <Protection />
      <FinalCTA />
    </SiteLayout>
  );
}

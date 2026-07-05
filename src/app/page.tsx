import { MerlinNav } from "@/components/merlin/merlin-nav";
import { MerlinHero } from "@/components/merlin/merlin-hero";
import { MerlinVision } from "@/components/merlin/merlin-vision";
import { MerlinEcosystem } from "@/components/merlin/merlin-ecosystem";
import { MerlinEbip } from "@/components/merlin/merlin-ebip";
import { MerlinTourism } from "@/components/merlin/merlin-tourism";
import { MerlinDomains, MerlinMemberRights } from "@/components/merlin/merlin-domains";
import { MerlinRoadmap, MerlinInvestment, MerlinCarbon } from "@/components/merlin/merlin-roadmap";
import { MerlinTechnology } from "@/components/merlin/merlin-technology";
import { MerlinAI } from "@/components/merlin/merlin-ai";
import { MerlinCta, MerlinFooter } from "@/components/merlin/merlin-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <MerlinNav />
      <main className="flex-1">
        <MerlinHero />
        <MerlinVision />
        <MerlinEcosystem />
        <MerlinEbip />
        <MerlinTourism />
        <MerlinDomains />
        <MerlinMemberRights />
        <MerlinRoadmap />
        <MerlinInvestment />
        <MerlinCarbon />
        <MerlinTechnology />
        <MerlinAI />
        <MerlinCta />
      </main>
      <MerlinFooter />
    </div>
  );
}

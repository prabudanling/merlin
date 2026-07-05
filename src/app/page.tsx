import { MerlinNav } from "@/components/merlin/merlin-nav";
import { MerlinHero } from "@/components/merlin/merlin-hero";
import { MerlinVision } from "@/components/merlin/merlin-vision";
import { MerlinEcosystem } from "@/components/merlin/merlin-ecosystem";
import { MerlinAssociationsDirectory } from "@/components/merlin/merlin-associations-directory";
import { MerlinMemberRegistry } from "@/components/merlin/merlin-member-registry";
import { MerlinJoinForm } from "@/components/merlin/merlin-join-form";
import { MerlinEbip } from "@/components/merlin/merlin-ebip";
import { MerlinTourism } from "@/components/merlin/merlin-tourism";
import { MerlinDomains, MerlinMemberRights } from "@/components/merlin/merlin-domains";
import { MerlinRoadmap, MerlinInvestment, MerlinCarbon } from "@/components/merlin/merlin-roadmap";
import { MerlinTechnology } from "@/components/merlin/merlin-technology";
import { MerlinAI } from "@/components/merlin/merlin-ai";
import { MerlinCta, MerlinFooter } from "@/components/merlin/merlin-footer";
import {
  MerlinScrollProgress,
  MerlinCursorGlow,
  MerlinPageLoader,
} from "@/components/merlin/merlin-animations";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <MerlinPageLoader />
      <MerlinScrollProgress />
      <MerlinCursorGlow />
      <MerlinNav />
      <main className="flex-1">
        <MerlinHero />
        <MerlinVision />
        <MerlinEcosystem />
        <MerlinAssociationsDirectory />
        <MerlinMemberRegistry />
        <MerlinEbip />
        <MerlinTourism />
        <MerlinDomains />
        <MerlinMemberRights />
        <MerlinRoadmap />
        <MerlinInvestment />
        <MerlinCarbon />
        <MerlinTechnology />
        <MerlinAI />
        <MerlinJoinForm />
        <MerlinCta />
      </main>
      <MerlinFooter />
    </div>
  );
}

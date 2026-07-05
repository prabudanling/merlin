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
import { MerlinErrorBoundary } from "@/components/merlin/merlin-error-boundary";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <MerlinErrorBoundary sectionName="Shell Utama">
        <MerlinPageLoader />
        <MerlinScrollProgress />
        <MerlinCursorGlow />
        <MerlinNav />
        <main className="flex-1">
          <MerlinErrorBoundary sectionName="Hero">
            <MerlinHero />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Visi & 9 Pilar">
            <MerlinVision />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Ekosistem">
            <MerlinEcosystem />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Direktori Asosiasi">
            <MerlinAssociationsDirectory />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Statistik Member">
            <MerlinMemberRegistry />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Eco Blue Industrial Park">
            <MerlinEbip />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Blue Tourism & Produk">
            <MerlinTourism />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="20 Domain PGA">
            <MerlinDomains />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="16 Hak Member">
            <MerlinMemberRights />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Roadmap">
            <MerlinRoadmap />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Investasi">
            <MerlinInvestment />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Blue Carbon">
            <MerlinCarbon />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Teknologi & Governance">
            <MerlinTechnology />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="MERLIN AI">
            <MerlinAI />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="Form Pendaftaran">
            <MerlinJoinForm />
          </MerlinErrorBoundary>
          <MerlinErrorBoundary sectionName="CTA">
            <MerlinCta />
          </MerlinErrorBoundary>
        </main>
        <MerlinFooter />
      </MerlinErrorBoundary>
    </div>
  );
}

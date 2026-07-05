"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Brain, Link2, Atom, Cloud, Radio, Satellite, Crown, Shield,
  GraduationCap, Briefcase, Users, Factory, Warehouse, Sprout, Cpu,
} from "lucide-react";
import { techStack, governanceLevels, moats, keyPartners } from "@/lib/merlin-data";
import { SectionHeader, Pill } from "./section-header";

const TECH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, link: Link2, atom: Atom, cloud: Cloud, radio: Radio, satellite: Satellite,
};

const GOV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown, shield: Shield, "graduation-cap": GraduationCap, briefcase: Briefcase,
  users: Users, factory: Factory, warehouse: Warehouse, sprout: Sprout,
};

export function MerlinTechnology() {
  return (
    <section id="teknologi" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Domain 15 · Technology, Innovation & Digital Sovereignty"
          title={<>Kedaulatan Digital MERLIN</>}
          description={
            <>
              MERLIN sebagai ekosistem rumput laut paling canggih secara digital di dunia — AI-first,
              blockchain traceability, quantum-ready, sovereign cloud. No foreign dependency for critical tech.
            </>
          }
        />

        {/* Tech stack grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech, i) => {
            const Icon = TECH_ICONS[tech.icon] ?? Brain;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:shadow-ocean/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-ocean/8 blur-2xl group-hover:bg-ocean/15 transition-colors" />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ocean to-ocean-deep text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {tech.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {tech.desc}
                </p>
                <ul className="mt-3 space-y-1">
                  {tech.points.map((p, j) => (
                    <li key={j} className="text-xs text-foreground/80 flex items-start gap-1.5">
                      <Cpu className="h-3 w-3 text-seaweed mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Competitive Moats */}
        <div className="mt-20">
          <SectionHeader
            align="left"
            eyebrow="Domain 2 · Competitive Moat"
            title={<>8 Moat Kompetitif yang Sulit Ditiru</>}
            description="Kombinasi skala ekosistem, brand sovereign, zero waste, blue carbon, riset, diversifikasi, loyalitas petani, dan traceability blockchain."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {moats.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="rounded-2xl border border-gold/25 bg-gold/5 p-4 hover:bg-gold/10 transition-colors"
              >
                <div className="font-display text-2xl font-bold text-gold">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-1 font-display text-sm font-bold text-foreground">{m.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Governance structure */}
        <div className="mt-20">
          <SectionHeader
            align="left"
            eyebrow="Domain 3 · Governance & Legal"
            title={<>Struktur Tata Kelola 8 Level</>}
            description="Dari Dewan Pembina (Presiden RI) hingga 10.000 kelompok tani. Tri Hita Karana Laut — harmoni Tuhan, manusia, dan laut."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {governanceLevels.map((g, i) => {
              const Icon = GOV_ICONS[g.icon] ?? Crown;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                  className="relative rounded-2xl border border-border bg-card p-5 overflow-hidden"
                >
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground">
                    {g.level}
                  </div>
                  <Icon className="h-7 w-7 text-ocean" />
                  <h3 className="mt-3 font-display text-sm font-bold text-foreground">{g.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{g.desc}</p>
                  <div className="mt-2 inline-flex rounded-full bg-ocean/10 px-2 py-0.5 text-[11px] font-bold text-ocean">
                    {g.count}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key partners */}
        <div className="mt-16">
          <SectionHeader align="left" eyebrow="Domain 8 · Stakeholder Ecosystem" title={<>Mitra Strategis MERLIN</>} />
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(keyPartners).map(([cat, partners]) => (
              <div key={cat} className="rounded-2xl border border-border bg-card p-4">
                <div className="text-[11px] font-bold uppercase tracking-wide text-gold mb-2">{cat}</div>
                <div className="flex flex-wrap gap-1.5">
                  {partners.map((p) => (
                    <span key={p} className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

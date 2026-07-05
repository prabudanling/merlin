"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Shield, Scale, Eye, HeartHandshake, Leaf, Users, Waves,
  FlaskConical, Crown, Quote,
} from "lucide-react";
import { pillars, merlin } from "@/lib/merlin-data";
import { SectionHeader } from "./section-header";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  scale: Scale,
  eye: Eye,
  "heart-handshake": HeartHandshake,
  leaf: Leaf,
  users: Users,
  waves: Waves,
  "flask-conical": FlaskConical,
  crown: Crown,
};

const PILLAR_COLORS = [
  "from-ocean to-ocean-deep",
  "from-seaweed to-seaweed-light",
  "from-ocean-light to-ocean",
  "from-gold to-gold-light",
  "from-seaweed-light to-seaweed",
  "from-ocean-deep to-ocean-light",
  "from-seaweed to-ocean",
  "from-gold-light to-gold",
  "from-ocean to-seaweed",
];

export function MerlinVision() {
  return (
    <section id="visi" className="relative py-24 sm:py-32 bg-foam-gradient overflow-hidden">
      {/* decorative */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-ocean/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-seaweed/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Domain 1 · Identity & Civilization"
          title={<>Visi & 9 Pilar Nilai Inti</>}
          description={
            <>
              MERLIN adalah gerakan kemandirian ekonomi maritim Indonesia — mengubah laut dari
              sumber kemiskinan menjadi sumber kemakmuran abadi. Sembilan pilar ini adalah kompas
              moral seluruh ekosistem.
            </>
          }
        />

        {/* Vision quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-12 mx-auto max-w-4xl"
        >
          <div className="relative rounded-3xl bg-ocean-gradient p-8 sm:p-12 text-center text-white shadow-2xl shadow-ocean/30 overflow-hidden">
            <div className="absolute inset-0 bg-dotgrid opacity-20" />
            <Quote className="absolute top-6 left-6 h-10 w-10 text-gold/30" />
            <Quote className="absolute bottom-6 right-6 h-10 w-10 text-gold/30 rotate-180" />
            <p className="relative font-display text-xl sm:text-2xl md:text-3xl leading-relaxed italic">
              “{merlin.vision}”
            </p>
            <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold-light">
              <Crown className="h-3.5 w-3.5" />
              Visi Utama MERLIN 2030 — Dewan Pembina / Presiden RI
            </div>
          </div>
        </motion.div>

        {/* 9 Pillars grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[pillar.icon] ?? Shield;
            return (
              <motion.div
                key={pillar.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:shadow-ocean/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* gradient accent */}
                <div
                  className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${PILLAR_COLORS[i]} opacity-10 blur-2xl group-hover:opacity-25 transition-opacity`}
                />
                <div className="flex items-start justify-between">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${PILLAR_COLORS[i]} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-4xl font-bold text-ocean/15 group-hover:text-ocean/25 transition-colors">
                    0{pillar.no}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                  {pillar.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-ocean">{pillar.title}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Manifesto strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8"
        >
          <p className="font-display text-base sm:text-lg text-foreground/90 leading-relaxed italic text-center">
            “{merlin.manifesto}”
          </p>
          <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-[#a8851f] dark:text-gold-light font-semibold">
            Manifesto MERLIN · Deklarasi Kedaulatan Ekonomi Biru
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sprout, Warehouse, Factory, Globe, ArrowRight, Ship, Anchor,
  Box, Leaf, Zap, Cloud, FlaskConical, Palmtree,
} from "lucide-react";
import { ecosystemFlow, associations } from "@/lib/merlin-data";
import { SectionHeader, Pill } from "./section-header";
import { cn } from "@/lib/utils";

const FLOW_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout,
  warehouse: Warehouse,
  factory: Factory,
  globe: Globe,
};

const ASSOC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout,
  warehouse: Warehouse,
  factory: Factory,
  zap: Zap,
  box: Box,
  leaf: Leaf,
  palmtree: Palmtree,
  cloud: Cloud,
  "flask-conical": FlaskConical,
  ship: Ship,
};

const COLOR_MAP: Record<string, string> = {
  ocean: "from-ocean to-ocean-deep text-white",
  seaweed: "from-seaweed to-seaweed-light text-white",
  gold: "from-gold to-gold-light text-abyss",
};

const ACCENT_MAP: Record<string, string> = {
  ocean: "border-ocean/30 bg-ocean/8 text-ocean",
  seaweed: "border-seaweed/30 bg-seaweed/8 text-seaweed",
  gold: "border-gold/35 bg-gold/10 text-[#a8851f] dark:text-gold-light",
};

export function MerlinEcosystem() {
  return (
    <section id="ekosistem" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Arsitektur Ekosistem · Hulu → Hilir → Zero Waste"
          title={<>Satu Rumah, Sepuluh Kamar</>}
          description={
            <>
              Dari petani tanam → koperasi kumpul → pabrik olah 100% → wisata jual → carbon jual →
              riset upgrade → dagang kunci harga dunia. <strong className="text-foreground">0% Limbah Keluar.</strong>
            </>
          }
        />

        {/* Flow diagram */}
        <div className="mt-14">
          <div className="grid gap-4 lg:grid-cols-4 relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-seaweed via-ocean to-gold opacity-30" />

            {ecosystemFlow.map((stage, i) => {
              const Icon = FLOW_ICONS[stage.icon] ?? Sprout;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative"
                >
                  <div className="rounded-2xl border border-border bg-card p-5 h-full hover:shadow-xl hover:shadow-ocean/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ocean to-ocean-deep text-white shadow-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <Pill variant="gold">{stage.stage}</Pill>
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono font-semibold text-ocean">
                      {stage.association}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                  {i < ecosystemFlow.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-10 z-10 h-6 w-6 items-center justify-center rounded-full bg-gold text-abyss shadow-md">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 10 Associations */}
        <div className="mt-20">
          <SectionHeader
            align="left"
            eyebrow="Struktur Komando · 1 Suara ke Presiden"
            title={<>10 Asosiasi Terpadu MERLIN</>}
            description="Tiap asosiasi adalah satu lini tempur — dari Laskar Laut hingga Garda Dagang. Tiap asosiasi punya akses dana beda: APRLN→KKP, ABBR→ESDM, APBB→Kemenparekraf, AKBIN→KLHK."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {associations.map((assoc, i) => {
              const Icon = ASSOC_ICONS[assoc.icon] ?? Sprout;
              return (
                <motion.div
                  key={assoc.code}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", COLOR_MAP[assoc.color])} />
                  <div className="flex items-center justify-between">
                    <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", COLOR_MAP[assoc.color])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {assoc.line}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                    {assoc.code}
                  </h3>
                  <p className="text-[11px] font-semibold text-ocean leading-snug line-clamp-2 h-8">
                    {assoc.name}
                  </p>
                  <div className={cn("mt-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", ACCENT_MAP[assoc.color])}>
                    <Anchor className="h-2.5 w-2.5" />
                    “{assoc.julukan}”
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {assoc.bidang}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Factory, Recycle, MapPin, Waves, Leaf, Zap, RotateCw, CheckCircle2,
} from "lucide-react";
import { ebipFacilities, zeroWasteLoop, ebipLocations } from "@/lib/merlin-data";
import { SectionHeader, Pill } from "./section-header";

export function MerlinEbip() {
  const [activeRegion, setActiveRegion] = React.useState(0);
  const totalEbip = ebipLocations.reduce((s, r) => s + r.count, 0);

  return (
    <section id="ebip" className="relative py-24 sm:py-32 bg-abyss-gradient text-white overflow-hidden">
      {/* bg image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/images/ebip-park.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-ocean-darker/90 to-abyss" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          light
          eyebrow="Domain 19 · Infrastructure & Urban Planning"
          title={<>40 Eco Blue Industrial Park</>}
          description={
            <>
              Kawasan industri terpadu <strong className="text-gold-light">Zero Waste</strong> pertama
              di dunia untuk rumput laut. Tiap kawasan adalah MERLIN Eco-City mandiri energi —
              100% renewable, 0% limbah keluar.
            </>
          }
        />

        {/* Big number showcase */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "40", l: "Kawasan EBIP", d: "2026 → 2030" },
            { v: "22", l: "Fasilitas per Park", d: "Pabrik + lab + logistik" },
            { v: "100%", l: "Renewable Energy", d: "Biogas + solar + green H₂" },
            { v: "0%", l: "Limbah Keluar", d: "Zero Waste Certified" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="font-display text-4xl font-bold text-gold-light">{s.v}</div>
              <div className="mt-1 text-sm font-semibold text-white">{s.l}</div>
              <div className="text-[11px] text-white/50">{s.d}</div>
            </motion.div>
          ))}
        </div>

        {/* Zero Waste circular model */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Recycle className="h-6 w-6 text-seaweed-light" />
            <h3 className="font-display text-2xl font-bold">Model Sirkular Zero Waste</h3>
            <Pill variant="seaweed">Rumput Laut 100% Terpakai</Pill>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {zeroWasteLoop.map((loop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative glass rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gold-light">
                    Tahap {i + 1}
                  </span>
                  <RotateCw className="h-4 w-4 text-seaweed-light" />
                </div>
                <div className="mt-3 font-display text-lg font-bold text-white">{loop.from}</div>
                <div className="my-2 flex items-center gap-1 text-gold-light">
                  <div className="h-px flex-1 bg-gold/40" />
                  <Zap className="h-3 w-3" />
                  <div className="h-px flex-1 bg-gold/40" />
                </div>
                <div className="font-display text-lg font-bold text-seaweed-light">{loop.to}</div>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">{loop.desc}</p>
                {i < zeroWasteLoop.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-5 w-5 rounded-full bg-gold text-abyss flex items-center justify-center text-[10px] font-bold">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Facilities inside one park */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Factory className="h-6 w-6 text-ocean-light" />
              <h3 className="font-display text-2xl font-bold">22 Fasilitas dalam 1 Kawasan</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Dalam satu Eco Blue Industrial Park dibangun ekosistem pabrik lengkap — dari hulu
              hingga hilir, dari riset hingga ekspor. Inilah moat kompetitif MERLIN yang sulit
              ditiru kompetitor dalam 10-15 tahun.
            </p>
            <div className="flex flex-wrap gap-2">
              {ebipFacilities.map((f, i) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 8) * 0.04 }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10 hover:border-gold/40 transition-colors"
                >
                  <CheckCircle2 className="h-3 w-3 text-seaweed-light" />
                  {f}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Indonesia locations */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-6 w-6 text-gold" />
              <h3 className="font-display text-2xl font-bold">Lokasi {totalEbip} Kawasan</h3>
            </div>
            <div className="space-y-1.5 max-h-80 overflow-y-auto scrollbar-merlin pr-2">
              {ebipLocations.map((loc, i) => (
                <button
                  key={loc.region}
                  onClick={() => setActiveRegion(i)}
                  className={`w-full text-left rounded-xl border p-3 transition-all ${
                    activeRegion === i
                      ? "border-gold/50 bg-gold/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm">{loc.region}</span>
                    <span className="font-display text-lg font-bold text-gold-light">{loc.count}</span>
                  </div>
                  <p className="text-[11px] text-white/55 mt-0.5">{loc.provinces}</p>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-seaweed/30 bg-seaweed/10 p-4">
              <div className="flex items-center gap-2 text-seaweed-light">
                <Leaf className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Sentra Pilot: Wakatobi · Derawan · Raja Ampat
                </span>
              </div>
              <p className="mt-1 text-xs text-white/60">
                Tiga kawasan pilot 2027 — ekosistem terumbu karang terbaik, dukungan pemerintah
                daerah, dan akses logistik ekspor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* wave divider */}
      <div className="absolute bottom-0 inset-x-0 h-12 wave-divider opacity-60" />
    </section>
  );
}

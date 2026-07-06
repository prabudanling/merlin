"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Compass, Scale, Box, Settings, Coins, Users, Megaphone,
  Database, Globe, Landmark, HeartHandshake, Atom, Shield, Cpu,
  Newspaper, GraduationCap, Stethoscope, Building2, Gavel, X, CheckCircle2,
} from "lucide-react";
import { domains, memberRights } from "@/lib/merlin-data";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown, compass: Compass, scale: Scale, box: Box, settings: Settings,
  coins: Coins, users: Users, megaphone: Megaphone, database: Database, globe: Globe,
  landmark: Landmark, "heart-handshake": HeartHandshake, atom: Atom, shield: Shield,
  cpu: Cpu, newspaper: Newspaper, "graduation-cap": GraduationCap, stethoscope: Stethoscope,
  "building-2": Building2, gavel: Gavel,
};

const COLOR_MAP: Record<string, string> = {
  ocean: "from-ocean to-ocean-deep",
  seaweed: "from-seaweed to-seaweed-light",
  gold: "from-gold to-gold-light",
};

export function MerlinDomains() {
  const [active, setActive] = React.useState<number | null>(null);
  const activeDomain = domains.find((d) => d.no === active);

  return (
    <section id="domain" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Master Document 165 PGA · Sovereign Architecture"
          title={
            <>
              20 Domain × 165 Dokumen <span className="text-ocean-gradient">PGA</span>
            </>
          }
          description={
            <>
              Arsitektur dokumentasi paling lengkap yang pernah disusun untuk ekosistem maritim
              Indonesia — melampaui standar McKinsey, BCG, dan lembaga internasional. Disusun oleh
              Dewan Pakar 46 lintas bidang, 150+ tahun pengalaman gabungan.
            </>
          }
        />

        {/* Summary stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: "20", l: "Domain Strategis", c: "ocean" },
            { v: "165", l: "Dokumen PGA", c: "gold" },
            { v: "46", l: "Dewan Pakar", c: "seaweed" },
            { v: "150+", l: "Tahun Pengalaman", c: "ocean" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 text-center"
            >
              <div className={cn("font-display text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent", COLOR_MAP[s.c])}>
                {s.v}
              </div>
              <div className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Domains grid */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => {
            const Icon = DOMAIN_ICONS[d.icon] ?? Crown;
            return (
              <motion.button
                key={d.no}
                onClick={() => setActive(d.no)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="group relative text-left overflow-hidden rounded-2xl border border-border bg-card p-5 hover:shadow-xl hover:shadow-ocean/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={cn("absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br opacity-10 blur-2xl group-hover:opacity-25 transition-opacity", COLOR_MAP[d.color])} />
                <div className="flex items-center justify-between">
                  <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md", COLOR_MAP[d.color])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-2xl font-bold text-ocean/15 group-hover:text-ocean/30 transition-colors">
                    {String(d.no).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-foreground leading-tight">
                  {d.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">{d.range}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {d.desc}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-ocean">
                  {d.count} dokumen
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Domain detail modal */}
      <AnimatePresence>
        {activeDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-abyss/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-card p-7 shadow-2xl border border-border"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
              <div className={cn("inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", COLOR_MAP[activeDomain.color])}>
                {(() => {
                  const Icon = DOMAIN_ICONS[activeDomain.icon] ?? Crown;
                  return <Icon className="h-7 w-7" />;
                })()}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">DOMAIN {activeDomain.no}</span>
                <span className="font-mono text-xs text-ocean">{activeDomain.range}</span>
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {activeDomain.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {activeDomain.desc}
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-ocean/20 bg-ocean/5 p-3">
                <CheckCircle2 className="h-5 w-5 text-ocean" />
                <span className="text-sm font-semibold text-foreground">
                  {activeDomain.count} Dokumen PGA lengkap dengan tujuan, elemen kunci, owner & metrik keberhasilan
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ----------------------------------------------------------------------------
// 16 HAK MEMBER
// ----------------------------------------------------------------------------
export function MerlinMemberRights() {
  return (
    <section id="hak" className="relative py-24 sm:py-32 bg-abyss-gradient text-white overflow-hidden">
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-seaweed/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          light
          eyebrow="Domain 12 · Social Justice & Human Rights"
          title={<>16 Hak Fundamental Member MERLIN</>}
          description={
            <>
              MERLIN menjamin 16 hak fundamental bagi 1,5 juta KK petani — dari harga jaminan
              3x lipat hingga warisan budaya adat. Inilah keadilan sosial yang membedakan MERLIN
              dari eksploitasi korporasi.
            </>
          }
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {memberRights.map((right, i) => (
            <motion.div
              key={right.no}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-gold/40 transition-all"
            >
              <div className="absolute top-3 right-3 font-display text-3xl font-bold text-gold/20 group-hover:text-gold/40 transition-colors">
                {String(right.no).padStart(2, "0")}
              </div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-abyss font-display font-bold text-sm shadow-md">
                {right.no}
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-white leading-tight pr-6">
                {right.title}
              </h3>
              <p className="mt-2 text-xs text-white/75 leading-relaxed">{right.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Welfare comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl border border-gold/30 bg-gold/5 p-6 sm:p-8"
        >
          <h3 className="font-display text-xl font-bold text-gold-light text-center">
            Transformasi Kesejahteraan Petani
          </h3>
          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-wide text-white/75">Sebelum MERLIN</div>
              <div className="mt-2 font-display text-3xl font-bold text-red-400">Rp1,2 jt</div>
              <div className="text-xs text-white/75">/bulan · garis kemiskinan</div>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-5">
              <div className="text-xs uppercase tracking-wide text-gold-light">Harga Jaminan</div>
              <div className="mt-2 font-display text-3xl font-bold text-gold-light">Rp18.000</div>
              <div className="text-xs text-white/75">/kg vs pasar Rp6.000 (3x lipat)</div>
            </div>
            <div className="rounded-2xl border border-seaweed/30 bg-seaweed/10 p-5">
              <div className="text-xs uppercase tracking-wide text-seaweed-light">Dengan MERLIN</div>
              <div className="mt-2 font-display text-3xl font-bold text-seaweed-light">Rp6–9 jt</div>
              <div className="text-xs text-white/75">/bulan · naik 5–8x lipat</div>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-white/75">
            North Star Metric: Member Welfare Index (MWI) — target 80/100 pada 2030
          </div>
        </motion.div>
      </div>
    </section>
  );
}

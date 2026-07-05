"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Waves, Crown, Mail, MapPin, Globe, ArrowUp, Sparkles, Anchor,
} from "lucide-react";
import { merlin } from "@/lib/merlin-data";
import { MerlinLogo } from "./merlin-nav";

export function MerlinCta() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-ocean-gradient">
      <div className="absolute inset-0 ocean-surface opacity-40" />
      <div className="absolute inset-0 bg-dotgrid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold-light uppercase tracking-widest mb-6">
            <Crown className="h-3.5 w-3.5" />
            Bergabung dalam Sejarah
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Jadilah Bagian dari
            <br />
            <span className="text-gold-gradient">Peradaban Bahari Baru</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            MERLIN bukan sekadar bisnis — ini gerakan kemandirian ekonomi maritim Indonesia.
            Kepada pemerintah, investor, akademisi, petani, dan dunia: bergabunglah.
            Belilah produk MERLIN. Dukunglah UU Rumput Laut. Investasikan di Eco Blue Industrial Park.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#ai"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-semibold text-abyss shadow-xl shadow-gold/30 hover:scale-105 hover:shadow-gold/50 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Konsultasi dengan MERLIN AI
            </a>
            <a
              href="#investasi"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-all"
            >
              <Waves className="h-4 w-4 text-gold-light" />
              Pelajari Investasi Rp680T
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Anchor, l: "Pemerintah", d: "UU Rumput Laut" },
              { icon: Crown, l: "Investor", d: "IRR 18% · ESG" },
              { icon: Sparkles, l: "Akademisi", d: "50+ universitas" },
              { icon: Waves, l: "Petani", d: "1,5 juta KK" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="glass rounded-2xl p-4">
                  <Icon className="h-6 w-6 text-gold-light mx-auto" />
                  <div className="mt-2 text-sm font-bold text-white">{s.l}</div>
                  <div className="text-[11px] text-white/60">{s.d}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function MerlinFooter() {
  return (
    <footer className="relative bg-abyss text-white mt-auto">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <MerlinLogo className="h-10 w-10 text-gold" />
              <div>
                <div className="font-display text-xl font-bold">MERLIN</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gold/80">2030</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/60 max-w-md leading-relaxed">
              {merlin.fullName}. Mewujudkan Indonesia sebagai Pusat Industri Hilirisasi Rumput Laut
              Dunia pada 2030 — berkelanjutan, berdaulat, dan bermartabat.
            </p>
            <p className="mt-4 font-display text-lg italic text-gold-light">
              “{merlin.tagline}”
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Sovereign-Grade", "Zero Waste", "Blue Carbon", "165 PGA"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold-light uppercase tracking-wider mb-3">
              Eksplorasi
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["#visi", "Visi & 9 Pilar"],
                ["#ekosistem", "Ekosistem & 10 Asosiasi"],
                ["#ebip", "Eco Blue Industrial Park"],
                ["#wisata", "Blue Tourism"],
                ["#produk", "100+ Produk Hilir"],
                ["#domain", "20 Domain × 165 PGA"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-white/60 hover:text-gold-light transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold-light uppercase tracking-wider mb-3">
              Hubungi
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Globe className="h-4 w-4 mt-0.5 text-ocean-light shrink-0" />
                <span>
                  Domain resmi:{" "}
                  <span className="text-gold-light font-mono">{merlin.domain}</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-ocean-light shrink-0" />
                <span>sekre@merlin.blue</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-ocean-light shrink-0" />
                <span>Sekretariat MERLIN Pusat, Jakarta, Indonesia</span>
              </li>
              <li className="flex items-start gap-2">
                <Crown className="h-4 w-4 mt-0.5 text-ocean-light shrink-0" />
                <span>Dewan Pembina: Presiden RI</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 text-center sm:text-left">
            © 2026 MERLIN — Masyarakat Ekosistem Rumput Laut Indonesia. Master Document 165 PGA
            Completed. Disusun oleh Dewan Pakar 46 lintas bidang.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:text-gold-light hover:border-gold/40 transition-colors"
          >
            <ArrowUp className="h-3 w-3" />
            Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}

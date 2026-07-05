"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Waves, Anchor, Building2, Hotel, Home, Presentation, Fish, Ticket,
  Mountain, Utensils, Shell, ShoppingBag, Trees, Sun, Sunset, Sailboat, Ship,
  Sparkles, Pill as PillIcon, Box, Leaf, Zap, FlaskConical,
} from "lucide-react";
import { tourismFacilities, productCategories } from "@/lib/merlin-data";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

const TOUR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  waves: Waves, anchor: Anchor, building: Building2, hotel: Hotel, home: Home,
  presentation: Presentation, fish: Fish, ticket: Ticket, mountain: Mountain,
  utensils: Utensils, shell: Shell, "shopping-bag": ShoppingBag, trees: Trees,
  sun: Sun, sunset: Sunset, sailboat: Sailboat, ship: Ship,
};

const CAT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  utensils: Utensils, pill: PillIcon, sparkles: Sparkles, box: Box, leaf: Leaf, zap: Zap, "flask-conical": FlaskConical,
};

const CAT_COLORS: Record<string, string> = {
  ocean: "from-ocean to-ocean-deep",
  seaweed: "from-seaweed to-seaweed-light",
  gold: "from-gold to-gold-light",
};

const CAT_ACCENT: Record<string, string> = {
  ocean: "border-ocean/25 bg-ocean/8 text-ocean",
  seaweed: "border-seaweed/25 bg-seaweed/8 text-seaweed",
  gold: "border-gold/30 bg-gold/10 text-[#a8851f] dark:text-gold-light",
};

export function MerlinTourism() {
  const [activeCat, setActiveCat] = React.useState(0);
  const cat = productCategories[activeCat];
  const CatIcon = CAT_ICON_MAP[cat.icon] ?? Box;

  return (
    <>
      {/* BLUE TOURISM */}
      <section id="wisata" className="relative py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/blue-tourism.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/85 to-ocean-darker" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
          <SectionHeader
            light
            eyebrow="Wisata Bahari Kelas Dunia · Domain 8"
            title={<>Blue Tourism — Dubai Style, Nusantara Soul</>}
            description={
              <>
                Di samping setiap kawasan industri dibangun kawasan wisata bahari kelas dunia.
                Industri dan pariwisata berkembang berdampingan — nilai tambah ekonomi berlipat ganda.
              </>
            }
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {tourismFacilities.map((f, i) => {
              const Icon = TOUR_ICONS[f.icon] ?? Waves;
              return (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="group glass rounded-xl p-4 hover:bg-white/15 hover:ring-gold transition-all"
                >
                  <Icon className="h-6 w-6 text-gold-light group-hover:scale-110 transition-transform" />
                  <p className="mt-2 text-sm font-semibold">{f.name}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 grid sm:grid-cols-3 gap-4"
          >
            {[
              { v: "USD 500", l: "Revenue per visit", d: "Margin 40%" },
              { v: "40", l: "Destinasi kelas dunia", d: "2026 → 2030" },
              { v: "15%", l: "Dari total revenue", d: "Blue Tourism share" },
            ].map((s, i) => (
              <div key={i} className="glass-gold rounded-2xl p-5 text-center">
                <div className="font-display text-3xl font-bold text-gold-light">{s.v}</div>
                <div className="mt-1 text-sm font-semibold">{s.l}</div>
                <div className="text-[11px] text-white/60">{s.d}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 100+ PRODUCTS */}
      <section id="produk" className="relative py-24 sm:py-32 bg-foam-gradient overflow-hidden">
        <div
          className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cover bg-center opacity-10 blur-2xl"
          style={{ backgroundImage: "url(/images/biomaterial.png)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Domain 4 · Product Architecture"
            title={<>100+ Produk Hilir dalam 7 Kategori</>}
            description={
              <>
                Dari <strong className="text-foreground">karagenan</strong> hingga{" "}
                <strong className="text-foreground">fucoidan</strong>, dari{" "}
                <strong className="text-foreground">bioplastic</strong> hingga{" "}
                <strong className="text-foreground">bioethanol E30</strong>. Hilirisasi total —
                inilah yang mengubah rumput kering Rp15rb/kg menjadi karagenan Rp450rb/kg.
              </>
            }
          />

          {/* Category tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {productCategories.map((c, i) => {
              const Icon = CAT_ICON_MAP[c.icon] ?? Box;
              const isActive = activeCat === i;
              return (
                <button
                  key={c.name}
                  onClick={() => setActiveCat(i)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? cn("bg-gradient-to-r text-white shadow-lg border-transparent", CAT_COLORS[c.color])
                      : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-ocean/30"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {c.name}
                  <span className="ml-1 rounded-full bg-black/15 px-1.5 py-0.5 text-[10px]">
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category detail */}
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 grid lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-1">
              <div className={cn("rounded-3xl bg-gradient-to-br p-6 text-white shadow-xl", CAT_COLORS[cat.color])}>
                <CatIcon className="h-10 w-10" />
                <h3 className="mt-4 font-display text-2xl font-bold">{cat.name}</h3>
                <p className="mt-1 text-sm text-white/80">{cat.desc}</p>
                <div className="mt-4 font-display text-5xl font-bold">
                  {cat.count}<span className="text-2xl">+</span>
                </div>
                <p className="text-xs text-white/70">produk turunan</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cat.products.map((p, i) => (
                  <motion.div
                    key={p}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={cn(
                      "rounded-lg border p-2.5 text-xs font-medium hover:shadow-md transition-all",
                      CAT_ACCENT[cat.color]
                    )}
                  >
                    {p}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  PieChart, Pie, AreaChart, Area, CartesianGrid, Legend,
} from "recharts";
import {
  CalendarDays, TrendingUp, Coins, Leaf, Cloud, Factory, Ship, Waves, ArrowRight,
} from "lucide-react";
import {
  roadmap, investmentBreakdown, revenueStreams, capitalStructure,
  financialHighlights, carbonStats,
} from "@/lib/merlin-data";
import { SectionHeader, Pill } from "./section-header";
import { cn } from "@/lib/utils";

const COLOR_HEX: Record<string, string> = {
  ocean: "#0a4d8c",
  seaweed: "#007a5a",
  gold: "#c9a227",
};

const revenueData = revenueStreams.map((r) => ({
  name: r.name,
  value: r.pct,
  fill: COLOR_HEX[r.color],
}));

const investmentData = investmentBreakdown.map((inv) => ({
  name: inv.program,
  value: inv.value,
  fill: COLOR_HEX[inv.color],
}));

const roadmapChartData = roadmap
  .filter((r) => r.year !== "2035")
  .map((r) => ({
    year: r.year,
    ebip: r.ebip,
    export: r.export,
  }));

export function MerlinRoadmap() {
  return (
    <section id="roadmap" className="relative py-24 sm:py-32 bg-foam-gradient overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Domain 2 · Strategy & Direction"
          title={<>Roadmap 2026 → 2030 → 2035</>}
          description="Dari formasi legal menuju 40 Eco Blue Industrial Park — pusat industri rumput laut dunia. Tiap tahun里程碑 yang terukur."
        />

        {/* Timeline */}
        <div className="mt-12 relative">
          {/* vertical line for mobile, horizontal for desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean via-gold to-seaweed opacity-30" />
          <div className="grid gap-4 lg:grid-cols-6">
            {roadmap.map((r, i) => (
              <motion.div
                key={r.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex lg:block items-center gap-3">
                  <div className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ocean to-ocean-deep text-white font-display font-bold shadow-lg lg:mx-auto">
                    {r.year}
                  </div>
                  <div className="lg:mt-4 lg:text-center">
                    <Pill variant={r.phase === "Puncak" ? "gold" : r.phase === "Beyond" ? "seaweed" : "ocean"}>
                      {r.phase}
                    </Pill>
                  </div>
                </div>
                <div className="mt-3 rounded-2xl border border-border bg-card p-4">
                  <h3 className="font-display text-sm font-bold text-foreground leading-tight">
                    {r.milestone}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {r.items.map((item, j) => (
                      <li key={j} className="text-[11px] text-muted-foreground flex items-start gap-1">
                        <span className="text-gold mt-0.5">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="font-display text-lg font-bold text-ocean">{r.ebip}</div>
                      <div className="text-[9px] uppercase text-muted-foreground">EBIP</div>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-seaweed">Rp{r.export}T</div>
                      <div className="text-[9px] uppercase text-muted-foreground">Ekspor</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Growth chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-ocean" />
            <h3 className="font-display text-lg font-bold">Pertumbuhan EBIP & Ekspor 2026–2030</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roadmapChartData}>
                <defs>
                  <linearGradient id="ebipGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a4d8c" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#0a4d8c" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="exportGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a227" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a227" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #d6e3ef",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="ebip"
                  name="EBIP aktif"
                  stroke="#0a4d8c"
                  strokeWidth={2.5}
                  fill="url(#ebipGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="export"
                  name="Ekspor (Rp T)"
                  stroke="#c9a227"
                  strokeWidth={2.5}
                  fill="url(#exportGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// INVESTMENT Rp680T
// ----------------------------------------------------------------------------
export function MerlinInvestment() {
  return (
    <section id="investasi" className="relative py-24 sm:py-32 bg-abyss-gradient text-white overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-ocean/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          light
          eyebrow="Domain 6 · Finance, Risk & Control"
          title={<>Investasi Rp680 Triliun</>}
          description="Struktur permodalan sovereign-grade: equity, debt syariah & multilateral, blended finance. IRR 18%, payback 7 tahun, NPV Rp450T."
        />

        {/* Big total */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-gold-gradient">
            Rp680T
          </div>
          <p className="mt-2 text-sm text-white/60 uppercase tracking-widest">
            Total Investasi MERLIN 2030
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* Investment breakdown bar chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Coins className="h-5 w-5 text-gold-light" />
              <h3 className="font-display text-lg font-bold">Alokasi Investasi (Rp T)</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={investmentData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.6)" }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "rgba(255,255,255,0.7)" }}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(7,31,56,0.95)",
                      color: "#fff",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`Rp${v} T`, "Investasi"]}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {investmentData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Revenue streams pie */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-gold-light" />
              <h3 className="font-display text-lg font-bold">Sumber Pendapatan 2030</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {revenueData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(7,31,56,0.95)",
                      color: "#fff",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`${v}%`, "Share"]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Capital structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 glass rounded-3xl p-6"
        >
          <h3 className="font-display text-lg font-bold mb-4">Struktur Permodalan</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {capitalStructure.map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-white">{c.source}</span>
                  <span className="font-display text-3xl font-bold text-gold-light">{c.pct}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-gold-gradient rounded-full"
                  />
                </div>
                <p className="mt-2 text-[11px] text-white/55 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Financial highlights */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {financialHighlights.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="font-display text-2xl font-bold text-gold-light">{f.value}</div>
              <div className="mt-1 text-xs font-semibold text-white">{f.label}</div>
              <div className="text-[10px] text-white/50">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// BLUE CARBON
// ----------------------------------------------------------------------------
export function MerlinCarbon() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/blue-carbon.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-darker via-ocean-deep/80 to-seaweed/40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
        <SectionHeader
          light
          eyebrow="Domain 13 · Future Civilization · OPEC Biru"
          title={<>Blue Carbon — OPEC Biru Indonesia</>}
          description={
            <>
              MERLIN menjadikan Indonesia pemimpin pasar karbon biru dunia. Rumput laut, mangrove,
              dan seagrass menyerap 12 juta ton CO₂/tahun — monitized sebagai carbon credit premium.
            </>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {carbonStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-gold rounded-2xl p-6 text-center"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-gold-light">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-white">{s.label}</div>
              <div className="text-[11px] text-white/60 mt-0.5">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Carbon flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid md:grid-cols-4 gap-3"
        >
          {[
            { icon: Leaf, t: "Sequestration", d: "12 juta ton CO₂/tahun oleh rumput laut + mangrove + seagrass" },
            { icon: Cloud, t: "MRV Verifikasi", d: "Satelit + IoT + blockchain registry Verra VCS VM0033" },
            { icon: Coins, t: "Monetisasi", d: "12 juta credit × USD 50 = USD 600 juta/tahun revenue" },
            { icon: Waves, t: "Benefit Sharing", d: "10% ke member, 90% reinvest ke ekosistem" },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative glass rounded-2xl p-5">
                <Icon className="h-7 w-7 text-seaweed-light" />
                <h3 className="mt-3 font-display text-base font-bold">{step.t}</h3>
                <p className="mt-1 text-xs text-white/65 leading-relaxed">{step.d}</p>
                {i < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

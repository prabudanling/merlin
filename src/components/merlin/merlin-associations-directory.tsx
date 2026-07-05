"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout, Warehouse, Factory, Zap, Box, Leaf, Palmtree, Cloud,
  FlaskConical, Ship, Search, Users, Mail, Phone, X, Crown, MapPin,
  TrendingUp, ChevronRight,
} from "lucide-react";
import { SectionHeader, Pill } from "./section-header";
import { TiltCard, StaggerGroup, StaggerItem } from "./merlin-animations";
import { cn } from "@/lib/utils";

type Association = {
  id: string;
  code: string;
  name: string;
  julukan: string;
  line: string;
  bidang: string;
  color: string;
  icon: string;
  ketuaName: string;
  ketuaTitle: string;
  kontakEmail: string | null;
  kontakPhone: string | null;
  memberCount: number;
  totalInvestment: number;
  avgInvestment: number;
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout, warehouse: Warehouse, factory: Factory, zap: Zap,
  box: Box, leaf: Leaf, palmtree: Palmtree, cloud: Cloud,
  "flask-conical": FlaskConical, ship: Ship,
};

const COLOR_BG: Record<string, string> = {
  ocean: "from-ocean to-ocean-deep",
  seaweed: "from-seaweed to-seaweed-light",
  gold: "from-gold to-gold-light",
};
const COLOR_ACCENT: Record<string, string> = {
  ocean: "border-ocean/30 bg-ocean/8 text-ocean",
  seaweed: "border-seaweed/30 bg-seaweed/8 text-seaweed",
  gold: "border-gold/35 bg-gold/10 text-[#a8851f] dark:text-gold-light",
};

const LINE_FILTERS = ["Semua", "Hulu", "Konsolidasi", "Hilir 1", "Hilir 2", "Hilir 3", "Hilir 4", "Wisata", "Carbon", "Otak", "Dagang"];

export function MerlinAssociationsDirectory() {
  const [data, setData] = React.useState<Association[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("Semua");
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<Association | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/associations", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Validate structure
      if (!json || !Array.isArray(json.associations)) {
        throw new Error("Invalid associations response");
      }
      setData(json.associations);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const filtered = React.useMemo(() => {
    return data.filter((a) => {
      if (filter !== "Semua" && a.line !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          a.code.toLowerCase().includes(q) ||
          a.julukan.toLowerCase().includes(q) ||
          a.ketuaName.toLowerCase().includes(q) ||
          a.bidang.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [data, filter, search]);

  const totalMembers = data.reduce((s, a) => s + a.memberCount, 0);
  const avgMembers = data.length ? Math.round(totalMembers / data.length) : 0;

  return (
    <section id="direktori" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gridpan opacity-30" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-ocean/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Direktori Resmi · 1 Rumah 10 Kamar"
          title={<>Daftar 10 Asosiasi MERLIN</>}
          description="Setiap asosiasi punya ketua, kontak resmi, dan statistik member live dari database. Klik kartu untuk detail lengkap & daftar anggotanya."
        />

        {/* Live summary stats — PUBLIC (counts only, no financial data) */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Crown, v: data.length || "—", l: "Asosiasi Aktif", c: "gold" },
            { icon: Users, v: totalMembers || "—", l: "Total Member", c: "ocean" },
            { icon: TrendingUp, v: avgMembers || "—", l: "Rata-rata Member/Asosiasi", c: "seaweed" },
            { icon: MapPin, v: "20+", l: "Provinsi Terjangkau", c: "gold" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-4 text-center"
              >
                <Icon className="h-5 w-5 mx-auto text-gold" />
                <div className="mt-2 font-display text-2xl font-bold text-foreground">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.l}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Search + filter */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari asosiasi, ketua, bidang..."
              className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-merlin pb-1">
            {LINE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  filter === f
                    ? "bg-ocean text-white"
                    : "bg-muted text-muted-foreground hover:bg-ocean/10 hover:text-ocean"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid asosiasi */}
        {loading ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl skeleton-merlin" />
            ))}
          </div>
        ) : (
          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => {
              const Icon = ICONS[a.icon] ?? Sprout;
              return (
                <StaggerItem key={a.id}>
                  <TiltCard
                    max={8}
                    className="cursor-pointer h-full"
                  >
                    <button
                      onClick={() => setSelected(a)}
                      className="group relative w-full h-full text-left overflow-hidden rounded-2xl border border-border bg-card p-5 hover:shadow-xl hover:shadow-ocean/10 hover:border-ocean/30 transition-all"
                    >
                      <div className={cn("absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl group-hover:opacity-25 transition-opacity", COLOR_BG[a.color])} />
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${COLOR_BG[a.color]}" />
                      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", COLOR_BG[a.color])} />
                      <div className="flex items-start justify-between">
                        <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg", COLOR_BG[a.color])}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Pill variant={a.color === "gold" ? "gold" : a.color === "seaweed" ? "seaweed" : "ocean"}>
                          {a.line}
                        </Pill>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{a.code}</h3>
                      <p className="text-[11px] font-semibold text-ocean leading-snug line-clamp-2 h-8">
                        {a.name}
                      </p>
                      <div className={cn("mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", COLOR_ACCENT[a.color])}>
                        <Crown className="h-2.5 w-2.5" />
                        “{a.julukan}”
                      </div>
                      <div className="mt-3 pt-3 border-t border-border text-center">
                        <div className="font-display text-2xl font-bold text-ocean">{a.memberCount}</div>
                        <div className="text-[9px] uppercase tracking-wide text-muted-foreground">Member Terdaftar</div>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Crown className="h-3 w-3 text-gold" />
                        <span className="truncate">{a.ketuaName}</span>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ocean group-hover:gap-2 transition-all">
                        Lihat Detail
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </button>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">
            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
            Tidak ada asosiasi yang cocok dengan pencarian.
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-abyss/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-card p-7 shadow-2xl border border-border overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-merlin"
            >
              <div className={cn("absolute inset-x-0 top-0 h-2 bg-gradient-to-r", COLOR_BG[selected.color])} />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", COLOR_BG[selected.color])}>
                  {(() => {
                    const Icon = ICONS[selected.icon] ?? Sprout;
                    return <Icon className="h-8 w-8" />;
                  })()}
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{selected.line}</div>
                  <h3 className="font-display text-3xl font-bold text-foreground">{selected.code}</h3>
                  <div className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold mt-1", COLOR_ACCENT[selected.color])}>
                    <Crown className="h-2.5 w-2.5" />
                    “{selected.julukan}”
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold text-ocean">{selected.name}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{selected.bidang}</p>

              {/* Ketua */}
              <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Ketua</div>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-gold" />
                  <span className="font-semibold text-foreground">{selected.ketuaName}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{selected.ketuaTitle}</div>
              </div>

              {/* Kontak */}
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {selected.kontakEmail && (
                  <a
                    href={`mailto:${selected.kontakEmail}`}
                    className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs hover:border-ocean/30 hover:bg-ocean/5 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-ocean shrink-0" />
                    <span className="text-foreground truncate">{selected.kontakEmail}</span>
                  </a>
                )}
                {selected.kontakPhone && (
                  <a
                    href={`tel:${selected.kontakPhone}`}
                    className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs hover:border-ocean/30 hover:bg-ocean/5 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-ocean shrink-0" />
                    <span className="text-foreground">{selected.kontakPhone}</span>
                  </a>
                )}
              </div>

              {/* Statistik — PUBLIC: count only. Financial details internal-only. */}
              <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4 text-center">
                <div className="font-display text-3xl font-bold text-ocean">{selected.memberCount}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Member Terdaftar</div>
                <p className="mt-2 text-[10px] text-muted-foreground/80 italic">
                  🔒 Data finansial & investasi member bersifat internal — akses via PIN di section Statistik Member.
                </p>
              </div>

              <a
                href="#member"
                onClick={() => setSelected(null)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white hover:bg-ocean-deep transition-colors"
              >
                <Users className="h-4 w-4" />
                Lihat Daftar Member {selected.code}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

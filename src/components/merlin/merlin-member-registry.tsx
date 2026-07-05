"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  PieChart, Pie, AreaChart, Area, CartesianGrid, Legend,
} from "recharts";
import {
  Search, Users, ChevronLeft, ChevronRight, X, Mail, Phone, MapPin,
  Crown, Coins, Filter, RefreshCw, ShieldCheck, Lock, ShieldAlert,
  Eye, EyeOff, KeyRound, LogOut, Sparkles, TrendingUp, MapPinned,
} from "lucide-react";
import { SectionHeader } from "./section-header";
import { StaggerGroup, StaggerItem } from "./merlin-animations";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================
type Stats = {
  total: number;
  perAssociation: {
    association: { code: string; name: string; julukan: string; color: string; icon: string; line: string } | null;
    count: number;
  }[];
  perType: { type: string; count: number }[];
  perProvince: { province: string; count: number }[];
  perStatus: { status: string; count: number }[];
  growth: { month: string; count: number }[];
};

type Member = {
  id: string;
  memberCode: string;
  fullName: string;
  email: string;
  phone: string;
  province: string;
  regency: string | null;
  memberType: string;
  role: string | null;
  joinDate: string;
  status: string;
  investment: number | null;
  association: { code: string; name: string; color: string; julukan: string };
};

type MemberListResp = {
  members: Member[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
  facets: { memberTypes: string[]; provinces: string[] };
};

const COLOR_HEX: Record<string, string> = {
  ocean: "#1e6fb8",
  seaweed: "#0fa37a",
  gold: "#e3c25a",
};

const STATUS_COLOR: Record<string, string> = {
  Aktif: "bg-seaweed/15 text-seaweed border-seaweed/30",
  Pending: "bg-gold/15 text-[#a8851f] dark:text-gold-light border-gold/35",
  Nonaktif: "bg-muted text-muted-foreground border-border",
};

const TYPE_COLOR: Record<string, string> = {
  Petani: "bg-seaweed/15 text-seaweed border-seaweed/30",
  Koperasi: "bg-ocean/15 text-ocean border-ocean/30",
  Industri: "bg-gold/15 text-[#a8851f] dark:text-gold-light border-gold/35",
  Wisata: "bg-ocean/15 text-ocean-light border-ocean/30",
  Riset: "bg-gold/15 text-[#a8851f] dark:text-gold-light border-gold/35",
  Dagang: "bg-seaweed/15 text-seaweed-light border-seaweed/30",
};

function formatRp(juta: number | null) {
  if (!juta) return "—";
  if (juta >= 1000) return `Rp${(juta / 1000).toFixed(1)} M`;
  return `Rp${juta} Jt`;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function MerlinMemberRegistry() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = React.useState(true);
  const [internalMode, setInternalMode] = React.useState(false);
  const [validatedPin, setValidatedPin] = React.useState("");
  const [pinInput, setPinInput] = React.useState("");
  const [showPin, setShowPin] = React.useState(false);
  const [unlocking, setUnlocking] = React.useState(false);
  const [pinError, setPinError] = React.useState("");
  const [showPinModal, setShowPinModal] = React.useState(false);
  const { toast } = useToast();

  // Load public stats (always available)
  const loadStats = React.useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await fetch("/api/members/stats", { cache: "no-store" });
      const json = await res.json();
      setStats(json);
    } catch {
      setStats(null);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  const tryUnlock = async () => {
    setUnlocking(true);
    setPinError("");
    try {
      // Test PIN against the protected endpoint (page 1, smallest pageSize)
      const res = await fetch("/api/members?page=1&pageSize=1", {
        headers: { "x-merlin-pin": pinInput },
        cache: "no-store",
      });
      if (res.ok) {
        setValidatedPin(pinInput);
        setInternalMode(true);
        setShowPinModal(false);
        setPinInput("");
        toast({
          title: "Mode Internal Aktif",
          description: "Anda kini dapat melihat data member lengkap. Jawahkan dengan amanah.",
        });
      } else {
        setPinError("PIN salah. Akses ditolak.");
        toast({ title: "PIN salah", variant: "destructive" });
      }
    } catch {
      setPinError("Gagal memverifikasi PIN.");
    } finally {
      setUnlocking(false);
    }
  };

  const lockInternal = () => {
    setInternalMode(false);
    setValidatedPin("");
    setPinInput("");
    toast({ title: "Mode Internal dinonaktifkan", description: "Kembali ke tampilan publik." });
  };

  return (
    <section id="member" className="relative py-24 sm:py-32 bg-abyss-gradient text-white overflow-hidden">
      <div className="absolute inset-0 bg-gridpan opacity-20" />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-ocean/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          light
          eyebrow="Registrasi Resmi · Klasifikasi Informasi"
          title={<>Statistik & Direktori Member</>}
          description="Total angka & distribusi member MERLIN ditampilkan publik. Data individu (nama, email, telepon) dilindungi — hanya diakses pengurus via PIN internal."
        />

        {/* Info classification banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
            internalMode
              ? "border-gold/40 bg-gold/15 text-gold-light"
              : "border-seaweed/30 bg-seaweed/10 text-seaweed-light"
          )}>
            {internalMode ? (
              <>
                <ShieldAlert className="h-3.5 w-3.5" />
                MODE INTERNAL AKTIF
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5" />
                TAMPILAN PUBLIK · Data sensitif dilindungi
              </>
            )}
          </div>
          {!internalMode ? (
            <Button
              onClick={() => setShowPinModal(true)}
              variant="outline"
              className="border-gold/40 bg-gold/10 text-gold-light hover:bg-gold/20"
            >
              <Lock className="h-4 w-4" />
              Akses Internal (Pengurus)
            </Button>
          ) : (
            <Button
              onClick={lockInternal}
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Keluar Mode Internal
            </Button>
          )}
        </motion.div>

        {/* Public stats */}
        <PublicStats stats={stats} loading={loadingStats} />

        {/* Internal-only member list */}
        <AnimatePresence>
          {internalMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-10 overflow-hidden"
            >
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-3 mb-4 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-gold-light shrink-0" />
                <span className="text-xs text-gold-light/90">
                  <strong>Mode Internal:</strong> Anda melihat data member lengkap. Privasi & keamanan adalah amanah — jangan bagikan data ini ke pihak yang tidak berwenang.
                </span>
              </div>
              <InternalMemberList pin={validatedPin} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PIN input modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowPinModal(false); setPinError(""); setPinInput(""); }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-abyss/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-card p-7 shadow-2xl border border-border"
            >
              <button
                onClick={() => { setShowPinModal(false); setPinError(""); setPinInput(""); }}
                className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-abyss shadow-lg">
                <KeyRound className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Akses Internal</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Masukkan PIN internal untuk mengakses daftar member lengkap. Hanya untuk pengurus asosiasi & tim MERLIN yang berwenang.
              </p>
              <div className="mt-4">
                <label className="text-xs font-semibold text-foreground mb-1.5 block">PIN Internal</label>
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={pinInput}
                    onChange={(e) => { setPinInput(e.target.value); setPinError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                    placeholder="••••••••"
                    autoFocus
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                  <button
                    onClick={() => setShowPin((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {pinError && <p className="mt-1.5 text-xs text-destructive">{pinError}</p>}
                <p className="mt-2 text-[10px] text-muted-foreground">
                  💡 Demo PIN: <code className="font-mono font-bold text-gold">MERLIN-2030</code>
                </p>
              </div>
              <Button
                onClick={tryUnlock}
                disabled={unlocking || !pinInput}
                className="mt-5 w-full bg-gold-gradient text-abyss hover:opacity-90"
              >
                {unlocking ? (
                  <><RefreshCw className="h-4 w-4 animate-spin" /> Memverifikasi...</>
                ) : (
                  <><ShieldCheck className="h-4 w-4" /> Buka Akses Internal</>
                )}
              </Button>
              <p className="mt-3 text-[10px] text-center text-muted-foreground">
                Dengan mengakses, Anda menyetujui kode etik & kerahasiaan data MERLIN.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================================
// PUBLIC STATS — aggregate only, no individual data
// ============================================================================
function PublicStats({ stats, loading }: { stats: Stats | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl skeleton-merlin" />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mt-10 text-center text-white/50">
        <RefreshCw className="h-8 w-8 mx-auto mb-2 opacity-40" />
        Statistik belum tersedia.
      </div>
    );
  }

  const typeChartData = stats.perType.map((t) => ({
    name: t.type,
    value: t.count,
    fill: TYPE_FILL[t.type] || "#1e6fb8",
  }));

  const statusChartData = stats.perStatus.map((s) => ({
    name: s.status,
    value: s.count,
    fill: STATUS_FILL[s.status] || "#94a3b8",
  }));

  const topProvinces = [...stats.perProvince].sort((a, b) => b.count - a.count).slice(0, 8);

  const growthData = stats.growth.map((g) => ({
    month: g.month,
    members: g.count,
  }));

  return (
    <div className="mt-10 space-y-6">
      {/* Top KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Users, v: stats.total, l: "Total Member", c: "text-gold-light" },
          { icon: Crown, v: stats.perAssociation.length, l: "Asosiasi Aktif", c: "text-ocean-light" },
          { icon: MapPinned, v: stats.perProvince.length, l: "Provinsi Tersebar", c: "text-seaweed-light" },
          { icon: TrendingUp, v: stats.growth.length, l: "Bulan Pertumbuhan", c: "text-gold-light" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <Icon className={cn("h-5 w-5 mx-auto", s.c)} />
              <div className={cn("mt-2 font-display text-3xl font-bold", s.c)}>{s.v}</div>
              <div className="text-[10px] uppercase tracking-wide text-white/60">{s.l}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Distribution per association */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Crown className="h-4 w-4 text-gold-light" />
            <h3 className="font-display text-sm font-bold">Distribusi per Asosiasi</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.perAssociation.map((p) => ({ name: p.association?.code || "?", count: p.count, fill: COLOR_HEX[p.association?.color || "ocean"] }))} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.6)" }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.7)" }} width={50} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(7,31,56,0.95)", color: "#fff", fontSize: 12 }}
                  formatter={(v: number) => [`${v} member`, "Jumlah"]}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {stats.perAssociation.map((p, i) => (
                    <Cell key={i} fill={COLOR_HEX[p.association?.color || "ocean"]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution per member type */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-gold-light" />
            <h3 className="font-display text-sm font-bold">Distribusi per Jenis Member</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={85} paddingAngle={2}>
                  {typeChartData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(7,31,56,0.95)", color: "#fff", fontSize: 12 }} formatter={(v: number) => [`${v} member`, "Jumlah"]} />
                <Legend wrapperStyle={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top provinces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPinned className="h-4 w-4 text-ocean-light" />
            <h3 className="font-display text-sm font-bold">Top 8 Provinsi</h3>
          </div>
          <div className="space-y-2">
            {topProvinces.map((p, i) => {
              const max = topProvinces[0]?.count || 1;
              const pct = (p.count / max) * 100;
              return (
                <div key={p.province} className="flex items-center gap-2">
                  <span className="text-[11px] text-white/70 w-32 truncate shrink-0">{p.province}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full bg-gradient-to-r from-ocean to-seaweed-light rounded-full"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gold-light w-6 text-right">{p.count}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Growth timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-seaweed-light" />
            <h3 className="font-display text-sm font-bold">Growth Member per Bulan</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0fa37a" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#0fa37a" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.6)" }} />
                <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.6)" }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(7,31,56,0.95)", color: "#fff", fontSize: 12 }} formatter={(v: number) => [`${v} member baru`, "Pertumbuhan"]} />
                <Area type="monotone" dataKey="members" stroke="#0fa37a" strokeWidth={2.5} fill="url(#growthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Status breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4 w-4 text-gold-light" />
          <h3 className="font-display text-sm font-bold">Status Verifikasi Member</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.perStatus.map((s) => (
            <div key={s.status} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="font-display text-2xl font-bold text-gold-light">{s.count}</div>
              <div className="text-[10px] uppercase tracking-wide text-white/60">{s.status}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Privacy notice */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-seaweed/30 bg-seaweed/5 p-4 flex items-start gap-3"
      >
        <ShieldCheck className="h-5 w-5 text-seaweed-light shrink-0 mt-0.5" />
        <div className="text-xs text-white/70 leading-relaxed">
          <strong className="text-seaweed-light">Klasifikasi Informasi MERLIN:</strong> Statistik agregat (total, distribusi, growth) ditampilkan publik untuk transparansi.
          Data member individu — nama, email, telepon, kode member, investasi pribadi — dilindungi sesuai UU PDP & hanya diakses pengurus asosiasi via PIN internal. Ini amanah & kedaulatan data rakyat.
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// INTERNAL MEMBER LIST — full data, only when PIN unlocked
// ============================================================================
function InternalMemberList({ pin }: { pin: string }) {
  const [data, setData] = React.useState<MemberListResp | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [association, setAssociation] = React.useState("all");
  const [type, setType] = React.useState("all");
  const [province, setProvince] = React.useState("all");
  const [status, setStatus] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [associations, setAssociations] = React.useState<{ code: string; name: string }[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/associations", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setAssociations((j.associations || []).map((a: any) => ({ code: a.code, name: a.name }))))
      .catch(() => {});
  }, []);

  const searchRef = React.useRef(search);
  React.useEffect(() => { searchRef.current = search; }, [search]);

  const loadMembers = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: "12" });
      if (searchRef.current) params.set("search", searchRef.current);
      if (association !== "all") params.set("association", association);
      if (type !== "all") params.set("type", type);
      if (province !== "all") params.set("province", province);
      if (status !== "all") params.set("status", status);
      const res = await fetch(`/api/members?${params}`, {
        headers: { "x-merlin-pin": pin },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("unauthorized");
      const json = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [page, association, type, province, status, pin]);

  React.useEffect(() => {
    const t = setTimeout(() => {
      if (searchRef.current === search) { setPage(1); loadMembers(); }
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  React.useEffect(() => { setPage(1); loadMembers(); }, [association, type, province, status]);
  React.useEffect(() => { loadMembers(); }, [page]);

  const resetFilters = () => {
    setSearch(""); setAssociation("all"); setType("all"); setProvince("all"); setStatus("all"); setPage(1);
  };

  const activeFilterCount = (association !== "all" ? 1 : 0) + (type !== "all" ? 1 : 0) + (province !== "all" ? 1 : 0) + (status !== "all" ? 1 : 0);
  const total = data?.pagination.total ?? 0;
  const startIdx = total === 0 ? 0 : ((data?.pagination.page ?? 1) - 1) * (data?.pagination.pageSize ?? 12) + 1;
  const endIdx = Math.min((data?.pagination.page ?? 1) * (data?.pagination.pageSize ?? 12), total);

  return (
    <div>
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, kode member, telepon, kabupaten..."
            className="w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        <Button onClick={() => setShowFilters((v) => !v)} variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10 relative">
          <Filter className="h-4 w-4" /> Filter
          {activeFilterCount > 0 && (
            <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-abyss text-[10px] font-bold">{activeFilterCount}</span>
          )}
        </Button>
        {(activeFilterCount > 0 || search) && (
          <Button onClick={resetFilters} variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
            <X className="h-4 w-4" /> Reset
          </Button>
        )}
      </div>

      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 glass rounded-2xl p-4">
          <div>
            <label className="text-[10px] uppercase tracking-wide text-white/50">Asosiasi</label>
            <select value={association} onChange={(e) => setAssociation(e.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white">
              <option value="all">Semua Asosiasi</option>
              {associations.map((a) => <option key={a.code} value={a.code}>{a.code} — {a.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wide text-white/50">Jenis Member</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white">
              <option value="all">Semua Jenis</option>
              {data?.facets.memberTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wide text-white/50">Provinsi</label>
            <select value={province} onChange={(e) => setProvince(e.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white">
              <option value="all">Semua Provinsi</option>
              {data?.facets.provinces.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wide text-white/50">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white">
              <option value="all">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Pending">Pending</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </motion.div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-white/60">
        <span>{loading ? "Memuat..." : total > 0 ? `Menampilkan ${startIdx}–${endIdx} dari ${total} member` : "Tidak ada member"}</span>
        <button onClick={loadMembers} className="inline-flex items-center gap-1 hover:text-gold-light transition-colors">
          <RefreshCw className={cn("h-3 w-3", loading && "animate-spin")} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-40 rounded-2xl skeleton-merlin" />)}
        </div>
      ) : data && data.members.length > 0 ? (
        <StaggerGroup className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.members.map((m) => (
            <StaggerItem key={m.id}>
              <div className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-white/5 p-4 hover:border-gold/40 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold text-sm border border-gold/30 bg-gold/10 text-gold-light">
                      {m.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{m.fullName}</div>
                      <div className="font-mono text-[10px] text-gold-light">{m.memberCode}</div>
                    </div>
                  </div>
                  <span className={cn("shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold", STATUS_COLOR[m.status] ?? STATUS_COLOR.Aktif)}>{m.status}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", TYPE_COLOR[m.memberType] ?? TYPE_COLOR.Petani)}>{m.memberType}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-ocean/30 bg-ocean/10 px-2 py-0.5 text-[10px] font-semibold text-ocean-light">{m.association.code}</span>
                  {m.role && <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/70">{m.role}</span>}
                </div>
                <div className="mt-3 space-y-1 text-[11px] text-white/60">
                  <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 shrink-0 text-ocean-light" /><span className="truncate">{m.regency ? `${m.regency}, ` : ""}{m.province}</span></div>
                  <div className="flex items-center gap-1.5"><Mail className="h-3 w-3 shrink-0 text-ocean-light" /><span className="truncate">{m.email}</span></div>
                  <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 shrink-0 text-ocean-light" /><span className="truncate">{m.phone}</span></div>
                  {m.investment != null && (
                    <div className="flex items-center gap-1.5"><Coins className="h-3 w-3 shrink-0 text-gold" /><span className="text-gold-light font-semibold">{formatRp(m.investment)}</span></div>
                  )}
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
                  <span>Bergabung {formatDate(m.joinDate)}</span>
                  <span className="italic">“{m.association.julukan}”</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <div className="mt-12 text-center text-white/50">
          <Sparkles className="h-10 w-10 mx-auto mb-3 opacity-30" />
          Belum ada member yang cocok. Coba ubah filter.
        </div>
      )}

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || loading} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, data.pagination.totalPages) }).map((_, i) => {
              let p = i + 1;
              if (data.pagination.totalPages > 5) {
                if (page > 3) p = page - 2 + i;
                if (page > data.pagination.totalPages - 2) p = data.pagination.totalPages - 4 + i;
              }
              if (p < 1 || p > data.pagination.totalPages) return null;
              return (
                <button key={p} onClick={() => setPage(p)} className={cn("inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors", page === p ? "bg-gold-gradient text-abyss" : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10")}>{p}</button>
              );
            })}
          </div>
          <button onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))} disabled={page >= data.pagination.totalPages || loading} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// HELPERS
// ============================================================================
const TYPE_FILL: Record<string, string> = {
  Petani: "#0fa37a", Koperasi: "#1e6fb8", Industri: "#e3c25a",
  Wisata: "#3a8fd0", Riset: "#f0d97a", Dagang: "#2ec095",
};
const STATUS_FILL: Record<string, string> = {
  Aktif: "#0fa37a", Pending: "#e3c25a", Nonaktif: "#94a3b8",
};

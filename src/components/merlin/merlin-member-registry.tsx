"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Search, Users, ChevronLeft, ChevronRight, X, Mail, Phone, MapPin,
  Crown, Coins, Filter, RefreshCw, Sparkles,
} from "lucide-react";
import { SectionHeader, Pill } from "./section-header";
import { StaggerGroup, StaggerItem } from "./merlin-animations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Member = {
  id: string;
  memberCode: string;
  fullName: string;
  email: string;
  phone: string;
  province: string;
  regency: string | null;
  associationId: string;
  memberType: string;
  role: string | null;
  joinDate: string;
  status: string;
  investment: number | null;
  association: {
    code: string;
    name: string;
    color: string;
    julukan: string;
  };
};

type ApiResponse = {
  members: Member[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
  facets: { memberTypes: string[]; provinces: string[] };
};

const COLOR_ACCENT: Record<string, string> = {
  ocean: "border-ocean/30 bg-ocean/10 text-ocean",
  seaweed: "border-seaweed/30 bg-seaweed/10 text-seaweed",
  gold: "border-gold/35 bg-gold/10 text-[#a8851f] dark:text-gold-light",
};

const TYPE_COLOR: Record<string, string> = {
  Petani: "bg-seaweed/15 text-seaweed border-seaweed/30",
  Koperasi: "bg-ocean/15 text-ocean border-ocean/30",
  Industri: "bg-gold/15 text-[#a8851f] dark:text-gold-light border-gold/35",
  Wisata: "bg-ocean/15 text-ocean-light border-ocean/30",
  Riset: "bg-gold/15 text-[#a8851f] dark:text-gold-light border-gold/35",
  Dagang: "bg-seaweed/15 text-seaweed-light border-seaweed/30",
};

const STATUS_COLOR: Record<string, string> = {
  Aktif: "bg-seaweed/15 text-seaweed border-seaweed/30",
  Pending: "bg-gold/15 text-[#a8851f] dark:text-gold-light border-gold/35",
  Nonaktif: "bg-muted text-muted-foreground border-border",
};

function formatRp(juta: number | null) {
  if (!juta) return "—";
  if (juta >= 1000) return `Rp${(juta / 1000).toFixed(1)} M`;
  return `Rp${juta} Jt`;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function MerlinMemberRegistry() {
  const [data, setData] = React.useState<ApiResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [association, setAssociation] = React.useState("all");
  const [type, setType] = React.useState("all");
  const [province, setProvince] = React.useState("all");
  const [status, setStatus] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [associations, setAssociations] = React.useState<{ code: string; name: string }[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);

  // Load associations for filter
  React.useEffect(() => {
    fetch("/api/associations", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setAssociations((j.associations || []).map((a: any) => ({ code: a.code, name: a.name }))))
      .catch(() => {});
  }, []);

  // Debounced search + load members
  const searchRef = React.useRef(search);
  React.useEffect(() => {
    searchRef.current = search;
    const t = setTimeout(() => {
      if (searchRef.current === search) {
        setPage(1);
        loadMembers();
      }
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  React.useEffect(() => {
    setPage(1);
    loadMembers();
  }, [association, type, province, status]);

  React.useEffect(() => {
    loadMembers();
  }, [page]);

  const loadMembers = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: "12",
      });
      if (searchRef.current) params.set("search", searchRef.current);
      if (association !== "all") params.set("association", association);
      if (type !== "all") params.set("type", type);
      if (province !== "all") params.set("province", province);
      if (status !== "all") params.set("status", status);
      const res = await fetch(`/api/members?${params}`, { cache: "no-store" });
      const json = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [page, association, type, province, status]);

  const resetFilters = () => {
    setSearch("");
    setAssociation("all");
    setType("all");
    setProvince("all");
    setStatus("all");
    setPage(1);
  };

  const activeFilterCount =
    (association !== "all" ? 1 : 0) +
    (type !== "all" ? 1 : 0) +
    (province !== "all" ? 1 : 0) +
    (status !== "all" ? 1 : 0);

  const total = data?.pagination.total ?? 0;
  const startIdx = total === 0 ? 0 : ((data?.pagination.page ?? 1) - 1) * (data?.pagination.pageSize ?? 12) + 1;
  const endIdx = Math.min((data?.pagination.page ?? 1) * (data?.pagination.pageSize ?? 12), total);

  return (
    <section id="member" className="relative py-24 sm:py-32 bg-abyss-gradient text-white overflow-hidden">
      <div className="absolute inset-0 bg-gridpan opacity-20" />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-ocean/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          light
          eyebrow="Registrasi Resmi · Database Live"
          title={<>Daftar Member MERLIN</>}
          description="Database member langsung dari sistem MERLIN. Cari, filter, dan jelajahi 1,5 juta KK petani, koperasi, industri, wisata, riset, dan dagang yang bersatu dalam 10 asosiasi."
        />

        {/* Live counter */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { l: "Total Member", v: total, icon: Users },
            { l: "Asosiasi", v: associations.length, icon: Crown },
            { l: "Halaman", v: data?.pagination.totalPages ?? 1, icon: Filter },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="glass rounded-2xl px-5 py-3 text-center min-w-32">
                <Icon className="h-4 w-4 mx-auto text-gold-light" />
                <div className="mt-1 font-display text-2xl font-bold text-gold-light">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wide text-white/60">{s.l}</div>
              </div>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
          <Button
            onClick={() => setShowFilters((v) => !v)}
            variant="outline"
            className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-gold-light relative"
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-abyss text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
          {(activeFilterCount > 0 || search) && (
            <Button
              onClick={resetFilters}
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
              Reset
            </Button>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 glass rounded-2xl p-4"
          >
            <div>
              <label className="text-[10px] uppercase tracking-wide text-white/50">Asosiasi</label>
              <select
                value={association}
                onChange={(e) => setAssociation(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white"
              >
                <option value="all">Semua Asosiasi</option>
                {associations.map((a) => (
                  <option key={a.code} value={a.code}>{a.code} — {a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wide text-white/50">Jenis Member</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white"
              >
                <option value="all">Semua Jenis</option>
                {data?.facets.memberTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wide text-white/50">Provinsi</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white"
              >
                <option value="all">Semua Provinsi</option>
                {data?.facets.provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wide text-white/50">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-abyss/60 px-3 py-2 text-sm text-white"
              >
                <option value="all">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Pending">Pending</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Result count + refresh */}
        <div className="mt-6 flex items-center justify-between text-xs text-white/60">
          <span>
            {loading ? "Memuat..." : total > 0 ? `Menampilkan ${startIdx}–${endIdx} dari ${total} member` : "Tidak ada member"}
          </span>
          <button
            onClick={loadMembers}
            className="inline-flex items-center gap-1 hover:text-gold-light transition-colors"
          >
            <RefreshCw className={cn("h-3 w-3", loading && "animate-spin")} />
            Refresh
          </button>
        </div>

        {/* Member grid */}
        {loading ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-2xl skeleton-merlin" />
            ))}
          </div>
        ) : data && data.members.length > 0 ? (
          <StaggerGroup className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.members.map((m) => (
              <StaggerItem key={m.id}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-gold/30 transition-all">
                  <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r", `from-${m.association.color === "gold" ? "gold" : m.association.color === "seaweed" ? "seaweed" : "ocean"}-light to-transparent`)} />
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={cn("inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold text-sm border", COLOR_ACCENT[m.association.color] ?? COLOR_ACCENT.ocean)}>
                        {m.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-sm truncate">{m.fullName}</div>
                        <div className="font-mono text-[10px] text-gold-light">{m.memberCode}</div>
                      </div>
                    </div>
                    <span className={cn("shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold", STATUS_COLOR[m.status] ?? STATUS_COLOR.Aktif)}>
                      {m.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", TYPE_COLOR[m.memberType] ?? TYPE_COLOR.Petani)}>
                      {m.memberType}
                    </span>
                    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", COLOR_ACCENT[m.association.color] ?? COLOR_ACCENT.ocean)}>
                      {m.association.code}
                    </span>
                    {m.role && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                        {m.role}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-1 text-[11px] text-white/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0 text-ocean-light" />
                      <span className="truncate">{m.regency ? `${m.regency}, ` : ""}{m.province}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 shrink-0 text-ocean-light" />
                      <span className="truncate">{m.phone}</span>
                    </div>
                    {m.investment != null && (
                      <div className="flex items-center gap-1.5">
                        <Coins className="h-3 w-3 shrink-0 text-gold" />
                        <span className="text-gold-light font-semibold">{formatRp(m.investment)}</span>
                      </div>
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
            Belum ada member yang cocok. Coba ubah filter atau daftarkan member baru.
          </div>
        )}

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
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
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                      page === p ? "bg-gold-gradient text-abyss" : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
              disabled={page >= data.pagination.totalPages || loading}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

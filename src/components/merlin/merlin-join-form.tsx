"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Crown, Check, ChevronRight, ChevronLeft,
  Sparkles, Loader2, PartyPopper, Ship, Sprout, Factory, Zap, Box, Leaf,
  Palmtree, Cloud, FlaskConical, Warehouse,
} from "lucide-react";
import { SectionHeader } from "./section-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STEPS = ["Identitas", "Lokasi & Asosiasi", "Konfirmasi"];

const PROVINCES = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan",
  "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Barat", "Sulawesi Tenggara",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua",
];

const MEMBER_TYPES = [
  { value: "Petani", label: "Petani Rumput Laut", icon: Sprout, desc: "Budidaya & panen rumput laut" },
  { value: "Koperasi", label: "Koperasi", icon: Warehouse, desc: "Konsolidasi & cold storage" },
  { value: "Industri", label: "Industri Hilir", icon: Factory, desc: "Pabrik olahan rumput laut" },
  { value: "Wisata", label: "Pariwisata Bahari", icon: Palmtree, desc: "Resort, marina, edutour" },
  { value: "Riset", label: "Riset & Teknologi", icon: FlaskConical, desc: "Akademisi, startup biotech" },
  { value: "Dagang", label: "Dagang & Ekspor", icon: Ship, desc: "Trading house, exportir" },
];

const ASSOC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout, warehouse: Warehouse, factory: Factory, zap: Zap,
  box: Box, leaf: Leaf, palmtree: Palmtree, cloud: Cloud,
  "flask-conical": FlaskConical, ship: Ship,
};

type Association = {
  id: string;
  code: string;
  name: string;
  julukan: string;
  line: string;
  color: string;
  icon: string;
};

export function MerlinJoinForm() {
  const [step, setStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<{ memberCode: string } | null>(null);
  const [associations, setAssociations] = React.useState<Association[]>([]);
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    province: "",
    regency: "",
    associationCode: "",
    memberType: "",
    role: "Anggota",
    investment: "",
    notes: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { toast } = useToast();

  React.useEffect(() => {
    fetch("/api/associations", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setAssociations(j.associations || []))
      .catch(() => {});
  }, []);

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateStep = (s: number) => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!form.fullName.trim()) errs.fullName = "Nama lengkap wajib diisi";
      if (!form.email.trim()) errs.email = "Email wajib diisi";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        errs.email = "Format email tidak valid";
      if (!form.phone.trim()) errs.phone = "Telepon wajib diisi";
      else if (!/^[+\d\s()-]{8,}$/.test(form.phone.trim()))
        errs.phone = "Format telepon tidak valid";
      if (!form.memberType) errs.memberType = "Pilih jenis member";
    }
    if (s === 1) {
      if (!form.province) errs.province = "Pilih provinsi";
      if (!form.associationCode) errs.associationCode = "Pilih asosiasi";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(2, s + 1));
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!validateStep(0) || !validateStep(1)) {
      toast({ title: "Form belum lengkap", description: "Mohon lengkapi semua field wajib.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          investment: form.investment ? parseFloat(form.investment) : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Pendaftaran gagal");
      }
      setSuccess({ memberCode: json.member.memberCode });
      toast({
        title: "🎉 Pendaftaran Berhasil!",
        description: `Member code: ${json.member.memberCode}`,
      });
    } catch (e: any) {
      toast({
        title: "Pendaftaran Gagal",
        description: e?.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedAssoc = associations.find((a) => a.code === form.associationCode);

  if (success) {
    return (
      <section id="gabung" className="relative py-24 sm:py-32 bg-foam-gradient overflow-hidden">
        <div className="absolute inset-0 bg-dotgrid opacity-30" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="rounded-3xl border-2 border-gold/40 bg-card p-8 sm:p-12 text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
              className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient text-abyss shadow-xl mx-auto"
            >
              <PartyPopper className="h-10 w-10" />
            </motion.div>
            <h3 className="mt-6 font-display text-3xl font-bold text-foreground">
              Selamat Datang di MERLIN! 🌊
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Pendaftaran member Anda berhasil. Tim MERLIN akan memverifikasi data Anda dalam 1×24 jam.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5">
              <Crown className="h-4 w-4 text-gold" />
              <span className="text-xs text-muted-foreground">Member Code Anda:</span>
              <span className="font-mono font-bold text-foreground">{success.memberCode}</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Status awal: <span className="font-semibold text-gold">Pending</span> · Setelah verifikasi: <span className="font-semibold text-seaweed">Aktif</span>
            </p>
            <Button
              onClick={() => {
                setSuccess(null);
                setStep(0);
                setForm({
                  fullName: "", email: "", phone: "", province: "", regency: "",
                  associationCode: "", memberType: "", role: "Anggota", investment: "", notes: "",
                });
              }}
              className="mt-6 bg-ocean hover:bg-ocean-deep"
            >
              Daftar Member Lain
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="gabung" className="relative py-24 sm:py-32 bg-foam-gradient overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-30" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/8 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Bergabung · Pendaftaran Member Resmi"
          title={<>Daftar Menjadi Member MERLIN</>}
          description="Bergabung dengan 1,5 juta KK petani, koperasi, industri, wisata, riset, dan dagang. Nikmati 16 hak fundamental member MERLIN."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl"
        >
          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full font-display font-bold text-sm transition-all",
                      i < step && "bg-seaweed text-white",
                      i === step && "bg-ocean text-white glow-ring",
                      i > step && "bg-muted text-muted-foreground"
                    )}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold hidden sm:inline",
                      i === step ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-2 rounded-full transition-colors", i < step ? "bg-seaweed" : "bg-border")} />
                )}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 0: Identitas */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                    <User className="h-3.5 w-3.5 text-ocean" />
                    Nama Lengkap <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Contoh: Andi Pratama Wijaya"
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30",
                      errors.fullName ? "border-destructive" : "border-border"
                    )}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                      <Mail className="h-3.5 w-3.5 text-ocean" />
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="nama@email.com"
                      className={cn(
                        "w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30",
                        errors.email ? "border-destructive" : "border-border"
                      )}
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                      <Phone className="h-3.5 w-3.5 text-ocean" />
                      Telepon/WhatsApp <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+62 812 3456 7890"
                      className={cn(
                        "w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30",
                        errors.phone ? "border-destructive" : "border-border"
                      )}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-2 block">
                    Jenis Member <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {MEMBER_TYPES.map((t) => {
                      const Icon = t.icon;
                      const active = form.memberType === t.value;
                      return (
                        <button
                          key={t.value}
                          onClick={() => update("memberType", t.value)}
                          className={cn(
                            "rounded-xl border p-3 text-left transition-all",
                            active
                              ? "border-ocean bg-ocean/10 ring-2 ring-ocean/30"
                              : "border-border bg-background hover:border-ocean/30"
                          )}
                        >
                          <Icon className={cn("h-5 w-5 mb-1.5", active ? "text-ocean" : "text-muted-foreground")} />
                          <div className={cn("text-xs font-bold", active ? "text-ocean" : "text-foreground")}>{t.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{t.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.memberType && <p className="mt-1 text-xs text-destructive">{errors.memberType}</p>}
                </div>
              </motion.div>
            )}

            {/* STEP 1: Lokasi & Asosiasi */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                      <MapPin className="h-3.5 w-3.5 text-ocean" />
                      Provinsi <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={form.province}
                      onChange={(e) => update("province", e.target.value)}
                      className={cn(
                        "w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30",
                        errors.province ? "border-destructive" : "border-border"
                      )}
                    >
                      <option value="">Pilih Provinsi</option>
                      {PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    {errors.province && <p className="mt-1 text-xs text-destructive">{errors.province}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                      <MapPin className="h-3.5 w-3.5 text-ocean" />
                      Kabupaten/Kota
                    </label>
                    <input
                      type="text"
                      value={form.regency}
                      onChange={(e) => update("regency", e.target.value)}
                      placeholder="Contoh: Wakatobi"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-2 block">
                    Pilih Asosiasi <span className="text-destructive">*</span>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {associations.map((a) => {
                      const Icon = ASSOC_ICONS[a.icon] ?? Sprout;
                      const active = form.associationCode === a.code;
                      return (
                        <button
                          key={a.id}
                          onClick={() => update("associationCode", a.code)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all",
                            active
                              ? "border-gold bg-gold/10 ring-2 ring-gold/30"
                              : "border-border bg-background hover:border-gold/30"
                          )}
                        >
                          <div className={cn(
                            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white",
                            a.color === "gold" ? "bg-gold-gradient text-abyss" : a.color === "seaweed" ? "bg-seaweed" : "bg-ocean"
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className={cn("text-xs font-bold", active ? "text-gold" : "text-foreground")}>{a.code}</div>
                            <div className="text-[10px] text-muted-foreground truncate">“{a.julukan}” · {a.line}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.associationCode && <p className="mt-1 text-xs text-destructive">{errors.associationCode}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Peran/Jabatan</label>
                    <select
                      value={form.role}
                      onChange={(e) => update("role", e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
                    >
                      <option value="Anggota">Anggota</option>
                      <option value="Ketua Kelompok">Ketua Kelompok</option>
                      <option value="Pengurus">Pengurus Koperasi</option>
                      <option value="Manajer">Manajer Industri</option>
                      <option value="Direktur">Direktur</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">
                      Kontribusi Investasi (Rp Juta)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={form.investment}
                      onChange={(e) => update("investment", e.target.value)}
                      placeholder="Opsional, contoh: 50"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">Catatan (opsional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Ceritakan singkat tentang Anda / usaha Anda..."
                    rows={2}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Konfirmasi */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
                  <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold" />
                    Konfirmasi Pendaftaran
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pastikan data berikut benar. Setelah submit, status awal Anda adalah <strong className="text-gold">Pending</strong> hingga diverifikasi tim MERLIN.
                  </p>
                </div>

                <dl className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-border p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Nama</dt>
                    <dd className="font-semibold text-foreground">{form.fullName}</dd>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Email</dt>
                    <dd className="font-semibold text-foreground truncate">{form.email}</dd>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Telepon</dt>
                    <dd className="font-semibold text-foreground">{form.phone}</dd>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Jenis Member</dt>
                    <dd className="font-semibold text-foreground">{form.memberType}</dd>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Lokasi</dt>
                    <dd className="font-semibold text-foreground">{form.regency ? `${form.regency}, ` : ""}{form.province}</dd>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Peran</dt>
                    <dd className="font-semibold text-foreground">{form.role}</dd>
                  </div>
                  {selectedAssoc && (
                    <div className="rounded-xl border border-gold/30 bg-gold/5 p-3 sm:col-span-2">
                      <dt className="text-[10px] uppercase text-muted-foreground">Asosiasi Terpilih</dt>
                      <dd className="font-semibold text-foreground">
                        {selectedAssoc.code} — {selectedAssoc.name}
                        <span className="ml-2 text-xs text-gold">“{selectedAssoc.julukan}”</span>
                      </dd>
                    </div>
                  )}
                  {form.investment && (
                    <div className="rounded-xl border border-border p-3 sm:col-span-2">
                      <dt className="text-[10px] uppercase text-muted-foreground">Kontribusi Investasi</dt>
                      <dd className="font-semibold text-foreground">Rp {Number(form.investment).toLocaleString("id-ID")} Juta</dd>
                    </div>
                  )}
                </dl>

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" defaultChecked className="mt-0.5" />
                  <span>
                    Saya menyetujui AD/ART MERLIN, 9 Pilar Nilai Inti, dan komitmen pada ekosistem
                    rumput laut Indonesia yang berkelanjutan, berdaulat, dan berkeadilan.
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              onClick={prev}
              disabled={step === 0}
              variant="outline"
              className="border-border"
            >
              <ChevronLeft className="h-4 w-4" />
              Kembali
            </Button>
            {step < 2 ? (
              <Button
                onClick={next}
                className="bg-ocean hover:bg-ocean-deep"
              >
                Lanjut
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={submit}
                disabled={submitting}
                className="bg-gold-gradient text-abyss hover:opacity-90"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mendaftarkan...
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4" />
                    Daftar Sekarang
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

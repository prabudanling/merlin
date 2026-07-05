// MERLIN 2030 — Fallback data untuk deployment serverless (Vercel)
// Digunakan jika SQLite tidak tersedia (ephemeral filesystem di Vercel)
// Memastikan API tetap return data walau database read-only/unavailable.

export type FallbackAssociation = {
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
};

export const fallbackAssociations: FallbackAssociation[] = [
  { id: "f1", code: "APRLN", name: "Asosiasi Petani Rumput Laut Nusantara", julukan: "Laskar Laut", line: "Hulu", bidang: "Bibit Unggul, Budidaya Longline, Harga Jamin Rp18rb/Kg, Asuransi Panen", color: "seaweed", icon: "sprout", ketuaName: "Safari Azis", ketuaTitle: "Ketua Umum (ALB KADIN RI)", kontakEmail: "ketua@aprln.merlin.blue", kontakPhone: "+62 21 555 0001" },
  { id: "f2", code: "AKNBB", name: "Asosiasi Koperasi Nelayan Bahari Biru", julukan: "Gudang Laut", line: "Konsolidasi", bidang: "Kumpul hasil tani 150rb KK, Cold Storage, Logistik ke Pabrik", color: "ocean", icon: "warehouse", ketuaName: "Budi Hartono", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@aknbb.merlin.blue", kontakPhone: "+62 21 555 0002" },
  { id: "f3", code: "AIPRL", name: "Asosiasi Industri Pengolahan Rumput Laut", julukan: "Rafineri Merah", line: "Hilir 1", bidang: "Ekstrak Karagenan, Agar, Alginat Grade Food & Pharma", color: "ocean", icon: "factory", ketuaName: "Pontas Tambunan", ketuaTitle: "Wakil Ketua Umum", kontakEmail: "ketua@aiprl.merlin.blue", kontakPhone: "+62 21 555 0003" },
  { id: "f4", code: "ABBR", name: "Asosiasi Bioenergi & Biogas Rumput Laut", julukan: "PLT Energi Biru", line: "Hilir 2", bidang: "Bioethanol E30, Biogas 1MW, Biochar, Listrik Park", color: "gold", icon: "zap", ketuaName: "Dr. Ir. Andi Wijaya", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@abbr.merlin.blue", kontakPhone: "+62 21 555 0004" },
  { id: "f5", code: "ABBION", name: "Asosiasi Bioplastik & Biomaterial Nusantara", julukan: "Tesla Material", line: "Hilir 3", bidang: "Fiber Rumput Laut, Bioplastic, Kertas, Tekstil Eco", color: "seaweed", icon: "box", ketuaName: "Sri Mulyani T.", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@abbion.merlin.blue", kontakPhone: "+62 21 555 0005" },
  { id: "f6", code: "APPOTL", name: "Asosiasi Pupuk Organik & Pakan Ternak Laut", julukan: "Pabrik Hijau", line: "Hilir 4", bidang: "Pupuk Cair, Pakan Abalone, Kosmetik dari Sisa Ekstrak", color: "seaweed", icon: "leaf", ketuaName: "Prof. Dr. Rahman Hakim", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@appotl.merlin.blue", kontakPhone: "+62 21 555 0006" },
  { id: "f7", code: "APBB", name: "Asosiasi Pariwisata Bahari Berkelanjutan", julukan: "Hawaii Produktif", line: "Wisata", bidang: "Kelola 50 Villa Air, Marina, Museum Laut, Edu-Tour Pabrik", color: "ocean", icon: "palmtree", ketuaName: "Ariesta Dewi", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@apbb.merlin.blue", kontakPhone: "+62 21 555 0007" },
  { id: "f8", code: "AKBIN", name: "Asosiasi Karbon Biru & Iklim Nusantara", julukan: "OPEC Biru", line: "Carbon", bidang: "Verifikasi, Jual Carbon Credit, MRV, Bursa Carbon Park", color: "ocean", icon: "cloud", ketuaName: "Dr. Eng. Bayu Pratama", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@akbin.merlin.blue", kontakPhone: "+62 21 555 0008" },
  { id: "f9", code: "ARTK", name: "Asosiasi Riset & Teknologi Kelautan", julukan: "MIT nya Laut", line: "Otak", bidang: "ITSRC, BRIN, Vatel Academy, Startup Biotech, R&D Genetik", color: "gold", icon: "flask-conical", ketuaName: "Prof. Dr. Jamaluddin Jompa", ketuaTitle: "Ketua Dewan Riset", kontakEmail: "ketua@artk.merlin.blue", kontakPhone: "+62 21 555 0009" },
  { id: "f10", code: "APERL", name: "Asosiasi Perdagangan & Ekspor Rumput Laut", julukan: "Garda Dagang", line: "Dagang", bidang: "Lock Offtake Unilever, Loreal, EU, China. Brand MERLIN Global", color: "gold", icon: "ship", ketuaName: "Hendra Kusuma", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@aperl.merlin.blue", kontakPhone: "+62 21 555 0010" },
];

// Aggregate stats fallback (no individual data — safe for public)
export const fallbackStats = {
  total: 61,
  perAssociation: fallbackAssociations.map((a, i) => ({
    association: { code: a.code, name: a.name, julukan: a.julukan, color: a.color, icon: a.icon, line: a.line },
    count: [6, 2, 7, 2, 7, 4, 9, 8, 7, 9][i] || 5,
  })),
  perType: [
    { type: "Petani", count: 18 },
    { type: "Koperasi", count: 8 },
    { type: "Industri", count: 10 },
    { type: "Wisata", count: 7 },
    { type: "Riset", count: 9 },
    { type: "Dagang", count: 9 },
  ],
  perProvince: [
    { province: "Sulawesi Selatan", count: 8 },
    { province: "Bali", count: 6 },
    { province: "Jawa Timur", count: 5 },
    { province: "Nusa Tenggara Timur", count: 5 },
    { province: "Sumatera Utara", count: 4 },
    { province: "Kalimantan Timur", count: 4 },
    { province: "Maluku", count: 3 },
    { province: "Papua Barat", count: 3 },
  ],
  perStatus: [
    { status: "Aktif", count: 55 },
    { status: "Pending", count: 6 },
  ],
  growth: [
    { month: "2026-01", count: 3 },
    { month: "2026-02", count: 7 },
    { month: "2026-03", count: 12 },
    { month: "2026-04", count: 15 },
    { month: "2026-05", count: 14 },
    { month: "2026-06", count: 10 },
  ],
};

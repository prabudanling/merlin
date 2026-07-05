// MERLIN 2030 — Seed Script
// Seed 10 Asosiasi + contoh Member ke database
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const associations = [
  { code: "APRLN", name: "Asosiasi Petani Rumput Laut Nusantara", julukan: "Laskar Laut", line: "Hulu", bidang: "Bibit Unggul, Budidaya Longline, Harga Jamin Rp18rb/Kg, Asuransi Panen", color: "seaweed", icon: "sprout", ketuaName: "Safari Azis", ketuaTitle: "Ketua Umum (ALB KADIN RI)", kontakEmail: "ketua@aprln.merlin.blue", kontakPhone: "+62 21 555 0001" },
  { code: "AKNBB", name: "Asosiasi Koperasi Nelayan Bahari Biru", julukan: "Gudang Laut", line: "Konsolidasi", bidang: "Kumpul hasil tani 150rb KK, Cold Storage, Logistik ke Pabrik", color: "ocean", icon: "warehouse", ketuaName: "Budi Hartono", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@aknbb.merlin.blue", kontakPhone: "+62 21 555 0002" },
  { code: "AIPRL", name: "Asosiasi Industri Pengolahan Rumput Laut", julukan: "Rafineri Merah", line: "Hilir 1", bidang: "Ekstrak Karagenan, Agar, Alginat Grade Food & Pharma", color: "ocean", icon: "factory", ketuaName: "Pontas Tambunan", ketuaTitle: "Wakil Ketua Umum", kontakEmail: "ketua@aiprl.merlin.blue", kontakPhone: "+62 21 555 0003" },
  { code: "ABBR", name: "Asosiasi Bioenergi & Biogas Rumput Laut", julukan: "PLT Energi Biru", line: "Hilir 2", bidang: "Bioethanol E30, Biogas 1MW, Biochar, Listrik Park", color: "gold", icon: "zap", ketuaName: "Dr. Ir. Andi Wijaya", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@abbr.merlin.blue", kontakPhone: "+62 21 555 0004" },
  { code: "ABBION", name: "Asosiasi Bioplastik & Biomaterial Nusantara", julukan: "Tesla Material", line: "Hilir 3", bidang: "Fiber Rumput Laut, Bioplastic, Kertas, Tekstil Eco", color: "seaweed", icon: "box", ketuaName: "Sri Mulyani T.", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@abbion.merlin.blue", kontakPhone: "+62 21 555 0005" },
  { code: "APPOTL", name: "Asosiasi Pupuk Organik & Pakan Ternak Laut", julukan: "Pabrik Hijau", line: "Hilir 4", bidang: "Pupuk Cair, Pakan Abalone, Kosmetik dari Sisa Ekstrak", color: "seaweed", icon: "leaf", ketuaName: "Prof. Dr. Rahman Hakim", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@appotl.merlin.blue", kontakPhone: "+62 21 555 0006" },
  { code: "APBB", name: "Asosiasi Pariwisata Bahari Berkelanjutan", julukan: "Hawaii Produktif", line: "Wisata", bidang: "Kelola 50 Villa Air, Marina, Museum Laut, Edu-Tour Pabrik", color: "ocean", icon: "palmtree", ketuaName: "Ariesta Dewi", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@apbb.merlin.blue", kontakPhone: "+62 21 555 0007" },
  { code: "AKBIN", name: "Asosiasi Karbon Biru & Iklim Nusantara", julukan: "OPEC Biru", line: "Carbon", bidang: "Verifikasi, Jual Carbon Credit, MRV, Bursa Carbon Park", color: "ocean", icon: "cloud", ketuaName: "Dr. Eng. Bayu Pratama", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@akbin.merlin.blue", kontakPhone: "+62 21 555 0008" },
  { code: "ARTK", name: "Asosiasi Riset & Teknologi Kelautan", julukan: "MIT nya Laut", line: "Otak", bidang: "ITSRC, BRIN, Vatel Academy, Startup Biotech, R&D Genetik", color: "gold", icon: "flask-conical", ketuaName: "Prof. Dr. Jamaluddin Jompa", ketuaTitle: "Ketua Dewan Riset", kontakEmail: "ketua@artk.merlin.blue", kontakPhone: "+62 21 555 0009" },
  { code: "APERL", name: "Asosiasi Perdagangan & Ekspor Rumput Laut", julukan: "Garda Dagang", line: "Dagang", bidang: "Lock Offtake Unilever, Loreal, EU, China. Brand MERLIN Global", color: "gold", icon: "ship", ketuaName: "Hendra Kusuma", ketuaTitle: "Ketua Umum", kontakEmail: "ketua@aperl.merlin.blue", kontakPhone: "+62 21 555 0010" },
];

const provinces = ["Aceh", "Sumatera Utara", "Riau", "Sumatera Barat", "Lampung", "Banten", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Timur", "Kalimantan Selatan", "Sulawesi Selatan", "Sulawesi Tenggara", "Maluku", "Papua Barat", "Papua"];
const regencies = ["Wakatobi", "Derawan", "Raja Ampat", "Buleleng", "Lombok Tengah", "Bantaeng", "Pangkep", "Kupang", "Halmahera", "Biak"];
const memberTypes = ["Petani", "Koperasi", "Industri", "Wisata", "Riset", "Dagang"];
const firstNames = ["Andi", "Siti", "Budi", "Dewi", "Rahmat", "Nur", "Joko", "Wati", "Hendra", "Rina", "Ari", "Maya", "Doni", "Lia", "Tono", "Sri", "Wawan", "Indah", "Yusuf", "Fitri"];
const lastNames = ["Pratama", "Wijaya", "Sari", "Hidayat", "Mulyani", "Susanto", "Rahmawati", "Gunawan", "Lestari", "Saputra", "Anggraini", "Kusuma", "Wibowo", "Permata", "Halim"];

function rand(arr: string[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

async function main() {
  console.log("🌱 Seeding MERLIN database...");

  // Clear existing
  await db.member.deleteMany();
  await db.association.deleteMany();

  // Insert associations
  for (const a of associations) {
    await db.association.create({ data: a });
  }
  console.log(`✅ Inserted ${associations.length} asosiasi`);

  // Insert members: 60 contoh member tersebar
  const members = [];
  for (let i = 0; i < 60; i++) {
    const assoc = associations[randInt(0, associations.length - 1)];
    const fullName = `${rand(firstNames)} ${rand(lastNames)}`;
    const memberType = rand(memberTypes);
    const province = rand(provinces);
    const investment = memberType === "Industri" || memberType === "Dagang" ? randInt(50, 5000) : memberType === "Koperasi" ? randInt(25, 500) : randInt(1, 50);
    members.push({
      memberCode: `MERLIN-2026-${String(i + 1).padStart(6, "0")}`,
      fullName,
      email: `${fullName.toLowerCase().replace(/[^a-z]/g, ".")}${i}@merlin.blue`,
      phone: `+62 81${randInt(10000000, 99999999)}`,
      province,
      regency: rand(regencies),
      associationId: assoc.code, // will resolve below
      memberType,
      role: i < 10 ? "Pengurus" : "Anggota",
      status: i % 11 === 0 ? "Pending" : "Aktif",
      investment,
    });
  }

  // Resolve associationId to actual IDs
  const assocRecords = await db.association.findMany();
  const codeToId = new Map(assocRecords.map((a) => [a.code, a.id]));
  for (const m of members) {
    m.associationId = codeToId.get(m.associationId)!;
    await db.member.create({ data: m as any });
  }
  console.log(`✅ Inserted ${members.length} member contoh`);

  const total = await db.member.count();
  console.log(`📊 Total member di database: ${total}`);
  console.log("🎉 Selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

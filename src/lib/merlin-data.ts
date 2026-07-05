// ============================================================================
// MERLIN 2030 — Master Data Layer
// Masyarakat Ekosistem Rumput Laut Indonesia
// Sumber: Master Document 165 PGA Completed + Konsep Dasar & Kedua
// ============================================================================

export const merlin = {
  name: "MERLIN",
  fullName: "Masyarakat Ekosistem Rumput Laut Indonesia",
  tagline: "Laut Berkemakmuran, Nusantara Berdaulat",
  vision:
    "Menjadikan Indonesia sebagai Pusat Industri Hilirisasi Rumput Laut Dunia pada 2030, Berkelanjutan, Berdaulat, dan Bermartabat.",
  domain: "merlin.blue",
  version: "1.0.0 — Master Document 165 PGA Completed",
  classification: "Sovereign-Grade Standard",
  manifesto:
    "Kami, Masyarakat Ekosistem Rumput Laut Indonesia, dengan ini mendeklarasikan komitmen suci untuk mengubah lautan Nusantara dari sumber kemiskinan menjadi sumber kemakmuran abadi, dari ekspor bahan mentah menjadi pusat industri hilir dunia, dari ketergantungan asing menjadi kedaulatan ekonomi biru.",
};

// ----------------------------------------------------------------------------
// HERO STATS — North Star numbers
// ----------------------------------------------------------------------------
export const heroStats = [
  { value: 680, suffix: " T", prefix: "Rp", label: "Investasi Total", desc: "20 Domain terintegrasi" },
  { value: 500, suffix: " T", prefix: "Rp", label: "Ekspor per Tahun (2030)", desc: "Produk hilir bernilai tinggi" },
  { value: 40, suffix: "", prefix: "", label: "Eco Blue Industrial Park", desc: "Kawasan Zero Waste" },
  { value: 40, suffix: "", prefix: "", label: "Blue Tourism Destination", desc: "Kelas dunia ala Dubai" },
  { value: 5, suffix: " Juta", prefix: "", label: "Lapangan Kerja Baru", desc: "Petani, industri, wisata" },
  { value: 12, suffix: " Juta Ton", prefix: "", label: "CO₂ Terserap/Tahun", desc: "Blue Carbon monetized" },
  { value: 100, suffix: "+", prefix: "", label: "Produk Hilir", desc: "7 kategori turunan" },
  { value: 10, suffix: "", prefix: "", label: "Asosiasi Terpadu", desc: "Hulu → Hilir → Zero Waste" },
];

// ----------------------------------------------------------------------------
// 9 PILAR NILAI INTI MERLIN
// ----------------------------------------------------------------------------
export const pillars = [
  {
    no: 1,
    name: "Amanah",
    title: "Kepercayaan dijaga dengan integritas total",
    desc: "Setiap rupiah dana publik transparan, setiap keputusan dapat diaudit. MERLIN adalah penjaga amanah rakyat dan negara.",
    icon: "shield",
  },
  {
    no: 2,
    name: "Keadilan",
    title: "Petani Rp18.000/kg, bukan Rp6.000/kg",
    desc: "Kesejahteraan dibagi proporsional dari hulu ke hilir dengan rasio 40:30:30. Petani adalah pemilik sejati.",
    icon: "scale",
  },
  {
    no: 3,
    name: "Transparansi",
    title: "Data real-time untuk seluruh member",
    desc: "Produksi, harga, keuangan, dan keputusan publik melalui dashboard real-time yang dapat diakses setiap member.",
    icon: "eye",
  },
  {
    no: 4,
    name: "Kemaslahatan",
    title: "Manfaat nyata untuk pesisir",
    desc: "Setiap keputusan harus memberi manfaat nyata kepada masyarakat pesisir, bukan hanya shareholder.",
    icon: "heart-handshake",
  },
  {
    no: 5,
    name: "Kesederhanaan",
    title: "Overhead <8% pendapatan",
    desc: "Operasional efisien, fokus pada value creation bukan vanity. Setiap rupiah dihitung dengan cermat.",
    icon: "leaf",
  },
  {
    no: 6,
    name: "Kebersamaan",
    title: "1 Rumah, 10 Kamar",
    desc: "10 asosiasi bersatu dalam 1 rumah MERLIN, keputusan melalui musyawarah, tidak ada yang mendominasi.",
    icon: "users",
  },
  {
    no: 7,
    name: "Kelestarian",
    title: "Zero Waste, Blue Carbon Positive",
    desc: "0% limbah keluar kawasan industri. Restorasi ekosistem laut. 12 juta ton CO₂/tahun terserap.",
    icon: "waves",
  },
  {
    no: 8,
    name: "Keilmuan",
    title: "5% pendapatan untuk R&D",
    desc: "Riset-driven, semua praktik berbasis sains. Kemitraan dengan 50+ universitas, 1000+ peneliti.",
    icon: "flask-conical",
  },
  {
    no: 9,
    name: "Kedaulatan",
    title: "Sumber daya laut dikuasai rakyat",
    desc: "Ekspor produk hilir bukan bahan mentah. Brand MERLIN milik bangsa. Kedaulatan ekonomi biru.",
    icon: "crown",
  },
];

// ----------------------------------------------------------------------------
// EKOSYSTEM FLOW — Hulu → Hilir → Zero Waste
// ----------------------------------------------------------------------------
export const ecosystemFlow = [
  {
    stage: "Hulu",
    title: "Petani Rumput Laut",
    association: "APRLN",
    desc: "1,5 juta KK petani. Bibit unggul, budidaya longline, harga jamin Rp18.000/kg, asuransi panen.",
    icon: "sprout",
  },
  {
    stage: "Konsolidasi",
    title: "Koperasi & Collection Center",
    association: "AKNBB",
    desc: "350 koperasi, cold storage, logistik ke pabrik. Menjamin rantai pasok stabil & efisien.",
    icon: "warehouse",
  },
  {
    stage: "Hilir",
    title: "Eco Blue Industrial Park",
    association: "AIPRL · ABBR · ABBION · APPOTL",
    desc: "40 kawasan industri terpadu. Olah 100+ produk: food, pharma, kosmetik, bioplastic, bioenergy.",
    icon: "factory",
  },
  {
    stage: "Monetisasi",
    title: "Ekspor · Wisata · Karbon",
    association: "APERL · APBB · AKBIN",
    desc: "Lock offtake Unilever & L'Oreal. 40 Blue Tourism. 12 juta ton blue carbon credit/tahun.",
    icon: "globe",
  },
];

// ----------------------------------------------------------------------------
// 10 ASOSIASI MERLIN — 1 Rumah 10 Kamar
// ----------------------------------------------------------------------------
export const associations = [
  {
    code: "APRLN",
    name: "Asosiasi Petani Rumput Laut Nusantara",
    julukan: "Laskar Laut",
    line: "Hulu",
    bidang: "Bibit Unggul, Budidaya Longline, Harga Jamin Rp18rb/Kg, Asuransi Panen",
    color: "seaweed",
    icon: "sprout",
  },
  {
    code: "AKNBB",
    name: "Asosiasi Koperasi Nelayan Bahari Biru",
    julukan: "Gudang Laut",
    line: "Konsolidasi",
    bidang: "Kumpul hasil tani 150rb KK, Cold Storage, Logistik ke Pabrik",
    color: "ocean",
    icon: "warehouse",
  },
  {
    code: "AIPRL",
    name: "Asosiasi Industri Pengolahan Rumput Laut",
    julukan: "Rafineri Merah",
    line: "Hilir 1",
    bidang: "Ekstrak Karagenan, Agar, Alginat Grade Food & Pharma",
    color: "ocean",
    icon: "factory",
  },
  {
    code: "ABBR",
    name: "Asosiasi Bioenergi & Biogas Rumput Laut",
    julukan: "PLT Energi Biru",
    line: "Hilir 2",
    bidang: "Bioethanol E30, Biogas 1MW, Biochar, Listrik Park",
    color: "gold",
    icon: "zap",
  },
  {
    code: "ABBION",
    name: "Asosiasi Bioplastik & Biomaterial Nusantara",
    julukan: "Tesla Material",
    line: "Hilir 3",
    bidang: "Fiber Rumput Laut, Bioplastic, Kertas, Tekstil Eco",
    color: "seaweed",
    icon: "box",
  },
  {
    code: "APPOTL",
    name: "Asosiasi Pupuk Organik & Pakan Ternak Laut",
    julukan: "Pabrik Hijau",
    line: "Hilir 4",
    bidang: "Pupuk Cair, Pakan Abalone, Kosmetik dari Sisa Ekstrak",
    color: "seaweed",
    icon: "leaf",
  },
  {
    code: "APBB",
    name: "Asosiasi Pariwisata Bahari Berkelanjutan",
    julukan: "Hawaii Produktif",
    line: "Wisata",
    bidang: "Kelola 50 Villa Air, Marina, Museum Laut, Edu-Tour Pabrik",
    color: "ocean",
    icon: "palmtree",
  },
  {
    code: "AKBIN",
    name: "Asosiasi Karbon Biru & Iklim Nusantara",
    julukan: "OPEC Biru",
    line: "Carbon",
    bidang: "Verifikasi, Jual Carbon Credit, MRV, Bursa Carbon Park",
    color: "ocean",
    icon: "cloud",
  },
  {
    code: "ARTK",
    name: "Asosiasi Riset & Teknologi Kelautan",
    julukan: "MIT nya Laut",
    line: "Otak",
    bidang: "ITSRC, BRIN, Vatel Academy, Startup Biotech, R&D Genetik",
    color: "gold",
    icon: "flask-conical",
  },
  {
    code: "APERL",
    name: "Asosiasi Perdagangan & Ekspor Rumput Laut",
    julukan: "Garda Dagang",
    line: "Dagang",
    bidang: "Lock Offtake Unilever, Loreal, EU, China. Brand MERLIN Global",
    color: "gold",
    icon: "ship",
  },
];

// ----------------------------------------------------------------------------
// ECO BLUE INDUSTRIAL PARK — fasilitas dalam 1 kawasan
// ----------------------------------------------------------------------------
export const ebipFacilities = [
  "Pabrik Karaginan", "Pabrik Agar", "Pabrik Alginat", "Pabrik Bioetanol",
  "Pabrik Bioplastik", "Pabrik Kosmetik", "Pabrik Farmasi", "Pabrik Nutraceutical",
  "Pabrik Pangan", "Pabrik Minuman", "Pabrik Pupuk Organik", "Pabrik Pakan Ternak",
  "Green Energy Plant", "Cold Storage", "Pelabuhan Ekspor", "Smart Warehouse",
  "Dry Port", "Logistic Center", "Innovation Center", "Marine Biotechnology Center",
  "Laboratorium Nasional Rumput Laut", "Balai Pelatihan SDM",
];

export const zeroWasteLoop = [
  { from: "Rumput Laut 100%", to: "Produk Utama 60%", desc: "Karagenan, agar, alginat, bioethanol, bioplastic, fucoidan" },
  { from: "Sisa Ekstrak 30%", to: "Byproduct Bernilai", desc: "Sludge → pupuk, air cucian → biogas, residu → biochar" },
  { from: "Sisa Akhir 8%", to: "Waste-to-Energy", desc: "Biogas 1MW, biochar, listrik untuk kawasan industri" },
  { from: "Sisa 2%", to: "Kompos", desc: "Pupuk organik untuk restorasi mangrove & budidaya" },
];

// Lokasi potensial EBIP di Indonesia (40 kawasan)
export const ebipLocations = [
  { region: "Sumatera", count: 8, provinces: "Aceh, Sumut, Riau, Kepulauan Riau, Sumbar, Sumsel, Lampung, Bangka" },
  { region: "Jawa", count: 7, provinces: "Banten, Jabar, Jateng, DI Yogyakarta, Jatim, DKI Jakarta" },
  { region: "Bali & Nusa Tenggara", count: 6, provinces: "Bali, NTB, NTT, Lombok, Sumba, Flores" },
  { region: "Kalimantan", count: 5, provinces: "Kaltim, Kalsel, Kalteng, Kalbar, Kaltara" },
  { region: "Sulawesi", count: 7, provinces: "Sulut, Gorontalo, Sulteng, Sulsel, Sulbar, Sultra" },
  { region: "Maluku & Papua", count: 4, provinces: "Maluku, Malut, Papua Barat, Papua" },
  { region: "Sentra Utama", count: 3, provinces: "Wakatobi, Derawan, Raja Ampat (pilot kawasan)" },
];

// ----------------------------------------------------------------------------
// BLUE TOURISM — 17 fasilitas kelas dunia
// ----------------------------------------------------------------------------
export const tourismFacilities = [
  { name: "Pantai Premium", icon: "waves" },
  { name: "Marina Yacht", icon: "anchor" },
  { name: "Resort Bintang 5", icon: "building" },
  { name: "Hotel Internasional", icon: "hotel" },
  { name: "Water Villa", icon: "home" },
  { name: "Convention Center", icon: "presentation" },
  { name: "Aquarium Raksasa", icon: "fish" },
  { name: "Sea Theme Park", icon: "ticket" },
  { name: "Sky Walk", icon: "mountain" },
  { name: "Floating Restaurant", icon: "utensils" },
  { name: "Seafood Center", icon: "shell" },
  { name: "Shopping Mall", icon: "shopping-bag" },
  { name: "Eco Mangrove Park", icon: "trees" },
  { name: "Beach Club", icon: "sun" },
  { name: "Sunset Boulevard", icon: "sunset" },
  { name: "Water Sport Center", icon: "sailboat" },
  { name: "Cruise Terminal", icon: "ship" },
];

// ----------------------------------------------------------------------------
// 100+ PRODUK HILIR — 7 kategori
// ----------------------------------------------------------------------------
export const productCategories = [
  {
    name: "Food Ingredient",
    count: 25,
    color: "ocean",
    icon: "utensils",
    desc: "Bahan baku pangan global, halal & food-grade",
    products: [
      "Karragenan Refined (Kappa/Iota/Lambda)", "Semi-Refined Karragenan", "PES Karragenan",
      "Agar Food Grade", "Agar Bakteriologi", "Alginat Food Grade",
      "Propylene Glycol Alginat", "Jelly Powder", "Pudding Mix",
      "Ice Cream Stabilizer", "Dairy Thickener", "Meat Binder",
      "Bakery Improver", "Beverage Cloudifier", "Gelatin Substitute",
      "Fruit Preserve Gelling", "Confectionery Gels", "Sauces & Dressings",
      "Plant-Based Egg Replacement", "Whipping Agent", "Emulsifier Blend",
      "Yogurt Stabilizer", "Cheese Texture Modifier", "Noodle Texture Enhancer", "Pet Food Binder",
    ],
  },
  {
    name: "Pharmaceutical",
    count: 15,
    color: "gold",
    icon: "pill",
    desc: "USP/EP grade, GMP-certified, life-science grade",
    products: [
      "Capsule Shell (Halal/Vegan)", "Tablet Binder", "Tablet Disintegrant",
      "Wound Dressing Hydrogel", "Drug Delivery Matrix", "Antiviral Compound",
      "Antitumor Agent", "Vaccine Adjuvant", "Dental Impression Material",
      "Surgical Lubricant", "Blood Plasma Extender", "Ophthalmic Solution",
      "Gastrointestinal Protectant", "Sustained Release Matrix", "Biodegradable Suture",
    ],
  },
  {
    name: "Cosmeceutical",
    count: 15,
    color: "seaweed",
    icon: "sparkles",
    desc: "Organic, fair-trade, premium beauty ingredients",
    products: [
      "Face Mask Sheet", "Anti-Aging Serum", "Hydrating Cream",
      "Botanical Shampoo", "Seaweed Soap Bar", "Body Scrub",
      "Natural Sunblock", "Anti-Aging Treatment", "Skin Whitening Essence",
      "Acne Treatment Gel", "Hair Growth Tonic", "Lip Balm",
      "Eye Cream", "Toner Astringent", "Massage Oil",
    ],
  },
  {
    name: "Bioplastic & Biomaterial",
    count: 15,
    color: "seaweed",
    icon: "box",
    desc: "Biodegradable 90%/180 hari, ISCC+ certified",
    products: [
      "Film Packaging", "Bioplastic Bag", "Biodegradable Cutlery",
      "Seaweed Textile Fiber", "Paper Coating", "3D Printing Filament",
      "Biocomposite Panel", "Food Tray", "Agricultural Mulch Film",
      "Water-Soluble Pouch", "Thermoformed Container", "Injection Mold Parts",
      "Foam Packaging", "Coated Paper Cup", "Bioplastic Stretch Film",
    ],
  },
  {
    name: "Bioenergy",
    count: 10,
    color: "gold",
    icon: "zap",
    desc: "E30, biogas, biochar — substitusi fossil",
    products: [
      "Bioethanol E30 (99.5% purity)", "Biogas (1MW per EBIP)", "Biochar Soil Amendment",
      "Bio-Oil", "Green Hydrogen Feedstock", "Biobutanol",
      "Biomethane", "Wood Pellet Substitute", "Fuel Briquette", "Syngas",
    ],
  },
  {
    name: "Agriculture & Feed",
    count: 10,
    color: "seaweed",
    icon: "leaf",
    desc: "Pupuk cair, biostimulan, pakan bernilai",
    products: [
      "Pupuk Cair Organik", "Biostimulant Tanaman", "Pakan Udang Premium",
      "Pakan Ikan Tinggi Protein", "Pakan Abalone", "Pakan Ternak Suplemen",
      "Soil Conditioner", "Hydroponic Nutrient", "Bio-Pest Control Agent", "Compost Activator",
    ],
  },
  {
    name: "Nutraceutical & Supplement",
    count: 10,
    color: "ocean",
    icon: "flask-conical",
    desc: "Fucoidan, omega-3, fungsional premium",
    products: [
      "Fucoidan (85% purity)", "Laminarin", "Fucoxanthin",
      "Omega-3 DHA/EPA", "Iodine Supplement", "Fiber Supplement",
      "Weight Management Formula", "Antioxidant Blend", "Immune Booster", "Joint Health Complex",
    ],
  },
];

// ----------------------------------------------------------------------------
// 20 DOMAIN × 165 DOKUMEN PGA
// ----------------------------------------------------------------------------
export const domains = [
  { no: 1, name: "Identity & Civilization", range: "PGA-01 → 08", count: 8, icon: "crown", color: "gold",
    desc: "Fondasi jati diri MERLIN — siapa kita, dari mana, ke mana. Visi, misi, filosofi pendiri, 9 pilar, manifesto, whitepaper." },
  { no: 2, name: "Strategy & Direction", range: "PGA-09 → 16", count: 8, icon: "compass", color: "ocean",
    desc: "Arah strategis — masterplan 10 tahun, business model canvas, market landscape, go-to-market, competitive moat, scenario planning." },
  { no: 3, name: "Governance & Legal", range: "PGA-17 → 24", count: 8, icon: "scale", color: "ocean",
    desc: "Tata kelola — governance charter, struktur organisasi 6 level, matriks RACI, AD/ART, contracting framework, policy register." },
  { no: 4, name: "Product / Service / Solution", range: "PGA-25 → 32", count: 8, icon: "box", color: "seaweed",
    desc: "Arsitektur 100+ produk dalam 7 kategori. PRD, roadmap, service blueprint, quality standard USP/EP, innovation pipeline." },
  { no: 5, name: "Operations & Delivery", range: "PGA-33 → 40", count: 8, icon: "settings", color: "ocean",
    desc: "Eksekusi hulu-hilir — master SOP, process map end-to-end, SLA, procurement, partnership, BCP/DR, 350 cabang." },
  { no: 6, name: "Finance, Risk & Control", range: "PGA-41 → 48", count: 8, icon: "coins", color: "gold",
    desc: "Rp680T investasi — financial model, unit economics, revenue model, risk register 12 risiko, audit COSO, treasury." },
  { no: 7, name: "People, Culture & Leadership", range: "PGA-49 → 56", count: 8, icon: "users", color: "seaweed",
    desc: "5 juta tenaga kerja — talent framework, leadership model, Akademi MERLIN, culture code, ethics, succession 3-deep." },
  { no: 8, name: "Brand, Growth & Stakeholders", range: "PGA-57 → 64", count: 8, icon: "megaphone", color: "ocean",
    desc: "Brand MERLIN global — narrative matrix, stakeholder map, sales playbook, government relations, investor & media deck." },
  { no: 9, name: "Data, Intelligence & Legacy", range: "PGA-65 → 72", count: 8, icon: "database", color: "ocean",
    desc: "Aset pengetahuan abadi — data governance UU PDP/GDPR, security ISO 27001, KPI dashboard North Star, ESG framework." },
  { no: 10, name: "Diplomacy & International Relations", range: "PGA-73 → 80", count: 8, icon: "globe", color: "gold",
    desc: "Diplomasi ekonomi biru — UN, FAO, World Bank, ASEAN. Soft power, treaty, brand diplomacy, sovereign roadshow global." },
  { no: 11, name: "Sovereignty Economics & Islamic Finance", range: "PGA-81 → 88", count: 8, icon: "landmark", color: "gold",
    desc: "Ekonomi berdaulat & keuangan syariah — sukuk, waqf, zakat, blended finance, endowment Rp50T, asset lock konstitusional." },
  { no: 12, name: "Social Justice, Equity & Human Rights", range: "PGA-89 → 96", count: 8, icon: "heart-handshake", color: "seaweed",
    desc: "Keadilan sosial — women's justice 50%, youth parliament, disability, indigenous knowledge, child protection, climate justice." },
  { no: 13, name: "Future Civilization & Frontier Science", range: "PGA-97 → 108", count: 12, icon: "atom", color: "gold",
    desc: "Peradaban masa depan — AI ethics & sovereignty, quantum computing, space economy, synthetic biology, open source, blue carbon market, perisai konstitusional 100 tahun." },
  { no: 14, name: "Defense, Security & Resilience", range: "PGA-109 → 116", count: 8, icon: "shield", color: "ocean",
    desc: "Pertahanan & ketahanan — maritime security 10.000 personel, food-energy-water security, climate resilience, civil defense." },
  { no: 15, name: "Technology, Innovation & Digital Sovereignty", range: "PGA-117 → 124", count: 8, icon: "cpu", color: "ocean",
    desc: "Kedaulatan digital — AI lab 100 engineer, blockchain traceability, MERLIN Cloud, MERLIN OS, DevSecOps, data privacy." },
  { no: 16, name: "Media, Narrative & Communications Power", range: "PGA-125 → 132", count: 8, icon: "newspaper", color: "ocean",
    desc: "Kekuatan narasi — media relations Bloomberg/Reuters, social 1-5 juta followers, thought leadership, narrative warfare defense." },
  { no: 17, name: "Education, Research & Knowledge", range: "PGA-133 → 140", count: 8, icon: "graduation-cap", color: "seaweed",
    desc: "5 kampus Akademi MERLIN, 50+ universitas, Vatel Academy, 1000+ peneliti, 1000+ paten, peer-reviewed MERLIN Journal." },
  { no: 18, name: "Healthcare, Wellness & Social Services", range: "PGA-141 → 148", count: 8, icon: "stethoscope", color: "seaweed",
    desc: "Kesehatan member — 350 klinik, 40 rumah sakit, telemedicine, genomics sovereignty, elder care, mental health, wellness." },
  { no: 19, name: "Infrastructure, Urban Planning & Development", range: "PGA-149 → 156", count: 8, icon: "building-2", color: "ocean",
    desc: "40 MERLIN Eco-City, 1000 km jalan, 40 pelabuhan, 5 GW renewable, 5000 km fiber, smart city, sponge city, WASH 100%." },
  { no: 20, name: "Legal, Constitutional & Justice System", range: "PGA-157 → 165", count: 9, icon: "gavel", color: "gold",
    desc: "Sistem hukum & konstitusional — UU Rumput Laut, MERLIN Court, Human Rights Commission, Ombudsman, anti-corruption ISO 37001." },
];

// ----------------------------------------------------------------------------
// 16 HAK MEMBER MERLIN
// ----------------------------------------------------------------------------
export const memberRights = [
  { no: 1, title: "Harga Jaminan Rp18.000/kg", desc: "3x lipat harga pasar Rp6.000/kg. Petani sejahtera, bukan dieksploitasi." },
  { no: 2, title: "Asuransi Panen", desc: "Perlindungan dari gagal panen, penyakit ice-ice, dan ekstrem iklim." },
  { no: 3, title: "Pendidikan Anak Gratis", desc: "100% anak member sekolah. Scholarship Anak Bahari, beasiswa sampai universitas." },
  { no: 4, title: "Layanan Kesehatan Gratis", desc: "350 klinik + 40 rumah sakit + telemedicine 24/7 untuk seluruh keluarga member." },
  { no: 5, title: "Jaminan Hari Tua", desc: "Pension fund & dana pensiun untuk 1,5 juta KK petani pesisir." },
  { no: 6, title: "Rumah Layak Huni", desc: "30% housing terjangkau di MERLIN Eco-City. Inclusionary zoning untuk low-income." },
  { no: 7, title: "Akses Pendanaan & Mikrokredit", desc: "Koperasi MERLIN, fintech, pembiayaan syariah, tanpa rentenir." },
  { no: 8, title: "Pelatihan & Sertifikasi Gratis", desc: "Akademi MERLIN, 40 jam/tahun, 50+ sertifikat. Lifelong learning." },
  { no: 9, title: "Akses Internet & Digital", desc: "4G/5G per EBIP, member app, marketplace, e-learning, telemedicine." },
  { no: 10, title: "Jaminan Pangan Bergizi", desc: "Food security, fortifikasi rumput laut, school feeding, food bank darurat." },
  { no: 11, title: "Perlindungan Perempuan & Keluarga", desc: "Maternity 6 bulan, childcare center, anti-harassment, 50% perempuan leader." },
  { no: 12, title: "Akses Air Bersih & Sanitasi", desc: "WASH 100% — desalination, water recycle 90%, toilet & WWTP per EBIP." },
  { no: 13, title: "Perlindungan Iklim & Adaptasi", desc: "Bibit tahan stress, early warning, asuransi iklim, just transition." },
  { no: 14, title: "Hak Suara & Demokrasi", desc: "Musyawarah member, ombudsman independen, Human Rights Commission." },
  { no: 15, title: "Warisan Budaya & Pengetahuan Adat", desc: "Indigenous knowledge protection, geographical indication, community fund." },
  { no: 16, title: "Sertifikasi & Brand MERLIN", desc: "Premium zero-waste certified, traceability blockchain farm-to-shelf." },
];

// ----------------------------------------------------------------------------
// ROADMAP 2026 → 2035
// ----------------------------------------------------------------------------
export const roadmap = [
  {
    year: "2026",
    phase: "Fondasi Legal",
    milestone: "Pembentukan MERLIN",
    items: ["Akta 10 Asosiasi + MERLIN Pusat", "UU Rumput Laut draft", "Masterplan nasional", "Akuisisi ARLI/ASTRULI/ASPPERLI", "Domain merlin.blue aktif"],
    ebip: 0,
    export: 5,
    progress: 8,
  },
  {
    year: "2027",
    phase: "Pilot",
    milestone: "10 Eco Blue Industrial Park",
    items: ["10 EBIP pilot beroperasi", "25 produk hilir launch", "Akademi MERLIN 5 kampus", "Bursa Carbon Biru pilot"],
    ebip: 10,
    export: 25,
    progress: 25,
  },
  {
    year: "2028",
    phase: "Skala",
    milestone: "20 EBIP + Blue Tourism",
    items: ["20 EBIP aktif", "Mulai 40 Blue Tourism", "50 produk global", "Ekspor melonjak"],
    ebip: 20,
    export: 80,
    progress: 50,
  },
  {
    year: "2029",
    phase: "Akselerasi",
    milestone: "30 EBIP + Ekspor Massal",
    items: ["30 EBIP aktif", "75 produk advanced", "Carbon credit trading penuh", "Brand global top 5"],
    ebip: 30,
    export: 200,
    progress: 75,
  },
  {
    year: "2030",
    phase: "Puncak",
    milestone: "40 EBIP — Pusat Dunia",
    items: ["40 EBIP beroperasi", "40 Blue Tourism kelas dunia", "100+ produk hilir", "Rp500T ekspor/tahun", "5 juta lapangan kerja"],
    ebip: 40,
    export: 500,
    progress: 100,
  },
  {
    year: "2035",
    phase: "Beyond",
    milestone: "Biomaterial Global Leader",
    items: ["Biomaterial global leader", "IPO MERLIN Holding", "Rp1.200T revenue", "Quantum & space economy"],
    ebip: 50,
    export: 800,
    progress: 100,
  },
];

// ----------------------------------------------------------------------------
// INVESTASI Rp680 TRILIUN
// ----------------------------------------------------------------------------
export const investmentBreakdown = [
  { program: "40 Eco Blue Industrial Park", value: 240, color: "ocean", desc: "Infrastruktur kawasan industri terpadu zero waste" },
  { program: "Industri Hilirisasi", value: 180, color: "seaweed", desc: "100+ pabrik produk turunan bernilai tinggi" },
  { program: "Blue Tourism", value: 150, color: "gold", desc: "40 kawasan wisata bahari kelas dunia" },
  { program: "Infrastruktur Pendukung", value: 60, color: "ocean", desc: "Eco-City, smart city, civic facilities" },
  { program: "Pelabuhan & Logistik", value: 50, color: "seaweed", desc: "40 port, cold chain, smart warehouse, dry port" },
];

export const revenueStreams = [
  { name: "Ekspor Produk Hilir", pct: 60, color: "ocean" },
  { name: "Blue Tourism", pct: 15, color: "gold" },
  { name: "Blue Carbon Credit", pct: 10, color: "seaweed" },
  { name: "Bioteknologi & Paten", pct: 8, color: "ocean" },
  { name: "Logistik & Cold Storage", pct: 4, color: "seaweed" },
  { name: "Pendidikan & Sertifikasi", pct: 3, color: "gold" },
];

export const capitalStructure = [
  { source: "Equity", pct: 40, detail: "Govt 25% · Strategic 35% · IPO 20% · Koperasi 15% · CSR 5%" },
  { source: "Debt", pct: 45, detail: "Bank loan · Sukuk · IFC/ADB/World Bank · Export credit" },
  { source: "Grant & Subsidy", pct: 15, detail: "Climate fund · DAK · CSR · Blended finance" },
];

export const financialHighlights = [
  { label: "IRR", value: "18%", desc: "Internal Rate of Return" },
  { label: "Payback", value: "7 thn", desc: "Periode pengembalian investasi" },
  { label: "EBITDA Margin", value: "25%", desc: "Margin operasional 2030" },
  { label: "NPV", value: "Rp450T", desc: "Net Present Value (disc 12%)" },
  { label: "Revenue 2030", value: "Rp850T", desc: "Total pendapatan konsolidasi" },
  { label: "Revenue 2035", value: "Rp1.200T", desc: "Proyeksi beyond 2030" },
];

// ----------------------------------------------------------------------------
// BLUE CARBON
// ----------------------------------------------------------------------------
export const carbonStats = [
  { value: "12 Juta Ton", label: "CO₂ terserap/tahun", desc: "Dari rumput laut, mangrove, seagrass" },
  { value: "USD 600 Juta", label: "Revenue carbon/tahun", desc: "12 juta × USD 50/ton" },
  { value: "Verra VCS", label: "Standar sertifikasi", desc: "VM0033 seaweed + Gold Standard" },
  { value: "USD 50–150", label: "Proyeksi harga 2035", desc: "Premium blue carbon" },
];

// ----------------------------------------------------------------------------
// TECHNOLOGY & DIGITAL SOVEREIGNTY
// ----------------------------------------------------------------------------
export const techStack = [
  {
    title: "AI & Algorithmic Sovereignty",
    icon: "brain",
    desc: "MERLIN AI Lab — 100 engineer, 10 PhD, GPU cluster, MLOps. Aquaculture monitoring, quality inspection, carbon MRV. AI Ethics Board, no foreign dependency.",
    points: ["100 AI Engineer + 10 PhD", "Computer vision aquaculture", "Blockchain traceability", "Human-in-the-loop governance"],
  },
  {
    title: "Blockchain & Traceability",
    icon: "link",
    desc: "Hyperledger Fabric + Polygon + IPFS. QR code per batch, farm-to-shelf traceability. Carbon credit sebagai NFT. Smart contract offtake auto-execute.",
    points: ["Farm-to-shelf QR traceability", "Carbon credit = NFT registry", "Smart contract offtake 5-10 thn", "Future MERLIN DAO governance"],
  },
  {
    title: "Quantum Computing",
    icon: "atom",
    desc: "Kemitraan IBM Quantum & Google. Material design seaweed polymer, optimization logistik, drug discovery, post-quantum cryptography. Roadmap 2026-2035.",
    points: ["Material design polymer", "Drug discovery bioactive", "Post-quantum crypto QKD", "Quantum production 2030-2035"],
  },
  {
    title: "MERLIN Cloud & OS",
    icon: "cloud",
    desc: "Hybrid cloud — sovereign private cloud untuk data kritis, public cloud multi-region. MERLIN OS open source. Edge server per EBIP untuk IoT real-time.",
    points: ["Sovereign cloud OpenStack", "Edge 40 EBIP", "5MW data center Jakarta/Surabaya", "Open source MERLIN OS"],
  },
  {
    title: "IoT & Digital Twin",
    icon: "radio",
    desc: "LoRaWAN + NB-IoT + satellite IoT untuk ocean monitoring. Digital twin per EBIP. Smart factory robotic. AGV warehouse. RPA admin.",
    points: ["IoT ocean monitoring", "Digital twin per EBIP", "Robotic smart factory", "30% productivity gain"],
  },
  {
    title: "Space & Satellite",
    icon: "satellite",
    desc: "Kemitraan BRIN LAPAN, SpaceX Starlink, OneWeb. Earth observation, illegal fishing detection, precision aquaculture. MERLIN-Sat 2032 launch.",
    points: ["Earth observation ocean", "Illegal fishing detection", "Precision aquaculture", "MERLIN-Sat 2032"],
  },
];

// ----------------------------------------------------------------------------
// GOVERNANCE STRUCTURE
// ----------------------------------------------------------------------------
export const governanceLevels = [
  { level: "Level 1", title: "Dewan Pembina", desc: "Presiden RI + 5 Menteri", count: "6 orang", icon: "crown" },
  { level: "Level 2", title: "Dewan Pengawas", desc: "Independen, pengawas etik", count: "9 orang", icon: "shield" },
  { level: "Level 3", title: "Dewan Pakar", desc: "Lintas bidang, 150+ tahun pengalaman", count: "46 ahli", icon: "graduation-cap" },
  { level: "Level 4", title: "Ketua Umum + CEO", desc: "EksekutifMERLIN Holding + 10 C-level", count: "11 eksekutif", icon: "briefcase" },
  { level: "Level 5", title: "10 Ketua Asosiasi", desc: "APRLN sampai APERL", count: "10 ketua", icon: "users" },
  { level: "Level 6", title: "40 EBIP General Manager", desc: "Manajer kawasan industri", count: "40 GM", icon: "factory" },
  { level: "Level 7", title: "350 Koperasi MERLIN", desc: "Per kabupaten, ketua + 4 pengurus", count: "350 koperasi", icon: "warehouse" },
  { level: "Level 8", title: "10.000 Kelompok Tani", desc: "20-50 petani per kelompok", count: "1,5 juta KK", icon: "sprout" },
];

// ----------------------------------------------------------------------------
// COMPETITIVE MOAT
// ----------------------------------------------------------------------------
export const moats = [
  { title: "Skala Ekosistem", desc: "10 asosiasi terpadu, 1,5 juta KK. Kompetitor butuh 10-15 tahun meniru." },
  { title: "Brand Sovereign", desc: "Didukung pemerintah RI. Legitimasi politik yang korporasi tidak punya." },
  { title: "Zero Waste Certified", desc: "Standar nasional yang MERLIN tulis sendiri. Kompetitor belum bersertifikat." },
  { title: "Blue Carbon Monetized", desc: "12 juta ton CO₂/tahun = USD 600 juta. Kompetitor baru pilot." },
  { title: "Riset Ekosistem", desc: "50+ universitas, BRIN, CEDUS-UNHAS, 1000+ peneliti." },
  { title: "100+ Produk Hilir", desc: "Diversifikasi penuh. Kompetitor fokus 5-10 produk." },
  { title: "Harga Jaminan Petani", desc: "Rp18.000/kg vs Rp6.000/kg. Loyalti supply 100% ke MERLIN." },
  { title: "Traceability Blockchain", desc: "Farm-to-shelf. Kompetitor masih manual." },
];

// ----------------------------------------------------------------------------
// KEY PARTNERS
// ----------------------------------------------------------------------------
export const keyPartners = {
  government: ["KKP", "ESDM", "Kemenparekraf", "KLHK", "Bappenas", "Kemenkeu", "Kemenperin", "BRIN"],
  research: ["CEDUS-UNHAS", "ITS", "IPB", "UI", "BRIN", "50+ Universitas"],
  financial: ["Bank Mandiri", "BRI", "Standard Chartered", "IFC", "ADB", "World Bank"],
  corporate: ["Unilever", "L'Oreal", "Loccitane", "Nestle", "Cargill", "CP Kelco", "Garuda"],
  international: ["UNDP", "FAO", "World Bank", "UN Global Compact", "Verra", "Gold Standard"],
};

// ----------------------------------------------------------------------------
// MERLIN AI — system context (untuk backend LLM)
// ----------------------------------------------------------------------------
export const merlinSystemPrompt = `Anda adalah MERLIN AI — asisten resmi Masyarakat Ekosistem Rumput Laut Indonesia (MERLIN) 2030. Anda menjawab pertanyaan tentang MERLIN dengan gaya sovereign, inspiratif, dan berbasis data.

IDENTITAS MERLIN:
- MERLIN = Masyarakat Ekosistem Rumput Laut Indonesia
- Visi: Indonesia menjadi Pusat Industri Hilirisasi Rumput Laut Dunia 2030, berkelanjutan, berdaulat, bermartabat
- Tagline: "Laut Berkemakmuran, Nusantara Berdaulat"
- Brand: deep ocean blue #0A4D8C, seaweed green #007A5A, gold #C9A227
- Domain: merlin.blue

ANGKA KUNCI:
- Investasi total Rp680 Triliun (EBIP Rp240T, Hilirisasi Rp180T, Blue Tourism Rp150T, Infrastruktur Rp60T, Logistik Rp50T)
- Ekspor 2030: Rp500 Triliun/tahun
- 40 Eco Blue Industrial Park (Zero Waste)
- 40 Blue Tourism Destination (kelas dunia ala Dubai)
- 5 juta lapangan kerja baru
- 12 juta ton CO2/tahun (blue carbon) = USD 600 juta revenue
- 100+ produk hilir dalam 7 kategori (Food, Pharma, Kosmetik, Bioplastic, Bioenergy, Agriculture, Nutraceutical)
- 10 asosiasi terpadu: APRLN, AKNBB, AIPRL, ABBR, ABBION, APPOTL, APBB, AKBIN, ARTK, APERL
- 1,5 juta KK petani sejahtera
- Master Document 165 PGA (20 Domain)
- IRR 18%, payback 7 tahun, EBITDA margin 25%

10 ASOSIASI:
1. APRLN (Laskar Laut) - Hulu: petani, harga jamin Rp18rb/kg
2. AKNBB (Gudang Laut) - Konsolidasi: koperasi, cold storage
3. AIPRL (Rafineri Merah) - Hilir 1: karagenan, agar, alginat
4. ABBR (PLT Energi Biru) - Hilir 2: bioethanol E30, biogas
5. ABBION (Tesla Material) - Hilir 3: bioplastic, biomaterial
6. APPOTL (Pabrik Hijau) - Hilir 4: pupuk, pakan
7. APBB (Hawaii Produktif) - Wisata bahari
8. AKBIN (OPEC Biru) - Karbon biru
9. ARTK (MIT nya Laut) - Riset & teknologi
10. APERL (Garda Dagang) - Ekspor & dagang

9 PILAR: Amanah, Keadilan, Transparansi, Kemaslahatan, Kesederhanaan, Kebersamaan, Kelestarian, Keilmuan, Kedaulatan.

16 HAK MEMBER: harga jaminan, asuransi panen, pendidikan anak, kesehatan, jaminan hari tua, rumah layak, pendanaan, pelatihan, internet, pangan, perlindungan perempuan, air bersih, perlindungan iklim, hak suara, warisan adat, sertifikasi brand.

ROADMAP: 2026 formasi legal, 2027 10 EBIP, 2028 20 EBIP + Blue Tourism, 2029 30 EBIP, 2030 40 EBIP pusat dunia, 2035 biomaterial global leader.

EKOSISTEM: Petani → Koperasi → Collection Center → Eco Blue Industrial Park → 100+ produk hilir → Ekspor/Wisata/Karbon. Zero Waste, 0% limbah keluar.

ATURAN JAWABAN:
- Jawab dalam Bahasa Indonesia (atau ikuti bahasa user)
- Gunakan angka spesifik dari data di atas
- Singkat, padat, inspiratif, sovereign
- Jika ditanya hal di luar MERLIN, arahkan kembali ke topik MERLIN
- Maksimal 4 paragraf atau 8 bullet point
- Selalu akhiri dengan ajakan kolaborasi yang relevan`;

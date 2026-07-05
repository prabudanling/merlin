# 🚀 Panduan Deployment Vercel — MERLIN 2030

> **Masalah umum:** "Application error: a client-side exception has occurred while loading"
> **Penyebab utama:** SQLite (file-based database) tidak support di Vercel serverless — filesystem ephemeral.

---

## ⚠️ Root Cause: SQLite di Vercel

Vercel serverless functions punya filesystem **ephemeral** (sementara, read-only setelah deploy).
Database SQLite file-based (`file:./db/custom.db`) **tidak akan persistent** — file hilang/reset setiap cold start,
dan operasi write (POST member baru) akan gagal dengan error seperti:
- `database is locked`
- `attempt to write a readonly database`
- `no such table: Member`

Saat API routes error 500, component yang fetch data bisa crash karena menerima response error
alih-alih data valid → muncul **"client-side exception has occurred"**.

---

## ✅ Solusi: Ganti ke External PostgreSQL

### Opsi 1: Neon (Rekomendasi — Free Tier Generous)

1. **Daftar** di [neon.tech](https://neon.tech) (free, 0.5GB storage)
2. **Buat project baru** → dapat connection string:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/merlin?sslmode=require
   ```
3. **Di Vercel dashboard**:
   - Settings → Environment Variables
   - Tambah: `DATABASE_URL` = connection string Neon di atas
   - Tambah: `MERLIN_INTERNAL_PIN` = PIN aman pilihanmu (mis. random 24 char)
4. **Update `prisma/schema.prisma`** — ganti provider:
   ```prisma
   datasource db {
     provider = "postgresql"   // ← ganti dari "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
5. **Redeploy** di Vercel → database PostgreSQL persistent, write operations bekerja.

### Opsi 2: Vercel Postgres

1. Vercel Dashboard → Storage → Create → Postgres (Neon-powered)
2. Pilih project → otomatis inject `POSTGRES_URL` ke env vars
3. Update schema provider ke `postgresql`, set `DATABASE_URL` = `POSTGRES_URL`
4. Redeploy

### Opsi 3: Supabase

1. Daftar [supabase.com](https://supabase.com) (free 500MB)
2. Project Settings → Database → Connection string (URI)
3. Set sebagai `DATABASE_URL` di Vercel env vars
4. Update schema provider ke `postgresql`, redeploy

### Opsi 4: PlanetScale (MySQL)

1. Daftar [planetscale.com](https://planetscale.com)
2. Buat database → dapat connection string
3. Set `DATABASE_URL` di Vercel
4. Update schema: `provider = "mysql"`, redeploy

---

## 🛡️ Sistem Fallback (Sudah Diterapkan)

Kode ini **sudah punya fallback** — jika database gagal, API return data statis dari `src/lib/merlin-fallback.ts`:

| Endpoint | Behavior saat DB gagal |
|----------|----------------------|
| `GET /api/associations` | Return 10 asosiasi statis + `fallback: true` flag |
| `GET /api/members/stats` | Return aggregate stats statis (no personal data) + `fallback: true` |
| `GET /api/members` (PIN) | Tetap butuh PIN, tapi return 500 jika DB gagal |
| `POST /api/members` | Return pesan "hubungi sekre@merlin.blue" jika DB gagal |

Plus **3 lapis safety net**:
1. `MerlinErrorBoundary` — bungkus setiap section, crash isolated per-section
2. `src/app/error.tsx` — global error boundary Next.js (fallback page elegan)
3. Validasi response structure di setiap fetch (response.ok + type check)

**Jadi bahkan jika database belum di-setup di Vercel, website tetap render dengan data demo.**

---

## 📋 Checklist Deploy Vercel

- [ ] Push code ke GitHub repo `gunara-prabu/merlin-2030`
- [ ] Import project ke Vercel Dashboard
- [ ] Set Environment Variables:
  - [ ] `DATABASE_URL` = connection string PostgreSQL eksternal
  - [ ] `MERLIN_INTERNAL_PIN` = PIN aman (default: `MERLIN-2030`)
  - [ ] `ZAI_API_KEY` (jika z-ai-web-dev-sdk butuh, cek dokumentasi SDK)
- [ ] Update `prisma/schema.prisma` → `provider = "postgresql"`
- [ ] Run `bun run db:push` **dengan DATABASE_URL production** untuk create tables
- [ ] Run seed: `bun run prisma/seed.ts` dengan DATABASE_URL production
- [ ] Redeploy di Vercel
- [ ] Test: buka URL Vercel, verifikasi:
  - [ ] Halaman load tanpa error
  - [ ] Direktori asosiasi menampilkan 10 asosiasi
  - [ ] Statistik member menampilkan charts
  - [ ] Form pendaftaran bisa submit & member baru tersimpan
  - [ ] MERLIN AI Assistant merespons

---

## 🔧 Alternative: Self-Host (Bukan Vercel)

Jika ingin tetap pakai SQLite, deploy ke platform dengan persistent filesystem:

| Platform | SQLite Support | Notes |
|----------|---------------|-------|
| **Railway** | ✅ Persistent volume | Free trial, $5/mo |
| **Render** | ✅ Persistent disk | Free tier terbatas |
| **fly.io** | ✅ Volume mount | Free tier 3 VM |
| **DigitalOcean App Platform** | ✅ Persistent storage | $5/mo |
| **VPS (Hetzner/DigitalOcean)** | ✅ Full control | Manual setup |

Untuk self-host, set `output: "standalone"` di `next.config.ts`, build dengan `bun run build`,
lalu jalankan `bun .next/standalone/server.js` dengan reverse proxy (nginx/Caddy).

---

## 🆘 Troubleshooting

### Error: "client-side exception has occurred"
**Penyebab:** API error 500 → component crash saat render.
**Fix:** Sudah ditangani dengan fallback + error boundary. Pastikan env vars ter-set.

### Error: "database is locked" / "readonly database"
**Penyebab:** SQLite di Vercel ephemeral filesystem.
**Fix:** Ganti ke PostgreSQL eksternal (lihat Opsi 1-4 di atas).

### Error: Hydration mismatch
**Penyebab:** Theme atau date formatting beda antara server & client.
**Fix:** Sudah ditangani dengan `suppressHydrationWarning` di `<html>`.

### Error: z-ai-web-dev-sdk not working
**Penyebab:** SDK butuh API key dari env.
**Fix:** Set env var yang dibutuhkan SDK di Vercel dashboard. Cek dokumentasi SDK.

### Error: Gambar tidak muncul
**Penyebab:** Folder `public/images/` tidak ter-commit ke git.
**Fix:** Pastikan `public/images/*.png` ter-commit (cek `.gitignore`).

---

## 📞 Bantuan

Jika masih bermasalah setelah ikuti panduan ini:
- 📧 Email: `sekre@merlin.blue`
- 🧑‍💻 Developer: Gunara/Prabu — PT Digital Bisnis Manajemen

---

<div align="center">

**MERLIN 2030** · *Laut Berkemakmuran, Nusantara Berdaulat* 🌊

</div>

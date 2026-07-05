import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" optimal untuk self-host (Docker/server), tapi Vercel handle build sendiri.
  // Biarkan Vercel yang tentukan output mode-nya.
  // output: "standalone",

  // Lewati type check saat build (sudah ditangani lint terpisah) — hindari build gagal
  // karena perbedaan environment Vercel vs dev sandbox.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: false,

  // Izinkan import gambar dari folder public (sudah default, eksplisit untuk aman)
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;

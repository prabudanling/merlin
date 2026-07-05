"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Waves, Mail } from "lucide-react";
import { MerlinLogo } from "@/components/merlin/merlin-nav";

/**
 * Next.js global error boundary (app router).
 * Menangkap error yang tidak tertangkap MerlinErrorBoundary per-section.
 * Mencegah halaman blank "Application error" di production (Vercel).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[MERLIN GlobalError]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-abyss-gradient text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg rounded-3xl border border-gold/30 bg-ocean-darker/60 backdrop-blur-xl p-8 text-center"
      >
        <div className="absolute inset-0 aurora-bg opacity-20 rounded-3xl" />
        <div className="relative">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-abyss shadow-xl mx-auto mb-4">
            <MerlinLogo className="h-9 w-9 text-abyss" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gold-gradient">
            MERLIN 2030
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold-light">
            <AlertTriangle className="h-3.5 w-3.5" />
            Gangguan Sementara
          </div>
          <p className="mt-4 text-sm text-white/75 leading-relaxed">
            Halaman ini mengalami gangguan sejenak. Ini biasanya terjadi karena
            database belum siap di environment deployment, atau koneksi sedang
            tidak stabil. Tim MERLIN sedang merespons.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-abyss shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
            >
              <RefreshCw className="h-4 w-4" />
              Coba Muat Ulang
            </button>
            <a
              href="mailto:sekre@merlin.blue"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Hubungi MERLIN
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-white/40">
            <Waves className="h-3 w-3" />
            MERLIN 2030 · Sovereign-Grade Resilience · Laut Berkemakmuran, Nusantara Berdaulat
          </div>
          {error?.digest && (
            <p className="mt-2 font-mono text-[10px] text-white/30">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

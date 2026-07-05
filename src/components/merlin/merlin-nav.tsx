"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#visi", label: "Visi" },
  { href: "#ekosistem", label: "Ekosistem" },
  { href: "#asosiasi", label: "10 Asosiasi" },
  { href: "#ebip", label: "Eco Blue Park" },
  { href: "#wisata", label: "Blue Tourism" },
  { href: "#produk", label: "100+ Produk" },
  { href: "#domain", label: "20 Domain" },
  { href: "#hak", label: "16 Hak Member" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#investasi", label: "Investasi" },
  { href: "#teknologi", label: "Teknologi" },
  { href: "#ai", label: "MERLIN AI" },
];

export function MerlinNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-abyss-gradient/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/30"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="#top" className="flex items-center gap-2.5 group">
            <MerlinLogo className="h-9 w-9 text-ocean-light group-hover:rotate-6 transition-transform duration-500" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-wide text-white">
                MERLIN
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80">
                2030
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-xs font-medium text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#investasi"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-abyss shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-105 transition-all"
            >
              <Waves className="h-3.5 w-3.5" />
              Bergabung
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="xl:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden bg-abyss-gradient/98 backdrop-blur-xl border-b border-white/10"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function MerlinLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring - the sovereign circle */}
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Wave */}
      <path
        d="M4 30 Q12 24 20 30 T36 30 T44 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 35 Q12 29 20 35 T36 35 T44 35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Seaweed fronds */}
      <path
        d="M24 28 C20 22 22 16 24 10 C26 16 28 22 24 28 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M18 28 C15 23 16 18 18 14 C20 18 21 23 18 28 Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M30 28 C33 23 32 18 30 14 C28 18 27 23 30 28 Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Star - the guiding sovereign star */}
      <path
        d="M24 4 L25 8 L29 8 L26 11 L27 15 L24 13 L21 15 L22 11 L19 8 L23 8 Z"
        fill="currentColor"
      />
    </svg>
  );
}

"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { ChevronDown, Sparkles, Waves, ExternalLink, Palmtree, Compass } from "lucide-react";
import { heroStats, merlin } from "@/lib/merlin-data";
import { MerlinLogo } from "./merlin-nav";

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        const formatted =
          value >= 100 ? Math.round(latest).toString() : latest.toFixed(1).replace(/\.0$/, "");
        setDisplay(formatted);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function MerlinHero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-abyss-gradient text-white"
    >
      {/* Animated ocean surface background */}
      <div className="absolute inset-0 ocean-surface" />

      {/* Generated hero image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url(/images/hero-ocean.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-ocean-darker/75 to-abyss" />

      {/* Floating light orbs */}
      <div className="absolute top-1/4 left-[12%] h-72 w-72 rounded-full bg-ocean-light/20 blur-3xl float-slow" />
      <div className="absolute bottom-1/3 right-[15%] h-96 w-96 rounded-full bg-seaweed/20 blur-3xl float-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-gold/10 blur-3xl" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dotgrid opacity-30" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-4 py-1.5 text-xs font-semibold text-gold-light backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Master Document 165 PGA · Sovereign-Grade Standard
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mt-8"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-gold/40 rounded-full" />
            <MerlinLogo className="relative h-24 w-24 text-gold float-slow" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-center mt-6"
        >
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
            <span className="text-gold-gradient">MERLIN</span>
          </h1>
          <p className="mt-2 font-display text-xl sm:text-2xl md:text-3xl text-white italic">
            2030
          </p>
          {/* Full name — KUNING EMAS, bold, clean contrast on dark abyss */}
          <p className="mt-5 text-base sm:text-lg md:text-xl font-bold tracking-[0.15em] uppercase text-gold-light drop-shadow-[0_2px_12px_rgba(227,194,90,0.4)]">
            {merlin.fullName}
          </p>
        </motion.div>

        {/* Tagline + Nusaparadise badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-5 max-w-3xl mx-auto"
        >
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight font-semibold">
            {merlin.tagline}
          </p>
          <p className="mt-4 text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            {merlin.vision}
          </p>

          {/* Nusaparadise.id premium badge — super mewah */}
          <a
            href={`https://${merlin.tourismDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex group"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-gold/60 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 px-5 py-2.5 backdrop-blur-md hover:border-gold hover:from-gold/30 hover:to-gold/30 transition-all shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-105">
              <Palmtree className="h-4 w-4 text-gold-light" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light/90">
                {merlin.tourismDesc}
              </span>
              <span className="h-3 w-px bg-gold/40" />
              <span className="font-display text-base font-bold text-gold-light">
                {merlin.tourismLabel}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-gold-light/70 group-hover:text-gold-light transition-colors" />
            </div>
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          <a
            href="#ekosistem"
            className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-sm font-bold text-abyss shadow-xl shadow-gold/30 hover:scale-105 hover:shadow-gold/50 transition-all"
          >
            <Waves className="h-4 w-4" />
            Jelajahi Ekosistem
          </a>
          <a
            href={`https://${merlin.tourismDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold/50 bg-white/10 px-7 py-3 text-sm font-bold text-gold-light backdrop-blur-sm hover:bg-gold/15 hover:border-gold transition-all"
          >
            <Compass className="h-4 w-4" />
            Jelajahi Nusaparadise.id
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Stats grid — bumped contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {heroStats.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-xl p-4 text-center hover:ring-gold transition-all border border-white/15"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-gold-light">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="mt-1 text-xs font-bold text-white uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="text-[10px] text-white/75 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Gulir</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </div>

      {/* Bottom marquee of partners — bumped contrast */}
      <div className="absolute bottom-0 inset-x-0 border-t border-gold/20 bg-abyss/85 backdrop-blur-md py-2.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-8 px-4 text-white/80 text-xs font-bold uppercase tracking-widest">
              <span className="text-gold-light">merlin.blue</span><span className="text-gold">◆</span>
              <span className="text-gold-light">nusaparadise.id</span><span className="text-gold">◆</span>
              <span>10 Asosiasi</span><span className="text-gold">◆</span>
              <span>40 Eco Blue Industrial Park</span><span className="text-gold">◆</span>
              <span>40 Blue Tourism</span><span className="text-gold">◆</span>
              <span>100+ Produk Hilir</span><span className="text-gold">◆</span>
              <span>165 PGA Documents</span><span className="text-gold">◆</span>
              <span>5 Juta Lapangan Kerja</span><span className="text-gold">◆</span>
              <span>12 Juta Ton CO₂</span><span className="text-gold">◆</span>
              <span>Rp680 Triliun</span><span className="text-gold">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

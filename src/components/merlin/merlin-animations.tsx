"use client";

import * as React from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { MerlinLogo } from "./merlin-nav";

// ============================================================================
// 1. SCROLL PROGRESS BAR — gold gradient progress di atas halaman
// ============================================================================
export function MerlinScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 z-[70] h-1 origin-left bg-gradient-to-r from-ocean via-gold to-seaweed-light shadow-[0_0_12px_rgba(201,162,39,0.6)]"
      aria-hidden
    />
  );
}

// ============================================================================
// 2. CURSOR GLOW FOLLOWER — aura emas mengikuti cursor (desktop only)
// ============================================================================
export function MerlinCursorGlow() {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    // only enable on fine pointer devices
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.body.classList.add("cursor-glow-active");

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      });
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("cursor-glow-active");
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      className={`cursor-glow ${visible ? "visible" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    />
  );
}

// ============================================================================
// 3. PAGE LOADER — premium ocean fill saat pertama load
// ============================================================================
export function MerlinPageLoader() {
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
      }
      setProgress(Math.min(100, p));
    }, 110);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-abyss-gradient"
        >
          <div className="absolute inset-0 aurora-bg opacity-30" />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 blur-2xl bg-gold/40 rounded-full" />
            <MerlinLogo className="relative h-20 w-20 text-gold float-slow" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative mt-6 font-display text-2xl font-bold text-gold-gradient"
          >
            MERLIN 2030
          </motion.div>
          <div className="relative mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Memuat Ekosistem Bahari...
          </div>
          {/* progress bar */}
          <div className="relative mt-6 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-ocean via-gold to-seaweed-light"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="relative mt-2 font-mono text-[10px] text-gold/70">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// 4. CARD 3D TILT — card miring 3D mengikuti mouse + glow trail
// ============================================================================
export function TiltCard({
  children,
  className = "",
  max = 12,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState("");
  const [spot, setSpot] = React.useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`);
    setSpot({ x: px * 100, y: py * 100 });
  };

  const onLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform }}
      className={`tilt-card spotlight ${className}`}
      data-mx={spot.x}
      data-my={spot.y}
    >
      <div
        style={
          {
            "--mx": `${spot.x}%`,
            "--my": `${spot.y}%`,
          } as React.CSSProperties
        }
        className="h-full"
      >
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// 5. MAGNETIC BUTTON — button tertarik ke cursor saat hover
// ============================================================================
export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x, y });
  };
  const onLeave = () => setOffset({ x: 0, y: 0 });

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className="magnetic inline-block"
    >
      {as === "a" && href ? (
        <a href={href} className={className} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {inner}
        </button>
      )}
    </div>
  );
}

// ============================================================================
// 6. WAVE DIVIDER — SVG wave animated pembatas section
// ============================================================================
export function WaveDivider({
  color = "var(--foam)",
  flip = false,
  className = "",
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${className}`}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="wave-svg block h-12 w-full sm:h-16 md:h-20"
      >
        <path
          d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// ============================================================================
// 7. REVEAL — wrapper animasi reveal saat scroll dengan variants
// ============================================================================
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 8. STAGGER CONTAINER + ITEM — untuk grid animasi bertahap
// ============================================================================
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

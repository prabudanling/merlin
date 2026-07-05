"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] mb-4",
            light
              ? "border-gold/30 bg-gold/10 text-gold-light"
              : "border-ocean/25 bg-ocean/8 text-ocean"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function Pill({
  children,
  variant = "ocean",
  className,
}: {
  children: React.ReactNode;
  variant?: "ocean" | "seaweed" | "gold" | "muted";
  className?: string;
}) {
  const variants = {
    ocean: "border-ocean/25 bg-ocean/10 text-ocean",
    seaweed: "border-seaweed/25 bg-seaweed/10 text-seaweed",
    gold: "border-gold/30 bg-gold/10 text-[#a8851f] dark:text-gold-light",
    muted: "border-border bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Waves } from "lucide-react";

type Props = {
  children: React.ReactNode;
  /** Optional fallback label for the section that errored */
  sectionName?: string;
};

type State = { hasError: boolean; error?: Error };

/**
 * Global error boundary for MERLIN 2030.
 * Catches client-side exceptions so a single failing section
 * does not break the entire page (especially important on
 * serverless deployments like Vercel where DB may be unavailable).
 */
export class MerlinErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console for debugging (Vercel will capture this)
    console.error("[MERLIN ErrorBoundary]", this.props.sectionName || "section", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-6 mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold mb-3">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Bagian ini sedang dimuat ulang
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {this.props.sectionName
              ? `Section "${this.props.sectionName}" mengalami gangguan sejenak.`
              : "Terjadi gangguan sejenak pada bagian ini."}
            {" "}Anda dapat melanjutkan menjelajah bagian lainnya.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ocean px-4 py-2 text-xs font-semibold text-white hover:bg-ocean-deep transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Coba Muat Ulang
          </button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
            <Waves className="h-3 w-3" />
            MERLIN 2030 · Sovereign-Grade Resilience
          </div>
        </motion.div>
      );
    }
    return this.props.children;
  }
}

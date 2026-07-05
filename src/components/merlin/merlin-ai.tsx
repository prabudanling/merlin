"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, Loader2, Trash2, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MerlinLogo } from "./merlin-nav";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Apa visi utama MERLIN 2030?",
  "Jelaskan 10 asosiasi MERLIN dan julukannya",
  "Berapa total investasi dan dari mana dananya?",
  "Apa itu Eco Blue Industrial Park dan model zero waste-nya?",
  "Bagaimana MERLIN mengangkat kesejahteraan petani?",
  "Apa itu Blue Carbon dan berapa potensi revenue-nya?",
  "Sebutkan 100+ produk hilir MERLIN",
  "Bagaimana roadmap MERLIN menuju 2030?",
];

// Simple markdown-ish renderer for **bold**, bullet lines, paragraphs
function renderContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={i} className="h-2" />;
    const isBullet = /^[-•*]\s/.test(trimmed);
    const content = isBullet ? trimmed.replace(/^[-•*]\s/, "") : trimmed;
    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((p, j) => {
      if (p.startsWith("**") && p.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold text-gold-light">
            {p.slice(2, -2)}
          </strong>
        );
      }
      return <span key={j}>{p}</span>;
    });
    if (isBullet) {
      return (
        <div key={i} className="flex gap-2 my-0.5">
          <span className="text-gold mt-0.5 shrink-0">◆</span>
          <span className="leading-relaxed">{parts}</span>
        </div>
      );
    }
    return (
      <p key={i} className="leading-relaxed my-1">
        {parts}
      </p>
    );
  });
}

export function MerlinAI() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const sessionId = React.useId();

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    setError(null);
    const userMsg: Msg = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const history = next.slice(-10).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/merlin-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, sessionId, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Gagal menghubungi MERLIN AI");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (e: any) {
      setError(e?.message || "Terjadi kesalahan");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, MERLIN AI sedang mengalami gangguan sejenak. Silakan coba lagi sebentar lagi. 🌊",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([]);
    setError(null);
    fetch(`/api/merlin-ai?sessionId=${encodeURIComponent(sessionId)}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <section id="ai" className="relative py-24 sm:py-32 bg-abyss-gradient text-white overflow-hidden">
      <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-ocean-light/15 blur-3xl float-slow" />
      <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl float-slower" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold-light uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            MERLIN AI · Sovereign Intelligence
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Bicara dengan <span className="text-gold-gradient">MERLIN AI</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Asisten cerdas yang menguasai seluruh Master Document 165 PGA. Tanyakan apa saja tentang
            visi, asosiasi, investasi, produk, roadmap, atau teknologi MERLIN.
          </p>
        </motion.div>

        {/* Chat card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-10 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <MerlinLogo className="h-8 w-8 text-gold" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-seaweed-light ring-2 ring-abyss" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">MERLIN AI</div>
                <div className="text-[10px] text-seaweed-light">● Online · Sovereign-Grade</div>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clear}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[400px] overflow-y-auto scrollbar-merlin px-4 py-5 space-y-4"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="relative mb-4">
                  <div className="absolute inset-0 blur-2xl bg-gold/30 rounded-full" />
                  <MerlinLogo className="relative h-16 w-16 text-gold float-slow" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Selamat datang di MERLIN AI
                </h3>
                <p className="mt-1 text-sm text-white/60 max-w-md">
                  Saya siap menjelaskan visi, ekosistem, dan seluruh arsitektur MERLIN 2030.
                  Pilih pertanyaan di bawah atau tulis sendiri.
                </p>
                <div className="mt-6 grid sm:grid-cols-2 gap-2 w-full max-w-2xl">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/80 hover:bg-white/10 hover:border-gold/40 transition-all"
                    >
                      <MessageSquare className="inline h-3 w-3 mr-1.5 text-gold/70" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2.5",
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    m.role === "user"
                      ? "bg-ocean text-white"
                      : "bg-gold-gradient text-abyss"
                  )}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    m.role === "user"
                      ? "bg-ocean text-white rounded-tr-sm"
                      : "bg-white/10 text-white/90 rounded-tl-sm border border-white/5"
                  )}
                >
                  {renderContent(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-gradient text-abyss">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white/10 border border-white/5 px-4 py-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gold-light" />
                  <span className="text-sm text-white/60">MERLIN AI merenung...</span>
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Tanyakan apa saja tentang MERLIN 2030..."
                rows={1}
                className="min-h-[44px] max-h-32 resize-none bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-gold/40"
              />
              <Button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="shrink-0 bg-gold-gradient text-abyss hover:opacity-90 h-11 w-11 p-0"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-1.5 text-[10px] text-white/40 text-center">
              MERLIN AI · Didukung z-ai-web-dev-sdk · Data dari Master Document 165 PGA
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

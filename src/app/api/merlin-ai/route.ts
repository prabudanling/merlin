import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { merlinSystemPrompt } from "@/lib/merlin-data";

export const runtime = "nodejs";
export const maxDuration = 60;

// In-memory conversation store (per session). For production use Redis/DB.
const conversations = new Map<string, { role: string; content: string }[]>();

const MAX_HISTORY = 12; // keep last N messages to manage token usage

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId = "default", history = [] } = body as {
      message?: string;
      sessionId?: string;
      history?: { role: string; content: string }[];
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    // Build message list: system prompt + recent history + new user message
    const key = sessionId;
    let convo = conversations.get(key);
    if (!convo) {
      convo = [{ role: "assistant", content: merlinSystemPrompt }];
      conversations.set(key, convo);
    }

    // Accept client-passed history to remain stateless-friendly
    if (Array.isArray(history) && history.length > 0) {
      convo = [{ role: "assistant", content: merlinSystemPrompt }, ...history];
    }

    convo.push({ role: "user", content: message.slice(0, 1200) });

    // Trim to last MAX_HISTORY messages (keep system prompt at index 0)
    if (convo.length > MAX_HISTORY + 1) {
      convo = [convo[0], ...convo.slice(-MAX_HISTORY)];
      conversations.set(key, convo);
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: convo as any,
      thinking: { type: "disabled" },
    });

    const reply =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "Maaf, MERLIN AI sedang merenung. Coba tanyakan lagi.";

    convo.push({ role: "assistant", content: reply });
    conversations.set(key, convo);

    return NextResponse.json({
      reply,
      sessionId,
      messageCount: convo.length - 1,
    });
  } catch (err: any) {
    console.error("[MERLIN AI] error:", err?.message || err);
    return NextResponse.json(
      {
        error: "MERLIN AI mengalami gangguan sejenak. Silakan coba lagi.",
        detail: String(err?.message || err).slice(0, 200),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId") || "default";
  conversations.delete(sessionId);
  return NextResponse.json({ ok: true });
}

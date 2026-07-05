import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/associations — daftar semua asosiasi dengan statistik member
export async function GET(req: NextRequest) {
  try {
    const associations = await db.association.findMany({
      orderBy: { code: "asc" },
      include: {
        _count: { select: { members: true } },
      },
    });

    // Tambahkan agregasi: total investasi per asosiasi
    const withStats = await Promise.all(
      associations.map(async (a) => {
        const agg = await db.member.aggregate({
          where: { associationId: a.id },
          _sum: { investment: true },
          _avg: { investment: true },
        });
        return {
          ...a,
          memberCount: a._count.members,
          totalInvestment: agg._sum.investment ?? 0,
          avgInvestment: Math.round(agg._avg.investment ?? 0),
        };
      })
    );

    return NextResponse.json({ associations: withStats });
  } catch (err: any) {
    console.error("[/api/associations]", err?.message || err);
    return NextResponse.json(
      { error: "Gagal memuat data asosiasi." },
      { status: 500 }
    );
  }
}

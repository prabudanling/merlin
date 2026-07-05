import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/members/stats — PUBLIC aggregate statistics only
// NO individual member data exposed. Only counts, distributions, growth.
export async function GET() {
  try {
    const [total, perAssoc, perType, perProvince, perStatus, growth] = await Promise.all([
      db.member.count(),

      // Distribution per association (count only)
      db.member.groupBy({
        by: ["associationId"],
        _count: { _all: true },
      }).then((rows) =>
        Promise.all(
          rows.map(async (r) => {
            const a = await db.association.findUnique({
              where: { id: r.associationId },
              select: { code: true, name: true, julukan: true, color: true, icon: true, line: true },
            });
            return {
              association: a,
              count: r._count._all,
            };
          })
        )
      ),

      // Distribution per member type (count only)
      db.member.groupBy({
        by: ["memberType"],
        _count: { _all: true },
      }).then((rows) => rows.map((r) => ({ type: r.memberType, count: r._count._all }))),

      // Distribution per province (count only)
      db.member.groupBy({
        by: ["province"],
        _count: { _all: true },
      }).then((rows) => rows.map((r) => ({ province: r.province, count: r._count._all }))),

      // Distribution per status (count only)
      db.member.groupBy({
        by: ["status"],
        _count: { _all: true },
      }).then((rows) => rows.map((r) => ({ status: r.status, count: r._count._all }))),

      // Growth by month (joinDate aggregated — count only, no personal data)
      db.member.findMany({
        select: { joinDate: true },
      }).then((members) => {
        const byMonth: Record<string, number> = {};
        for (const m of members) {
          const d = new Date(m.joinDate);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          byMonth[key] = (byMonth[key] || 0) + 1;
        }
        return Object.entries(byMonth)
          .map(([month, count]) => ({ month, count }))
          .sort((a, b) => a.month.localeCompare(b.month));
      }),
    ]);

    return NextResponse.json({
      total,
      perAssociation: perAssoc,
      perType,
      perProvince,
      perStatus,
      growth,
      // NOTE: intentionally NO individual member records, NO emails, NO phones, NO names
      // Those are only available via /api/members with internal PIN auth
    });
  } catch (err: any) {
    console.error("[/api/members/stats]", err?.message || err);
    return NextResponse.json({ error: "Gagal memuat statistik." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/members — daftar member dengan filter, search, pagination
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const associationCode = searchParams.get("association") || "all";
    const memberType = searchParams.get("type") || "all";
    const province = searchParams.get("province") || "all";
    const status = searchParams.get("status") || "all";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(48, Math.max(6, parseInt(searchParams.get("pageSize") || "12", 10)));

    // Build where clause
    const where: Prisma.MemberWhereInput = {};
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { memberCode: { contains: search } },
        { phone: { contains: search } },
        { regency: { contains: search } },
      ];
    }
    if (associationCode !== "all") {
      where.association = { code: associationCode };
    }
    if (memberType !== "all") where.memberType = memberType;
    if (province !== "all") where.province = province;
    if (status !== "all") where.status = status;

    const [total, members, facets] = await Promise.all([
      db.member.count({ where }),
      db.member.findMany({
        where,
        include: { association: true },
        orderBy: { joinDate: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      // facets for filters
      (async () => {
        const [types, provinces] = await Promise.all([
          db.member.findMany({ where, select: { memberType: true }, distinct: ["memberType"] }),
          db.member.findMany({ where, select: { province: true }, distinct: ["province"] }),
        ]);
        return {
          memberTypes: types.map((t) => t.memberType).sort(),
          provinces: provinces.map((p) => p.province).sort(),
        };
      })(),
    ]);

    return NextResponse.json({
      members,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
      facets,
    });
  } catch (err: any) {
    console.error("[/api/members GET]", err?.message || err);
    return NextResponse.json({ error: "Gagal memuat member." }, { status: 500 });
  }
}

// POST /api/members — pendaftaran member baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      province,
      regency,
      associationCode,
      memberType,
      role,
      investment,
      notes,
    } = body as {
      fullName?: string;
      email?: string;
      phone?: string;
      province?: string;
      regency?: string;
      associationCode?: string;
      memberType?: string;
      role?: string;
      investment?: number;
      notes?: string;
    };

    // Validasi
    if (!fullName || !email || !phone || !province || !associationCode || !memberType) {
      return NextResponse.json(
        { error: "Field wajib belum lengkap (nama, email, telepon, provinsi, asosiasi, jenis)." },
        { status: 400 }
      );
    }
    const emailClean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
      return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
    }

    // Cek asosiasi
    const assoc = await db.association.findUnique({ where: { code: associationCode } });
    if (!assoc) {
      return NextResponse.json({ error: "Kode asosiasi tidak ditemukan." }, { status: 404 });
    }

    // Cek duplikat email
    const existing = await db.member.findUnique({ where: { email: emailClean } });
    if (existing) {
      return NextResponse.json({ error: "Email sudah terdaftar sebagai member MERLIN." }, { status: 409 });
    }

    // Generate member code: MERLIN-2026-XXXXXX
    const count = await db.member.count();
    const memberCode = `MERLIN-2026-${String(count + 1).padStart(6, "0")}`;

    const member = await db.member.create({
      data: {
        memberCode,
        fullName: fullName.trim(),
        email: emailClean,
        phone: phone.trim(),
        province: province.trim(),
        regency: regency?.trim() || null,
        associationId: assoc.id,
        memberType,
        role: role?.trim() || "Anggota",
        status: "Pending", // pending sampai diverifikasi
        investment: investment ? Number(investment) : null,
        notes: notes?.trim() || null,
      },
      include: { association: true },
    });

    return NextResponse.json({ ok: true, member }, { status: 201 });
  } catch (err: any) {
    console.error("[/api/members POST]", err?.message || err);
    return NextResponse.json(
      { error: "Pendaftaran gagal. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

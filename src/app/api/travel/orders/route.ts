import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema/orders";
import { and, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const limit = Number(searchParams.get("limit") || "10");
  const offset = Number(searchParams.get("offset") || "0");
  const userId = searchParams.get("userId");

  const whereClause = userId ? [eq(orders.userId, userId)] : undefined;

  const results = await db
    .select()
    .from(orders)
    .where(and(...(whereClause || [])))
    .limit(limit)
    .offset(offset);

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await db.insert(orders).values(body).returning();

  return NextResponse.json(result[0]);
}

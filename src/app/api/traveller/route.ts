import { db } from "@/lib/db";
import { travellers } from "@/lib/db/schema/travellers";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") || "10");
  const offset = Number(searchParams.get("offset") || "0");

  const results = await db
    .select()
    .from(travellers)
    .limit(limit)
    .offset(offset);
  return Response.json(results);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await db.insert(travellers).values(body).returning();
  return Response.json(result[0]);
}

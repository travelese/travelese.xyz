import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema/orders";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
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

  return Response.json(results);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id) {
    return Response.json({ error: "Order ID is required" }, { status: 400 });
  }

  const result = await db
    .update(orders)
    .set(updateData)
    .where(eq(orders.id, id))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json(result[0]);
}

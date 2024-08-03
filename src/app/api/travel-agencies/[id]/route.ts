import { db } from "@/lib/db";
import { travelAgencies } from "@/lib/db/schema/travelAgencies";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .select()
    .from(travelAgencies)
    .where(eq(travelAgencies.id, params.id));
  if (result.length === 0) {
    return Response.json({ error: "Travel agency not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const result = await db
    .update(travelAgencies)
    .set(body)
    .where(eq(travelAgencies.id, params.id))
    .returning();
  if (result.length === 0) {
    return Response.json({ error: "Travel agency not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .delete(travelAgencies)
    .where(eq(travelAgencies.id, params.id))
    .returning();
  if (result.length === 0) {
    return Response.json({ error: "Travel agency not found" }, { status: 404 });
  }
  return Response.json({ message: "Travel agency deleted successfully" });
}

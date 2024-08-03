import { db } from "@/lib/db";
import { travellers } from "@/lib/db/schema/travellers";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .select()
    .from(travellers)
    .where(eq(travellers.id, params.id));
  if (result.length === 0) {
    return Response.json({ error: "Traveller not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const result = await db
    .update(travellers)
    .set(body)
    .where(eq(travellers.id, params.id))
    .returning();
  if (result.length === 0) {
    return Response.json({ error: "Traveller not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .delete(travellers)
    .where(eq(travellers.id, params.id))
    .returning();
  if (result.length === 0) {
    return Response.json({ error: "Traveller not found" }, { status: 404 });
  }
  return Response.json({ message: "Traveller deleted successfully" });
}

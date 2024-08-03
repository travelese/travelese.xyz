import { db } from "@/lib/db";
import { travelAgents } from "@/lib/db/schema/travelAgents";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .select()
    .from(travelAgents)
    .where(eq(travelAgents.id, params.id));
  if (result.length === 0) {
    return Response.json({ error: "Travel agent not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const result = await db
    .update(travelAgents)
    .set(body)
    .where(eq(travelAgents.id, params.id))
    .returning();
  if (result.length === 0) {
    return Response.json({ error: "Travel agent not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .delete(travelAgents)
    .where(eq(travelAgents.id, params.id))
    .returning();
  if (result.length === 0) {
    return Response.json({ error: "Travel agent not found" }, { status: 404 });
  }
  return Response.json({ message: "Travel agent deleted successfully" });
}

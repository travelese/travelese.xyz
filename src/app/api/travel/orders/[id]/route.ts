import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema/orders";
import { travellers } from "@/lib/db/schema/travellers";
import { segments } from "@/lib/db/schema/segments";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const orderResult = await db
    .select()
    .from(orders)
    .where(eq(orders.id, params.id));

  if (orderResult.length === 0) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const order = orderResult[0];

  const orderTravellers = await db
    .select()
    .from(travellers)
    .where(eq(travellers.orderId, params.id));
  const orderSegments = await db
    .select()
    .from(segments)
    .where(eq(segments.orderId, params.id));

  return Response.json({
    ...order,
    travellers: orderTravellers,
    segments: orderSegments,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const result = await db
    .update(orders)
    .set(body)
    .where(eq(orders.id, params.id))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json(result[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await db
    .delete(orders)
    .where(eq(orders.id, params.id))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }
  return Response.json({
    message: "Order deleted successfully",
    id: result[0].id,
  });
}

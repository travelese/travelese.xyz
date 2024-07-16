import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { orders } from "@/lib/db/schema/orders";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    return new Response(JSON.stringify(userOrders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

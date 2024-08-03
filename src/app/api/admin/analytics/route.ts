import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema/orders";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let dateFilter = sql`TRUE`;
  if (startDate && endDate) {
    dateFilter = sql`created_at BETWEEN ${startDate} AND ${endDate}`;
  }

  const totalOrders = await db
    .select({ count: sql<number>`count(*)` })
    .from(orders)
    .where(dateFilter);

  const totalRevenue = await db
    .select({ sum: sql<number>`SUM(CAST(total_amount AS DECIMAL))` })
    .from(orders)
    .where(dateFilter);

  const topUsers = await db
    .select({
      userId: orders.userId,
      orderCount: sql<number>`count(*)`,
      totalSpent: sql<number>`SUM(CAST(total_amount AS DECIMAL))`,
    })
    .from(orders)
    .where(dateFilter)
    .groupBy(orders.userId)
    .orderBy(sql`SUM(CAST(total_amount AS DECIMAL)) DESC`)
    .limit(5);

  return Response.json({
    totalOrders: totalOrders[0].count,
    totalRevenue: totalRevenue[0].sum,
    topUsers,
  });
}

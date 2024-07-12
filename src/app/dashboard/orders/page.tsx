import * as React from "react";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { orders } from "@/lib/db/schema/orders";
import { eq } from "drizzle-orm";

export default async function OrdersPage() {
  await checkAuth();
  const { session } = await getUserAuth();

  if (!session?.user?.id) {
    return <div>Authentication required</div>;
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.user.id));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1>Your Bookings</h1>
      {userOrders.length === 0 ? (
        <div>You have no bookings.</div>
      ) : (
        userOrders.map((booking) => (
          <div key={booking.id}>
            <h2>Booking Reference: {booking.bookingReference}</h2>
            <p>
              Total Amount: {booking.totalAmount} {booking.currency}
            </p>
            <p>Status: {booking.paymentStatus}</p>
          </div>
        ))
      )}
    </main>
  );
}

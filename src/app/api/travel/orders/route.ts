import { NextRequest, NextResponse } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { orders } from "@/lib/db/schema/orders";
import { segments } from "@/lib/db/schema/segments";
import { travellers } from "@/lib/db/schema/travellers";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { session } = await getUserAuth();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      {
        status: 400,
      },
    );
  }

  try {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    return NextResponse.json(userOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const order = await request.json();

    await db.transaction(async (trx) => {
      // Insert or update the order
      await trx
        .insert(orders)
        .values({
          id: order.id,
          userId: session.user.id,
          bookingReference: order.booking_reference,
          totalAmount: order.total_amount,
          currency: order.total_currency,
          passengerName: `${order.passengers[0].given_name} ${order.passengers[0].family_name}`,
          passengerEmail: order.passengers[0].email,
          taxAmount: order.tax_amount,
          paymentStatus: order.payment_status.awaiting_payment
            ? "Awaiting Payment"
            : "Paid",
          isLive: order.live_mode,
          createdAt: new Date(order.created_at),
          updatedAt: new Date(order.updated_at),
          syncedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: orders.id,
          set: {
            updatedAt: new Date(order.updated_at),
            syncedAt: new Date(),
            paymentStatus: order.payment_status.awaiting_payment
              ? "Awaiting Payment"
              : "Paid",
          },
        });

      // Insert or update segments
      for (const slice of order.slices) {
        for (const segment of slice.segments) {
          await trx
            .insert(segments)
            .values({
              id: segment.id,
              orderId: order.id,
              origin: segment.origin.iata_code,
              destination: segment.destination.iata_code,
              departingAt: new Date(segment.departing_at),
              arrivingAt: new Date(segment.arriving_at),
              duration: segment.duration,
              marketingCarrier: segment.marketing_carrier.iata_code,
              operatingCarrier: segment.operating_carrier.iata_code,
              aircraft: segment.aircraft.iata_code,
            })
            .onConflictDoUpdate({
              target: segments.id,
              set: {
                departingAt: new Date(segment.departing_at),
                arrivingAt: new Date(segment.arriving_at),
              },
            });
        }
      }

      // Insert or update traveller
      const traveller = order.passengers[0];
      await trx
        .insert(travellers)
        .values({
          id: traveller.id,
          userId: session.user.id,
          orderId: order.id,
          givenName: traveller.given_name,
          familyName: traveller.family_name,
          email: traveller.email,
          phoneNumber: traveller.phone_number,
          bornOn: new Date(traveller.born_on),
          gender: traveller.gender,
          loyaltyProgramme:
            traveller.loyalty_programme_accounts?.[0]?.account_number || null,
        })
        .onConflictDoUpdate({
          target: travellers.id,
          set: {
            orderId: order.id,
            email: traveller.email,
            phoneNumber: traveller.phone_number,
          },
        });
    });

    return NextResponse.json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 },
    );
  }
}

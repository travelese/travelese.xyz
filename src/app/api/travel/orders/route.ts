import { NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { orders } from "@/lib/db/schema/orders";
import { segments } from "@/lib/db/schema/segments";
import { travellers } from "@/lib/db/schema/travellers";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session)
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    return new Response(JSON.stringify(userOrders));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session)
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });

  try {
    const order = await request.json();

    if (
      !order.id ||
      !order.booking_reference ||
      !order.passengers ||
      order.passengers.length === 0
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required order information" }),
        { status: 400 },
      );
    }

    await db.transaction(async (trx) => {
      const createdAt = new Date(order.created_at);
      const updatedAt = order.updated_at
        ? new Date(order.updated_at)
        : createdAt;
      const syncedAt = new Date();

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
          createdAt,
          updatedAt,
          syncedAt,
        })
        .onConflictDoUpdate({
          target: orders.id,
          set: {
            updatedAt,
            syncedAt,
            paymentStatus: order.payment_status.awaiting_payment
              ? "Awaiting Payment"
              : "Paid",
          },
        });

      for (const slice of order.slices) {
        for (const segment of slice.segments) {
          await trx
            .insert(segments)
            .values({
              id: segment.id,
              orderId: order.id,
              aircraft: segment.aircraft,
              arrivingAt: new Date(segment.arriving_at),
              departingAt: new Date(segment.departing_at),
              destination: segment.destination,
              destinationTerminal: segment.destination_terminal ?? null,
              duration: segment.duration ?? null,
              marketingCarrier: segment.marketing_carrier,
              marketingCarrierFlightNumber:
                segment.marketing_carrier_flight_number,
              operatingCarrier: segment.operating_carrier,
              operatingCarrierFlightNumber:
                segment.operating_carrier_flight_number,
              origin: segment.origin,
              originTerminal: segment.origin_terminal ?? null,
              passengers: segment.passengers,
              distance: segment.distance ?? null,
            })
            .onConflictDoUpdate({
              target: segments.id,
              set: {
                aircraft: segment.aircraft,
                arrivingAt: new Date(segment.arriving_at),
                departingAt: new Date(segment.departing_at),
                destination: segment.destination,
                destinationTerminal: segment.destination_terminal ?? null,
                duration: segment.duration ?? null,
                marketingCarrier: segment.marketing_carrier,
                marketingCarrierFlightNumber:
                  segment.marketing_carrier_flight_number,
                operatingCarrier: segment.operating_carrier,
                operatingCarrierFlightNumber:
                  segment.operating_carrier_flight_number,
                origin: segment.origin,
                originTerminal: segment.origin_terminal ?? null,
                passengers: segment.passengers,
                distance: segment.distance ?? null,
              },
            });
        }
      }

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

    return new Response(
      JSON.stringify({ message: "Order saved successfully" }),
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save order" }), {
      status: 500,
    });
  }
}

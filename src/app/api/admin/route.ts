import { NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { orders } from "@/lib/db/schema/orders";
import { travellers } from "@/lib/db/schema/travellers";
import { segments } from "@/lib/db/schema/segments";
import { eq } from "drizzle-orm";
import { syncUserOrders } from "@/lib/travel/duffel";
import type {
  CreateOrderPassenger,
  OrderSliceSegment,
} from "@duffel/api/types";

async function isUserAdmin(userId: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .execute();
  return user[0]?.role === "admin";
}

export async function GET(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }

  try {
    const allUsers = await db.select().from(users);
    return new Response(JSON.stringify(allUsers));
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }

  const { userId, role } = await request.json();

  if (!userId || !role) {
    return new Response(JSON.stringify({ error: "Missing userId or role" }), {
      status: 400,
    });
  }

  try {
    await db.update(users).set({ role }).where(eq(users.id, userId));
    return new Response(
      JSON.stringify({ message: "User role updated successfully" }),
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update user role" }),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }

  try {
    const { userId } = await request.json();
    console.log("Attempting to sync orders for user:", userId);

    let syncedOrders = 0;
    try {
      for await (const order of syncUserOrders(userId)) {
        await db.transaction(async (trx) => {
          await trx
            .insert(orders)
            .values({
              id: order.id,
              userId: order.metadata?.userId,
              bookingReference: order.booking_reference,
              totalAmount: order.total_amount,
              currency: order.total_currency,
              passengerName: `${order.passengers[0].given_name} ${order.passengers[0].family_name}`,
              passengerEmail: (order.passengers[0] as CreateOrderPassenger)
                .email,
              taxAmount: order.tax_amount || "0",
              paymentStatus: order.payment_status.awaiting_payment
                ? "Awaiting Payment"
                : "Paid",
              isLive: order.live_mode,
              syncedAt: new Date(),
            })
            .onConflictDoUpdate({
              target: orders.id,
              set: {
                syncedAt: new Date(),
                paymentStatus: order.payment_status.awaiting_payment
                  ? "Awaiting Payment"
                  : "Paid",
              },
            });

          for (const passenger of order.passengers as CreateOrderPassenger[]) {
            await trx
              .insert(travellers)
              .values({
                id: passenger.id,
                userId: order.metadata?.userId,
                orderId: order.id,
                givenName: passenger.given_name,
                familyName: passenger.family_name,
                email: passenger.email || "",
                phoneNumber: passenger.phone_number || "",
                bornOn: passenger.born_on
                  ? new Date(passenger.born_on)
                  : new Date(0),
                gender: passenger.gender || "",
                loyaltyProgramme:
                  passenger.loyalty_programme_accounts?.[0]?.account_number ||
                  null,
              })
              .onConflictDoUpdate({
                target: travellers.id,
                set: {
                  email: passenger.email || "",
                  phoneNumber: passenger.phone_number || "",
                },
              });
          }

          for (const slice of order.slices) {
            for (const segment of slice.segments as OrderSliceSegment[]) {
              await trx
                .insert(segments)
                .values({
                  id: segment.id,
                  orderId: order.id,
                  aircraft: segment.aircraft?.iata_code,
                  arrivingAt: new Date(segment.arriving_at),
                  departingAt: new Date(segment.departing_at),
                  destination: segment.destination.iata_code,
                  destinationTerminal: segment.destination_terminal,
                  duration: segment.duration,
                  marketingCarrier: segment.marketing_carrier.iata_code,
                  marketingCarrierFlightNumber:
                    segment.marketing_carrier_flight_number,
                  operatingCarrier: segment.operating_carrier.iata_code,
                  operatingCarrierFlightNumber:
                    segment.operating_carrier_flight_number,
                  origin: segment.origin.iata_code,
                  originTerminal: segment.origin_terminal,
                  passengers: segment.passengers,
                  distance: segment.distance,
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
        });
        syncedOrders++;
      }
    } catch (error) {
      console.error("Error during order sync:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      return new Response(
        JSON.stringify({
          error: "Error syncing orders",
          details: error instanceof Error ? error.message : String(error),
        }),
        { status: 500 },
      );
    }

    console.log(
      `Successfully synced ${syncedOrders} orders for user ${userId}`,
    );
    return new Response(
      JSON.stringify({ message: `${syncedOrders} orders synced successfully` }),
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 },
    );
  }
}

import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/lib/db/index";
import { orders } from "@/lib/db/schema/orders";
import { travellers } from "@/lib/db/schema/travellers";
import { segments } from "@/lib/db/schema/segments";
import { eq } from "drizzle-orm";
import { env } from "@/lib/env.mjs";

export async function POST(request: Request) {
  const WEBHOOK_SECRET = env.DUFFEL_WEBHOOK_SECRET!;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add DUFFEL_WEBHOOK_SECRET from Duffel Dashboard to .env",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }
  // Handle the webhook
  const { type: eventType, data } = evt;

  try {
    switch (eventType) {
      case "order.created":
      case "order.updated":
        await handleOrderCreatedOrUpdated(data);
        break;
      case "order.cancelled":
        await handleOrderCancelled(data.id);
        break;
      case "ping.triggered":
        console.log("Received ping event");
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`Error processing event type ${eventType}:`, error);
    return new Response("Error processing webhook", { status: 500 });
  }

  return new Response("", { status: 200 });
}

async function handleOrderCreatedOrUpdated(orderData: any) {
  await db.transaction(async (trx) => {
    const orderValues = {
      id: orderData.id,
      userId: orderData.metadata?.userId,
      bookingReference: orderData.booking_reference,
      totalAmount: orderData.total_amount,
      currency: orderData.total_currency,
      passengerName: `${orderData.passengers[0].given_name} ${orderData.passengers[0].family_name}`,
      passengerEmail: orderData.passengers[0].email,
      taxAmount: orderData.tax_amount || "0",
      paymentStatus: orderData.payment_status.awaiting_payment
        ? "Awaiting Payment"
        : "Paid",
      isLive: orderData.live_mode,
      syncedAt: new Date(),
    };

    await trx.insert(orders).values(orderValues).onConflictDoUpdate({
      target: orders.id,
      set: orderValues,
    });

    for (const passenger of orderData.passengers) {
      const travellerValues = {
        id: passenger.id,
        userId: orderData.metadata?.userId,
        orderId: orderData.id,
        givenName: passenger.given_name,
        familyName: passenger.family_name,
        email: passenger.email || "",
        phoneNumber: passenger.phone_number || "",
        bornOn: passenger.born_on ? new Date(passenger.born_on) : new Date(0),
        gender: passenger.gender || "",
        loyaltyProgramme:
          passenger.loyalty_programme_accounts?.[0]?.account_number || null,
      };

      await trx.insert(travellers).values(travellerValues).onConflictDoUpdate({
        target: travellers.id,
        set: travellerValues,
      });
    }

    for (const slice of orderData.slices) {
      for (const segment of slice.segments) {
        const segmentValues = {
          id: segment.id,
          orderId: orderData.id,
          aircraft: segment.aircraft,
          arrivingAt: new Date(segment.arriving_at),
          departingAt: new Date(segment.departing_at),
          destination: segment.destination,
          destinationTerminal: segment.destination_terminal ?? null,
          duration: segment.duration ?? null,
          marketingCarrier: segment.marketing_carrier,
          marketingCarrierFlightNumber: segment.marketing_carrier_flight_number,
          operatingCarrier: segment.operating_carrier,
          operatingCarrierFlightNumber: segment.operating_carrier_flight_number,
          origin: segment.origin,
          originTerminal: segment.origin_terminal ?? null,
          passengers: segment.passengers,
          distance: segment.distance ?? null,
        };

        await trx.insert(segments).values(segmentValues).onConflictDoUpdate({
          target: segments.id,
          set: segmentValues,
        });
      }
    }
  });
}

async function handleOrderCancelled(orderId: string) {
  await db
    .update(orders)
    .set({ paymentStatus: "Cancelled" })
    .where(eq(orders.id, orderId));
}

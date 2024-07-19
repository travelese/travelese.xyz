import { NextRequest } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { db } from "@/lib/db/index";
import { orders } from "@/lib/db/schema/orders";
import { travellers } from "@/lib/db/schema/travellers";
import { segments } from "@/lib/db/schema/segments";
import { eq } from "drizzle-orm";
import { env } from "@/lib/env.mjs";

const WEBHOOK_SECRET = env.DUFFEL_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const signature = headers().get("X-Duffel-Signature");

  if (!signature) {
    return new Response(JSON.stringify({ error: "Missing signature" }), {
      status: 400,
    });
  }

  const body = await request.text();

  if (!verifySignature(signature, body)) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 401,
    });
  }

  try {
    const event = JSON.parse(body);
    await processEvent(event);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Error processing webhook" }), {
      status: 500,
    });
  }
}

function verifySignature(signature: string, payload: string): boolean {
  const [timestamp, hash] = signature.split(",");
  const [, timestampValue] = timestamp.split("=");
  const [, hashValue] = hash.split("=");

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(`${timestampValue}.${payload}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hashValue),
    Buffer.from(expectedSignature),
  );
}

async function processEvent(event: any) {
  const { type, data } = event;

  try {
    switch (type) {
      case "order.created":
      case "order.updated":
        await upsertOrder(data);
        break;
      case "order.cancelled":
        await cancelOrder(data.id);
        break;
      case "ping.triggered":
        console.log("Received ping event");
        break;
      default:
        console.log(`Unhandled event type: ${type}`);
    }
  } catch (error) {
    console.error(`Error processing event type ${type}:`, error);
    throw error;
  }
}

async function upsertOrder(orderData: any) {
  await db.transaction(async (trx) => {
    await trx
      .insert(orders)
      .values({
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
      })
      .onConflictDoUpdate({
        target: orders.id,
        set: {
          syncedAt: new Date(),
          paymentStatus: orderData.payment_status.awaiting_payment
            ? "Awaiting Payment"
            : "Paid",
        },
      });

    for (const passenger of orderData.passengers) {
      await trx
        .insert(travellers)
        .values({
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
        })
        .onConflictDoUpdate({
          target: travellers.id,
          set: {
            email: passenger.email || "",
            phoneNumber: passenger.phone_number || "",
          },
        });
    }

    for (const slice of orderData.slices) {
      for (const segment of slice.segments) {
        await trx
          .insert(segments)
          .values({
            id: segment.id,
            orderId: orderData.id,
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
  });
}

async function cancelOrder(orderId: string) {
  await db
    .update(orders)
    .set({ paymentStatus: "Cancelled" })
    .where(eq(orders.id, orderId));
}

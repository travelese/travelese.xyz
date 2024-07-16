import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { orders } from "@/lib/db/schema/orders";
import { travellers } from "@/lib/db/schema/travellers";
import { segments } from "@/lib/db/schema/segments";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import crypto from "crypto";
import { Duffel } from "@duffel/api";

const WEBHOOK_SECRET = process.env.DUFFEL_WEBHOOK_SECRET!;
const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  console.log("Received request to /api/webhooks/duffel");
  const signature = headers().get("X-Duffel-Signature");

  if (signature) {
    console.log("Handling Duffel webhook");
    return handleWebhook(request, signature);
  } else {
    console.log("Handling manual sync");
    return handleManualSync(request);
  }
}

async function handleWebhook(request: NextRequest, signature: string) {
  const body = await request.text();

  if (!verifySignature(signature, body)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);
  await processEvent(event);

  return new NextResponse(null, { status: 200 });
}

async function handleManualSync(request: NextRequest) {
  console.log("In handleManualSync");
  const body = await request.json();
  console.log("Request body:", body);

  const { userId } = body;

  if (!userId) {
    console.log("No userId provided");
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    console.log(`Fetching orders for user ${userId}`);
    const allOrders = await duffel.orders.list();
    const userOrders = allOrders.data.filter(
      (order) => order.metadata?.userId === userId,
    );

    console.log(`Found ${userOrders.length} orders`);
    for (const order of userOrders) {
      await upsertOrder(order);
    }

    return NextResponse.json({ message: "User orders synced successfully" });
  } catch (error) {
    console.error("Error syncing user orders:", error);
    return NextResponse.json(
      { error: "Failed to sync user orders" },
      { status: 500 },
    );
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
}

async function upsertOrder(orderData: any) {
  await db.transaction(async (trx) => {
    // Upsert order
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

    // Upsert travellers
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

    // Upsert segments
    for (const slice of orderData.slices) {
      for (const segment of slice.segments) {
        await trx
          .insert(segments)
          .values({
            id: segment.id,
            orderId: orderData.id,
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
  });
}

async function cancelOrder(orderId: string) {
  await db
    .update(orders)
    .set({ paymentStatus: "Cancelled" })
    .where(eq(orders.id, orderId));
}

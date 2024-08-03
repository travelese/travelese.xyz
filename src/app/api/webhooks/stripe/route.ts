import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/lib/db/index";
import { stripe } from "@/lib/stripe/index";
import { subscriptions } from "@/lib/db/schema/subscriptions";
import { eq } from "drizzle-orm";
import { env } from "@/lib/env.mjs";

import type Stripe from "stripe";

export async function POST(request: Request) {
  const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add STRIPE_WEBHOOK_SECRET from Stripe Dashboard to .env",
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
  const payload = await request.text();
  const body = payload;

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
  const eventType = evt.type;
  const session = evt.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId && session.customer == null) {
    console.error("session customer", session.customer);
    console.error("no metadata for userid");
    return new Response(null, { status: 200 });
  }

  try {
    switch (eventType) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(session);
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(session);
        break;
      default:
        console.log("Unhandled event type", eventType);
    }
  } catch (error) {
    console.error(`Error processing event type ${eventType}:`, error);
    return new Response("Error processing webhook", { status: 500 });
  }

  return new Response(null, { status: 200 });
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );
  const updatedData = {
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: subscription.customer as string,
    stripePriceId: subscription.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  };

  if (session?.metadata?.userId != null) {
    await db
      .insert(subscriptions)
      .values({ ...updatedData, userId: session.metadata.userId })
      .onConflictDoUpdate({
        target: subscriptions.userId,
        set: updatedData,
      });
  } else if (typeof session.customer === "string" && session.customer != null) {
    await db
      .update(subscriptions)
      .set(updatedData)
      .where(eq(subscriptions.stripeCustomerId, session.customer));
  }
}

async function handleInvoicePaymentSucceeded(session: Stripe.Checkout.Session) {
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  await db
    .update(subscriptions)
    .set({
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
}

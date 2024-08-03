import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/users";
import { travelAgencies } from "@/lib/db/schema/travelAgencies";
import { travelAgents } from "@/lib/db/schema/travelAgents";
import { eq } from "drizzle-orm";
import { env } from "@/lib/env.mjs";

export async function POST(request: Request) {
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  try {
    switch (eventType) {
      case "user.created":
      case "user.updated":
        await handleUserCreatedOrUpdated(evt.data);
        break;
      case "organization.created":
      case "organization.updated":
        await handleOrganizationCreatedOrUpdated(evt.data);
        break;
      case "organizationMembership.created":
      case "organizationMembership.updated":
        await handleOrganizationMembershipCreatedOrUpdated(evt.data);
        break;
      default:
        console.log("Unhandled event type", eventType);
    }
  } catch (error) {
    console.error(`Error processing event type ${eventType}:`, error);
    return new Response("Error processing webhook", { status: 500 });
  }

  return new Response("", { status: 200 });
}

async function handleUserCreatedOrUpdated(data: any) {
  const userData = {
    id: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: data.email_addresses[0].email_address,
    role: data.private_metadata?.role || "user",
    updatedAt: new Date(data.updated_at),
    syncedAt: new Date(),
  };

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, data.id));

  if (existingUser.length > 0) {
    await db.update(users).set(userData).where(eq(users.id, data.id));
  } else {
    await db.insert(users).values({
      ...userData,
      createdAt: new Date(data.created_at),
    });
  }
}

async function handleOrganizationCreatedOrUpdated(data: any) {
  const agencyData = {
    id: data.id,
    name: data.name,
    email: data.email_address,
    phoneNumber: data.phone_number || "",
    updatedAt: new Date(data.updated_at),
    syncedAt: new Date(),
  };

  const existingAgency = await db
    .select()
    .from(travelAgencies)
    .where(eq(travelAgencies.id, data.id));

  if (existingAgency.length > 0) {
    await db
      .update(travelAgencies)
      .set(agencyData)
      .where(eq(travelAgencies.id, data.id));
  } else {
    await db.insert(travelAgencies).values({
      ...agencyData,
      createdAt: new Date(data.created_at),
    });
  }
}

async function handleOrganizationMembershipCreatedOrUpdated(data: any) {
  const agentData = {
    id: data.id,
    userId: data.public_user_data.user_id,
    agencyId: data.organization.id,
    givenName: data.public_user_data.first_name,
    familyName: data.public_user_data.last_name,
    email: data.public_user_data.email_addresses[0].email_address,
    phoneNumber: data.public_user_data.phone_numbers[0]?.phone_number || "",
    updatedAt: new Date(data.updated_at),
    syncedAt: new Date(),
  };

  const existingAgent = await db
    .select()
    .from(travelAgents)
    .where(eq(travelAgents.id, data.id));

  if (existingAgent.length > 0) {
    await db
      .update(travelAgents)
      .set(agentData)
      .where(eq(travelAgents.id, data.id));
  } else {
    await db.insert(travelAgents).values({
      ...agentData,
      createdAt: new Date(data.created_at),
    });
  }
}

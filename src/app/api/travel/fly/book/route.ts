import { NextRequest, NextResponse } from "next/server";
import { getOffer, createOrder } from "@/lib/travel/duffel";
import type { CreateOrder } from "@duffel/api/booking/Orders/OrdersTypes";
import { DuffelError } from "@duffel/api/Client";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { travellers } from "@/lib/db/schema/travellers";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { session } = await getUserAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get("id");

    if (!offerId) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 },
      );
    }

    const offer = await getOffer(offerId);

    if (new Date(offer.expires_at) < new Date()) {
      return NextResponse.json(
        {
          error:
            "The selected offer has expired. Please search for new offers.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(offer);
  } catch (error) {
    if ((error as DuffelError).meta.status === 404) {
      return NextResponse.json(
        { error: "Offer not found. It may have expired." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { session } = await getUserAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const orderParams = body as CreateOrder;

    // Check if the user already has a Duffel passenger ID
    const existingTraveller = await db
      .select()
      .from(travellers)
      .where(eq(travellers.userId, session.user.id))
      .limit(1);

    if (existingTraveller.length > 0) {
      // Use the existing Duffel passenger ID
      orderParams.passengers[0].id = existingTraveller[0].id;
    }

    orderParams.metadata = {
      ...orderParams.metadata,
      userId: session.user.id,
    };

    if (
      !orderParams.selected_offers ||
      !orderParams.passengers ||
      !orderParams.payments
    ) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 },
      );
    }

    orderParams.passengers = orderParams.passengers.map((passenger) => ({
      ...passenger,
      phone_number: passenger.phone_number.startsWith("+")
        ? passenger.phone_number
        : `+${passenger.phone_number}`,
    }));

    const order = await createOrder(orderParams);

    // If this is a new traveller, save their Duffel passenger ID
    if (existingTraveller.length === 0) {
      await db.insert(travellers).values({
        id: order.passengers[0].id,
        userId: session.user.id,
        givenName: orderParams.passengers[0].given_name,
        familyName: orderParams.passengers[0].family_name,
        email: orderParams.passengers[0].email,
        phoneNumber: orderParams.passengers[0].phone_number,
        bornOn: new Date(orderParams.passengers[0].born_on),
        gender: orderParams.passengers[0].gender,
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    if ((error as DuffelError).meta.status === 422) {
      return NextResponse.json(
        {
          error:
            "The selected offer is no longer valid. Please try again with a new search.",
        },
        { status: 422 },
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred while creating the order." },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getOffer, createOrder } from "@/lib/travel/duffel";
import type { CreateOrder } from "@duffel/api/booking/Orders/OrdersTypes";
import { getUserAuth } from "@/lib/auth/utils";

export async function GET(request: NextRequest) {
  try {
    const { session } = await getUserAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get("id");

    console.log("Received request for offer ID:", offerId);

    if (!offerId) {
      console.log("No offer ID provided");
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 },
      );
    }

    const offer = await getOffer(offerId);

    console.log("Fetched offer:", offer);

    if (new Date(offer.expires_at) < new Date()) {
      console.log("Offer has expired");
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
    console.error("Error fetching offer:", error);
    if (error.meta && error.meta.status === 404) {
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

    // Ensure the user ID is included in the order metadata
    orderParams.metadata = {
      ...orderParams.metadata,
      userId: session.user.id,
    };

    // Validate required fields
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

    // Format phone numbers if necessary
    orderParams.passengers = orderParams.passengers.map((passenger) => ({
      ...passenger,
      phone_number: passenger.phone_number.startsWith("+")
        ? passenger.phone_number
        : `+${passenger.phone_number}`,
    }));

    const order = await createOrder(orderParams);

    // Return the created order
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    if (error.meta && error.meta.status === 422) {
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

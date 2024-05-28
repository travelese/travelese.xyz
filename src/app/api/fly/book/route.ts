import { NextResponse } from "next/server";
import duffel from "@/lib/duffel";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get("id");

    if (!offerId) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 }
      );
    }

    // Correct fetching of an offer instead of an order
    const response = await duffel.offers.get(offerId);
    console.log("Duffel Offer GET Response:", response);

    if (!response?.data) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching offer:", error); // Adjusted error context
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { passengers, selected_offers, payments } = await request.json();
    
    console.log("Booking with payload:", {
      passengers,
      selected_offers,
      payments,
    });

    if (!passengers || !selected_offers || !payments) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderRequest = await duffel.orders.create({
      selected_offers,
      passengers,
      type: "instant",
      payments,
    });

    console.log("Duffel Order Create Response:", orderRequest.data);

    return NextResponse.json(orderRequest.data);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

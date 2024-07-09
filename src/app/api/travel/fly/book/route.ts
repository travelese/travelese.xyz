import { NextRequest, NextResponse } from "next/server";
import { getOffer, createOrder } from "@/lib/travel/duffel";
import type { CreateOrder } from "@duffel/api/booking/Orders/OrdersTypes";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get("id");

    if (!offerId) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 },
      );
    }

    const offer = await getOffer(offerId);
    return NextResponse.json(offer);
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderParams = body as CreateOrder;

    const order = await createOrder(orderParams);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

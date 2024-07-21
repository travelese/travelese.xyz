import { NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { searchFlights } from "@/lib/travel/duffel";
import type {
  CreateOfferRequest,
  CreateOfferRequestPassenger,
} from "@duffel/api/booking/OfferRequests/OfferRequestsTypes";
import type { Offer } from "@duffel/api/booking/Offers/OfferTypes";

export async function POST(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const body: {
      slices: CreateOfferRequest["slices"];
      passengers: CreateOfferRequestPassenger[];
      cabin_class?: CreateOfferRequest["cabin_class"];
      sort?: "total_amount";
      limit?: number;
    } = await request.json();
    const { slices, passengers, cabin_class, sort, limit } = body;

    const offers: Offer[] = await searchFlights(
      slices,
      passengers,
      cabin_class,
      sort,
      limit,
    );

    return new Response(JSON.stringify(offers));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { searchParams } = new URL(request.url);

    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const passengersJson = searchParams.get("passengers");
    const cabin = searchParams.get("cabin") as
      | CreateOfferRequest["cabin_class"]
      | null;
    const sort = searchParams.get("sort") as "total_amount" | undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : undefined;

    if (!origin || !destination || !from || !passengersJson || !cabin) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
        },
      );
    }

    const passengers = JSON.parse(
      passengersJson,
    ) as CreateOfferRequestPassenger[];

    const slices: CreateOfferRequest["slices"] = [
      { origin, destination, departure_date: from },
      ...(to
        ? [{ origin: destination, destination: origin, departure_date: to }]
        : []),
    ];

    const offers: Offer[] = await searchFlights(
      slices,
      passengers,
      cabin,
      sort,
      limit,
    );

    return new Response(JSON.stringify(offers));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

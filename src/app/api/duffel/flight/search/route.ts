import { NextResponse } from "next/server";
import duffel from "@/lib/duffel";
import { Offer, OfferSlice, Segment, OffersList } from "@/types/api";
import { parseFlightSearchResponse } from "@/lib/utils";

interface FlightSearchRequestBody {
  slices: {
    origin: string,
    destination: string,
    departure_date: string,
  }[];
  passengers: {
    type: string,
    count: number,
  }[];
  cabin_class: string;
}

export async function POST(request: Request) {
  try {
    const { data }: { data: FlightSearchRequestBody } = await request.json();

    if (!data || !data.slices || !Array.isArray(data.passengers) || !data.cabin_class) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const offerRequest = {
      slices: data.slices,
      passengers: data.passengers.map(passenger => ({
        type: "adult", // Assuming all passengers are adults for simplicity.
        age: passenger.count, // Assuming count as age for simplicity.
      })),
      cabin_class: data.cabin_class,
    };

    const flightSearch = await duffel.offerRequests.create(offerRequest as any);

    if (!flightSearch.data || !('offers' in flightSearch.data)) {
      throw new Error("Invalid response structure");
    }

    const flightData: OffersList = flightSearch.data as unknown as OffersList;
    const transformedResponse: Offer[] = parseFlightSearchResponse(flightData);

    console.log(flightSearch);

    return NextResponse.json(transformedResponse);
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ error: "Failed to search for flights" }, { status: 500 });
  }
}

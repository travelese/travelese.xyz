import { NextResponse } from "next/server";
import duffel from "@/lib/duffel";
import {
  FlightSearchRequestBody,
  ApiResponse,
  Offer,
  Passenger,
} from "@/types/api"; // Adjust the import path as necessary
import { parseFlightSearchResponse } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    // Get the form data from the request body
    const { data }: { data: FlightSearchRequestBody } = await request.json();

    // Check if the request body is valid
    if (!data || !data.slices || !data.passengers || !data.cabin_class) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Directly align passengers with the Duffel SDK's expected type
    const passengers: Passenger[] = data.passengers;

    // Destructure the necessary properties from the form data
    const { slices, cabin_class } = data;

    // Extract origin, destination, and departure_date from the first slice
    const { origin, destination, departure_date } = slices[0];

    // Extract the return date from the second slice, if it exists
    const return_date = slices[1]?.departure_date;

    // Construct offer request using Duffel SDK's type expectations
    const offerRequest = {
      passengers,  // Already aligned type
      cabin_class,
      slices: [
        {
          origin,
          destination,
          departure_date,
        },
        ...(return_date
          ? [
              {
                origin: destination,
                destination: origin,
                departure_date: return_date,
              },
            ]
          : []),
      ],
    };

    // Perform the flight search using the Duffel API
    const flightSearch = await duffel.offerRequests.create(offerRequest);

    // Transform the Duffel API response using the utility function
    const transformedResponse: Offer[] = parseFlightSearchResponse(flightSearch as ApiResponse);

    // Log the response from the Duffel API
    console.log(flightSearch);

    // Return the flight search results
    return NextResponse.json(transformedResponse);

  } catch (error) {
    // Handle any errors that occurred during the flight search
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Failed to search for flights" },
      { status: 500 }
    );
  }
}

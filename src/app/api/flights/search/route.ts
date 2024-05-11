import { NextResponse } from "next/server";
import duffel from "@/lib/duffel";

export async function POST(request: Request) {
  try {
    // Get the form data from the request body
    const { data } = await request.json();
    console.log("Form data:", data);

    // Destructure the necessary properties from the form data
    const { slices, passengers, cabin_class } = data;

    // Extract origin, destination, and departure_date from the first slice
    const { origin, destination, departure_date } = slices[0];

    // Extract the return date from the second slice, if it exists
    const return_date = slices[1]?.departure_date;

    console.log("Form data:", data);
    // Perform the flight search using the Duffel API
    const flightSearch = await duffel.offerRequests.create({
      passengers,
      cabin_class,
      slices: [
        {
          origin,
          destination,
          departure_date,
        },
        // Add a return slice if dates.to is provided
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
      // Add any other required parameters here
    });

    console.log("Flight search results:", flightSearch);
    // Return the flight search results
    return NextResponse.json(flightSearch);
  } catch (error) {
    // Handle any errors that occurred during the flight search
    console.error("Error searching for flights:", error);
    return NextResponse.json(
      { error: "Failed to search for flights" },
      { status: 500 }
    );
  }
}

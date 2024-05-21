// File: /src/app/api/fly/search/route.ts
// Description: This file handles the API call to Duffel for searching flights.

import { NextResponse } from "next/server";
import duffel from "@/lib/duffel";

export async function POST(request: Request) {
  try {
    const { slices, passengers, cabin_class } = await request.json();
    const payload = { slices, passengers, cabin_class };
    const response = await duffel.offerRequests.create(payload);

    if (!response || !response.data) {
      return NextResponse.json(
        { error: "Failed to fetch flight offers" },
        { status: 400 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error handling Duffel API request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const slices = [
      {
        origin: searchParams.get("origin") || "",
        destination: searchParams.get("destination") || "",
        departure_date: searchParams.get("from") || "",
      },
      {
        origin: searchParams.get("destination") || "",
        destination: searchParams.get("origin") || "",
        departure_date: searchParams.get("to") || "",
      },
    ];

    const passengers = JSON.parse(searchParams.get("passengers") || "[]");
    const cabin_class = searchParams.get("cabin") || "";

    const payload = { slices, passengers, cabin_class };
    const response = await duffel.offerRequests.create(payload);

    if (!response || !response.data) {
      return NextResponse.json(
        { error: "Failed to fetch flight offers" },
        { status: 400 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { duffel } from "@/lib/travel/duffel";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const name = searchParams.get("name") || "";
    const rad = searchParams.get("rad") || "";
    const lat = searchParams.get("lat") || "";
    const lng = searchParams.get("lng") || "";

    if (!query && !name) {
      return NextResponse.json(
        { error: "At least one of 'query' or 'name' parameters is required" },
        { status: 400 },
      );
    }

    const response = await duffel.suggestions.list({
      query,
      name,
      rad,
      lat,
      lng,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching place suggestions from Duffel API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

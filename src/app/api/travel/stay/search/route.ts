import { NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { searchAccommodations } from "@/lib/travel/duffel";
import type { StaysSearchParams, StaysSearchResult } from "@duffel/api/types";
import { DuffelError } from "@duffel/api";

export async function POST(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const body: StaysSearchParams = await request.json();
    const accommodations: StaysSearchResult = await searchAccommodations(body);

    return new Response(JSON.stringify(accommodations));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  console.log("Received stay search request");
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    console.log("Raw search params:", searchParams.toString());
    const check_in_date = searchParams.get("check_in_date");
    const check_out_date = searchParams.get("check_out_date");
    const rooms = searchParams.get("rooms")
      ? parseInt(searchParams.get("rooms")!, 10)
      : undefined;
    const guests = searchParams.get("guests")
      ? JSON.parse(searchParams.get("guests")!)
      : undefined;
    const latitude = searchParams.get("latitude")
      ? parseFloat(searchParams.get("latitude")!)
      : undefined;
    const longitude = searchParams.get("longitude")
      ? parseFloat(searchParams.get("longitude")!)
      : undefined;

    if (
      !check_in_date ||
      !check_out_date ||
      !rooms ||
      !guests ||
      !latitude ||
      !longitude
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
        },
      );
    }

    const params: StaysSearchParams = {
      check_in_date,
      check_out_date,
      rooms,
      guests,
      location: {
        geographic_coordinates: {
          latitude,
          longitude,
        },
        radius: 50, // You might want to make this configurable
      },
    };

    console.log(
      "Parsed params for Duffel API:",
      JSON.stringify(params, null, 2),
    );

    const accommodations = await searchAccommodations(params);
    return new Response(JSON.stringify(accommodations));
  } catch (error) {
    console.error("Error in stay search:", error);
    if (error instanceof DuffelError) {
      return new Response(
        JSON.stringify({
          error: "Duffel API Error",
          meta: error.meta,
          errors: error.errors,
          headers: Object.fromEntries(error.headers.entries()),
        }),
        {
          status: 500,
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "Internal Server Error",
          details:
            error instanceof Error ? error.message : JSON.stringify(error),
        }),
        {
          status: 500,
        },
      );
    }
  }
}

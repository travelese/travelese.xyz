import { NextRequest, NextResponse } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { duffel } from "@/lib/travel/duffel";

export async function GET(request: NextRequest) {
  console.log("Received request for places suggestions");
  const { session } = await getUserAuth();
  if (!session) {
    console.warn("Unauthorized access attempt");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "";
    console.log("Searching for place:", name);

    if (!name) {
      console.warn("Missing 'name' parameter");
      return NextResponse.json(
        { error: "The 'name' parameter is required" },
        { status: 400 },
      );
    }

    const response = await duffel.suggestions.list({
      query: name,
    });
    console.log("Duffel suggestions response:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in places suggestion:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

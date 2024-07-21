import { NextRequest, NextResponse } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { duffel } from "@/lib/travel/duffel";

export async function GET(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "";

    if (!name) {
      return NextResponse.json(
        { error: "The 'name' parameter is required" },
        { status: 400 },
      );
    }

    const response = await duffel.suggestions.list({
      name,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

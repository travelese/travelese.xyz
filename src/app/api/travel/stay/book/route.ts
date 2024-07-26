import { NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { bookAccommodation } from "@/lib/travel/duffel";

export async function POST(request: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const bookingDetails = await request.json();
    const booking = await bookAccommodation(bookingDetails);

    return new Response(JSON.stringify(booking));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

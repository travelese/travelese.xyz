import { duffel } from "./index";
import { DuffelError } from "@duffel/api";

import type { Places } from "@duffel/api/Places/Suggestions/SuggestionsType";
import type { Offer } from "@duffel/api/booking/Offers/OfferTypes";
import type {
  CreateOfferRequest,
  CreateOfferRequestPassenger,
} from "@duffel/api/booking/OfferRequests/OfferRequestsTypes";
import type { Order } from "@duffel/api/booking/Orders/OrdersTypes";
import type { CreateOrder, ListOffersParams } from "@duffel/api/types";
import type {
  StaysSearchParams,
  DuffelResponse,
  StaysSearchResult,
  StaysBooking,
} from "@duffel/api/types";
import type { StaysBookingPayload } from "@duffel/api/Stays/Bookings/Bookings";

export async function searchFlights(
  slices: CreateOfferRequest["slices"],
  passengers: CreateOfferRequestPassenger[],
  cabin_class?: CreateOfferRequest["cabin_class"],
  sort?: ListOffersParams["sort"],
  limit?: number,
): Promise<Offer[]> {
  try {
    const offerRequest = await duffel.offerRequests.create({
      slices,
      passengers,
      cabin_class,
      sort,
      return_offers: true,
    });

    let offers = offerRequest.data.offers as Offer[];
    if (limit) {
      offers = offers.slice(0, limit);
    }

    return offers;
  } catch (error) {
    throw new Error(
      `Failed to search flights: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getOffer(offerId: string): Promise<Offer> {
  const response = await duffel.offers.get(offerId);
  return response.data;
}

export async function createOrder(params: CreateOrder): Promise<Order> {
  console.log("Creating order with params:", JSON.stringify(params, null, 2));
  try {
    const response = await duffel.orders.create(params);
    if (!response.data || !response.data.booking_reference) {
      throw new Error("Booking failed: No booking reference received");
    }
    return response.data;
  } catch (error) {
    if (error instanceof DuffelError && error.errors) {
      console.error("Duffel API Error:", JSON.stringify(error.errors, null, 2));
      const errorMessage = error.errors.map((e) => e.message).join(", ");
      throw new Error(`Failed to create order: ${errorMessage}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to create order: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating the order");
    }
  }
}

export async function getPlaceSuggestions(
  params: Parameters<typeof duffel.suggestions.list>[0],
): Promise<Places[]> {
  const response = await duffel.suggestions.list(params);
  return response.data;
}

export async function listOrders(params: {
  limit?: number;
  after?: string;
  before?: string;
  sort?:
    | "payment_required_by"
    | "created_at"
    | "departing_at"
    | "booking_reference";
  booking_reference?: string;
  awaiting_payment?: boolean;
  passenger_name?: string[];
  origin_iata_code?: string;
  destination_iata_code?: string;
}) {
  const validParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  try {
    const response = await duffel.orders.list(validParams);
    return response;
  } catch (error) {
    console.error(
      "Error in Duffel API request:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}

export async function* syncUserOrders(userId: string): AsyncGenerator<Order> {
  let after: string | undefined;
  const batchSize = 50;

  while (true) {
    const response = await listOrders({
      limit: batchSize,
      after,
      sort: "created_at",
    });

    if (!response || !response.data) {
      throw new Error("Invalid response from Duffel API");
    }

    for (const order of response.data) {
      if (order.metadata?.userId === userId) {
        yield order;
      }
    }

    if (response.data.length < batchSize || !response.meta?.after) {
      break;
    }
    after = response.meta.after;
  }
}

export async function searchAccommodations(
  params: StaysSearchParams,
): Promise<StaysSearchResult> {
  console.log(
    "Calling Duffel API for accommodation search with params:",
    JSON.stringify(params, null, 2),
  );
  try {
    console.log("Duffel stays search method:", duffel.stays?.search);
    const response: DuffelResponse<StaysSearchResult> =
      await duffel.stays.search(params);
    console.log(
      "Duffel API accommodation search response:",
      JSON.stringify(response.data, null, 2),
    );
    return response.data;
  } catch (error) {
    console.error("Detailed error in searchAccommodations:", error);
    if (error instanceof DuffelError) {
      console.error("Duffel API Error details:", {
        meta: error.meta,
        errors: error.errors,
        headers: Object.fromEntries(error.headers.entries()),
      });
    }
    throw error;
  }
}

export async function bookAccommodation(
  params: StaysBookingPayload,
): Promise<StaysBooking> {
  console.log(
    "Calling Duffel API to book accommodation with params:",
    JSON.stringify(params, null, 2),
  );
  try {
    const response = await duffel.stays.bookings.create(params);
    console.log(
      "Duffel API booking response:",
      JSON.stringify(response.data, null, 2),
    );
    return response.data;
  } catch (error) {
    console.error("Error in bookAccommodation:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    if (typeof error === "object" && error !== null) {
      console.error("Error object:", JSON.stringify(error, null, 2));
    }
    throw new Error(
      `Failed to book accommodation: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export { duffel };

import { Duffel } from "@duffel/api";
import type { Offer } from "@duffel/api/booking/Offers/OfferTypes";
import type { Order } from "@duffel/api/booking/Orders/OrdersTypes";
import type {
  CreateOfferRequest,
  CreateOfferRequestPassenger,
} from "@duffel/api/booking/OfferRequests/OfferRequestsTypes";
import type { Places } from "@duffel/api/Places/Suggestions/SuggestionsType";
import type { CreateOrder, ListOffersParams } from "@duffel/api/types";

const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN!,
});

export async function searchFlights(
  slices: CreateOfferRequest["slices"],
  passengers: CreateOfferRequestPassenger[],
  cabin_class?: CreateOfferRequest["cabin_class"],
  sort?: ListOffersParams["sort"],
  limit?: number,
): Promise<Offer[]> {
  console.log(
    "searchFlights called with:",
    JSON.stringify({ slices, passengers, cabin_class, sort, limit }, null, 2),
  );
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
  const response = await duffel.orders.create(params);
  return response.data;
}

export async function getPlaceSuggestions(
  params: Parameters<typeof duffel.suggestions.list>[0],
): Promise<Places[]> {
  const response = await duffel.suggestions.list(params);
  return response.data;
}

export { duffel };

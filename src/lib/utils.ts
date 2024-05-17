// File: /src/lib/utils.ts
// Description: Utility functions for the application.

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Offer,
  OffersList,
  OfferSlice,
  Segment,
  Destination,
} from "@/types/api"; // Ensure this path is correct for your project

// Function for combining class names.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to parse the flight search response
export function parseFlightSearchResponse(response: OffersList): Offer[] {
  if (!response || !response.offers) return [];

  return response.offers.map((offer) => {
    const formattedSlices = offer.slices.map((slice: OfferSlice) => {
      const segments: Segment[] = (slice.segments || []).map((segment) => ({
        id: segment.id,
        aircraft: segment.aircraft,
        arriving_at: segment.arriving_at,
        departing_at: segment.departing_at,
        destination: segment.destination,
        duration: segment.duration,
        marketing_carrier: segment.marketing_carrier,
        marketing_carrier_flight_number:
          segment.marketing_carrier_flight_number,
        operating_carrier: segment.operating_carrier,
        origin: segment.origin,
        passengers: segment.passengers,
        stops: segment.stops,
        destination_terminal: segment.destination_terminal,
        distance: segment.distance,
        origin_terminal: segment.origin_terminal,
      }));

      return {
        id: slice.id,
        departure_date: slice.departure_date,
        origin: slice.origin,
        destination: slice.destination,
        origin_type: slice.origin_type,
        destination_type: slice.destination_type,
        duration: slice.duration,
        fare_brand_name: slice.fare_brand_name,
        segments,
        conditions: slice.conditions,
      } as OfferSlice;
    });

    return {
      id: offer.id,
      total_amount: offer.total_amount,
      total_currency: offer.total_currency,
      conditions: offer.conditions,
      slices: formattedSlices,
      base_amount: offer.base_amount,
      base_currency: offer.base_currency,
      created_at: offer.created_at,
      expires_at: offer.expires_at,
      live_mode: offer.live_mode,
      owner: offer.owner,
      passengers: offer.passengers,
      payment_requirements: offer.payment_requirements,
      tax_amount: offer.tax_amount,
      tax_currency: offer.tax_currency,
      total_emissions_kg: offer.total_emissions_kg,
      updated_at: offer.updated_at,
      private_fares: offer.private_fares,
      available_services: offer.available_services,
      passenger_identity_documents_required:
        offer.passenger_identity_documents_required,
      supported_passenger_identity_document_types:
        offer.supported_passenger_identity_document_types,
      partial: offer.partial,
    };
  });
}

// Function to parse ISO duration strings
export const parseDuration = (isoDuration: string): number => {
  const matches = isoDuration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/);
  return (
    parseInt(matches?.[1] || "0") * 24 * 60 +
    parseInt(matches?.[2] || "0") * 60 +
    parseInt(matches?.[3] || "0")
  );
};

// Function to get flight data based on search parameters
export const getFlightData = async (searchParams: {
  origin: string;
  destination: string;
  from: string;
  to: string;
  passengers: { type: string; age?: number }[];
  cabin: string;
}): Promise<Offer[]> => {
  const { origin, destination, from, to, passengers, cabin } = searchParams;

  if (!origin || !destination || !from || !to || !passengers.length || !cabin) {
    throw new Error("Missing query parameters");
  }

  const requestBody = {
    slices: [
      { origin, destination, departure_date: from },
      { origin: destination, destination: origin, departure_date: to },
    ],
    passengers,
    cabin_class: cabin,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/duffel/flight/search`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: requestBody }),
    }
  );

  const flightData: OffersList = await response.json();
  return parseFlightSearchResponse(flightData);
};

// Function to apply sorting on offers
export const applySorting = (
  offers: Offer[],
  sortCriteria: string
): Offer[] => {
  switch (sortCriteria) {
    case "price":
      return offers.sort(
        (a, b) => parseFloat(a.total_amount) - parseFloat(b.total_amount)
      );
    case "price-desc":
      return offers.sort(
        (a, b) => parseFloat(b.total_amount) - parseFloat(a.total_amount)
      );
    case "duration":
      return offers.sort(
        (a, b) =>
          a.slices.reduce(
            (total, s) => total + parseDuration(s.duration || ""),
            0
          ) -
          b.slices.reduce(
            (total, s) => total + parseDuration(s.duration || ""),
            0
          )
      );
    case "stops":
      return offers.sort(
        (a, b) =>
          a.slices.reduce((total, s) => total + (s.segments?.length || 0), 0) -
          b.slices.reduce((total, s) => total + (s.segments?.length || 0), 0)
      );
    default:
      return offers;
  }
};

// Function to apply filters on offers
export const applyFilters = (
  offers: Offer[],
  filterCriteria: { priceRange: [number, number] }
): Offer[] => {
  return offers.filter((offer) => {
    const meetsPriceCriteria =
      parseFloat(offer.total_amount) >= filterCriteria.priceRange[0] &&
      parseFloat(offer.total_amount) <= filterCriteria.priceRange[1];
    return meetsPriceCriteria;
  });
};

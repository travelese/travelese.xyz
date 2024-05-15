import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Offer, ApiResponse } from "@/types/api"; // Adjust the import path as necessary

// Utility function for combining class names.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to parse the flight search response
export function parseFlightSearchResponse(response: ApiResponse): Offer[] {
  if (!response || !response.data) return [];

  const { offers } = response.data;
  if (!offers) return [];

  return offers.map((offer) => {
    const formattedSlices = offer.slices.map((slice) => {
      const segments = slice.segments.map((segment) => ({
        departing_at: segment.departing_at,
        arriving_at: segment.arriving_at,
        origin: { name: segment.origin.name },
        destination: { name: segment.destination.name },
        duration: segment.duration,
        marketing_carrier_flight_number: segment.marketing_carrier_flight_number,
        marketing_carrier: {
          name: segment.marketing_carrier.name,
          logo_symbol_url: segment.marketing_carrier.logo_symbol_url,
        },
        aircraft: { name: segment.aircraft.name },
      }));

      return {
        segments,
        duration: slice.duration,
        fare_brand_name: slice.fare_brand_name,
      };
    });

    return {
      id: offer.id,
      total_amount: offer.total_amount,
      total_currency: offer.total_currency,
      conditions: offer.conditions,
      slices: formattedSlices,
    };
  });
}

import {
  CreateOfferRequestPassenger,
  CabinClass,
  OfferRequestSlice
} from "@duffel/api";

export interface Passenger extends CreateOfferRequestPassenger {}

// Correctly define other types
export interface FlightSearchRequestBody {
  slices: { origin: string; destination: string; departure_date: string }[];
  passengers: Passenger[];
  cabin_class: CabinClass;
}

// Other necessary type definitions
export interface City {
  name: string;
  id: string;
  iata_country_code: string;
  iata_code: string;
}

export interface Airport {
  time_zone: string;
  name: string;
  longitude: number;
  latitude: number;
  id: string;
  icao_code: string;
  iata_country_code: string;
  iata_code: string;
  iata_city_code: string;
  city_name: string;
}

export interface Segment {
  departing_at: string;
  arriving_at: string;
  origin: { name: string };
  destination: { name: string };
  duration: string;
  marketing_carrier_flight_number: string;
  marketing_carrier: {
    name: string;
    logo_symbol_url: string;
  };
  aircraft: { name: string };
}

export interface Slice {
  duration: string;
  segments: Segment[];
  fare_brand_name: string;
}

export interface Offer {
  id: string;
  total_amount: string;
  total_currency: string;
  conditions?: {
    change_before_departure?: { penalty_currency: string; penalty_amount: string; allowed: boolean };
    refund_before_departure?: { penalty_currency: string; penalty_amount: string; allowed: boolean };
  };
  slices: Slice[];
}

export interface ApiResponse {
  data: {
    slices: OfferRequestSlice[];
    offers: Offer[];
  };
}

export interface FlightSearchResponse {
  data: {
    slices: OfferRequestSlice[];
    offers: Offer[];
    live_mode: boolean;
    id: string;
    created_at: string;
    client_key: string;
    cabin_class?: string;
  };
}

// Additional interfaces for components
export interface ComponentSegment {
  departingAt: string;
  arrivingAt: string;
  origin: string;
  destination: string;
  duration: string;
  flightNumber: string;
  airline: string;
  airlineLogo: string;
  aircraft: string;
}

export interface ComponentSlice {
  segments: ComponentSegment[];
  duration: string;
  fareBrand: string;
}

export interface ComponentFlight {
  id: string;
  totalAmount: string;
  totalCurrency: string;
  conditions: any;
  slices: ComponentSlice[];
}

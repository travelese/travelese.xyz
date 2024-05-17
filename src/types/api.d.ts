// File: /src/types/api.d.ts
// Description: This file contains all the interfaces that are used in the application.

export type IdentityDocumentType =
  | "passport"
  | "tax_id"
  | "known_traveler_number"
  | "passenger_redress_number";
export type PassengerType = "adult" | "child" | "infant_without_seat";
export type FareType = "corporate" | "leisure" | "negotiated";
export type BaggageType = "checked" | "carry_on";
export type CabinClass = "first" | "business" | "premium_economy" | "economy";
export type PlaceType = "airport" | "city";
export type ServiceType = "baggage" | "seat" | "meal" | "cancel_for_any_reason";
export type AirlineChangeAction = "accepted" | "cancelled" | "changed";
export type Gender = "m" | "f";
export type DocumentType =
  | "electronic_ticket"
  | "electronic_miscellaneous_document_associated"
  | "electronic_miscellaneous_document_standalone";
export type OrderType = "instant" | "hold";
export type OrderContent = "self-managed" | "managed";
export type RefundTo =
  | "arc_bsp_cash"
  | "balance"
  | "card"
  | "voucher"
  | "awaiting_payment"
  | "airline_credits";
export type PaymentStatus = "awaiting" | "paid" | "pending";

// New interfaces
export type CabinClassNullable = CabinClass | null; // for nullable cabin class

export interface ClientKeyInterface {
  client_key: string; // required
}

// Conditions interface
export interface Conditions {
  change_before_departure?: {
    allowed: boolean; // required
    penalty_amount?: string | null; // nullable
    penalty_currency?: string | null; // nullable
  } | null; // nullable
  refund_before_departure?: {
    allowed: boolean; // required
    penalty_amount?: string | null; // nullable
    penalty_currency?: string | null; // nullable
  } | null; // nullable
}

// Owner interface
export interface Owner {
  conditions_of_carriage_url?: string | null; // nullable
  iata_code?: string | null; // nullable
  id: string; // required
  logo_lockup_url?: string | null; // nullable
  logo_symbol_url?: string | null; // nullable
  name: string; // required
}

// Available Services Metadata interfaces
export interface BaggageMetadata {
  maximum_depth_cm?: number | null; // nullable
  maximum_height_cm?: number | null; // nullable
  maximum_length_cm?: number | null; // nullable
  maximum_weight_kg?: number | null; // nullable
  type: BaggageType; // required
}

export interface SeatMetadata {
  designator: string; // required
  disclosures: string[]; // required
  name: string; // required
}

export interface MealMetadata {
  meal:
    | "baby_meal"
    | "bland_meal"
    | "asian_vegetarian_meal"
    | "diabetic_meal"
    | "gluten_free_meal"
    | "hindu_meal"
    | "kosher_meal"
    | "muslim_meal"
    | "vegan_meal"
    | "vegetarian_lacto_ovo_meal"
    | "traditional_meal"
    | "low_fat_meal"
    | "low_salt_meal"
    | "lactose_free_meal"
    | "healthy_meal"
    | "swiss_cold_meal"
    | "swiss_brunch"
    | "japanese_meal"
    | "child_meal"
    | "allergen_meal"
    | "vegetarian_meal"
    | "meal"; // required
}

export interface CancelForAnyReasonMetadata {
  merchant_copy: string; // required
  refund_amount: string; // required
  terms_and_conditions_url: string; // required
}

// Union type for available services metadata
export type ServiceMetadata =
  | BaggageMetadata
  | SeatMetadata
  | MealMetadata
  | CancelForAnyReasonMetadata;

// Available Services interface
export interface AvailableService {
  id: string; // required
  maximum_quantity: number; // required
  metadata: ServiceMetadata; // required
  passenger_ids: string[]; // required
  segment_ids: string[]; // required
  total_amount: string; // required
  total_currency: string; // required
  type: ServiceType; // required
}

// Payment Requirements interface
export interface PaymentRequirements {
  payment_required_by?: string | null; // nullable ISO 8601 datetime
  price_guarantee_expires_at?: string | null; // nullable ISO 8601 datetime
  requires_instant_payment: boolean; // required
}

// Loyalty Programme Account interface
export interface LoyaltyProgrammeAccount {
  account_number: string; // required
  airline_iata_code: string; // required
}

// Passenger interface
export interface Passenger {
  age?: number | null; // nullable
  family_name?: string | null; // nullable
  fare_type?: string | null; // nullable
  given_name?: string | null; // nullable
  id: string; // required
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
  type?: PassengerType | null; // nullable
  cabin_class?: CabinClassNullable; // nullable
}

// Segment Passenger interface
export interface SegmentPassenger {
  id: string; // required
  fare_basis_code?: string | null; // nullable
  passenger_id: string; // required
  cabin_class: CabinClass; // required
  cabin?: {
    // nullable
    name: CabinClass; // required
    marketing_name: string; // required
    amenities?: {
      // nullable
      power?: {
        // nullable
        available: boolean; // true
      } | null;
      seat?: {
        // nullable
        legroom: "less" | "more" | "standard" | "n/a"; // required
        pitch: string; // required
      } | null;
      wifi?: {
        // nullable
        available: boolean; // true
        cost: "free" | "free or paid" | "paid" | "n/a"; // required
      } | null;
    } | null;
  } | null;
  baggages?: {
    // optional
    quantity: number; // required
    type: BaggageType; // required
  }[];
}

// Segment interface
export interface Segment {
  id: string; // required
  aircraft: {
    // required
    iata_code: string; // required
    id: string; // required
    name: string; // required
  };
  arriving_at: string; // required, ISO 8601 datetime
  departing_at: string; // required, ISO 8601 datetime
  destination: Destination; // required
  destination_terminal?: string | null; // nullable
  distance?: string | null; // nullable
  duration?: string | null; // nullable, ISO 8601 duration
  marketing_carrier: {
    // required
    id: string; // required
    name: string; // required
    iata_code?: string | null; // nullable
    conditions_of_carriage_url?: string | null; // nullable
    logo_lockup_url?: string | null; // nullable
    logo_symbol_url?: string | null; // nullable
  };
  marketing_carrier_flight_number: string; // required
  operating_carrier: {
    // required
    id: string; // required
    name: string; // required
    iata_code?: string | null; // nullable
    conditions_of_carriage_url?: string | null; // nullable
    logo_lockup_url?: string | null; // nullable
    logo_symbol_url?: string | null; // nullable
    flight_number?: string | null; // nullable
  };
  origin: Destination; // required
  origin_terminal?: string | null; // nullable
  passengers: SegmentPassenger[]; // required
  stops?: {
    // optional
    airport: Airport; // required
    arriving_at: string; // required, ISO 8601 datetime
    departing_at: string; // required, ISO 8601 datetime
    duration: string; // required, ISO 8601 duration
    id: string; // required
  }[];
}

// Destination interface (same for Origin)
export interface Destination {
  city?: City | null; // nullable
  city_name: string; // required
  iata_city_code: string; // required
  iata_code: string; // required
  iata_country_code: string; // required
  icao_code: string; // required
  id: string; // required
  latitude: number; // required
  longitude: number; // required
  name: string; // required
  time_zone: string; // required
  type: PlaceType; // required
  airports?: Airport[] | null; // nullable
}

// City interface
export interface City {
  iata_code: string; // required
  iata_country_code: string; // required
  id: string; // required
  name: string; // required
  city_name: string; // required
}

// Airport interface
export interface Airport {
  city?: City | null; // nullable
  city_name: string; // required
  iata_city_code: string; // required
  iata_code: string; // required
  iata_country_code: string; // required
  icao_code: string; // required
  id: string; // required
  latitude: number; // required
  longitude: number; // required
  name: string; // required
  time_zone: string; // required
  type: PlaceType; // required
  airports?: Airport[] | null; // nullable
}

// Offer Slice interface, includes relevant properties from Slice
export interface OfferSlice {
  id: string; // required
  departure_date: string; // required, ISO 8601 date format
  origin: Destination; // required
  destination: Destination; // required
  origin_type: PlaceType; // required
  destination_type: PlaceType; // required
  duration?: string | null; // nullable ISO 8601 duration
  fare_brand_name?: string | null; // nullable
  segments?: Segment[]; // optional
  conditions?: {
    // optional
    change_before_departure?: {
      penalty_currency?: string; // optional
      penalty_amount?: string; // optional
      allowed: boolean; // required
    };
  } | null; // nullable
}

// Private Fares interface
export interface PrivateFares {
  corporate_code: string; // required
  tour_code: string; // required
  tracking_reference: string; // required
  type: FareType; // required
}

// Main Offer interface
export interface Offer {
  id: string; // required
  available_services?: AvailableService[]; // optional
  base_amount: string; // required
  base_currency: string; // required
  conditions: Conditions; // required
  created_at: string; // required, ISO 8601 datetime
  expires_at: string; // required, ISO 8601 datetime
  live_mode: boolean; // required
  owner: Owner; // required
  passenger_identity_documents_required: boolean; // required
  passengers: Passenger[]; // required
  payment_requirements: PaymentRequirements; // required
  partial?: boolean; // optional, preview
  supported_passenger_identity_document_types?: IdentityDocumentType[]; // optional
  tax_amount?: string | null; // nullable
  tax_currency?: string | null; // nullable
  total_amount: string; // required
  total_currency: string; // required
  slices: OfferSlice[]; // required
  private_fares: PrivateFares[]; // preview, required
  total_emissions_kg?: string | null; // nullable
  updated_at: string; // required, ISO 8601 datetime
}

// Offers List interface
export interface OffersList {
  offers: Offer[]; // required
}

// Passengers List interface
export interface PassengersList {
  passengers: Passenger[]; // required
}

// Client Key and Creation Date for Offer Request interface
export interface OfferRequest {
  id: string; // required
  client_key: string; // required
  created_at: string; // required, ISO 8601 datetime
  live_mode: boolean; // required
}

// Airline-Initiated Change interfaces
export interface AirlineInitiatedChange {
  id: string; // required
  created_at: string; // required, ISO 8601 datetime
  updated_at: string; // required, ISO 8601 datetime
  action_taken: AirlineChangeAction; // required
  action_taken_at: string; // required, ISO 8601 datetime
  order_id: string; // required
  available_actions: AirlineChangeAction[]; // required
  added: Slice[]; // required
  removed: Slice[]; // required
}

// Main Order interface
export interface Order {
  id: string; // required
  offer_id: string; // required
  created_at: string; // required, ISO 8601 datetime
  updated_at: string; // required, ISO 8601 datetime
  live_mode: boolean; // required
  conditions: Conditions; // required
  owner: Owner; // required
  passengers: Passenger[]; // required
  slices: Slice[]; // required
  services: Service[]; // required
  available_actions: string[]; // required
  base_amount: string; // nullable
  base_currency: string; // nullable
  booking_reference: string; // required
  cancellation?: Cancellation | null; // nullable
  changes: Change[]; // required
  content: OrderContent; // required
  documents: Document[]; // required
  metadata?: Record<string, any> | null; // optional, nullable
  payment_status: PaymentStatus; // required
  tax_amount?: string | null; // nullable
  tax_currency?: string | null; // nullable
  total_amount: string; // required
  total_currency: string; // required
  type?: OrderType | null; // nullable
}

export interface Service {
  id: string; // required
  metadata: Record<string, any>; // required
  passenger_ids: string[]; // required
  quantity: number; // required
  segment_ids: string[]; // required
  total_amount: string; // required
  total_currency: string; // required
  type: ServiceType; // required
}

export interface Document {
  passenger_ids: string[]; // required
  type: DocumentType; // required
  unique_identifier: string; // required
}

export interface Cancellation {
  airline_credits: AirlineCredit[]; // required
  confirmed_at: string; // required, ISO 8601 datetime
  created_at: string; // required, ISO 8601 datetime
  expires_at: string; // required, ISO 8601 datetime
  id: string; // required
  live_mode: boolean; // required
  order_id: string; // required
  refund_amount: string; // required
  refund_currency: string; // required
  refund_to: RefundTo; // required
}

export interface AirlineCredit {
  credit_amount: string; // required
  credit_code: string; // required
  credit_currency: string; // required
  credit_name: string; // required
  id: string; // required
  issued_on: string; // required, ISO 8601 date
  passenger_id: string; // required
}

export interface Change {
  id: string; // required
  created_at: string; // required, ISO 8601 datetime
  updated_at: string; // required, ISO 8601 datetime
  order_id: string; // required
  slices: ChangeSlices; // required
  confirmed_at?: string | null; // required, ISO 8601 datetime
  expires_at?: string | null; // required, ISO 8601 datetime
  new_total_amount: string; // required
  new_total_currency: string; // required
  penalty_total_amount: string; // required
  penalty_total_currency: string; // required
  change_total_amount: string; // required
  change_total_currency: string; // required
  refund_to?: RefundTo | null; // nullable
  live_mode: boolean; // required
}

export interface ChangeSlices {
  add: Slice[]; // required
  remove: Slice[]; // required
}

export interface Slice {
  id: string; // required
  duration?: string | null; // nullable
  fare_brand_name?: string | null; // nullable
  conditions?: Conditions; // nullable
  departure_date: string; // required, ISO 8601 date format
  origin: Destination; // required
  destination: Destination; // required
  origin_type: PlaceType; // required
  destination_type: PlaceType; // required
  segments: Segment[]; // required
}

export interface Segment {
  id: string; // required
  aircraft: {
    // required
    iata_code: string; // required
    id: string; // required
    name: string; // required
  };
  arriving_at: string; // required, ISO 8601 datetime
  departing_at: string; // required, ISO 8601 datetime
  destination: Destination; // required
  destination_terminal?: string | null; // nullable
  distance?: string | null; // nullable
  duration?: string | null; // nullable, ISO 8601 duration
  marketing_carrier: {
    // required
    id: string; // required
    name: string; // required
    iata_code?: string | null; // nullable
    conditions_of_carriage_url?: string | null; // nullable
    logo_lockup_url?: string | null; // nullable
    logo_symbol_url?: string | null; // nullable
  };
  marketing_carrier_flight_number: string; // required
  operating_carrier: {
    // required
    id: string; // required
    name: string; // required
    iata_code?: string | null; // nullable
    conditions_of_carriage_url?: string | null; // nullable
    logo_lockup_url?: string | null; // nullable
    logo_symbol_url?: string | null; // nullable
    flight_number?: string | null; // nullable
  };
  origin: Destination; // required
  origin_terminal?: string | null; // nullable
  passengers: SegmentPassenger[]; // required
  stops?: Stop[]; // optional
}

export interface Cabin {
  name: CabinClass; // required
  marketing_name: string; // required
  amenities?: Amenities | null; // nullable
}

export interface Amenities {
  power?: Power | null; // nullable
  seat?: Seat | null; // nullable
  wifi?: Wifi | null; // nullable
}

export interface Power {
  available: boolean; // required
}

export interface Seat {
  legroom: "less" | "more" | "standard" | "n/a"; // required
  pitch: string; // required
}

export interface Wifi {
  available: boolean; // required
  cost: "free" | "free or paid" | "paid" | "n/a"; // required
}

export interface Baggage {
  quantity: number; // required
  type: "checked" | "carry_on"; // required
}

export interface Stop {
  airport: Destination; // required
  arriving_at: string; // required, ISO 8601 datetime
  departing_at: string; // required, ISO 8601 datetime
  duration: string; // required, ISO 8601 duration
  id: string; // required
}


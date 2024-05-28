export type IdentityDocumentType =
  | "passport"
  | "tax_id"
  | "known_traveler_number"
  | "passenger_redress_number";

export type PassengerType = "adult" | "child" | "infant_without_seat"; // Deprecated, still defining for backward compatibility

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
  | "original_form_of_payment"
  | "arc_bsp_cash"
  | "balance"
  | "card"
  | "voucher"
  | "awaiting_payment"
  | "airline_credits";
export type PaymentStatus = "awaiting" | "paid" | "pending";
export type SortValues = "total_amount" | "total_duration" | "change_total_amount" | "total_duration";
export type PaymentMethodType = "arc_bsp_cash" | "balance" | "card";
export type SeatElementType =
  | "seat"
  | "bassinet"
  | "empty"
  | "exit_row"
  | "lavatory"
  | "galley"
  | "closet"
  | "stairs"
  | "restricted_seat_general";
export type CabinClassNullable = CabinClass | null;
export type PrivateFareType = "corporate" | "leisure" | "negotiated";
export type PartialOfferRequestPassengerType =
  | PartialOfferRequestPassengerWithType
  | PartialOfferRequestPassengerWithAge
  | PartialOfferRequestPassengerWithFareType;

// Identity Document Interface
export interface IdentityDocument {
  type: IdentityDocumentType; // required
  expires_on?: string; // required for passport
  issuing_country_code?: string; // required for passport, known_traveler_number, passenger_redress_number
  unique_identifier: string; // required
}

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
  family_name: string; // required
  given_name: string; // required
  id: string; // required
  identity_documents?: IdentityDocument[]; // nullable
  infant_passenger_id?: string; // optional
  born_on: string; // required
  email: string; // required
  gender: Gender; // required
  phone_number: string; // required
  title: "mr" | "ms" | "mrs" | "miss" | "dr"; // required
  type?: PassengerType | null; // nullable and deprecated
  user_id?: string; // optional
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
  age?: number | null; // nullable
  fare_type?: FareType | null; // nullable
  cabin_class?: CabinClassNullable; // nullable
}

// Segment Passenger interface
export interface SegmentPassenger {
  id: string; // required
  fare_basis_code?: string | null; // nullable
  passenger_id: string; // required
  cabin_class: CabinClass; // required
  cabin?: {
    name: CabinClass; // required
    marketing_name: string; // required
    amenities?: {
      power?: {
        available: boolean; // true
      } | null;
      seat?: {
        legroom: "less" | "more" | "standard" | "n/a"; // required
        pitch: string; // required
      } | null;
      wifi?: {
        available: boolean; // true
        cost: "free" | "free or paid" | "paid" | "n/a"; // required
      } | null;
    } | null;
  } | null;
  baggages?: {
    quantity: number; // required
    type: BaggageType; // required
  }[];
}

// Segment interface
export interface Segment {
  id: string; // required
  aircraft: {
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
    id: string; // required
    name: string; // required
    iata_code?: string | null; // nullable
    conditions_of_carriage_url?: string | null; // nullable
    logo_lockup_url?: string | null; // nullable
    logo_symbol_url?: string | null; // nullable
  };
  marketing_carrier_flight_number: string; // required
  operating_carrier: {
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
    airport: Airport; // required
    arriving_at: string; // required, ISO 8601 datetime
    departing_at: string; // required, ISO 8601 datetime
    duration: string; // required, ISO 8601 duration
    id: string; // required
  }[];
}

// Origin interface
export interface Origin {
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

// Destination interface
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
  comparison_key?: string; // optional
  departure_date: string; // required, ISO 8601 date format
  origin: Destination; // required
  destination: Destination; // required
  origin_type: PlaceType; // required
  destination_type: PlaceType; // required
  duration?: string | null; // nullable, ISO 8601 duration
  fare_brand_name?: string | null; // nullable
  segments?: Segment[]; // optional
  conditions?: {
    change_before_departure?: {
      penalty_currency?: string; // optional
      penalty_amount?: string; // optional
      allowed: boolean; // required
    };
  } | null;
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
  allowed_passenger_identity_document_types?: IdentityDocumentType[]; // deprecated
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
  partial?: boolean; // optional
  supported_passenger_identity_document_types?: IdentityDocumentType[]; // optional
  tax_amount?: string | null; // nullable
  tax_currency?: string | null; // nullable
  total_amount: string; // required
  total_currency: string; // required
  slices: OfferSlice[]; // required
  private_fares: PrivateFares[]; // required, preview
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
  slices: OfferSlice[]; // required
  cabin_class?: CabinClassNullable; // nullable
}

// Airline-Initiated Change interfaces
export interface AirlineInitiatedChange {
  id: string; // required
  created_at: string; // required, ISO 8601 datetime
  updated_at: string; // required, ISO 8601 datetime
  action_taken?: AirlineChangeAction | null; // nullable
  action_taken_at?: string | null; // nullable ISO 8601 datetime
  order_id: string; // required
  available_actions: ("accept" | "cancel" | "change" | "update")[]; // required
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
  base_amount?: string | null; // nullable
  base_currency?: string | null; // nullable
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

// Service interface
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

// Document interface
export interface Document {
  passenger_ids: string[]; // required
  type: DocumentType; // required
  unique_identifier: string; // required
}

// Cancellation interface
export interface Cancellation {
  airline_credits: AirlineCredit[]; // required
  confirmed_at: string | null; // nullable, ISO 8601 datetime
  created_at: string; // required, ISO 8601 datetime
  expires_at: string | null; // nullable, ISO 8601 datetime
  id: string; // required
  live_mode: boolean; // required
  order_id: string; // required
  refund_amount: string; // required
  refund_currency: string; // required
  refund_to: RefundTo; // required
}

// Airline Credit interface
export interface AirlineCredit {
  credit_amount: string; // required
  credit_code: string; // required
  credit_currency: string; // required
  credit_name: string; // required
  id: string; // required
  issued_on: string; // required, ISO 8601 date
  passenger_id: string; // required
}

// Change interface
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

// Slice interface
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

// Stop interface
export interface Stop {
  airport: Destination; // required
  arriving_at: string; // required, ISO 8601 datetime
  departing_at: string; // required, ISO 8601 datetime
  duration: string; // required, ISO 8601 duration
  id: string; // required
}

// Offer Request Passenger With Type interface
export interface OfferRequestPassengerWithType {
  family_name: string; // required
  given_name: string; // required
  type: PassengerType; // required
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
}

// Offer Request Passenger With Age interface
export interface OfferRequestPassengerWithAge {
  family_name?: string; // optional
  given_name?: string; // optional
  age: number; // required
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
}

// Offer Request Passenger With Fare Type interface
export interface OfferRequestPassengerWithFareType {
  family_name?: string; // optional
  given_name?: string; // optional
  fare_type: FareType; // required
  age?: number; // optional
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
}

// Slices interface
export interface SliceRequest {
  departure_date: string; // required, ISO 8601 date format
  origin: string; // required, IATA code
  destination: string; // required, IATA code
  departure_time?: TimeRange; // optional
  arrival_time?: TimeRange; // optional
}

// Time Range interface
export interface TimeRange {
  from?: string; // optional, local time in hh:mm format
  to?: string; // optional, local time in hh:mm format
}

// Private Fares Request interface
export interface PrivateFaresRequest {
  corporate_code?: string; // optional
  tracking_reference?: string; // optional
  tour_code?: string; // optional
}

// Main Offer Request Body interface
export interface OfferRequestBody {
  slices: SliceRequest[]; // required
  passengers: (
    | OfferRequestPassengerWithType
    | OfferRequestPassengerWithAge
    | OfferRequestPassengerWithFareType
  )[]; // required
  cabin_class?: CabinClassNullable; // optional
  private_fares?: Record<string, PrivateFaresRequest[]>; // optional
}

// Supporting Interfaces for GET Request
export interface PaginatedOfferRequestResponse {
  limit: number; // required
  after?: string; // optional
  before?: string; // optional
  data: OfferRequest[]; // required
}

export interface GetSingleOfferParams {
  id: string; // required, Duffel's unique identifier for the resource
  return_available_services?: boolean; // optional
}

// Additional supporting interfaces for List Offers request
export interface ListOffersParams {
  offer_request_id: string; // required
  limit?: number; // optional, default 50
  sort?: SortValues; // optional
  max_connections?: number; // optional
  after?: string; // optional
  before?: string; // optional
}

export interface UpdateOfferPassengerParams {
  offer_id: string; // required
  offer_passenger_id: string; // required
  family_name: string; // required
  given_name: string; // required
  loyalty_programme_accounts: LoyaltyProgrammeAccount[]; // required
}

// Orders Related Interfaces
export interface CreatedAtFilter {
  after?: string; // nullable - ISO 8601 datetime format
  before?: string; // nullable - ISO 8601 datetime format
}

// Main Filter Parameters for Orders
export interface ListOrdersParams {
  after?: string; // cursor for pagination
  before?: string; // cursor for pagination
  limit?: number; // pagination limit
  booking_reference?: string; // filter by booking reference
  offer_id?: string; // filter by offer id
  awaiting_payment?: boolean; // filter by payment status
  sort?: string; // sort field
  owner_id?: string[]; // filter by owner id
  origin_id?: string[]; // filter by origin id
  destination_id?: string[]; // filter by destination id
  departing_at?: string; // filter by departure datetime
  arriving_at?: string; // filter by arrival datetime
  created_at?: CreatedAtFilter; // filter by creation datetime
  passenger_name?: string[]; // filter by passenger names
  requires_action?: boolean; // filter by orders that require action
}

// Order Request related interfaces
export interface OrderPassenger {
  id: string; // required
  family_name: string; // required
  given_name: string; // required
  title: "mr" | "ms" | "mrs" | "miss" | "dr"; // required
  gender: Gender; // required
  phone_number: string; // required
  email: string; // required
  born_on: string; // required
  identity_documents?: IdentityDocument[]; // optional, nullable
  infant_passenger_id?: string; // optional
  type?: PassengerType | null; // optional and deprecated
  user_id?: string; // optional, preview
  nationality?: string; // optional, ISO country code
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
  metadata?: Record<string, string>; // optional
}

export interface Payment {
  amount: string; // required
  currency: string; // required
  type: PaymentMethodType; // required
}

export interface ServiceRequest {
  id: string; // required
  quantity: number; // required
}

// Order Request Body interface
export interface OrderRequestBody {
  selected_offers: string[]; // required
  payments?: Payment[]; // optional, required if type is "instant"
  services?: ServiceRequest[]; // optional
  type: OrderType; // required
  passengers: OrderPassenger[]; // required
  metadata?: Record<string, string>; // optional
  users?: string[]; // optional, preview
}

// Payment related interfaces
export interface PaymentDetails {
  amount: string; // required
  created_at: string; // required, ISO 8601 datetime
  currency?: string; // nullable, ISO 4217 currency code
  id: string; // required
  live_mode: boolean; // required
  type: PaymentMethodType; // required, "arc_bsp_cash" | "balance" | "card"
}

export interface CreatePaymentBody {
  order_id: string; // required
  payment: {
    amount: string; // required
    currency: string; // required
    type: PaymentMethodType; // required
  };
}

// Seat Map related interfaces
export interface SeatMap {
  id: string; // required
  segment_id: string; // required
  slice_id: string; // required
  cabins: Cabin[]; // required
}

// Cabin interface
export interface Cabin {
  aisles: number; // required
  cabin_class: CabinClass; // required
  deck: number; // required
  rows: CabinRow[]; // required
  wings?: Wing | null; // nullable
}

// Cabin Row interface
export interface CabinRow {
  sections: CabinSection[]; // required
}

// CabinSection interface
export interface CabinSection {
  elements: (
    | SeatElement
    | BassinetElement
    | EmptyElement
    | ExitRowElement
    | LavatoryElement
    | GalleyElement
    | ClosetElement
    | StairsElement
    | RestrictedSeatElement
  )[]; // required
}

// Base Element interface
export interface BaseElement {
  type: SeatElementType; // required
}

// Seat Element interface
export interface SeatElement extends BaseElement {
  type: "seat"; // required
  available_services: AvailableService[]; // required
  designator: string; // required
  disclosures: string[]; // required
  name?: string | null; // nullable
}

// Bassinet Element interface
export interface BassinetElement extends BaseElement {
  type: "bassinet"; // required
}

// Empty Element interface
export interface EmptyElement extends BaseElement {
  type: "empty"; // required
}

// Exit Row Element interface
export interface ExitRowElement extends BaseElement {
  type: "exit_row"; // required
}

// Lavatory Element interface
export interface LavatoryElement extends BaseElement {
  type: "lavatory"; // required
}

// Galley Element interface
export interface GalleyElement extends BaseElement {
  type: "galley"; // required
}

// Closet Element interface
export interface ClosetElement extends BaseElement {
  type: "closet"; // required
}

// Stairs Element interface
export interface StairsElement extends BaseElement {
  type: "stairs"; // required
}

// Restricted Seat Element interface
export interface RestrictedSeatElement extends BaseElement {
  type: "restricted_seat_general"; // required
}

// Wing interface
export interface Wing {
  first_row_index: number; // required
  last_row_index: number; // required
}

// Get Seat Maps Params interface
export interface GetSeatMapsParams {
  offer_id: string; // required
}

// Order Cancellation related interfaces
export interface AirlineCredit {
  credit_amount: string; // required
  credit_code: string; // required
  credit_currency: string; // required
  credit_name: string; // required
  id: string; // required
  issued_on: string; // required, ISO 8601 date
  passenger_id: string; // required
}

// Main Order Cancellation interface
export interface OrderCancellation {
  id: string; // required
  order_id: string; // required
  created_at: string; // required, ISO 8601 datetime
  expires_at?: string | null; // nullable, ISO 8601 datetime
  confirmed_at?: string | null; // nullable, ISO 8601 datetime
  live_mode: boolean; // required
  refund_amount: string; // required
  refund_currency: string; // required
  refund_to: RefundTo; // required
  airline_credits: AirlineCredit[]; // required
}

// Parameters for listing order cancellations
export interface ListOrderCancellationsParams {
  after?: string; // cursor for pagination
  before?: string; // cursor for pagination
  limit?: number; // pagination limit, default 50
  order_id?: string; // filter by order id
}

// Interface for creating an order cancellation
export interface CreateOrderCancellationBody {
  order_id: string; // required
}

// Interface for confirming an order cancellation
export interface ConfirmOrderCancellationParams {
  id: string; // required
}

// Interface for getting a single order cancellation
export interface GetOrderCancellationParams {
  id: string; // required
}

// Interfaceinterface for OrderChangeOffer
export interface OrderChangeOffer {
  id: string; // required
  updated_at: string; // required, ISO 8601 datetime
  created_at: string; // required, ISO 8601 datetime
  expires_at: string; // required, ISO 8601 datetime
  live_mode: boolean; // required
  new_total_amount: string; // required
  new_total_currency: string; // required
  change_total_amount: string; // required
  change_total_currency: string; // required
  penalty_total_amount: string; // required
  penalty_total_currency: string; // required
  conditions: OrderChangeOfferConditions; // required
  private_fares: PrivateFares[]; // required
  slices: OrderChangeSliceDetails; // required
  refund_to: RefundTo; // required
  order_change_id?: string | null; // nullable
}

// Interfaceinterfaces for OrderChangeOfferConditions
export interface OrderChangeOfferConditions {
  change_before_departure: ChangeOrRefundBeforeDeparture; // nullable
  refund_before_departure: ChangeOrRefundBeforeDeparture; // nullable
}

// Interfaceinterfaces for OrderChangeSliceDetails
export interface OrderChangeSliceDetails {
  add: OrderChangeSlice[]; // required
  remove: OrderChangeSlice[]; // required
}

export interface OrderChangeSlice {
  id: string; // required
  origin: Origin; // required
  destination: Destination; // required
  departure_date: string; // required, ISO 8601 date format
  cabin_class?: CabinClassNullable; // nullable
  segments: Segment[]; // required
}

// Interfaceinterface for OrderChangeRequest
export interface OrderChangeRequest {
  id: string; // required
  order_id: string; // required
  created_at: string; // required, ISO 8601 datetime
  updated_at: string; // required, ISO 8601 datetime
  live_mode: boolean; // required
  order_change_offers: OrderChangeOffer[]; // required
  slices: OrderChangeSliceDetails; // required
}

// Parameter interface for creating an order change request
export interface CreateOrderChangeRequestBody {
  order_id: string; // required
  private_fares?: Record<string, PrivateFaresRequest[]>; // optional
  slices: {
    add: SliceRequest[]; // required
    remove: { slice_id: string }[]; // required
  };
}

// Parameter interface for retrieving a single order change request
export interface GetSingleOrderChangeRequestParams {
  id: string; // required
}

// Main interface for retrieving a single order change request response
export interface GetSingleOrderChangeRequestResponse {
  data: OrderChangeRequest; // required
}

// Interface for retrieving a single order change offer
export interface GetSingleOrderChangeOfferParams {
  id: string; // required
}

// Main response interface for a single order change offer
export interface GetSingleOrderChangeOfferResponse {
  data: OrderChangeOffer; // required
}

// Interface for listing order change offers based on query parameters
export interface ListOrderChangeOffersParams {
  order_change_request_id: string; // required
  limit?: number; // optional
  sort?: SortValues; // optional
  max_connections?: number; // optional
  after?: string; // optional
  before?: string; // optional
}

// Interface for Order Change
export interface OrderChange {
  id: string; // required
  change_total_amount: string; // required
  change_total_currency: string; // required
  confirmed_at?: string | null; // nullable
  created_at: string; // required, ISO 8601 datetime
  expires_at?: string | null; // required, ISO 8601 datetime
  live_mode: boolean; // required
  new_total_amount: string; // required
  new_total_currency: string; // required
  order_id: string; // required
  penalty_total_amount: string; // required
  penalty_total_currency: string; // required
  refund_to?: RefundTo | null; // nullable
  slices: OrderChangeSliceDetails; // required
}

// Parameters for creating a pending order change
export interface CreateOrderChangeBody {
  selected_order_change_offer: string; // required
}

// Interface for confirming an order change
export interface ConfirmOrderChangeParams {
  id: string; // required
  payment?: Payment; // optional, only if change_total_amount is greater than 0
}

// Main interface for retrieving a single order change response
export interface GetSingleOrderChangeResponse {
  data: OrderChange; // required
}

// Interface for Batch Offer Request
export interface BatchOfferRequest {
  client_key: string; // required
  created_at: string; // required, ISO 8601 datetime
  id: string; // required
  live_mode: boolean; // required
  remaining_batches: number; // required
  total_batches: number; // required
}

// Parameter interface for creating a batch offer request
export interface CreateBatchOfferRequestBody {
  cabin_class?: CabinClass; // optional
  max_connections?: number; // optional
  passengers: (
    | OfferRequestPassengerWithType
    | OfferRequestPassengerWithAge
    | OfferRequestPassengerWithFareType
  )[]; // required
  private_fares?: Record<string, PrivateFaresRequest[]>; // optional
  slices: SliceRequest[]; // required
}

// Parameter interface for retrieving a single batch offer request
export interface GetSingleBatchOfferRequestParams {
  id: string; // required
}

// Supporting interfaces for batch offer requests
export interface CreateBatchOfferRequestParams {
  supplier_timeout?: number; // optional
}

// Main interface for single batch offer request response
export interface GetSingleBatchOfferRequestResponse {
  data: BatchOfferRequest; // required
}

// Interface for updating an airline-initiated change
export interface UpdateAirlineInitiatedChangeBody {
  action_taken: AirlineChangeAction; // required
}

// Parameter interface for getting a single airline-initiated change
export interface GetSingleAirlineInitiatedChangeParams {
  id: string; // required
}

// Main interface for retrieving a single airline-initiated change response
export interface GetSingleAirlineInitiatedChangeResponse {
  data: AirlineInitiatedChange; // required
}

// Interface for listing airline-initiated changes
export interface ListAirlineInitiatedChangesParams {
  order_id?: string; // optional
}

// Main interface for listing airline-initiated changes response
export interface ListAirlineInitiatedChangesResponse {
  data: AirlineInitiatedChange[]; // required
}

export interface PartialOfferRequestSlice {
  departure_date: string; // required, ISO 8601 date format
  origin: string; // required, IATA code
  destination: string; // required, IATA code
  departure_time?: TimeRange; // optional
  arrival_time?: TimeRange; // optional
}

export interface PartialOfferRequestPassengerWithType {
  family_name?: string; // optional
  given_name?: string; // optional
  type: PassengerType; // required
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
}

export interface PartialOfferRequestPassengerWithAge {
  age: number; // required
  family_name?: string; // optional
  given_name?: string; // optional
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
}

export interface PartialOfferRequestPassengerWithFareType {
  age?: number; // optional
  family_name?: string; // optional
  given_name?: string; // optional
  fare_type: FareType; // required
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]; // optional
}

// Main Partial Offer Request interface
export interface PartialOfferRequestBody {
  slices: PartialOfferRequestSlice[]; // required
  passengers: PartialOfferRequestPassengerType[]; // required
  cabin_class?: CabinClass; // optional
  max_connections?: number; // optional, default 1
  private_fares?: Record<string, PrivateFaresRequest[]>; // optional
}

// Get a single partial offer request
export interface GetSinglePartialOfferRequestParams {
  id: string; // required, Duffel's unique identifier for the partial offer request
  selected_partial_offer: string[]; // required, selected partial offer IDs for the preceding slices
}

// Create a partial offer request
export interface CreatePartialOfferRequestParams {
  supplier_timeout?: number; // optional, in milliseconds, default 20000
  data: PartialOfferRequestBody; // required body parameters
}

// Get full offer fares for selected partial offers
export interface GetFullOfferFaresParams {
  id: string; // required, Duffel's unique identifier for the partial offer request
  selected_partial_offer: string[]; // required, selected partial offer IDs for each slice in the journey
}
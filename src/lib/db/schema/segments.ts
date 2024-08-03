import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const segments = pgTable("segments", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .references(() => orders.id)
    .notNull(),
  aircraft: jsonb("aircraft"),
  arrivingAt: timestamp("arriving_at").notNull(),
  departingAt: timestamp("departing_at").notNull(),
  destination: jsonb("destination").notNull(),
  destinationTerminal: text("destination_terminal"),
  duration: text("duration"),
  marketingCarrier: jsonb("marketing_carrier").notNull(),
  marketingCarrierFlightNumber: text(
    "marketing_carrier_flight_number",
  ).notNull(),
  operatingCarrier: jsonb("operating_carrier").notNull(),
  operatingCarrierFlightNumber: text(
    "operating_carrier_flight_number",
  ).notNull(),
  origin: jsonb("origin").notNull(),
  originTerminal: text("origin_terminal"),
  passengers: jsonb("passengers").notNull(),
  distance: text("distance"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  syncedAt: timestamp("synced_at"),
});

import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const segments = pgTable("segments", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .references(() => orders.id)
    .notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departingAt: timestamp("departing_at").notNull(),
  arrivingAt: timestamp("arriving_at").notNull(),
  duration: text("duration").notNull(),
  marketingCarrier: text("marketing_carrier").notNull(),
  operatingCarrier: text("operating_carrier").notNull(),
  aircraft: text("aircraft").notNull(),
});

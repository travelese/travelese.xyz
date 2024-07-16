import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { travelAgents } from "./travelAgents";

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  bookingReference: text("booking_reference").notNull(),
  passengerId: text("passenger_id"),
  passengerName: text("passenger_name").notNull(),
  passengerEmail: text("passenger_email").notNull(),
  currency: text("currency").notNull(),
  baseAmount: text("base_amount"),
  taxAmount: text("tax_amount").notNull(),
  totalAmount: text("total_amount").notNull(),
  paymentStatus: text("payment_status").notNull(),
  isLive: boolean("is_live").notNull().default(false),
  commissionAmount: text("commission_amount"),
  markupAmount: text("markup_amount"),
  travelAgentId: text("travel_agent_id").references(() => travelAgents.id),
  offerId: text("offer_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  syncedAt: timestamp("synced_at"),
});

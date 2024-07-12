import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const orders = pgTable("orders", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id").references(() => users.id),
  bookingReference: text("booking_reference").notNull(),
  totalAmount: text("total_amount").notNull(),
  currency: text("currency").notNull(),
  passengerName: text("passenger_name").notNull(),
  passengerEmail: text("passenger_email").notNull(),
  taxAmount: text("tax_amount").notNull(),
  paymentStatus: text("payment_status").notNull(),
  isLive: boolean("is_live").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  syncedAt: timestamp("synced_at"),
});

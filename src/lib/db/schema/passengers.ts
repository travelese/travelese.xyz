import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const passengers = pgTable("passengers", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .references(() => orders.id)
    .notNull(),
  givenName: text("given_name").notNull(),
  familyName: text("family_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  bornOn: timestamp("born_on").notNull(),
  gender: text("gender").notNull(),
  loyaltyProgramme: text("loyalty_programme"),
});

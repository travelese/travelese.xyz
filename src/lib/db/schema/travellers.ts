import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { orders } from "./orders";

export const travellers = pgTable("travellers", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  orderId: text("order_id").references(() => orders.id),
  gender: text("gender").notNull(),
  title: text("title"),
  givenName: text("given_name").notNull(),
  familyName: text("family_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  bornOn: timestamp("born_on").notNull(),
  passportNumber: text("passport_number"),
  passportExpiryDate: timestamp("passport_expiry_date"),
  nationality: text("nationality"),
  loyaltyProgramme: text("loyalty_programme"),
  companyName: text("company_name"),
  jobTitle: text("job_title"),
});
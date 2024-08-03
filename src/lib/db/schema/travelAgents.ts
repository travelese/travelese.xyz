import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { travelAgencies } from "./travelAgencies";

export const travelAgents = pgTable("travel_agents", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").references(() => users.id),
  agencyId: text("agency_id").references(() => travelAgencies.id),
  givenName: text("given_name").notNull(),
  familyName: text("family_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  syncedAt: timestamp("synced_at"),
});

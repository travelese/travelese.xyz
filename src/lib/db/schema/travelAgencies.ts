import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const travelAgencies = pgTable("travel_agencies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  syncedAt: timestamp("synced_at"),
});

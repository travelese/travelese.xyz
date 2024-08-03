import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("user_id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  syncedAt: timestamp("synced_at"),
});

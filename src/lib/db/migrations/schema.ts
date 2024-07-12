import {
  pgTable,
  text,
  timestamp,
  foreignKey,
  primaryKey,
  unique,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "string" }),
  image: text("image"),
});

export const session = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "string" }).notNull(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey().notNull(),
  booking_reference: text("booking_reference").notNull(),
  total_amount: text("total_amount").notNull(),
  currency: text("currency").notNull(),
  passenger_name: text("passenger_name").notNull(),
  passenger_email: text("passenger_email").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  user_id: text("user_id").references(() => user.id),
  tax_amount: text("tax_amount").notNull(),
  payment_status: text("payment_status").notNull(),
  updated_at: timestamp("updated_at", { mode: "string" }).defaultNow(),
  synced_at: timestamp("synced_at", { mode: "string" }),
});

export const passengers = pgTable("passengers", {
  id: text("id").primaryKey().notNull(),
  order_id: text("order_id")
    .notNull()
    .references(() => orders.id),
  given_name: text("given_name").notNull(),
  family_name: text("family_name").notNull(),
  email: text("email").notNull(),
  phone_number: text("phone_number").notNull(),
  born_on: timestamp("born_on", { mode: "string" }).notNull(),
  gender: text("gender").notNull(),
  loyalty_programme: text("loyalty_programme"),
});

export const segments = pgTable("segments", {
  id: text("id").primaryKey().notNull(),
  order_id: text("order_id")
    .notNull()
    .references(() => orders.id),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departing_at: timestamp("departing_at", { mode: "string" }).notNull(),
  arriving_at: timestamp("arriving_at", { mode: "string" }).notNull(),
  duration: text("duration").notNull(),
  marketing_carrier: text("marketing_carrier").notNull(),
  operating_carrier: text("operating_carrier").notNull(),
  aircraft: text("aircraft").notNull(),
});

export const verificationToken = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      verificationToken_identifier_token_pk: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token_pk",
      }),
    };
  },
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    user_id: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id),
    stripe_customer_id: varchar("stripe_customer_id", {
      length: 255,
    }).notNull(),
    stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
    stripe_price_id: varchar("stripe_price_id", { length: 255 }),
    stripe_current_period_end: timestamp("stripe_current_period_end", {
      mode: "string",
    }),
  },
  (table) => {
    return {
      subscriptions_user_id_stripe_customer_id_pk: primaryKey({
        columns: [table.user_id, table.stripe_customer_id],
        name: "subscriptions_user_id_stripe_customer_id_pk",
      }),
      subscriptions_user_id_unique: unique("subscriptions_user_id_unique").on(
        table.user_id,
      ),
      subscriptions_stripe_customer_id_unique: unique(
        "subscriptions_stripe_customer_id_unique",
      ).on(table.stripe_customer_id),
      subscriptions_stripe_subscription_id_unique: unique(
        "subscriptions_stripe_subscription_id_unique",
      ).on(table.stripe_subscription_id),
    };
  },
);

export const account = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => {
    return {
      account_provider_providerAccountId_pk: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId_pk",
      }),
    };
  },
);

import { relations } from "drizzle-orm/relations";
import {
  user,
  session,
  orders,
  passengers,
  segments,
  subscriptions,
  account,
} from "./schema";

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  orders: many(orders),
  subscriptions: many(subscriptions),
  accounts: many(account),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(user, {
    fields: [orders.user_id],
    references: [user.id],
  }),
  passengers: many(passengers),
  segments: many(segments),
}));

export const passengersRelations = relations(passengers, ({ one }) => ({
  order: one(orders, {
    fields: [passengers.order_id],
    references: [orders.id],
  }),
}));

export const segmentsRelations = relations(segments, ({ one }) => ({
  order: one(orders, {
    fields: [segments.order_id],
    references: [orders.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(user, {
    fields: [subscriptions.user_id],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

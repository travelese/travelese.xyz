import { relations } from "drizzle-orm/relations";
import {
  user,
  session,
  subscriptions,
  orders,
  travel_agents,
  segments,
  travellers,
  travel_agencies,
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
  subscriptions: many(subscriptions),
  orders: many(orders),
  travellers: many(travellers),
  travel_agents: many(travel_agents),
  accounts: many(account),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(user, {
    fields: [subscriptions.user_id],
    references: [user.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(user, {
    fields: [orders.user_id],
    references: [user.id],
  }),
  travel_agent: one(travel_agents, {
    fields: [orders.travel_agent_id],
    references: [travel_agents.id],
  }),
  segments: many(segments),
}));

export const travel_agentsRelations = relations(
  travel_agents,
  ({ one, many }) => ({
    orders: many(orders),
    user: one(user, {
      fields: [travel_agents.user_id],
      references: [user.id],
    }),
    travel_agency: one(travel_agencies, {
      fields: [travel_agents.agency_id],
      references: [travel_agencies.id],
    }),
  }),
);

export const segmentsRelations = relations(segments, ({ one }) => ({
  order: one(orders, {
    fields: [segments.order_id],
    references: [orders.id],
  }),
}));

export const travellersRelations = relations(travellers, ({ one }) => ({
  user: one(user, {
    fields: [travellers.user_id],
    references: [user.id],
  }),
}));

export const travel_agenciesRelations = relations(
  travel_agencies,
  ({ many }) => ({
    travel_agents: many(travel_agents),
  }),
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
  features: Array<string>;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "Travelese Pro",
    name: "Pro",
    description: "Travelese Pro offers x, y, and z features.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    price: 1000,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "Travelese Biz",
    name: "Biz",
    description: "Travelese Biz offers x, y, and z features.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BIZ_PRICE_ID ?? "",
    price: 3000,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
];

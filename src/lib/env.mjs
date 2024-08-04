import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import  "dotenv/config";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    POSTGRES_URL: z.string().min(1),
    POSTGRES_URL_NON_POOLING: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    DUFFEL_ABS_ACCESS_TOKEN: z.string().min(1),
    DUFFEL_ABS_WEBHOOK_SECRET: z.string().min(1),
    DUFFEL_ACCESS_TOKEN: z.string().min(1),
    DUFFEL_TRAVELESE_ACCESS_TOKEN: z.string().min(1),
    DUFFEL_TRAVELESE_WEBHOOK_SECRET: z.string().min(1),
    DUFFEL_TRAVELESE_PRO_ACCESS_TOKEN: z.string().min(1),
    DUFFEL_TRAVELESE_PRO_WEBHOOK_SECRET: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    ANTHROPIC_API_KEY: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRO_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BIZ_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRO_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    NEXT_PUBLIC_STRIPE_BIZ_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_BIZ_PRICE_ID,
  },
});

import { createClerkClient } from "@clerk/nextjs/server";
import { env } from "@/lib/env.mjs";

export const clerk = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY,
});

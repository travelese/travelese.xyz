import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";
import { env } from "@/lib/env.mjs";

const connectionString = env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    "Database connection string is not set. Please check your environment variables.",
  );
}

export const db = drizzle(sql, { schema });

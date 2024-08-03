import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const limit = Number(searchParams.get("limit") || "10");
  const offset = Number(searchParams.get("offset") || "0");

  const results = await db.select().from(users).limit(limit).offset(offset);

  return Response.json(results);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await db.insert(users).values(body).returning();

  return Response.json(result[0]);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const result = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, id))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(result[0]);
}

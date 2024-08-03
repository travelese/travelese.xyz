import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  await db
    .update(users)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return new NextResponse("Profile updated", { status: 200 });
}

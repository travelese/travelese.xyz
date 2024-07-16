import { db } from "@/lib/db/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
    signIn: async (params) => {
      console.log(`User signed in: ${params.user.id}`);
      if (params.user) {
        await syncUserOrders(params.user.id);
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/sign-in");
};

async function syncUserOrders(userId: string) {
  console.log(`Attempting to sync orders for user ${userId}`);
  try {
    const baseUrl = env.NEXTAUTH_URL || "http://localhost:3000";
    console.log(`Using base URL: ${baseUrl}`);
    const response = await fetch(`${baseUrl}/api/webhooks/duffel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    console.log(`Sync request status: ${response.status}`);
    if (!response.ok) {
      throw new Error("Failed to sync user orders");
    }
    console.log("User orders synced successfully");
  } catch (error) {
    console.error("Error syncing user orders:", error);
  }
}

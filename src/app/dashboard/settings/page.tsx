import * as React from "react";
import UserSettings from "./UserSettings";
import PlanSettings from "./PlanSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";

export default async function Settings() {
  await checkAuth();
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-8 border">
      <div className="space-y-4">
        <PlanSettings subscriptionPlan={subscriptionPlan} session={session} />
        <UserSettings session={session} />
      </div>
    </main>
  );
}

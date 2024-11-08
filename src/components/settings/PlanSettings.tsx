"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";

interface PlanSettingsProps {
  stripeSubscriptionId: string | null;
  stripeCurrentPeriodEnd: Date | null;
  stripeCustomerId: string | null;
  isSubscribed: boolean | "" | null;
  isCanceled: boolean;
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  stripePriceId?: string | undefined;
  price?: number | undefined;
}

export default function PlanSettings({
  subscriptionPlan,
  user,
}: {
  subscriptionPlan: PlanSettingsProps;
  user: User | null | undefined;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Plan</CardTitle>
        <CardDescription>
          {subscriptionPlan.isSubscribed
            ? `You are currently on the ${subscriptionPlan.name} plan.`
            : `You are not subscribed to any plan.`.concat(
                !user?.primaryEmailAddress?.emailAddress
                  ? " Please add your email to upgrade your account."
                  : "",
              )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subscriptionPlan.isSubscribed && (
          <h3 className="font-semibold text-lg">
            ${subscriptionPlan.price ? subscriptionPlan.price / 100 : 0} / month
          </h3>
        )}
        {subscriptionPlan.stripeCurrentPeriodEnd && (
          <p className="text-sm mb-4 text-muted-foreground ">
            Your plan will{" "}
            {!subscriptionPlan.isSubscribed
              ? null
              : subscriptionPlan.isCanceled
                ? "cancel"
                : "renew"}
            {" on "}
            <span className="font-semibold">
              {subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString(
                "en-us",
              )}
            </span>
          </p>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Manage your subscription on Stripe.
        </p>
        <Link href="settings/billing">
          <Button variant="outline">Go to billing</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

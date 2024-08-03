import * as React from "react";
import { ManageUserSubscriptionButton } from "@/components/settings/ManageSubscription";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { storeSubscriptionPlans } from "@/config/subscriptions";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Billing() {
  const { userId } = auth();
  const user = await currentUser();
  const subscriptionPlan = await getUserSubscriptionPlan();

  if (!userId || !user) {
    return <div>Not authenticated</div>;
  }

  return (
    <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-8 border">
      <div className="min-h-[calc(100vh-57px)] ">
        <Card className="p-6 mb-2">
          <h3 className="uppercase text-xs font-bold text-muted-foreground">
            Subscription Details
          </h3>
          <p className="text-lg font-semibold leading-none my-2">
            {subscriptionPlan?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {!subscriptionPlan?.isSubscribed
              ? "You are not subscribed to any plan."
              : subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
            {subscriptionPlan?.stripeCurrentPeriodEnd
              ? subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString()
              : null}
          </p>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {storeSubscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={
                plan.name === subscriptionPlan?.name ? "border-primary" : ""
              }
            >
              {plan.name === subscriptionPlan?.name ? (
                <div className="w-full relative">
                  <div className="text-center px-3 py-1 bg-secondary-foreground text-secondary text-xs  w-fit rounded-l-lg rounded-t-none absolute right-0 font-semibold">
                    Current Plan
                  </div>
                </div>
              ) : null}
              <CardHeader className="mt-2">
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 mb-8">
                  <h3 className="font-bold">
                    <span className="text-3xl">${plan.price / 100}</span> /
                    month
                  </h3>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={`feature_${i + 1}`}
                      className="flex gap-x-2 text-sm"
                    >
                      <CheckCircle2Icon className="h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-end justify-center">
                {user.emailAddresses[0]?.emailAddress ? (
                  <ManageUserSubscriptionButton
                    userId={userId}
                    email={user.emailAddresses[0].emailAddress}
                    stripePriceId={plan.stripePriceId}
                    stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                    isSubscribed={!!subscriptionPlan?.isSubscribed}
                    isCurrentPlan={subscriptionPlan?.name === plan.name}
                  />
                ) : (
                  <div>
                    <Link href="/account">
                      <Button className="text-center" variant="ghost">
                        Add Email to Subscribe
                      </Button>
                    </Link>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

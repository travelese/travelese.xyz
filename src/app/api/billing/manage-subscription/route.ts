import { stripe } from "@/lib/stripe/index";

interface ManageStripeSubscriptionActionProps {
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  isCurrentPlan: boolean;
  stripePriceId: string;
  email: string;
  userId: string;
}

export async function POST(request: Request) {
  const body: ManageStripeSubscriptionActionProps = await request.json();
  const { isSubscribed, stripeCustomerId, userId, stripePriceId, email } = body;
  console.log(body);
  const billingUrl = new URL(request.url).origin.concat("/billing");

  if (isSubscribed && stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: billingUrl,
    });

    return new Response(JSON.stringify({ url: stripeSession.url }), {
      status: 200,
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl.concat("?success=true"),
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
  });

  return new Response(JSON.stringify({ url: stripeSession.url }), {
    status: 200,
  });
}

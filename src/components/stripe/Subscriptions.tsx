import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

export default function Subscriptions() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
      <Card className="bg-background rounded-xl shadow-lg overflow-hidden relative">
        <CardHeader className="bg-primary text-primary-foreground px-6 py-4">
          <h3 className="text-2xl font-bold">Free</h3>
          <p className="text-sm">Get started with Travelese</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-primary" />
            <span>Up to 3 trips per month</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-primary" />
            <span>Basic trip planning</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-primary" />
            <span>Travel guides</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-primary" />
            <span>24/7 support</span>
          </div>
          <div className="text-4xl font-bold">$0</div>
          <Button size="lg" className="w-full">
            Get Started
          </Button>
        </CardContent>
        <div className="absolute inset-0 rounded-xl" />
      </Card>
      <Card className="bg-background rounded-xl shadow-lg overflow-hidden relative">
        <CardHeader className="bg-secondary text-secondary-foreground px-6 py-4">
          <h3 className="text-2xl font-bold">Pro</h3>
          <p className="text-sm">Unlock more features</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-secondary" />
            <span>Unlimited trips</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-secondary" />
            <span>Advanced trip planning</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-secondary" />
            <span>Personalized recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-secondary" />
            <span>Priority support</span>
          </div>
          <div className="text-4xl font-bold">$9/mo</div>
          <Button size="lg" className="w-full">
            Upgrade to Pro
          </Button>
        </CardContent>
        <div className="absolute inset-0 rounded-xl" />
      </Card>
      <Card className="bg-background rounded-xl shadow-lg overflow-hidden relative">
        <CardHeader className="bg-muted text-muted-foreground px-6 py-4">
          <h3 className="text-2xl font-bold">Biz</h3>
          <p className="text-sm">For teams and enterprises</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-muted" />
            <span>Unlimited trips</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-muted" />
            <span>Advanced trip planning</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-muted" />
            <span>Personalized recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-muted" />
            <span>Dedicated account manager</span>
          </div>
          <div className="text-4xl font-bold">$49/mo</div>
          <Button size="lg" className="w-full">
            Contact Sales
          </Button>
        </CardContent>
        <div className="absolute inset-0 rounded-xl" />
      </Card>
    </section>
  );
}

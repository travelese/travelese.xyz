"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Order } from "@duffel/api/types";
import { Skeleton } from "@/components/ui/skeleton";
import FlyPriceCard from "@/components/travel/fly/FlyPriceCard";

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("id");
    if (orderId) {
      fetch(`/api/travel/fly/confirmation?id=${orderId}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data: Order) => {
          setOrder(data);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setLoading(false));
    } else {
      setError("No Order ID provided");
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <main className="grid flex-1 items-start gap-8 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 p-6 md:p-10 border">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
        <Skeleton className="h-[300px] w-full" />
      </main>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!order) {
    return <div className="text-center p-4">No order found</div>;
  }

  return (
    <main className="grid flex-1 items-start gap-8 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 p-6 md:p-10 border">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <h1 className="text-2xl font-bold">Booking Confirmation</h1>
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold">Booking Reference</h2>
            <p>{order.booking_reference}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Passenger Details</h2>
            {order.passengers.map((passenger) => (
              <div key={passenger.id}>
                <p>
                  {passenger.title} {passenger.given_name}{" "}
                  {passenger.family_name}
                </p>
                <p>{passenger.email}</p>
              </div>
            ))}
          </div>
          {/* Add more order details as needed */}
        </div>
      </div>
      {order && <FlyPriceCard selectedOffer={order} />}
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FlyBookForm from "@/components/travel/fly/FlyBookForm";
import FlyCard from "@/components/travel/fly/FlyCard";
import FlyPriceCard from "@/components/travel/fly/FlyPriceCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Offer } from "@duffel/api/types";

export default function FlyBookPage() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const offerId = searchParams.get("id");
    console.log("Offer ID from URL:", offerId);
    if (offerId) {
      setLoading(true);
      fetch(`/api/travel/fly/book?id=${offerId}`)
        .then((res) => {
          console.log("API response status:", res.status);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data: Offer) => {
          console.log("Fetched offer data:", data);
          setSelectedOffer(data);
        })
        .catch((error) => {
          console.error("Error fetching offer:", error);
          setError(error.message);
        })
        .finally(() => setLoading(false));
    } else {
      console.log("No offer ID provided");
      setError("No Offer ID provided");
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

  return (
    <main className="grid flex-1 items-start gap-8 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 p-6 md:p-10 border">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-6">
          {selectedOffer && <FlyCard offer={selectedOffer} />}
          {selectedOffer && <FlyBookForm selectedOffer={selectedOffer} />}
        </div>
      </div>
      {selectedOffer && <FlyPriceCard selectedOffer={selectedOffer} />}
    </main>
  );
}

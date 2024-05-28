"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FlightBookForm from "@/components/fly/flight-book-form";
import FlightCard from "@/components/fly/flight-card";
import FlightPrice from "@/components/fly/flight-price-card";
import { Offer } from "@/types/api";

const FlightBook = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const flightId = searchParams.get("id");
    console.log("Flight ID from searchParams:", flightId);
    if (flightId) {
      fetch(`/api/fly/book?id=${flightId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Response from /api/fly/book:", data);
          if (data) {
            setSelectedOffer(data);
          } else {
            console.error("Flight data not found");
          }
        })
        .catch((error) => console.error("Error fetching flight:", error));
    }
  }, [searchParams]);

  return (
    <main className="grid flex-1 items-start gap-8 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 p-6 md:p-10 border">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-6">
          {selectedOffer && <FlightCard offer={selectedOffer} />}
          {selectedOffer && <FlightBookForm selectedOffer={selectedOffer} />}
        </div>
      </div>
      <FlightPrice />
    </main>
  );
};

export default FlightBook;

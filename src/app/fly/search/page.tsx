"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ListOrderedIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/fly/flight-skeleton";
import Filters from "@/components/fly/filters";
import FlightCard from "@/components/fly/flight-card";
import useNavigation from "@/hooks/navigation"; 
import { Offer } from "@/types/api";

const FlightSearch = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const searchParams = useSearchParams();
  const { navigateToBookPage } = useNavigation(); 

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/api/fly/search?" + searchParams.toString()
        );
        const data = await response.json();

        if (!data.offers) {
          throw new Error("No offers found");
        }

        setOffers(data.offers);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
          console.error("Error fetching flight offers:", error.message);
        } else {
          console.error("An unknown error occurred.");
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [searchParams]);

  if (loading) {
    const skeletonCount = 4;
    return (
      <div className="grid grid-cols-[240px_1fr] gap-8 min-h-screen p-6 md:p-10 border">
        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-10 w-72" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          <div className="grid gap-4">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <main className="grid grid-cols-[240px_1fr] gap-8 min-h-screen p-6 md:p-10 border">
      <div className="space-y-6">
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <Filters />
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Flight Search Results</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                  <ListOrderedIcon className="w-4 h-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value="price">
                  <DropdownMenuRadioItem value="price">
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">
                    Price: High to Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="duration">
                    Duration
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="stops">
                    Stops
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4">
          {offers.map((offer) => (
            <FlightCard
              key={offer.id}
              offer={offer}
              onSelect={() => navigateToBookPage(offer.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FlightSearch;

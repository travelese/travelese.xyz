"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { ListOrderedIcon } from "lucide-react";

import FlySearchFilters from "@/components//travel/fly/FlySearchFilters";
import FlyCard from "@/components/travel/fly/FlyCard";
import { FlySkeleton } from "@/components/travel/fly/FlySkeleton";
import useNavigation from "@/hooks/useNavigation";
import type { Offer } from "@duffel/api/types";

type SortValues = "total_amount" | "total_duration";

export default function FlySearchResults() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const { navigateToBookPage } = useNavigation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const sortBy = (searchParams.get("sortBy") as SortValues) || "total_amount";
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const currency =
    (searchParams.get("currency") as "CAD" | "USD" | "EUR") || "USD";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const setSortBy = (value: SortValues) => {
    const current = new URLSearchParams(searchParams);
    current.set("sortBy", value);
    router.push(`?${current.toString()}`);
  };

  const setPage = (page: number) => {
    const current = new URLSearchParams(searchParams);
    current.set("page", page.toString());
    router.push(`?${current.toString()}`);
  };

  useEffect(() => {
    if (limit < 1) {
      setError(new Error("Limit must be at least 1"));
      return;
    }

    const fetchOffers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams);

        params.set("limit", limit.toString());
        params.set("currency", currency);

        const response = await fetch(
          `/api/travel/fly/search?${params?.toString()}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }

        const data: Offer[] = (await response.json()) as Offer[];
        console.log("fetchOffers API response:", data);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No offers found");
        }

        setOffers(data);
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

    void fetchOffers();
  }, [searchParams, limit, currency]);

  if (loading) {
    const skeletonCount = limit < 10 ? limit : 10;
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
              <FlySkeleton key={index} />
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
          <FlySearchFilters />
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Flight Search Results</h1>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ListOrderedIcon className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total_amount">Total Amount</SelectItem>
                <SelectItem value="total_duration">Total Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4">
          {offers.map((offer) => (
            <FlyCard
              key={offer.id}
              offer={offer}
              onSelect={() => navigateToBookPage(offer.id)}
            />
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <Button
            type="submit"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="px-4 py-2"
          >
            Previous
          </Button>
          <Button
            type="submit"
            onClick={() => setPage(currentPage + 1)}
            className="px-4 py-2"
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}

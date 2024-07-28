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

import SearchFilters from "@/components/travel/SearchFilters";
import FlyCard from "@/components/travel/fly/FlyCard";
import StayCard from "@/components/travel/stay/StayCard";
import SearchSkeleton from "@/components/travel/SearchSkeleton";
import useNavigation from "@/hooks/useNavigation";
import type { Offer, StaysSearchResult } from "@duffel/api/types";
import { toast } from "sonner";
import Loading from "@/app/loading";

type FlySortValues = "total_amount" | "total_duration";
type StaySortValues = "price" | "rating";
type SortValues = FlySortValues | StaySortValues;

export default function SearchResults() {
  const [results, setResults] = useState<Offer[] | StaysSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const { navigateToBookPage } = useNavigation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchType = (searchParams.get("type") as "fly" | "stay") || "fly";

  const sortBy =
    (searchParams.get("sortBy") as SortValues) ||
    (searchType === "fly" ? "total_amount" : "price");
  const limit = parseInt(searchParams.get("limit") || "10", 10);
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

  const handleSelect = (result: Offer | StaysSearchResult) => {
    if ("slices" in result) {
      navigateToBookPage(result);
    } else {
      console.log("Navigate to stay booking page");
    }
  };

  useEffect(() => {
    if (limit < 1) {
      setError(new Error("Limit must be at least 1"));
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams);
        params.set("limit", limit.toString());

        if (searchType === "fly") {
          params.set("limit", limit.toString());
        } else {
          params.delete("limit");
        }

        const endpoint =
          searchType === "fly"
            ? "/api/travel/fly/search"
            : "/api/travel/stay/search";
        const response = await fetch(`${endpoint}?${params?.toString()}`);

        if (!response.ok) {
          console.error("Failed to fetch stay results:", response.statusText);
          throw new Error(`Failed to fetch ${searchType} results`);
        }

        const data = await response.json();
        console.log("Received stay search results:", data);
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error(`No ${searchType} results found`);
        }

        setResults(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
          console.error(`Error fetching ${searchType} results:`, error.message);
        } else {
          console.error("An unknown error occurred.");
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchResults();
  }, [searchParams, limit, searchType]);

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
              <SearchSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error(
      <div className="flex items-center gap-2">
        <Loading />
        <span>{error.message}</span>
      </div>,
    );
  }

  return (
    <main className="grid grid-cols-[240px_1fr] gap-8 min-h-screen p-6 md:p-10 border">
      <div className="space-y-6">
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <SearchFilters />
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ListOrderedIcon className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {searchType === "fly" ? (
                  <>
                    <SelectItem value="total_amount">Total Amount</SelectItem>
                    <SelectItem value="total_duration">
                      Total Duration
                    </SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4">
          {results.map((result) =>
            searchType === "fly" ? (
              <FlyCard
                key={result.id}
                offer={result as Offer}
                onSelect={() => handleSelect(result)}
              />
            ) : (
              <StayCard
                key={result.id}
                stay={result as StaysSearchResult}
                onSelect={() => handleSelect(result)}
              />
            ),
          )}
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

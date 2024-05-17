// File: /src/app/flight/page.tsx
// Description: This file contains the flight search results page.
"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilterIcon, ListOrderedIcon } from "lucide-react";
import { getFlightData, applyFilters, applySorting } from "@/lib/utils";
import Filters from "@/components/flight/filters";
import FlightCard from "@/components/flight/flight-card";
import { Offer, Slice, Segment } from "@/types/api";

const FlightSearchResults = ({ searchParams }: { searchParams: any }) => {
  const [flights, setFlights] = useState<Offer[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("price");
  const [filterCriteria, setFilterCriteria] = useState<any>({
    departureTimes: new Set<string>(),
    arrivalTimes: new Set<string>(),
    stops: new Set<string>(),
    priceRange: [0, Infinity],
    options: new Set<string>(),
  });

  useEffect(() => {
    const fetchFlights = async () => {
      const data = await getFlightData(searchParams);
      setFlights(data);
    };

    fetchFlights();
  }, [searchParams]);

  const sortedFilteredFlights = applySorting(
    applyFilters(flights, filterCriteria),
    sortCriteria
  );

  const handleFilterChange = (
    filterType: keyof typeof filterCriteria,
    value: string
  ) => {
    setFilterCriteria((prev: any) => {
      const newSet = new Set(prev[filterType]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);

      return { ...prev, [filterType]: newSet };
    });
  };

  return (
    <div className="min-h-screen p-6 md:p-10 border">
      <div className="flex items-center justify-between mb-6">
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
              <DropdownMenuRadioGroup
                value={sortCriteria}
                onValueChange={(value) => setSortCriteria(value)}
              >
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
          <Button className="flex items-center gap-2" variant="outline">
            <FilterIcon className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[240px_1fr] gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Filters</h2>
          <Filters
            filterCriteria={filterCriteria}
            handleFilterChange={handleFilterChange}
            setFilterCriteria={setFilterCriteria}
          />
        </div>
        <div className="space-y-6">
          {sortedFilteredFlights.length > 0 ? (
            sortedFilteredFlights.map((flight: Offer) => (
              <FlightCard key={flight.id} flight={flight} />
            ))
          ) : (
            <p>No flights found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResults;

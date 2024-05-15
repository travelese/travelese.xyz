"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon, FilterIcon, ListOrderedIcon } from "lucide-react";
import FlightDetails from "@/components/flight-details";
import { parseFlightSearchResponse } from "@/lib/utils";
import {
  FlightSearchRequestBody,
  ComponentFlight as Flight,
} from "@/types/api";

interface FlightSearchResultsProps {
  flightSearch: FlightSearchRequestBody;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({
  flightSearch,
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("price");
  const [filterCriteria, setFilterCriteria] = useState({
    departureTimes: new Set<string>(),
    arrivalTimes: new Set<string>(),
    stops: new Set<string>(),
    priceRange: [0, Infinity],
    options: new Set<string>()
  });

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("/api/flights/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: flightSearch }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const parsedFlights = parseFlightSearchResponse(data);
        setFlights(parsedFlights);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (flightSearch) {
      fetchFlights();
    }
  }, [flightSearch]);

  // Function to apply sorting
  const applySorting = (flights: Flight[]) => {
    switch (sortCriteria) {
      case "price":
        return flights.sort((a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount));
      case "price-desc":
        return flights.sort((a, b) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount));
      case "duration":
        return flights.sort((a, b) => 
          a.slices.reduce((total, s) => total + parseDuration(s.duration), 0) - 
          b.slices.reduce((total, s) => total + parseDuration(s.duration), 0)
        );
      case "stops":
        return flights.sort((a, b) => 
          a.slices.reduce((total, s) => total + s.segments.length, 0) -
          b.slices.reduce((total, s) => total + s.segments.length, 0)
        );
      default:
        return flights;
    }
  };

  // Function to parse duration from ISO 8601 to minutes
  const parseDuration = (isoDuration: string) => {
    const matches = isoDuration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/);
    return (parseInt(matches[1] || "0") * 24 * 60 + parseInt(matches[2] || "0") * 60 + parseInt(matches[3] || "0"));
  };

  // Function to apply filters
  const applyFilters = (flights: Flight[]) => {
    return flights.filter(flight => {
      const meetsPriceCriteria =
        parseFloat(flight.totalAmount) >= filterCriteria.priceRange[0] &&
        parseFloat(flight.totalAmount) <= filterCriteria.priceRange[1];
      // Add logic for other filters here
      return meetsPriceCriteria;
    });
  };

  const sortedFilteredFlights = applySorting(applyFilters(flights));

  // Function to handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilterCriteria((prev) => {
      const newSet = new Set(prev[filterType]);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { ...prev, [filterType]: newSet };
    });
  };

  // Add handlers for price range change, options

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
          <Accordion collapsible type="single">
            <AccordionItem value="departure">
              <AccordionTrigger className="text-base font-medium">
                Departure Time
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="departure-anytime"
                      checked={filterCriteria.departureTimes.has("Anytime")}
                      onChange={() => handleFilterChange("departureTimes", "Anytime")}
                    />
                    Anytime
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="departure-morning"
                      checked={filterCriteria.departureTimes.has("Morning")}
                      onChange={() => handleFilterChange("departureTimes", "Morning")}
                    />
                    Morning (6am - 12pm)
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="departure-afternoon"
                      checked={filterCriteria.departureTimes.has("Afternoon")}
                      onChange={() => handleFilterChange("departureTimes", "Afternoon")}
                    />
                    Afternoon (12pm - 6pm)
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="departure-evening"
                      checked={filterCriteria.departureTimes.has("Evening")}
                      onChange={() => handleFilterChange("departureTimes", "Evening")}
                    />
                    Evening (6pm - 12am)
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="arrival">
              <AccordionTrigger className="text-base font-medium">
                Arrival Time
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="arrival-anytime"
                      checked={filterCriteria.arrivalTimes.has("Anytime")}
                      onChange={() => handleFilterChange("arrivalTimes", "Anytime")}
                    />
                    Anytime
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="arrival-morning"
                      checked={filterCriteria.arrivalTimes.has("Morning")}
                      onChange={() => handleFilterChange("arrivalTimes", "Morning")}
                    />
                    Morning (6am - 12pm)
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="arrival-afternoon"
                      checked={filterCriteria.arrivalTimes.has("Afternoon")}
                      onChange={() => handleFilterChange("arrivalTimes", "Afternoon")}
                    />
                    Afternoon (12pm - 6pm)
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="arrival-evening"
                      checked={filterCriteria.arrivalTimes.has("Evening")}
                      onChange={() => handleFilterChange("arrivalTimes", "Evening")}
                    />
                    Evening (6pm - 12am)
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="stops">
              <AccordionTrigger className="text-base font-medium">
                Stops
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="stops-direct"
                      checked={filterCriteria.stops.has("Direct")}
                      onChange={() => handleFilterChange("stops", "Direct")}
                    />
                    Direct
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="stops-1"
                      checked={filterCriteria.stops.has("1")}
                      onChange={() => handleFilterChange("stops", "1")}
                    /> 1 Stop
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="stops-2"
                      checked={filterCriteria.stops.has("2")}
                      onChange={() => handleFilterChange("stops", "2")}
                    /> 2 Stops
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="stops-3"
                      checked={filterCriteria.stops.has("3")}
                      onChange={() => handleFilterChange("stops", "3")}
                    />
                    3+ Stops
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="price">
              <AccordionTrigger className="text-base font-medium">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span>$66</span>
                    <span>$66666</span>
                  </div>
                  <Slider
                    defaultValue={[666, 666666]}
                    max={666666}
                    min={666}
                    step={666}
                    value={filterCriteria.priceRange}
                    onValueChange={(range) => setFilterCriteria(prev => ({ ...prev, priceRange: range }))}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="options">
              <AccordionTrigger className="text-base font-medium">
                Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="option-roundtrip"
                      checked={filterCriteria.options.has("Roundtrip")}
                      onChange={() => handleFilterChange("options", "Roundtrip")}
                    />
                    Roundtrip
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="option-flexible"
                      checked={filterCriteria.options.has("Flexible")}
                      onChange={() => handleFilterChange("options", "Flexible")}
                    />
                    Flexible Dates
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      id="option-refundable"
                      checked={filterCriteria.options.has("Refundable")}
                      onChange={() => handleFilterChange("options", "Refundable")}
                    />
                    Refundable
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="space-y-6">
          {sortedFilteredFlights.length > 0 ? (
            sortedFilteredFlights.map((flight) => (
              <Dialog key={flight.id}>
                <DialogTrigger asChild>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {flight.slices[0].segments[0].origin} to{" "}
                        {flight.slices[0].segments[0].destination}
                      </CardTitle>
                      <CardDescription>
                        {flight.slices.length === 1 &&
                        flight.slices[0].segments.length === 1
                          ? "Direct"
                          : `${flight.slices
                              .map((s) => s.segments.length - 1)
                              .reduce((sum, stops) => sum + stops, 0)} Stop(s)`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>
                          {new Date(
                            flight.slices[0].segments[0].departingAt
                          ).toLocaleString()}
                        </div>
                        <div>
                          {new Date(
                            flight.slices[0].segments[0].arrivingAt
                          ).toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center justify-between w-full">
                        <div className="text-lg font-bold">
                          Total: {flight.totalAmount} {flight.totalCurrency}
                        </div>
                        <Button variant="outline">Book</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <Card>
                      <CardHeader>
                        <CardTitle>Flight Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FlightDetails flight={flight} />
                      </CardContent>
                      <CardFooter>
                        <div className="flex items-center justify-between w-full">
                          <div className="text-lg font-bold">
                            Total: {flight.totalAmount} {flight.totalCurrency}
                          </div>
                          <Button variant="outline">Book Now</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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

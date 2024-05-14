"use client";

import React, { useEffect, useState } from "react";

import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  DialogTrigger,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListOrderedIcon, FilterIcon, ArrowRightIcon } from "lucide-react";
import FlightSearchForm from "@/components/flight-search-form";

export default function FlightSearchResults({ flightSearch }: { flightSearch: any }) {
  const [flights, setFlights] = useState(flightSearch);

 interface Segment {
   departure_date: string;
   departure_time: string;
   arrival_date: string;
   arrival_time: string;
   origin: string;
   destination: string;
 }

 interface Slice {
   duration: string;
   segments: Segment[];
 }

 interface Passenger {
   id: string;
   type: string;
 }

 interface Flight {
   id: string;
   type: string;
   total_amount: string;
   total_taxes: string;
   currency: string;
   passengers: Passenger[];
   slices: Slice[];
 }

  useEffect(() => {
    fetch("/api/flights/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: flightSearch,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error:", error));
  }, [flightSearch]);

  return (
    <div>
      {/* <div className="w-full max-w-5xl mx-auto">
        <FlightSearchForm  />
      </div> */}
      <div>
        <div className="grid grid-cols-[240px_1fr] gap-8 min-h-screen p-6 md:p-10 border">
          <div className="space-y-6">
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Accordion collapsible type="single">
                <AccordionItem value="departure">
                  <AccordionTrigger className="text-base font-medium">
                    Departure Time
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="departure-anytime" />
                        Anytime
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="departure-morning" />
                        Morning (6am - 12pm)
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="departure-afternoon" />
                        Afternoon (12pm - 6pm)
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="departure-evening" />
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
                        <Checkbox id="arrival-anytime" />
                        Anytime
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="arrival-morning" />
                        Morning (6am - 12pm)
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="arrival-afternoon" />
                        Afternoon (12pm - 6pm)
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="arrival-evening" />
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
                        <Checkbox id="stops-direct" />
                        Direct
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="stops-1" />1 Stop
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="stops-2" />2 Stops
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="stops-3" />
                        3+ Stops
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base">
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
                        <Checkbox id="option-roundtrip" />
                        Roundtrip
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="option-flexible" />
                        Flexible Dates
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="option-refundable" />
                        Refundable
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Flight Search Results</h1>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="flex items-center gap-2"
                      variant="outline"
                    >
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
                <Button className="flex items-center gap-2" variant="outline">
                  <FilterIcon className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {flights && flights.map((flight: Flight) => (
                <Dialog key={flight.id}>
                  <DialogTrigger asChild>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {flight.slices[0].segments[0].origin} to{" "}
                          {flight.slices[0].segments[0].destination}
                        </CardTitle>
                        <CardDescription>
                          {flight.slices[0].segments.length} Stop
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div>
                            {flight.slices[0].segments[0].departure_date} -{" "}
                            {flight.slices[0].segments[0].departure_time}
                          </div>
                          <div>
                            {flight.slices[0].segments[0].arrival_date} -{" "}
                            {flight.slices[0].segments[0].arrival_time}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex items-center justify-between w-full">
                          <div className="text-lg font-bold">
                            Total: {flight.total_amount}
                          </div>
                          <Button>Book</Button>
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
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-lg font-bold">Departure</h3>
                              <div className="flex items-center gap-2">
                                <div className="text-lg font-bold">
                                  {flight.slices[0].segments[0].origin}
                                </div>
                                <ArrowRightIcon className="w-4 h-4" />
                                <div className="text-lg font-bold">
                                  {flight.slices[0].segments[0].destination}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                {flight.slices[0].segments[0].departure_date}
                              </div>
                              <div className="text-sm text-gray-500">
                                {flight.slices[0].segments.length}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">Return</h3>
                              <div className="flex items-center gap-2">
                                <div className="text-lg font-bold">
                                  {flight.slices[1]?.segments[0].origin}
                                </div>
                                <ArrowRightIcon className="w-4 h-4" />
                                <div className="text-lg font-bold">
                                  {flight.slices[1]?.segments[0].destination}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                {flight.slices[1]?.segments[0].departure_date}
                              </div>
                              <div className="text-sm text-gray-500">
                                {flight.slices[1]?.segments.length}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="flex items-center justify-between w-full">
                            <div className="text-lg font-bold">
                              Total: {flight.total_amount}
                            </div>
                            <Button>Book Now</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
              <Dialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

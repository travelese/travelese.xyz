"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDaysIcon,
  InfoIcon,
  MapPinIcon,
  PlaneIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  WifiIcon,
} from "lucide-react";

import { Seat } from "@kiwicom/orbit-components/icons";

import type { OfferSliceSegment } from "@duffel/api/booking/Offers/OfferTypes";

const formatDuration = (isoDuration: string | undefined): string => {
  if (!isoDuration) return "N/A";

  const matches = isoDuration.match(
    /P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?T(?:([0-9]+)H)?(?:([0-9]+)M)?/,
  );

  if (!matches) return "N/A";

  const hours = matches[4] ? `${matches[4]}h` : "0h";
  const minutes = matches[5] ? `${matches[5]}m` : "0m";

  return `${hours} ${minutes}`;
};

const calculateDayDifference = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays - 1;
};

export default function FlySegment({
  segment,
}: {
  segment: OfferSliceSegment | undefined;
}) {
  if (!segment) return <div>Segment details are unavailable.</div>;

  const {
    aircraft: { name: aircraftName },
    operating_carrier: {
      name: airline,
      logo_symbol_url: airlineLogo,
      iata_code: airlineCode,
    },
    departing_at: departureTime,
    arriving_at: arrivalTime,
    origin: { iata_code: originCode },
    destination: { iata_code: destinationCode },
    duration,
    passengers,
  } = segment;

  const dayDifference = calculateDayDifference(departureTime, arrivalTime);

  return (
    <div className="segment m-2 space-y-4">
      <div className="flex items-center mt-4">
        <PlaneTakeoffIcon className="w-5 h-5" />
        <div className="ml-2 text-sm font-medium">{originCode}</div>
      </div>
      <div className="flex items-center mt-4">
        <PlaneLandingIcon className="w-5 h-5" />
        <div className="ml-2 text-sm font-medium">{destinationCode}</div>
      </div>
      <div className="flex items-center mt-4">
        <MapPinIcon className="w-5 h-5" />
        <div className="ml-2 text-sm font-medium">{airline}</div>
        <Avatar className="ml-2">
          <AvatarImage
            alt={`${airline} Logo`}
            src={airlineLogo || ""}
            style={{ filter: "grayscale(100%)" }}
          />
          <AvatarFallback>{airlineCode}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center mt-4">
        <CalendarDaysIcon className="w-5 h-5" />
        <div className="ml-2 text-sm font-medium">
          {new Date(departureTime).toDateString()}
        </div>
      </div>
      <div className="flex justify-between">
        <time className="text-xl font-bold">
          {new Date(departureTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
        <Badge variant="secondary">
          {formatDuration(duration !== null ? duration : undefined)}
        </Badge>
        <time className="relative text-xl font-bold">
          {new Date(arrivalTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {dayDifference > 0 && <sup>+{dayDifference}</sup>}
        </time>
      </div>
      <div className="space-y-4 my-4 border-t pt-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage
                    alt={`${airline} Logo`}
                    src={airlineLogo || ""}
                    style={{ filter: "grayscale(100%)" }}
                  />
                  <AvatarFallback>{airlineCode}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="text-md font-semibold mt-2">{airline}</h3>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 ml-8 pl-4 border-l-2 border-dashed">
                <div className="connection my-4">
                  <div className="text-sm font-semibold">Connection info</div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <InfoIcon className="h-4 w-4" />
                        <span className="ml-2 text-sm">Flight Number</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {segment.marketing_carrier_flight_number}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <PlaneIcon className="h-4 w-4" />
                        <span className="ml-2 text-sm">Aircraft</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {aircraftName}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ancillary my-4">
                  <div className="text-sm font-semibold">Seating info</div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Seat className="h-4 w-4" />
                        <span className="ml-2 text-sm">Seat pitch</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {passengers[0]?.cabin?.amenities?.seat?.pitch || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Seat className="h-4 w-4" />
                        <span className="ml-2 text-sm">Seat width</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {passengers?.[0]?.cabin?.amenities?.seat?.type || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <WifiIcon className="h-4 w-4" />
                        <span className="ml-2 text-sm">Wi-Fi on board</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {passengers[0]?.cabin?.amenities?.wifi?.available
                          ? "Yes"
                          : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

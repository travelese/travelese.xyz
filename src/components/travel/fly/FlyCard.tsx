"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
} from "@/components/ui/drawer";

import { BackpackIcon, CloudFogIcon } from "lucide-react";

import FlySegment from "@/components/travel/fly/FlySegment";
import type { Offer } from "@duffel/api/types";
import type { OfferSliceSegment } from "@duffel/api/booking/Offers/OfferTypes";

interface FlyCardProps {
  offer: Offer;
  onSelect?: () => void;
}

const formatTime = (dateTime: string | undefined) =>
  dateTime
    ? new Date(dateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

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
  return diffDays - 1; // since arriving on the same day means 0 increment
};

const countBagType = (
  type: "personal_item" | "carry_on" | "checked",
  segments: OfferSliceSegment[] | undefined,
): number => {
  return (
    segments?.reduce((acc, segment) => {
      return (
        acc +
        (segment.passengers?.reduce(
          (acc, passenger) =>
            acc +
            (passenger.baggages?.filter((bag) => bag.type === type).length ||
              0),
          0,
        ) || 0)
      );
    }, 0) || 0
  );
};

export default function FlyCard({ offer, onSelect }: FlyCardProps) {
  if (!offer || !Array.isArray(offer.slices) || offer.slices.length === 0)
    return null;

  const outbound = offer.slices[0];
  const inbound = offer.slices.length > 1 ? offer.slices[1] : null;
  const emission = offer.total_emissions_kg || "N/A";
  const price = offer.total_amount;
  const currency = offer.total_currency;
  const remainingSeats = offer?.available_services?.[0]?.total_amount || 0;

  const personalBags = countBagType("personal_item", outbound!.segments);
  const carryOnBags = countBagType("carry_on", outbound!.segments);
  const checkedBags = countBagType("checked", outbound!.segments);

  const outboundDayDifference = calculateDayDifference(
    outbound!.segments?.[0]?.departing_at || "",
    outbound?.segments?.at(-1)?.arriving_at || "",
  );
  const inboundDayDifference = calculateDayDifference(
    inbound?.segments?.[0]?.departing_at || "",
    inbound?.segments?.at(-1)?.arriving_at || "",
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card>
          <div className="flex w-full items-center justify-between p-6 rounded-lg cursor-pointer">
            <div className="w-2/3 space-y-4 pr-5 border-r border-dashed">
              {/* Outbound Flight Summary */}
              <div>
                <div className="text-sm">Outbound</div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold text-lg">
                    {outbound!.origin.iata_code}
                  </div>
                  <div className="flex-1 border-t" />
                  <div className="text-sm">
                    {outbound!.segments?.length
                      ? outbound!.segments.length - 1
                      : 0}{" "}
                    stop(s)
                  </div>
                  <Avatar>
                    <AvatarImage
                      alt={`${
                        outbound!.segments
                          ? outbound?.segments?.[0]?.operating_carrier.name
                          : ""
                      } Logo`}
                      src={
                        outbound!.segments?.[0]?.operating_carrier
                          .logo_symbol_url || "/placeholder.svg"
                      }
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <AvatarFallback>
                      {outbound!.segments?.[0]?.operating_carrier.iata_code}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 border-t" />
                  <div className="font-bold text-lg">
                    {outbound!.destination.iata_code}
                  </div>
                </div>
                <div className="flex justify-between">
                  <time className="text-2xl font-bold">
                    {formatTime(outbound!.segments?.[0]?.departing_at || "")}
                  </time>
                  <Badge variant="secondary">
                    {formatDuration(
                      outbound?.duration !== null
                        ? outbound?.duration
                        : undefined,
                    )}
                  </Badge>
                  <time className="relative text-2xl font-bold">
                    {formatTime(outbound!.segments?.at(-1)?.arriving_at || "")}
                    {outboundDayDifference > 0 && (
                      <sup>+{outboundDayDifference}</sup>
                    )}
                  </time>
                </div>
              </div>
              {/* Inbound Flight Summary - Only for Round Trip */}
              {inbound && (
                <div>
                  <div className="text-sm">Inbound</div>
                  <div className="flex items-center space-x-2">
                    <div className="font-bold text-lg">
                      {inbound.origin.iata_code}
                    </div>
                    <div className="flex-1 border-t" />
                    <div className="text-sm">
                      {inbound.segments?.length
                        ? inbound.segments.length - 1
                        : 0}{" "}
                      stop(s)
                    </div>
                    <Avatar>
                      <AvatarImage
                        alt={`${
                          inbound.segments
                            ? inbound.segments?.[0]?.operating_carrier.name
                            : ""
                        } Logo`}
                        src={
                          inbound.segments?.[0]?.operating_carrier
                            .logo_symbol_url || "/placeholder.svg"
                        }
                        style={{ filter: "grayscale(100%)" }}
                      />
                      <AvatarFallback>
                        {inbound.segments?.[0]?.operating_carrier.iata_code}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 border-t" />
                    <div className="font-bold text-lg">
                      {inbound.destination.iata_code}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <time className="text-2xl font-bold">
                      {formatTime(inbound.segments?.[0]?.departing_at || "")}
                    </time>
                    <Badge variant="secondary">
                      {formatDuration(
                        inbound?.duration !== null
                          ? inbound?.duration
                          : undefined,
                      )}
                    </Badge>
                    <time className="relative text-2xl font-bold">
                      {formatTime(inbound.segments?.at(-1)?.arriving_at || "")}
                      {inboundDayDifference > 0 && (
                        <sup>+{inboundDayDifference}</sup>
                      )}
                    </time>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-1 mt-4">
                <div className="text-sm mr-3">Included</div>
                {personalBags > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{personalBags}</span>
                    <BackpackIcon className="h-4 w-4" />
                  </div>
                )}
                {carryOnBags > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{carryOnBags}</span>
                    <BackpackIcon className="h-4 w-4" />
                  </div>
                )}
                {checkedBags > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{checkedBags}</span>
                    <BackpackIcon className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="mt-2">
                <Alert>
                  <CloudFogIcon className="h-4 w-4" />
                  <AlertTitle>Emission</AlertTitle>
                  <AlertDescription>
                    {emission} kg CO<sub>2</sub>
                  </AlertDescription>
                </Alert>
              </div>
              <div className="text-sm m-3">
                {remainingSeats} seat(s) left at this price
              </div>
              <div className="text-2xl font-bold">
                {currency} {price}
              </div>
              <Button className="mt-2" variant="outline">
                Lock price for {currency} {(Number(price) * 0.1).toFixed(2)}
              </Button>
              <Button onClick={onSelect} className="mt-2">
                Select
              </Button>
            </div>
          </div>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-full">
        <DrawerHeader>
          <DrawerTitle>Flight Details</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center gap-4 p-4">
          <Card className="w-[500px]">
            <ScrollArea className="h-[500px]">
              <CardHeader className="p-4 border-b">
                <CardTitle>To {outbound!.destination.name}</CardTitle>
                <CardDescription>
                  Details of your outbound flight
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardContent>
                  {outbound?.segments.map((segment, index) => (
                    <FlySegment key={index} segment={segment} />
                  ))}
                </CardContent>
              </CardContent>
              <CardFooter></CardFooter>
            </ScrollArea>
          </Card>
          {inbound && (
            <Card className="w-[500px]">
              <ScrollArea className="h-[500px]">
                <CardHeader className="p-4 border-b">
                  <CardTitle>To {inbound.destination.name}</CardTitle>
                  <CardDescription>
                    Details of your inbound flight
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {inbound.segments.map((segment, index) => (
                    <FlySegment key={index} segment={segment} />
                  ))}
                </CardContent>
                <CardFooter></CardFooter>
              </ScrollArea>
            </Card>
          )}
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// File: /src/components/flight/flight-card.tsx
// Description: This file contains the component for displaying flight card details.

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlaneIcon,
  LuggageIcon,
  TableIcon,
  WifiIcon,
  CalendarDaysIcon,
  RockingChairIcon,
  FileAudioIcon,
  InfoIcon,
  ShareIcon,
  PlaneTakeoffIcon,
  PlaneLandingIcon,
  MapPinIcon,
  HotelIcon,
  BedIcon,
} from "lucide-react";

interface FlightCardProps {
  outbound: {
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    airline: string;
  };
  inbound: {
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    airline: string;
  };
  price: {
    amount: string;
    currency: string;
  };
  remainingSeats: number;
}

const FlightCard: React.FC<FlightCardProps> = ({
  outbound,
  inbound,
  price,
  remainingSeats,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <div className="flex w-full items-center justify-between p-6 rounded-lg cursor-pointer">
            <div className="w-2/3 space-y-4 pr-5 border-r border-dashed">
              <div>
                <div className="text-sm">Outbound</div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold text-lg">
                    {outbound.origin?.iata_code ||
                      outbound.origin?.city_name ||
                      ""}
                  </div>
                  <div className="flex-1 border-t" />
                  <div className="text-sm">{outbound.stops} stop(s)</div>
                  <Avatar>
                    <AvatarImage
                      alt="Airline Logo"
                      src="/placeholder.svg?height=32&width=32"
                    />
                    <AvatarFallback>AF</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 border-t" />
                  <div className="font-bold text-lg">
                    {outbound.destination?.iata_code ||
                      outbound.destination?.city_name ||
                      ""}
                  </div>
                </div>
                <div className="flex justify-between">
                  <time className="text-2xl font-bold">
                    {outbound.departureTime}
                  </time>
                  <Badge variant="secondary">{outbound.duration}</Badge>
                  <time className="text-2xl font-bold">
                    {outbound.arrivalTime}
                  </time>
                </div>
              </div>
              <div>
                <div className="text-sm">Inbound</div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold text-lg">
                    {inbound.origin?.iata_code ||
                      inbound.origin?.city_name ||
                      ""}
                  </div>
                  <div className="flex-1 border-t" />
                  <div className="text-sm">{inbound.stops} stop(s)</div>
                  <Avatar>
                    <AvatarImage
                      alt="Airline Logo"
                      src="/placeholder.svg?height=32&width=32"
                    />
                    <AvatarFallback>AF</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 border-t" />
                  <div className="font-bold text-lg">
                    {inbound.destination?.iata_code ||
                      inbound.destination?.city_name ||
                      ""}
                  </div>
                </div>
                <div className="flex justify-between">
                  <time className="text-2xl font-bold">
                    {inbound.departureTime}
                  </time>
                  <Badge variant="secondary">{inbound.duration}</Badge>
                  <time className="text-2xl font-bold">
                    {inbound.arrivalTime}
                  </time>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <LuggageIcon className="h-4 w-4" />
                <RockingChairIcon className="h-4 w-4" />
                <WifiIcon className="h-4 w-4" />
                <div className="text-sm">Included</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="text-sm">
                {remainingSeats} seat(s) left at this price
              </div>
              <div className="text-2xl font-bold">
                {price.currency} {price.amount}
              </div>
              <Button className="mt-2" variant="outline">
                Lock price for {price.currency}{" "}
                {(Number(price.amount) * 0.1).toFixed(2)}
              </Button>
              <Button className="mt-2">Select</Button>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl p-6">
        <DialogHeader className="flex justify-between items-center pb-4 border-b">
          <DialogTitle>Itinerary details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] my-4">
          <Card className="mr-6">
            <CardHeader className="p-4 border-b">
              <CardTitle>
                <h3 className="text-md font-semibold mt-2">Outbound Details</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="layover border-b">
                <Badge variant="outline" className="m-2">
                  <span className="text-sm">{outbound.airline}</span>
                </Badge>
              </div>
              <div className="segment m-2">
                <div className="space-y-4">
                  <div className="flex items-center mt-4">
                    <MapPinIcon className="w-5 h-5" />
                    <div className="ml-2 text-sm font-medium">
                      {outbound.origin?.iata_code}
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <PlaneTakeoffIcon className="w-5 h-5" />
                    <div className="ml-2 text-sm font-medium">
                      {outbound.origin?.iata_code} Airport
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <CalendarDaysIcon />
                    <div className="ml-2 text-sm font-medium">
                      {outbound.departureTime}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <time className="text-xl font-bold">
                      {outbound.departureTime}
                    </time>
                    <Badge variant="secondary">{outbound.duration}</Badge>
                    <time className="text-xl font-bold">
                      {outbound.arrivalTime}
                    </time>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter />
          </Card>
          <Card className="mr-6 mt-4 mb-4">
            <CardHeader className="p-4 border-b">
              <CardTitle>
                <h3 className="text-md font-semibold mt-2">Inbound Details</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="layover border-b">
                <Badge variant="outline" className="m-2">
                  <span className="text-sm">{inbound.airline}</span>
                </Badge>
              </div>
              <div className="segment m-2">
                <div className="space-y-4">
                  <div className="flex items-center mt-4">
                    <MapPinIcon className="w-5 h-5" />
                    <div className="ml-2 text-sm font-medium">
                      {inbound.origin?.iata_code}
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <PlaneTakeoffIcon className="w-5 h-5" />
                    <div className="ml-2 text-sm font-medium">
                      {inbound.origin?.iata_code} Airport
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <CalendarDaysIcon />
                    <div className="ml-2 text-sm font-medium">
                      {inbound.departureTime}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <time className="text-xl font-bold">
                      {inbound.departureTime}
                    </time>
                    <Badge variant="secondary">{inbound.duration}</Badge>
                    <time className="text-xl font-bold">
                      {inbound.arrivalTime}
                    </time>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        </ScrollArea>
        <DialogFooter className="flex justify-between items-center pt-4 border-t">
          <ShareIcon />
          <Button>Select</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlightCard;



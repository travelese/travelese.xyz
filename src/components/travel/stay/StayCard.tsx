import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
} from "@/components/ui/drawer";
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
  StarIcon,
  WifiIcon,
  AlarmClockIcon,
  HomeIcon,
  CalendarIcon,
} from "lucide-react";

import type { StaysSearchResult } from "@duffel/api/types";

interface StayCardProps {
  stay: StaysSearchResult;
  onSelect: () => void;
}

export default function StayCard({ stay, onSelect }: StayCardProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card>
          <div className="flex w-full items-center justify-between p-6 rounded-lg cursor-pointer">
            <div className="w-2/3 space-y-4 pr-5 border-r border-dashed">
              <div>
                <h2 className="text-2xl font-bold">
                  {stay.accommodation.name}
                </h2>
                <p className="text-sm">{stay.accommodation.chain?.name}</p>
              </div>
              <div>
                <div className="text-sm">Check-in</div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">
                    {
                      stay.accommodation.check_in_information
                        ?.check_in_after_time
                    }
                  </span>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <Badge variant="secondary">
                      {
                        stay.accommodation.check_in_information
                          ?.check_out_before_time
                      }
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Amenities</h3>
                <div className="flex items-center space-x-1 mt-4">
                  {stay.accommodation.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <span className="text-sm">{amenity.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="mt-2">
                <Alert>
                  <StarIcon className="h-4 w-4" />
                  <AlertTitle>Rating</AlertTitle>
                  <AlertDescription>
                    {stay.accommodation.rating}/5
                  </AlertDescription>
                </Alert>
              </div>
              <div className="text-sm m-3">
                {stay.accommodation.rooms?.length} room(s) available
              </div>
              <div className="text-2xl font-bold">
                {stay.accommodation.cheapest_rate_currency}{" "}
                {stay.accommodation.cheapest_rate_total_amount}
              </div>
              <Button onClick={onSelect} className="mt-2">
                Select
              </Button>
            </div>
          </div>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-full">
        <DrawerHeader>
          <DrawerTitle>Stay Details</DrawerTitle>
          <DrawerDescription>
            {stay.accommodation.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center gap-4 p-4">
          <Card className="w-[500px]">
            <ScrollArea className="h-[500px]">
              <CardHeader className="p-4 border-b">
                <CardTitle>{stay.accommodation.name}</CardTitle>
                <CardDescription>
                  {stay.accommodation.location.address.line_one},{" "}
                  {stay.accommodation.location.address.city_name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stay.accommodation.rooms?.map((room, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-semibold">{room.name}</h3>
                    <p>
                      Beds:{" "}
                      {room.beds
                        ?.map((bed) => `${bed.count} ${bed.type}`)
                        .join(", ")}
                    </p>
                    <p>
                      Price: {room.rates?.[0]?.total_currency}{" "}
                      {room.rates?.[0]?.total_amount}
                    </p>
                  </div>
                ))}
              </CardContent>
              <CardFooter></CardFooter>
            </ScrollArea>
          </Card>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

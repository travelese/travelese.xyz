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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  StarIcon,
  WifiIcon,
  TvIcon,
  CoffeeIcon,
  UtensilsIcon,
  CarIcon,
  WavesIcon,
  DumbbellIcon,
  AirVentIcon,
  CalendarIcon,
  BriefcaseIcon,
  ConciergeBellIcon,
  UtensilsCrossedIcon,
  SofaIcon,
  UserIcon,
  WashingMachineIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { StaysSearchResult, StaysAccommodation } from "@duffel/api/types";

interface StayCardProps {
  stay: StaysSearchResult;
  onSelect: () => void;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString([], { month: "short", day: "numeric" });

const calculateNights = (checkIn: string, checkOut: string): number => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

const amenityIcons: Record<string, React.ElementType> = {
  business_centre: BriefcaseIcon,
  concierge: ConciergeBellIcon,
  room_service: UtensilsCrossedIcon,
  lounge: SofaIcon,
  "24_hour_front_desk": UserIcon,
  laundry: WashingMachineIcon,
  wifi: WifiIcon,
  tv: TvIcon,
  coffee: CoffeeIcon,
  restaurant: UtensilsIcon,
  parking: CarIcon,
  pool: WavesIcon,
  gym: DumbbellIcon,
  "air-conditioning": AirVentIcon,
};

const getAmenityIcon = (amenityType: string): React.ElementType => {
  return amenityIcons[amenityType.toLowerCase()] || StarIcon;
};

const StayCard: React.FC<StayCardProps> = ({ stay, onSelect }) => {
  const nights = calculateNights(stay.check_in_date, stay.check_out_date);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between">
              <div className="w-full sm:w-2/3 space-y-4 sm:pr-5 sm:border-r sm:border-dashed">
                <StaySummary stay={stay} nights={nights} />
                <AmenitiesInfo amenities={stay.accommodation.amenities} />
              </div>
              <div className="flex flex-col items-start sm:items-center justify-center w-full sm:w-1/3 mt-4 sm:mt-0">
                <Alert className="w-full sm:w-auto">
                  <StarIcon className="h-4 w-4" aria-hidden="true" />
                  <AlertTitle>Rating</AlertTitle>
                  <AlertDescription>
                    {stay.accommodation.review_score?.toFixed(1) || "N/A"}/10
                  </AlertDescription>
                </Alert>
                <div className="text-sm m-3" aria-live="polite">
                  {stay.rooms} room(s) available
                </div>
                <div
                  className="text-2xl font-bold"
                  aria-label={`Price: ${stay.accommodation.cheapest_rate_currency} ${stay.accommodation.cheapest_rate_total_amount}`}
                >
                  {stay.accommodation.cheapest_rate_currency}{" "}
                  {stay.accommodation.cheapest_rate_total_amount}
                </div>
                <Button className="mt-2 w-full sm:w-auto" variant="outline">
                  Lock price for {stay.accommodation.cheapest_rate_currency}{" "}
                  {(
                    Number(stay.accommodation.cheapest_rate_total_amount) * 0.1
                  ).toFixed(2)}
                </Button>
                <Button onClick={onSelect} className="mt-2 w-full sm:w-auto">
                  Select this stay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-full">
        <DrawerHeader>
          <DrawerTitle>Stay Details</DrawerTitle>
          <DrawerDescription>
            Detailed information about your selected stay
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col md:flex-row justify-center gap-4 p-4">
          <Card className="w-full md:w-[500px]">
            <ScrollArea className="h-[500px]">
              <CardHeader className="p-4 border-b">
                <CardTitle>{stay.accommodation.name}</CardTitle>
                <CardDescription>
                  {stay.accommodation.location.address.line_one},{" "}
                  {stay.accommodation.location.address.city_name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AccommodationDetails accommodation={stay.accommodation} />
                <StayDates stay={stay} nights={nights} />
                <RoomDetails rooms={stay.accommodation.rooms} />
                <PriceDetails stay={stay} />
                <PhotoGallery photos={stay.accommodation.photos} />
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
        <DrawerFooter>
          <Button onClick={onSelect}>Confirm Selection</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const StaySummary: React.FC<{ stay: StaysSearchResult; nights: number }> =
  React.memo(({ stay, nights }) => {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-2">{stay.accommodation.name}</h3>
        <div className="flex items-center space-x-2">
          <div className="text-center">
            <div className="font-bold text-lg">
              {formatDate(stay.check_in_date)}
            </div>
            <div className="text-xs">Check-in</div>
          </div>
          <Separator className="flex-1" aria-hidden="true" />
          <Avatar>
            <AvatarImage
              alt={`${stay.accommodation.name} Image`}
              src={stay.accommodation.photos?.[0]?.url || "/placeholder.svg"}
              className="filter grayscale hover:filter-none"
            />
            <AvatarFallback>{stay.accommodation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Separator className="flex-1" aria-hidden="true" />
          <div className="text-center">
            <div className="font-bold text-lg">
              {formatDate(stay.check_out_date)}
            </div>
            <div className="text-xs">Check-out</div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <Badge variant="outline">
            {nights} night{nights !== 1 ? "s" : ""}
          </Badge>
        </div>
        <div className="mt-2 text-sm">
          {stay.accommodation.location.address.line_one},{" "}
          {stay.accommodation.location.address.city_name}
        </div>
      </div>
    );
  });

StaySummary.displayName = "StaySummary";

const AmenitiesInfo: React.FC<{ amenities: StaysAccommodation["amenities"] }> =
  React.memo(({ amenities }) => (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <div className="text-sm font-medium">Amenities:</div>
      <TooltipProvider>
        {amenities?.slice(0, 5).map((amenity, index) => {
          const IconComponent = getAmenityIcon(amenity.type);
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-1 rounded-full p-1">
                  <IconComponent className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{amenity.description}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{amenity.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  ));

AmenitiesInfo.displayName = "AmenitiesInfo";

const AccommodationDetails: React.FC<{ accommodation: StaysAccommodation }> = ({
  accommodation,
}) => (
  <div className="space-y-2">
    <h4 className="font-semibold">About the Property</h4>
    <p className="text-sm">{accommodation.description}</p>
    <div className="text-sm">
      <div>
        Check-in: {accommodation.check_in_information?.check_in_after_time}
      </div>
      <div>
        Check-out: {accommodation.check_in_information?.check_out_before_time}
      </div>
    </div>
    {accommodation.key_collection && (
      <div className="text-sm">
        <h5 className="font-semibold">Key Collection</h5>
        <p>{accommodation.key_collection.instructions}</p>
      </div>
    )}
  </div>
);

const StayDates: React.FC<{ stay: StaysSearchResult; nights: number }> = ({
  stay,
  nights,
}) => (
  <div className="space-y-2">
    <h4 className="font-semibold">Stay Dates</h4>
    <div className="flex justify-between text-sm">
      <div>
        <div>Check-in:</div>
        <div className="font-bold">{formatDate(stay.check_in_date)}</div>
      </div>
      <div className="text-center">
        <CalendarIcon className="h-5 w-5 mx-auto" />
        <div>
          {nights} night{nights !== 1 ? "s" : ""}
        </div>
      </div>
      <div className="text-right">
        <div>Check-out:</div>
        <div className="font-bold">{formatDate(stay.check_out_date)}</div>
      </div>
    </div>
  </div>
);

const RoomDetails: React.FC<{ rooms: StaysAccommodation["rooms"] }> = ({
  rooms,
}) => (
  <div className="space-y-2">
    <h4 className="font-semibold">Room Details</h4>
    {rooms.map((room, index) => (
      <div key={index} className="border-t pt-2 first:border-t-0 first:pt-0">
        <h5 className="font-medium">{room.name}</h5>
        <div className="text-sm">
          {room.beds?.map((bed, bedIndex) => (
            <div key={bedIndex}>
              {bed.count} x {bed.type} bed
            </div>
          ))}
        </div>
        {room.rates[0] && (
          <div className="mt-1">
            <div className="font-bold">
              {room.rates[0].total_currency} {room.rates[0].total_amount}
            </div>
            <div className="text-sm">{room.rates[0].board_type}</div>
          </div>
        )}
      </div>
    ))}
  </div>
);

const PriceDetails: React.FC<{ stay: StaysSearchResult }> = ({ stay }) => (
  <div className="space-y-2">
    <h4 className="font-semibold">Price Details</h4>
    <div className="flex justify-between">
      <span>Total Price:</span>
      <span>
        {stay.accommodation.cheapest_rate_currency}{" "}
        {stay.accommodation.cheapest_rate_total_amount}
      </span>
    </div>
    {stay.accommodation.rooms[0]?.rates[0] && (
      <>
        <div className="flex justify-between">
          <span>Base Rate:</span>
          <span>
            {stay.accommodation.rooms[0].rates[0].base_currency}{" "}
            {stay.accommodation.rooms[0].rates[0].base_amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Taxes and Fees:</span>
          <span>
            {stay.accommodation.rooms[0].rates[0].tax_currency}{" "}
            {stay.accommodation.rooms[0].rates[0].tax_amount}
          </span>
        </div>
      </>
    )}
  </div>
);

const PhotoGallery: React.FC<{ photos: StaysAccommodation["photos"] }> =
  React.memo(
    ({ photos }) =>
      photos &&
      photos.length > 0 && (
        <div>
          <h4 className="font-semibold">Photos</h4>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {photos.slice(0, 4).map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={`Accommodation photo ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      ),
  );

PhotoGallery.displayName = "PhotoGallery";

StayCard.displayName = "StayCard";

export default StayCard;

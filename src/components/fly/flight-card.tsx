import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CloudFogIcon,
  ShareIcon,
} from "lucide-react";
import {
  BaggagePersonal,
  BaggageCabin,
  BaggageChecked30,
} from "@kiwicom/orbit-components/icons";
import { Button } from "@/components/ui/button";
import { Offer, Segment } from "@/types/api";
import FlightSegment from "@/components/fly/flight-segment";

interface FlightCardProps {
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
  
  const matches = isoDuration.match(/P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?T(?:([0-9]+)H)?(?:([0-9]+)M)?/);
  if (!matches) return "N/A";
  
  const hours = matches[4] ? `${matches[4]}h` : "0h";
  const minutes = matches[5] ? `${matches[5]}m` : "0m";

  return `${hours} ${minutes}`;
};

const countBagType = (
  type: "personal_item" | "carry_on" | "checked",
  segments: Segment[] | undefined
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
          0
        ) || 0)
      );
    }, 0) || 0
  );
};


const FlightCard: React.FC<FlightCardProps> = ({ offer, onSelect }) => {
  if (!offer || !Array.isArray(offer.slices) || offer.slices.length === 0)
    return null;

  const outbound = offer.slices[0];
  const inbound = offer.slices.length > 1 ? offer.slices[1] : null;
  const emission = offer.total_emissions_kg || "N/A";
  const price = offer.total_amount;
  const currency = offer.total_currency;
  const remainingSeats = offer?.available_services?.[0]?.total_amount || 0;

  const personalBags = countBagType("personal_item", outbound.segments);
  const carryOnBags = countBagType("carry_on", outbound.segments);
  const checkedBags = countBagType("checked", outbound.segments);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <div className="flex w-full items-center justify-between p-6 rounded-lg cursor-pointer">
            <div className="w-2/3 space-y-4 pr-5 border-r border-dashed">
              {/* Outbound Flight Summary */}
              <div>
                <div className="text-sm">Outbound</div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold text-lg">
                    {outbound.origin.iata_code}
                  </div>
                  <div className="flex-1 border-t" />
                  <div className="text-sm">
                    {outbound.segments?.length
                      ? outbound.segments.length - 1
                      : 0}{" "}
                    stop(s)
                  </div>
                  <Avatar>
                    <AvatarImage
                      alt={`${
                        outbound.segments
                          ? outbound.segments[0].operating_carrier.name
                          : ""
                      } Logo`}
                      src={
                        outbound.segments?.[0]?.operating_carrier
                          .logo_symbol_url || "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>
                      {outbound.segments?.[0]?.operating_carrier.iata_code}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 border-t" />
                  <div className="font-bold text-lg">
                    {outbound.destination.iata_code}
                  </div>
                </div>
                <div className="flex justify-between">
                  <time className="text-2xl font-bold">
                    {formatTime(outbound.segments?.[0]?.departing_at || "")}
                  </time>
                  <Badge variant="secondary">{outbound.duration}</Badge>
                  <time className="text-2xl font-bold">
                    {formatTime(outbound.segments?.at(-1)?.arriving_at || "")}
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
                            ? inbound.segments[0].operating_carrier.name
                            : ""
                        } Logo`}
                        src={
                          inbound.segments?.[0]?.operating_carrier
                            .logo_symbol_url || "/placeholder.svg"
                        }
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
                    <Badge variant="secondary">{inbound.duration}</Badge>
                    <time className="text-2xl font-bold">
                      {formatTime(inbound.segments?.at(-1)?.arriving_at || "")}
                    </time>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-1 mt-4">
                <div className="text-sm mr-3">Included</div>
                {personalBags > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{personalBags}</span>
                    <BaggagePersonal className="h-4 w-4" />
                  </div>
                )}
                {carryOnBags > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{carryOnBags}</span>
                    <BaggageCabin className="h-4 w-4" />
                  </div>
                )}
                {checkedBags > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{checkedBags}</span>
                    <BaggageChecked30 className="h-4 w-4" />
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
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl p-6">
        <DialogHeader className="flex justify-between items-center pb-4 border-b">
          <DialogTitle>Itinerary details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] my-4">
          <Card className="mr-6">
            <CardHeader className="p-4 border-b">
              <CardTitle>
                <h3 className="text-md font-semibold mt-2">
                  To {outbound.destination.city_name}
                </h3>
              </CardTitle>
              <CardDescription>Details of your outbound flight</CardDescription>
            </CardHeader>
            <CardContent>
              <CardContent>
                <FlightSegment segment={outbound.segments?.[0]} />
              </CardContent>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          {inbound && (
            <Card className="mr-6 mt-4 mb-4">
              <CardHeader className="p-4 border-b">
                <CardTitle>
                  <h3 className="text-md font-semibold mt-2">
                    To {inbound.destination.city_name}
                  </h3>
                </CardTitle>
                <CardDescription>
                  Details of your inbound flight
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FlightSegment segment={inbound.segments?.[0]} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}
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
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
  PlaneTakeoffIcon,
  PlaneLandingIcon,
  MapPinIcon,
  CalendarDaysIcon,
  InfoIcon,
  WifiIcon,
  PlaneIcon,
} from "lucide-react";
import {
  Seat,
} from "@kiwicom/orbit-components/icons";
import { Segment } from "@/types/api";

const FlightSegment: React.FC<{ segment: Segment | undefined }> = ({
  segment,
}) => {
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
        <Avatar>
          <AvatarImage alt={`${airline} Logo`} src={airlineLogo || ""} />
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
        <Badge variant="secondary">{duration}</Badge>
        <time className="text-xl font-bold">
          {new Date(arrivalTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
                  />
                  <AvatarFallback>{airlineCode}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <Badge>{airline}</Badge>
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
                        {passengers?.[0]?.cabin?.amenities?.seat?.legroom ||
                          "N/A"}
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
};

export default FlightSegment;

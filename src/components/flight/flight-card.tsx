// File: /src/components/flight/flight-card.tsx
// Description: This file contains the component for displaying flight card details.

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import FlightDetails from "@/components/flight/flight-details";
import { Offer } from "@/types/api";

interface FlightCardProps {
  flight: Offer;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Card>
        <CardHeader>
          <CardTitle>
            {flight.slices[0].origin.city_name} to{" "}
            {flight.slices[0].destination.city_name}
          </CardTitle>
          <CardDescription>
            {flight.slices.length === 1 &&
            flight.slices[0].segments.length === 1
              ? "Direct"
              : `${flight.slices
                  .map((slice) => slice.segments.length - 1)
                  .reduce((sum, stops) => sum + stops, 0)} Stop(s)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              {new Date(
                flight.slices[0].segments[0].departing_at
              ).toLocaleString()}
            </div>
            <div>
              {new Date(
                flight.slices[0].segments[0].arriving_at
              ).toLocaleString()}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <div className="text-lg font-bold">
              Total: {flight.total_amount} {flight.total_currency}
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
                Total: {flight.total_amount} {flight.total_currency}
              </div>
              <Button variant="outline">Book Now</Button>
            </div>
          </CardFooter>
        </Card>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default FlightCard;

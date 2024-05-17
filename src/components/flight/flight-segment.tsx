// File: /src/components/flight/flight-segment.tsx
// Description: This file contains the component for displaying flight segment details.

import React from "react";
import Image from "next/image";
import { Segment } from "@/types/api";

interface FlightSegmentProps {
  segment: Segment;
}

const FlightSegment: React.FC<FlightSegmentProps> = ({ segment }) => (
  <div className="segment-details mb-2">
    <p>
      <strong>Flight:</strong> {segment.marketing_carrier.name} (
      {segment.marketing_carrier_flight_number})
    </p>
    <p>
      <Image
        src={segment.marketing_carrier.logo_symbol_url || ""}
        alt={`${segment.marketing_carrier.name} logo`}
        className="w-10 h-10 inline mr-2"
        width={40}
        height={40}
      />
      {segment.marketing_carrier.name}
    </p>
    <p>
      <strong>Departure:</strong>{" "}
      {new Date(segment.departing_at).toLocaleString()} from{" "}
      {segment.origin.name}
    </p>
    <p>
      <strong>Arrival:</strong> {new Date(segment.arriving_at).toLocaleString()}{" "}
      at {segment.destination.name}
    </p>
    <p>
      <strong>Aircraft:</strong> {segment.aircraft.name}
    </p>
    <p>
      <strong>Duration:</strong> {segment.duration}
    </p>
  </div>
);

export default FlightSegment;

// File: /src/components/flight/flight-details.tsx
// Description: This file contains the component for displaying flight details.

import React from "react";
import FlightSegment from "@/components/flight/flight-segment";
import { Offer } from "@/types/api";

interface FlightDetailsProps {
  flight: Offer;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => (
  <div className="flight-details">
    {flight.slices.map((slice, sliceIndex) => (
      <div key={sliceIndex} className="slice-details mb-4">
        <h3 className="text-lg font-bold">
          {sliceIndex === 0 ? "Departure" : "Return"}
        </h3>
        {slice.segments &&
          slice.segments.map((segment, segIndex) => (
            <FlightSegment key={segIndex} segment={segment} />
          ))}
        <p>
          <strong>Slice Duration:</strong> {slice.duration}
        </p>
      </div>
    ))}
  </div>
);

export default FlightDetails;
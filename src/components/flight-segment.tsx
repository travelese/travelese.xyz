import React from "react";
import Image from "next/image";
import { ComponentSegment } from "@/types/api";

interface FlightSegmentProps {
  segment: ComponentSegment;
}

const FlightSegment: React.FC<FlightSegmentProps> = ({ segment }) => (
  <div className="segment-details mb-2">
    <p>
      <strong>Flight:</strong> {segment.airline} ({segment.flightNumber})
    </p>
    <p>
      <Image
        src={segment.airlineLogo}
        alt={`${segment.airline} logo`}
        className="w-10 h-10 inline mr-2"
        width={40}
        height={40}
      />
      {segment.airline}
    </p>
    <p>
      <strong>Departure:</strong>{" "}
      {new Date(segment.departingAt).toLocaleString()} from {segment.origin}
    </p>
    <p>
      <strong>Arrival:</strong> {new Date(segment.arrivingAt).toLocaleString()}{" "}
      at {segment.destination}
    </p>
    <p>
      <strong>Aircraft:</strong> {segment.aircraft}
    </p>
    <p>
      <strong>Duration:</strong> {segment.duration}
    </p>
  </div>
);

export default FlightSegment;

import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface EmailTemplateProps {
  firstName?: string;
  bookingReference?: string;
  segments?: {
    id: string;
    orderId: string;
    origin: {
      iata_code: string;
      city_name: string;
      name: string;
    };
    destination: {
      iata_code: string;
      city_name: string;
      name: string;
    };
    departingAt: string;
    arrivingAt: string;
    marketingCarrier: {
      name: string;
      iata_code: string;
    };
    marketingCarrierFlightNumber: string;
    operatingCarrier: {
      name: string;
      iata_code: string;
    };
    operatingCarrierFlightNumber: string;
    aircraft: {
      name: string;
      iata_code: string;
    };
    duration: string;
    distance: string | null;
    originTerminal: string | null;
    destinationTerminal: string | null;
  }[];
  totalAmount?: string;
  currency?: string;
}

export const OrderConfirmationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  bookingReference,
  segments,
  totalAmount,
  currency,
}) => (
  <Html>
    <Head />
    <Preview>Your booking has been confirmed</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-gray-200 rounded my-10 mx-auto p-5 max-w-xl">
          <Heading className="text-2xl font-bold text-center text-gray-800 my-4">
            Order Confirmation
          </Heading>
          <Text className="text-gray-700">Dear {firstName},</Text>
          <Text className="text-gray-700">
            Your booking has been confirmed. Your booking reference is:{" "}
            <span className="font-semibold">{bookingReference}</span>
          </Text>
          <Heading className="text-xl font-semibold text-gray-800 mt-6 mb-4">
            Flight Details
          </Heading>
          {segments?.map((segment, index) => (
            <Section key={segment.id} className="mb-6 bg-gray-50 p-4 rounded">
              <Heading className="text-lg font-semibold text-gray-800 mb-2">
                Segment {index + 1}
              </Heading>
              <Text className="text-gray-700">
                <strong>From:</strong> {segment.origin.city_name} -{" "}
                {segment.origin.name} ({segment.origin.iata_code})
                {segment.originTerminal &&
                  ` Terminal ${segment.originTerminal}`}
              </Text>
              <Text className="text-gray-700">
                <strong>To:</strong> {segment.destination.city_name} -{" "}
                {segment.destination.name} ({segment.destination.iata_code})
                {segment.destinationTerminal &&
                  ` Terminal ${segment.destinationTerminal}`}
              </Text>
              <Text className="text-gray-700">
                <strong>Departing At:</strong>{" "}
                {new Date(segment.departingAt).toLocaleString()}
              </Text>
              <Text className="text-gray-700">
                <strong>Arriving At:</strong>{" "}
                {new Date(segment.arrivingAt).toLocaleString()}
              </Text>
              <Text className="text-gray-700">
                <strong>Duration:</strong> {segment.duration}
              </Text>
              <Text className="text-gray-700">
                <strong>Marketing Carrier:</strong>{" "}
                {segment.marketingCarrier.name} (
                {segment.marketingCarrier.iata_code})
              </Text>
              <Text className="text-gray-700">
                <strong>Marketing Flight Number:</strong>{" "}
                {segment.marketingCarrierFlightNumber}
              </Text>
              <Text className="text-gray-700">
                <strong>Operating Carrier:</strong>{" "}
                {segment.operatingCarrier.name} (
                {segment.operatingCarrier.iata_code})
              </Text>
              <Text className="text-gray-700">
                <strong>Operating Flight Number:</strong>{" "}
                {segment.operatingCarrierFlightNumber}
              </Text>
              <Text className="text-gray-700">
                <strong>Aircraft:</strong> {segment.aircraft.name} (
                {segment.aircraft.iata_code})
              </Text>
              {segment.distance && (
                <Text className="text-gray-700">
                  <strong>Distance:</strong> {segment.distance} km
                </Text>
              )}
            </Section>
          ))}
          <Heading className="text-xl font-semibold text-gray-800 mt-6 mb-2">
            Total Amount
          </Heading>
          <Text className="text-lg font-bold text-gray-900">
            {currency} {totalAmount}
          </Text>
          <Text className="text-gray-700 mt-6">
            Thank you for booking with Travelese!
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default OrderConfirmationEmail;

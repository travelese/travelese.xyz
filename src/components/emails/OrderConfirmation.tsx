import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  bookingReference: string;
  segments: {
    origin: string;
    destination: string;
    departingAt: string;
    arrivingAt: string;
    marketingCarrier: string;
    operatingCarrier: string;
    aircraft: string;
  }[];
  totalAmount: string;
  currency: string;
}

export const OrderConfirmationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  bookingReference,
  segments,
  totalAmount,
  currency,
}) => (
  <div>
    <h1>Order Confirmation</h1>
    <p>Dear {firstName},</p>
    <p>
      Your booking has been confirmed. Your booking reference is:{" "}
      {bookingReference}
    </p>
    <h2>Flight Details</h2>
    {segments.map((segment, index) => (
      <div key={index}>
        <h3>Segment {index + 1}</h3>
        <p>
          <strong>From:</strong> {segment.origin}
        </p>
        <p>
          <strong>To:</strong> {segment.destination}
        </p>
        <p>
          <strong>Departing At:</strong>{" "}
          {new Date(segment.departingAt).toLocaleString()}
        </p>
        <p>
          <strong>Arriving At:</strong>{" "}
          {new Date(segment.arrivingAt).toLocaleString()}
        </p>
        <p>
          <strong>Marketing Carrier:</strong> {segment.marketingCarrier}
        </p>
        <p>
          <strong>Operating Carrier:</strong> {segment.operatingCarrier}
        </p>
        <p>
          <strong>Aircraft:</strong> {segment.aircraft}
        </p>
      </div>
    ))}
    <h2>Total Amount</h2>
    <p>
      {currency} {totalAmount}
    </p>
    <p>Thank you for booking with us!</p>
  </div>
);

export default OrderConfirmationEmail;

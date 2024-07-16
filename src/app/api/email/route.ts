import * as React from "react";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/utils";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";
import type { OrderSlice, OrderSliceSegment } from "@duffel/api/types";

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();

    const segmentData = order.slices.flatMap((slice: OrderSlice) =>
      slice.segments.map((segment: OrderSliceSegment) => ({
        origin: segment.origin.iata_code,
        destination: segment.destination.iata_code,
        departingAt: segment.departing_at,
        arrivingAt: segment.arriving_at,
        marketingCarrier: segment.marketing_carrier.name,
        operatingCarrier: segment.operating_carrier.name,
        aircraft: segment.aircraft?.name,
      })),
    );

    const emailData = {
      firstName: order.passengers[0].given_name,
      bookingReference: order.booking_reference,
      segments: segmentData,
      totalAmount: order.total_amount,
      currency: order.total_currency,
    };

    const result = await sendEmail({
      to: [order.passengers[0].email],
      subject: "Your Booking Confirmation",
      react: OrderConfirmationEmail({ ...emailData }),
    });

    console.log("Order confirmation email sent:", result);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 },
    );
  }
}

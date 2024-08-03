import { sendEmail } from "@/lib/email/utils";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";
import type { OrderSlice, OrderSliceSegment } from "@duffel/api/types";

export async function POST(request: Request) {
  try {
    const order = await request.json();

    if (
      !order.passengers ||
      !order.passengers.length ||
      !order.booking_reference ||
      !order.slices
    ) {
      return new Response(JSON.stringify({ error: "Invalid order data" }), {
        status: 400,
      });
    }

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

    return new Response(JSON.stringify({ message: "Email sent successfully" }));
  } catch (error) {
    let errorMessage = "Failed to send confirmation email";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}

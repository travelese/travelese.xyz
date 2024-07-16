import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";
import { sendEmail } from "@/lib/email/utils";
import type { Order } from "@duffel/api/types";

export async function sendOrderConfirmation(order: Order) {
  const segmentData = order.slices.flatMap((slice) =>
    slice.segments.map((segment) => ({
      origin: segment.origin.iata_code,
      destination: segment.destination.iata_code,
      departingAt: segment.departing_at,
      arrivingAt: segment.arriving_at,
      marketingCarrier: segment.marketing_carrier.name,
      operatingCarrier: segment.operating_carrier.name,
      aircraft: segment.aircraft.name,
    })),
  );

  const emailData = {
    firstName: order.passengers[0].given_name,
    bookingReference: order.booking_reference,
    segments: segmentData,
    totalAmount: order.total_amount,
    currency: order.total_currency,
  };

  return sendEmail({
    to: [order.passengers[0].email],
    subject: "Your Booking Confirmation",
    react: OrderConfirmationEmail(emailData),
  });
}

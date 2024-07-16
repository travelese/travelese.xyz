import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema/orders";
import { segments } from "@/lib/db/schema/segments";
import { passengers } from "@/lib/db/schema/passengers";
import { Order } from "@duffel/api/types";

export async function saveOrderToDatabase(order: Order) {
  try {
    await db.transaction(async (trx) => {
      // Insert order
      await trx.insert(orders).values({
        id: order.id,
        userId: order.metadata.userId,
        bookingReference: order.booking_reference,
        totalAmount: order.total_amount,
        currency: order.total_currency,
        taxAmount: order.tax_amount,
        paymentStatus: order.payment_status.awaiting_payment
          ? "Awaiting Payment"
          : "Paid",
        isLive: order.live_mode,
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
        syncedAt: new Date(),
      });

      // Insert segments
      for (const slice of order.slices) {
        for (const segment of slice.segments) {
          await trx.insert(segments).values({
            id: segment.id,
            orderId: order.id,
            origin: segment.origin.iata_code,
            destination: segment.destination.iata_code,
            departingAt: new Date(segment.departing_at),
            arrivingAt: new Date(segment.arriving_at),
            duration: segment.duration,
            marketingCarrier: segment.marketing_carrier.iata_code,
            operatingCarrier: segment.operating_carrier.iata_code,
            aircraft: segment.aircraft.iata_code,
          });
        }
      }

      // Insert passengers
      for (const passenger of order.passengers) {
        await trx.insert(passengers).values({
          id: passenger.id,
          orderId: order.id,
          givenName: passenger.given_name,
          familyName: passenger.family_name,
          email: passenger.email,
          phoneNumber: passenger.phone_number,
          bornOn: new Date(passenger.born_on),
          gender: passenger.gender,
          loyaltyProgramme:
            passenger.loyalty_programme_accounts?.[0]?.account_number || null,
        });
      }
    });

    console.log("Order saved to database successfully");
  } catch (error) {
    console.error("Error saving order to database:", error);
    throw new Error("Failed to save order to database");
  }
}

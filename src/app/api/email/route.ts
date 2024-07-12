import { NextResponse } from "next/server";
import { emailSchema, sendEmail } from "@/lib/email/utils";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = emailSchema.parse(body);
  try {
    const data = await sendEmail({
      to: [email],
      subject: "Travelese!",
      react: OrderConfirmationEmail({ firstName: name }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

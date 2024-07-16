import { z } from "zod";
import { resend } from "@/lib/email/index";
import * as React from "react";

export const emailSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export async function sendEmail(options: {
  to: string[];
  subject: string;
  react: React.ReactNode;
}) {
  try {
    const result = await resend.emails.send({
      from: "Travelese <bookings@travelese.xyz>",
      ...options,
      text: "This email is best viewed in a modern email client.",
    });
    console.log("Email sent successfully", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

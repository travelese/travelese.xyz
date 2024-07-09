import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/useToast";
import useNavigation from "@/hooks/useNavigation";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  origin: z
    .string()
    .min(3, "Origin must be at least 3 characters")
    .describe("Origin city name"),
  destination: z
    .string()
    .min(3, "Destination must be at least 3 characters")
    .describe("Destination city name"),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  passengers: z.array(z.enum(["adult", "child", "infant_without_seat"])),
  cabin: z.enum(["first", "business", "premium_economy", "economy"]),
  currency: z.enum(["CAD", "USD", "EUR"]),
  sort: z.enum(["total_amount", "total_duration"]),
});

export function useSearchForm() {
  const { toast } = useToast();
  const { navigateToFlightsPage } = useNavigation();

  const searchParams = useSearchParams();
  const currency =
    (searchParams.get("currency") as "CAD" | "USD" | "EUR") || "USD";

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      dates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
      passengers: ["adult"],
      cabin: "economy",
      currency,
      sort: "total_amount",
    },
  });

  useEffect(() => {
    setDate({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
  }, []);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { origin, destination, dates, cabin, passengers } = data;

    const slices = [
      {
        origin,
        destination,
        departure_date: format(dates.from, "yyyy-MM-dd"),
      },
      {
        origin: destination,
        destination: origin,
        departure_date: format(dates.to, "yyyy-MM-dd"),
      },
    ];

    const formattedPassengers = passengers.map((type) => ({ type }));

    navigateToFlightsPage({
      origin,
      destination,
      from: format(dates.from, "yyyy-MM-dd"),
      to: format(dates.to, "yyyy-MM-dd"),
      passengers: JSON.stringify(formattedPassengers),
      cabin,
    });

    const formData = {
      slices,
      passengers: formattedPassengers,
      cabin_class: cabin,
    };

    fetch("/api/travel/fly", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Offer fetched successfully",
            description: "Rendering the offers...",
          });
        } else {
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return {
    form,
    date,
    setDate,
    onSubmit,
  };
}

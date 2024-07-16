import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/useToast";
import useNavigation from "@/hooks/useNavigation";

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
  sort: z.enum(["total_amount", "total_duration"]),
});

export function useSearchForm() {
  const { toast } = useToast();
  const { navigateToFlightsPage } = useNavigation();

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
      sort: "total_amount",
    },
  });

  useEffect(() => {
    setDate({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { origin, destination, dates, cabin, passengers } = data;

    const formattedPassengers = passengers.map((type) => ({ type }));

    const queryParams = {
      origin,
      destination,
      from: format(dates.from, "yyyy-MM-dd"),
      to: format(dates.to, "yyyy-MM-dd"),
      passengers: JSON.stringify(formattedPassengers),
      cabin,
    };

    try {
      // Navigate to the flights page with the search parameters
      navigateToFlightsPage(queryParams);
    } catch (error) {
      console.error("Error navigating to flights page:", error);
      toast({
        title: "Error",
        description: "Unable to process your search. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    date,
    setDate,
    onSubmit,
  };
}

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

const FlightFormSchema = z.object({
  origin: z.string().min(3, "Origin must be at least 3 characters"),
  destination: z.string().min(3, "Destination must be at least 3 characters"),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  passengers: z.array(z.enum(["adult", "child", "infant_without_seat"])),
  cabin: z.enum(["first", "business", "premium_economy", "economy"]),
  sort: z.enum(["total_amount", "total_duration"]),
});

const StayFormSchema = z.object({
  check_in_date: z.string(),
  check_out_date: z.string(),
  rooms: z.number().int().positive(),
  guests: z.array(z.enum(["adult", "child"])),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

type SearchType = "fly" | "stay";

export function useSearchForm(
  type: SearchType,
  navigateToSearchPage: (queryParams: Record<string, string>) => void,
) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const form = useForm<
    z.infer<typeof FlightFormSchema> | z.infer<typeof StayFormSchema>
  >({
    resolver:
      type === "fly"
        ? zodResolver(FlightFormSchema)
        : zodResolver(StayFormSchema),
    defaultValues:
      type === "fly"
        ? {
            origin: "",
            destination: "",
            dates: {
              from: new Date(),
              to: addDays(new Date(), 7),
            },
            passengers: ["adult"],
            cabin: "economy",
            sort: "total_amount",
          }
        : {
            check_in_date: format(new Date(), "yyyy-MM-dd"),
            check_out_date: format(addDays(new Date(), 7), "yyyy-MM-dd"),
            rooms: 1,
            guests: ["adult"],
            location: {
              latitude: 0,
              longitude: 0,
            },
          },
  });

  useEffect(() => {
    setDate({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
  }, []);

  const onSubmit = async (
    data: z.infer<typeof FlightFormSchema> | z.infer<typeof StayFormSchema>,
  ) => {
    console.log("onSubmit called with data:", data);
    if (type === "fly") {
      console.log(
        "useSearchForm type fly onSubmit called",
        JSON.stringify(data, null, 2),
      );
      console.log("Search type:", type);
      const { origin, destination, dates, cabin, passengers } = data as z.infer<
        typeof FlightFormSchema
      >;
      const formattedPassengers = passengers.map((type) => ({ type }));

      if (!origin || !destination) {
        toast.error("Please provide origin and destination");
        return;
      }

      const queryParams: Record<string, string> = {
        type: "fly",
        origin,
        destination,
        from: format(dates.from, "yyyy-MM-dd"),
        to: format(dates.to, "yyyy-MM-dd"),
        passengers: JSON.stringify(formattedPassengers),
        cabin,
      };

      try {
        navigateToSearchPage(queryParams);
      } catch (error) {
        handleError(error, "fly");
      }
    } else {
      console.log("useSearchForm type stay onSubmit called'", data);
      const { check_in_date, check_out_date, rooms, guests, location } =
        data as z.infer<typeof StayFormSchema>;
      const formattedGuests = guests.map((type) => ({ type }));

      if (!location.latitude || !location.longitude) {
        console.error("Location not properly selected");
        toast.error("Please select a valid location");
        return;
      }

      const queryParams: Record<string, string> = {
        type: "stay",
        check_in_date,
        check_out_date,
        rooms: rooms.toString(),
        guests: JSON.stringify(formattedGuests),
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
      };
      try {
        navigateToSearchPage(queryParams);
      } catch (error) {
        handleError(error, "stay");
      }
    }
  };

  const handleError = (error: unknown, searchType: "fly" | "stay") => {
    if (error instanceof Error) {
      toast.error(`Failed to search for ${searchType}`, {
        description: error.message,
      });
    } else {
      toast.error(`Failed to search for ${searchType}`, {
        description: "An unexpected error occurred",
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

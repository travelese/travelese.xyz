// File: /src/components/flight/flight-search-form.tsx
// Description: This file contains the form for searching for flights.

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Calendar as CalendarIcon,
  PlusIcon,
  MinusIcon,
  UserIcon,
  BabyIcon,
  MapPinIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useNavigation from "@/hooks/navigation";
import {
  PassengerType as PassengerTypeEnum,
  CabinClass as CabinClassEnum,
} from "@/types/api";

// Define the object mappings for types as values
const PassengerType = {
  ADULT: "adult" as PassengerTypeEnum,
  CHILD: "child" as PassengerTypeEnum,
  INFANT_WITHOUT_SEAT: "infant_without_seat" as PassengerTypeEnum,
};

const CabinClass = {
  FIRST: "first" as CabinClassEnum,
  BUSINESS: "business" as CabinClassEnum,
  PREMIUM_ECONOMY: "premium_economy" as CabinClassEnum,
  ECONOMY: "economy" as CabinClassEnum,
};

const passengerTypes = [
  { type: PassengerType.ADULT, name: "Adult", icon: UserIcon },
  { type: PassengerType.CHILD, name: "Child", icon: BabyIcon },
  { type: PassengerType.INFANT_WITHOUT_SEAT, name: "Infant", icon: BabyIcon },
];

// Define the schema for form validation using zod
const FormSchema = z.object({
  origin: z.string().min(3, "Origin must be at least 3 characters"),
  destination: z.string().min(3, "Destination must be at least 3 characters"),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  passengers: z.array(
    z.object({
      type: z.enum([
        PassengerType.ADULT,
        PassengerType.CHILD,
        PassengerType.INFANT_WITHOUT_SEAT,
      ]),
      count: z.number().min(0),
    })
  ),
  cabin: z.enum([
    CabinClass.FIRST,
    CabinClass.BUSINESS,
    CabinClass.PREMIUM_ECONOMY,
    CabinClass.ECONOMY,
  ]),
  currency: z.string().min(3, "Currency code must be at least 3 characters"),
  sort: z.enum(["total_amount", "total_duration"]).default("total_amount"),
});

export default function FlightSearchForm() {
  const { navigateToFlightsPage } = useNavigation();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [passengers, setPassengers] = React.useState(
    passengerTypes.map((type) => ({
      ...type,
      count: type.type === PassengerType.ADULT ? 1 : 0,
    }))
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      passengers: passengerTypes.map((type) => ({
        type: type.type,
        count: type.type === PassengerType.ADULT ? 1 : 0,
      })),
      dates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
      cabin: CabinClass.ECONOMY,
      currency: "USD",
      sort: "total_amount",
    },
  });

  const handlePassengerChange = (index: number, change: number) => {
    const updatedPassengers = [...passengers];
    const passenger = updatedPassengers[index];

    if (
      passenger.type === PassengerType.ADULT &&
      passenger.count === 1 &&
      change < 0
    ) {
      return; // Prevent decreasing adult count below 1
    }

    updatedPassengers[index] = {
      ...passenger,
      count: Math.max(passenger.count + change, 0),
    };

    setPassengers(updatedPassengers);
    // Sync form values
    form.setValue("passengers", updatedPassengers);
  };

  const pluralize = (
    count: number,
    singular: string,
    plural: string = `${singular}s`
  ) => {
    if (singular === "Child") {
      return count === 1 ? "Child" : "Children";
    }
    return count === 1 ? singular : plural;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
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

    const cleanedPassengers = passengers
      .filter((p) => p.count > 0)
      .map((p) => ({
        type: p.type,
        count: p.count,
      }));

    const apiData = {
      slices,
      passengers: cleanedPassengers,
      cabin_class: cabin,
    };

    try {
      const response = await fetch("/api/duffel/flight/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: apiData }),
      });

      if (response.ok) {
        const offer = await response.json();
        console.log("offer:", offer);

        navigateToFlightsPage({
          origin,
          destination,
          from: format(dates.from, "yyyy-MM-dd"),
          to: format(dates.to, "yyyy-MM-dd"),
          passengers: JSON.stringify(cleanedPassengers),
          cabin,
        });
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row lg:flex-row xl:flex-row gap-2"
        >
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <MapPinIcon className="absolute left-3 h-4 w-4" />
                    <Input
                      className="pl-10"
                      placeholder="Origin"
                      {...field}
                      value={field.value as string}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <MapPinIcon className="absolute left-3 h-4 w-4" />
                    <Input
                      className="pl-10"
                      placeholder="Destination"
                      {...field}
                      value={field.value as string}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-mx justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={date}
                      onSelect={(selected) => {
                        setDate(selected);
                        field.onChange(selected as DateRange);
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passengers"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-mx justify-start text-left font-normal")}
                    >
                      {passengers.map((p, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="flex items-center space-x-2 mx-2">
                            <p.icon className="mr-2 h-4 w-4" />
                            {p.count}
                          </span>
                        </div>
                      ))}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="grid grid-cols-1 gap-4 p-2 border font-medium rounded-lg shadow-sm"
                    align="start"
                  >
                    {passengers.map((p, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center space-x-3">
                          <p.icon className="h-5 w-5" />
                          <span>{pluralize(p.count, p.name)}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            size="icon"
                            variant="outline"
                            disabled={p.count === 0}
                            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                            onClick={() => {
                              handlePassengerChange(index, -1);
                              field.onChange(passengers);
                            }}
                          >
                            <MinusIcon className="h-5 w-5" />
                          </Button>
                          <span className="p-1 w-4 justify-center font-small">
                            {p.count}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                            onClick={() => {
                              handlePassengerChange(index, 1);
                              field.onChange(passengers);
                            }}
                          >
                            <PlusIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-1 w-full">
            <Button type="submit" className="w-full h-full">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

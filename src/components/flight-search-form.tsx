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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Passenger = [
  { type: "adult", name: "Adults", count: 1, icon: UserIcon },
  { type: "child", name: "Children", count: 0, icon: BabyIcon },
  { type: "infant_without_seat", name: "Infants", count: 0, icon: BabyIcon },
];

const FormSchema = z.object({
  origin: z.string().min(3),
  destination: z.string().min(3),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  passengers: z.number().min(1),
  cabin: z.string(),
  currency: z.string().min(3),
  sort: z.enum(["total_amount", "total_duration"]).default("total_amount"),
});

export default function FlightSearchForm() {
  const [counter, setCounter] = React.useState(0);
  const [passengers, setPassengers] = React.useState(Passenger);

  const handleIncrement = (index: number) => {
    console.log("Incrementing");
    const updatedPassengers = [...passengers];
    updatedPassengers[index].count++;
    setPassengers(updatedPassengers);
    setCounter((prev) => prev + 1);
  };

  const handleDecrement = (index: number) => {
    console.log("Decrementing");
    if (passengers[index].count > 0) {
      if (passengers[index].type === "adult" && passengers[index].count === 1) {
        return; // do nothing if adult count is 1
      }
      const updatedPassengers = [...passengers];
      updatedPassengers[index].count--;
      setPassengers(updatedPassengers);
      setCounter((prev) => prev - 1);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      passengers: 1,
      dates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
      cabin: "economy",
      currency: "CAD",
      sort: "total_amount",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { origin, destination, dates, passengers, cabin } = data;

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

    const passengerTypes = Array.from({ length: passengers }, () => ({
      type: "adult",
    }));

    const apiData = {
      slices,
      passengers: passengerTypes,
      cabin_class: cabin,
    };

    try {
      const response = await fetch("/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: apiData }),
      });

      if (response.ok) {
        const offer = await response.json();
        // Do something with the cheapest offer
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      // Display error message to user or send error report to server
    }
  };

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  return (
    <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-2"
          >
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
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
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="passengers"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center justify-between w-full"
                        >
                          {Passenger.map((p, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <p.icon className="h-5 w-5" />
                              <span className="p-2 font-medium">{p.count}</span>
                            </div>
                          ))}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="grid grid-cols-1 gap-4 p-2 border">
                        {Passenger.map((p, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center space-x-3">
                              <p.icon className="h-5 w-5" />
                              <span>{p.name}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Button size="icon" variant="outline">
                                <MinusIcon
                                  className="h-5 w-5"
                                  onClick={() => handleDecrement(index)}
                                />
                              </Button>
                              <span className="p-1 w-4 justify-center font-medium">
                                {p.count}
                              </span>
                              <Button size="icon" variant="outline">
                                <PlusIcon
                                  className="h-5 w-5"
                                  onClick={() => handleIncrement(index)}
                                />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
    </>
  );
}

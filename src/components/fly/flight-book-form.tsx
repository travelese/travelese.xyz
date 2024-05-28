"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import useNavigation from "@/hooks/navigation";
import { Passport } from "@kiwicom/orbit-components/lib/icons";
import {
  Calendar as CalendarIcon,
  UserCircleIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import { Order } from "@/types/api";

const FormSchema = z.object({
  passengers: z.array(
    z.object({
      id: z.string(),
      title: z.enum(["mr", "ms", "mrs", "miss", "dr"]),
      given_name: z.string().min(1, "Given name is required"),
      family_name: z.string().min(1, "Family name is required"),
      gender: z.enum(["m", "f"]),
      born_on: z.string().min(1, "Birth date is required"),
      phone_number: z.string().min(1, "Phone number is required"),
      email: z.string().email("Invalid email address"),
    })
  ),
  payments: z.array(
    z.object({
      amount: z.number().positive("Amount must be positive"),
      currency: z.string().length(3, "Currency must be 3 characters"),
      type: z.enum(["arc_basp_cash", "balance", "credit"]),
    })
  ),
  selected_offers: z.array(z.string().min(1, "Offer ID is required")),
});

const FlightBookForm = ({ selectedOffer }) => {
  const { toast } = useToast();
  const { navigateToBookPage } = useNavigation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      passengers: [
        {
          id: selectedOffer.passengers[0].id,
          title: "mr",
          given_name: "",
          family_name: "",
          gender: "m",
          born_on: "",
          phone_number: "",
          email: "",
        },
      ],
      payments: [
        {
          amount: selectedOffer ? Number(selectedOffer.total_amount) : 0,
          currency: selectedOffer ? selectedOffer.total_currency : "",
          type: "balance",
        },
      ],
      selected_offers: [],
    },
  });

  const onSubmit = async (
    data: z.infer<typeof FormSchema>,
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!selectedOffer) {
      console.error("No selected offer to proceed with booking");
      return;
    }

    console.log("Offer to book:", selectedOffer.id)

    const formData = {
      selected_offers: [selectedOffer.id],
      passengers: data.passengers,
      payments: data.payments,
    };

    console.log("Book form data:", formData);

    try {
      const response = await fetch("/api/fly/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Error:", response.status);
        return;
      }

      let order;
      try {
        order = await response.json();
        console.log("Order:", order);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return;
      }

      if (order) {
        toast({
          title: "Order booked successfully",
          description: "Rendering the Order...",
        });
        navigateToBookPage(order.id);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traveler Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="passengers.0.title"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mr">Mr</SelectItem>
                          <SelectItem value="ms">Ms</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="passengers.0.given_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center zoom-in-0">
                          <UserCircleIcon className="absolute left-3 h-4 w-4" />
                          <Input
                            className="pl-10"
                            placeholder="First name"
                            {...field}
                            value={field.value as string}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="passengers.0.family_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center zoom-in-0">
                          <UserCircleIcon className="absolute left-3 h-4 w-4" />
                          <Input
                            className="pl-10"
                            placeholder="Last name"
                            {...field}
                            value={field.value as string}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="passengers.0.gender"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m">Male</SelectItem>
                        <SelectItem value="f">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passengers.0.born_on"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center zoom-in-0">
                        <CalendarIcon className="absolute left-3 h-4 w-4" />
                        <Input
                          className="pl-10"
                          placeholder="Birth date"
                          {...field}
                          value={field.value as string}
                          type="date"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="passengers.0.phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center zoom-in-0">
                        <PhoneIcon className="absolute left-3 h-4 w-4" />
                        <Input
                          className="pl-10"
                          placeholder="Phone number"
                          {...field}
                          value={field.value as string}
                          type="tel"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passengers.0.email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center zoom-in-0">
                        <MailIcon className="absolute left-3 h-4 w-4" />
                        <Input
                          className="pl-10"
                          placeholder="Email"
                          {...field}
                          value={field.value as string}
                          type="email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 w-full">
              <Button type="submit" className="w-full h-full">
                Book
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FlightBookForm;

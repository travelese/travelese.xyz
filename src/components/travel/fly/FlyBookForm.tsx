"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Calendar as CalendarIcon,
  MailIcon,
  PhoneIcon,
  UserCircleIcon,
} from "lucide-react";

import useNavigation from "@/hooks/useNavigation";
import { useToast } from "@/hooks/useToast";
import type { Offer, Order } from "@duffel/api/types";
import { saveOrderToDatabase } from "@/hooks/saveOrderToDatabase";
import { sendOrderConfirmation } from "@/hooks/sendOrderConfirmation";

interface FlyBookFormProps {
  selectedOffer: Offer;
  onBookingSuccess: (order: Order) => void;
}

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
    }),
  ),
  payments: z.array(
    z.object({
      amount: z.number().positive("Amount must be positive"),
      currency: z.string().length(3, "Currency must be 3 characters"),
      type: z.enum(["arc_basp_cash", "balance", "credit"]),
    }),
  ),
  selected_offers: z.array(z.string().min(1, "Offer ID is required")),
});

export default function FlyBookForm({ selectedOffer }: FlyBookFormProps) {
  const { toast } = useToast();
  const { navigateToConfirmationPage } = useNavigation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      passengers: [
        {
          id: selectedOffer ? selectedOffer.id : "",
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

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (!selectedOffer) {
      return;
    }

    console.log("Offer to book:", selectedOffer.id);

    const passengerId = selectedOffer.passengers[0]?.id;

    if (!passengerId) {
      return;
    }

    const formData = {
      selected_offers: [selectedOffer.id],
      passengers: [
        {
          ...data.passengers[0],
          id: passengerId,
          type: selectedOffer.passengers[0].type,
        },
      ],
      payments: [
        {
          type: "balance",
          amount: selectedOffer.total_amount,
          currency: selectedOffer.total_currency,
        },
      ],
    };

    console.log("Book form data:", formData);

    try {
      const response = await fetch("/api/travel/fly/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create the booking.");
      }

      const order = await response.json();
      console.log("Order:", order);

      // Save order to database
      await saveOrderToDatabase(order);

      // Send confirmation email
      // await sendOrderConfirmation(order);

      toast({
        title: "Order booked successfully",
        description: "Redirecting to confirmation page...",
      });

      onBookingSuccess(order);
      navigateToConfirmationPage(order);
    } catch (error) {
      toast({
        title: "Booking failed",
        description: error.message,
        variant: "destructive",
      });
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
                            value={field.value}
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
                            value={field.value}
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
                          value={field.value}
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
                          value={field.value}
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
                          value={field.value}
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
}

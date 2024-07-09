"use client";

import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useSearchForm } from "@/hooks/useSearchForm";
import {
  OriginField,
  DestinationField,
  DatesField,
  PassengersField,
  CabinField,
} from "@/components/travel/SearchFormFields";
import Loading from "@/app/loading";

export default function FlySearchForm() {
  const [isClient, setIsClient] = useState(false);
  const { form, date, setDate, onSubmit } = useSearchForm();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row lg:flex-row xl:flex-row gap-2 p-4"
          >
            <div className="flex flex-col sm:flex-row gap-1 flex-grow">
              <OriginField control={form.control} />
              <DestinationField control={form.control} />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 flex-grow">
              <DatesField
                control={form.control}
                date={date}
                setDate={setDate}
              />
              <PassengersField control={form.control} />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <CabinField control={form.control} />
              <div className="flex-1 w-full min-w-[100px]">
                <Button type="submit" className="w-full h-full">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

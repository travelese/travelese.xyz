import React from "react";
import { DateRange } from "react-day-picker";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Seat, Accommodation } from "@kiwicom/orbit-components/icons";
import PlacesSelector from "@/components/travel/PlacesSelector";
import TravellerSelector from "@/components/travel/TravellerSelector";
import { DatePickerWithRange } from "@/components/travel/DateSelector";
import * as Sentry from "@sentry/nextjs";
import { posthog } from "posthog-js";

interface FieldProps {
  control: Control<any>;
  date?: DateRange | undefined;
  setDate?: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  searchType?: "fly" | "stay";
}

export const OriginField: React.FC<FieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="origin"
    render={({ field }) => (
      <FormItem className="flex-y-1 min-w-[125px]">
        <PlacesSelector
          value={field.value || ""}
          onSelect={(place) => {
            field.onChange(place);
          }}
          placeholder="Origin"
          type="origin"
        />
      </FormItem>
    )}
  />
);

export const DestinationField: React.FC<FieldProps> = ({
  control,
  searchType,
}) => (
  <FormField
    control={control}
    name={searchType === "stay" ? "location" : "destination"}
    render={({ field }) => (
      <FormItem className="flex-y-1 min-w-[125px]">
        <PlacesSelector
          value={
            field.value
              ? typeof field.value === "string"
                ? field.value
                : field.value.name || ""
              : ""
          }
          onSelect={(place) => {
            if (searchType === "stay" && typeof place === "object") {
              field.onChange(place);
            } else if (typeof place === "string") {
              field.onChange(place);
            }
          }}
          placeholder="Destination"
          type={searchType === "stay" ? "stay" : "destination"}
        />
      </FormItem>
    )}
  />
);

export const DatesField: React.FC<FieldProps> = ({
  control,
  date,
  setDate,
}) => (
  <FormField
    control={control}
    name="dates"
    render={({ field, fieldState }) => (
      <FormItem className="flex-y-1 min-w-[150px]">
        <DatePickerWithRange
          date={date}
          onDateChange={(newDate) => {
            setDate?.(newDate);
            field.onChange(newDate);
          }}
        />
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
);

export const TravellersField: React.FC<FieldProps> = ({
  control,
  searchType,
}) => (
  <FormField
    control={control}
    name={searchType === "stay" ? "guests" : "passengers"}
    render={({ field, fieldState }) => (
      <FormItem className="flex-y-1 min-w-[125px]">
        <TravellerSelector
          value={field.value}
          onChange={(newTravellers) => field.onChange(newTravellers)}
        />
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
);

export const CabinField: React.FC<FieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="cabin"
    render={({ field }) => (
      <FormItem className="lg:col-span-2">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-start text-left font-normal"
              >
                <Seat className="mr-2 h-4 w-4 shrink-0" />
                {field.value.charAt(0).toUpperCase() + field.value.slice(1)}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start" side="bottom">
            <Command>
              <CommandInput placeholder="Select cabin class" />
              <CommandList>
                <CommandGroup>
                  {["economy", "premium_economy", "business", "first"].map(
                    (cabin) => (
                      <CommandItem
                        key={cabin}
                        onSelect={() => field.onChange(cabin)}
                      >
                        {cabin.charAt(0).toUpperCase() + cabin.slice(1)}
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const RoomsField: React.FC<FieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="rooms"
    render={({ field }) => (
      <FormItem className="flex-y-1 min-w-[100px]">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-start text-left font-normal"
              >
                <Accommodation className="mr-2 h-4 w-4 shrink-0" />
                <span>
                  {field.value} Room{field.value !== 1 ? "s" : ""}
                </span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start" side="bottom">
            <Command>
              <CommandInput placeholder="Select rooms" />
              <CommandList>
                <CommandGroup>
                  {[1, 2, 3, 4, 5].map((room) => (
                    <CommandItem
                      key={room}
                      onSelect={() => field.onChange(room)}
                      className="text-sm"
                    >
                      <span>
                        {room} Room{room !== 1 ? "s" : ""}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);

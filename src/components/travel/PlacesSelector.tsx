"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ChevronsUpDown,
  PlaneTakeoffIcon,
  PlaneLandingIcon,
  HotelIcon,
} from "lucide-react";

import type { Place } from "@duffel/api/types/shared";

interface PlacesSelectorProps {
  value: string;
  onSelect: (iataCode: string, name: string) => void;
  placeholder: string;
  type: "origin" | "destination";
}

const PlacesSelector = React.forwardRef<HTMLButtonElement, PlacesSelectorProps>(
  ({ value, onSelect, placeholder, type }, ref) => {
    const [query, setQuery] = React.useState("");
    const [places, setPlaces] = React.useState<Place[]>([]);
    const [open, setOpen] = React.useState(false);

    const fetchPlaces = async (query: string) => {
      if (query.length < 1) {
        setPlaces([]);
        return;
      }
      try {
        const response = await fetch(
          `/api/travel/places?name=${encodeURIComponent(query)}`,
        );
        const result = await response.json();
        setPlaces(result.data || []);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]);
      }
    };

    React.useEffect(() => {
      fetchPlaces(query);
    }, [query]);

    const cities = places.filter((place) => place.type === "city");
    const airports = places.filter((place) => place.type === "airport");

    const IconComponent =
      type === "origin" ? PlaneTakeoffIcon : PlaneLandingIcon;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="w-full justify-start text-left font-normal"
          >
            <IconComponent className="mr-2 h-4 w-4 shrink-0" />
            <span className="text-sm">{value || placeholder}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start" side="bottom">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search places..."
              onValueChange={setQuery}
              value={query}
              className="h-9"
            />
            <CommandList>
              {cities.length > 0 && (
                <CommandGroup heading="Cities" className="px-1 py-2">
                  {cities.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.id}
                      onSelect={() => {
                        onSelect(city.iata_code!, city.name);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <HotelIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <span>{city.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {city.iata_code}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {airports.length > 0 && (
                <CommandGroup heading="Airports" className="px-1 py-2">
                  {airports.map((airport) => (
                    <CommandItem
                      key={airport.id}
                      value={airport.id}
                      onSelect={() => {
                        onSelect(airport.iata_code!, airport.name);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <IconComponent className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <span>{airport.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {airport.iata_code}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

PlacesSelector.displayName = "PlacesSelector";

export default PlacesSelector;

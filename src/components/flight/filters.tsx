// File: /src/components/flight/filters.tsx
// Description: This file contains the component for displaying flight search filters.

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FiltersProps {
  filterCriteria: any;
  handleFilterChange: (
    filterType: keyof typeof filterCriteria,
    value: string
  ) => void;
  setFilterCriteria: React.Dispatch<React.SetStateAction<any>>;
}

const Filters: React.FC<FiltersProps> = ({
  filterCriteria,
  handleFilterChange,
  setFilterCriteria,
}) => (
  <Accordion collapsible type="single">
    <AccordionItem value="departure">
      <AccordionTrigger className="text-base font-medium">
        Departure Time
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-2">
          {["Anytime", "Morning", "Afternoon", "Evening"].map((time) => (
            <Label key={time} className="flex items-center gap-2 font-normal">
              <Checkbox
                id={`departure-${time.toLowerCase()}`}
                checked={filterCriteria.departureTimes.has(time)}
                onChange={() => handleFilterChange("departureTimes", time)}
              />
              {time}{" "}
              {time === "Morning"
                ? "(6am - 12pm)"
                : time === "Afternoon"
                ? "(12pm - 6pm)"
                : time === "Evening"
                ? "(6pm - 12am)"
                : ""}
            </Label>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="arrival">
      <AccordionTrigger className="text-base font-medium">
        Arrival Time
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-2">
          {["Anytime", "Morning", "Afternoon", "Evening"].map((time) => (
            <Label key={time} className="flex items-center gap-2 font-normal">
              <Checkbox
                id={`arrival-${time.toLowerCase()}`}
                checked={filterCriteria.arrivalTimes.has(time)}
                onChange={() => handleFilterChange("arrivalTimes", time)}
              />
              {time}{" "}
              {time === "Morning"
                ? "(6am - 12pm)"
                : time === "Afternoon"
                ? "(12pm - 6pm)"
                : time === "Evening"
                ? "(6pm - 12am)"
                : ""}
            </Label>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="stops">
      <AccordionTrigger className="text-base font-medium">
        Stops
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-2">
          {["Direct", "1", "2", "3+"].map((stop) => (
            <Label key={stop} className="flex items-center gap-2 font-normal">
              <Checkbox
                id={`stops-${stop.toLowerCase()}`}
                checked={filterCriteria.stops.has(stop)}
                onChange={() => handleFilterChange("stops", stop)}
              />
              {stop} {stop === "1" && "Stop"}
              {stop !== "Direct" && stop !== "1" && " Stops"}
            </Label>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="price">
      <AccordionTrigger className="text-base font-medium">
        Price
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span>$66</span>
            <span>$66666</span>
          </div>
          <Slider
            defaultValue={[666, 666666]}
            max={666666}
            min={666}
            step={666}
            value={filterCriteria.priceRange}
            onValueChange={(range) =>
              setFilterCriteria((prev: any) => ({
                ...prev,
                priceRange: range,
              }))
            }
          />
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="options">
      <AccordionTrigger className="text-base font-medium">
        Options
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-2">
          {["Roundtrip", "Flexible", "Refundable"].map((option) => (
            <Label key={option} className="flex items-center gap-2 font-normal">
              <Checkbox
                id={`option-${option.toLowerCase()}`}
                checked={filterCriteria.options.has(option)}
                onChange={() => handleFilterChange("options", option)}
              />
              {option}
            </Label>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default Filters;

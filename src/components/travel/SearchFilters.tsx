"use client";

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

export default function SearchFilters() {
  return (
    <Accordion collapsible type="single">
      <AccordionItem value="departure">
        <AccordionTrigger className="text-base font-medium">
          Departure Time
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="departure-anytime" />
              Anytime
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="departure-morning" />
              Morning (6am - 12pm)
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="departure-afternoon" />
              Afternoon (12pm - 6pm)
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="departure-evening" />
              Evening (6pm - 12am)
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="arrival">
        <AccordionTrigger className="text-base font-medium">
          Arrival Time
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="arrival-anytime" />
              Anytime
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="arrival-morning" />
              Morning (6am - 12pm)
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="arrival-afternoon" />
              Afternoon (12pm - 6pm)
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="arrival-evening" />
              Evening (6pm - 12am)
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="stops">
        <AccordionTrigger className="text-base font-medium">
          Stops
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="stops-direct" />
              Direct
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="stops-1" />1 Stop
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="stops-2" />2 Stops
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="stops-3" />
              3+ Stops
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger className="text-base">Price</AccordionTrigger>
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
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="option-roundtrip" />
              Roundtrip
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="option-flexible" />
              Flexible Dates
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="option-refundable" />
              Refundable
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

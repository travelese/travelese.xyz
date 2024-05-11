import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { ListOrderedIcon, FilterIcon, ArrowRightIcon } from "lucide-react";
import FlightSearchForm from "@/components/flight-search-form";



export default function FlightSearchResults() {
  return (
    <div>
      <div className="w-full max-w-5xl mx-auto">
        <FlightSearchForm />
      </div>
      <div>
        <div className="grid grid-cols-[240px_1fr] gap-8 min-h-screen p-6 md:p-10 border">
          <div className="space-y-6">
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Filters</h2>
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
                  <AccordionTrigger className="text-base">
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
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Flight Search Results</h1>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <ListOrderedIcon className="w-4 h-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup value="price">
                      <DropdownMenuRadioItem value="price">
                        Price: Low to High
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-desc">
                        Price: High to Low
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="duration">
                        Duration
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="stops">
                        Stops
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="flex items-center gap-2" variant="outline">
                  <FilterIcon className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
                    <div className="w-2/3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">YTO</div>
                        <ArrowRightIcon className="w-4 h-4" />
                        <div className="text-lg font-bold">TYO</div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>Toronto to Tokyo</div>
                        <div>1 Stop</div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>Apr 2, 2024 - 8:00 AM</div>
                        <div>Apr 2, 2024 - 5:30 PM</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        1 Carry-on, 1 Checked Bag
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3 space-y-2 border-l border-dashed pl-4">
                      <div className="text-lg font-bold">Total: $666</div>
                      <Button>Book</Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Flight Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Departure</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">YTO</div>
                        <ArrowRightIcon className="w-4 h-4" />
                        <div className="text-lg font-bold">TYO</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Toronto to Tokyo
                      </div>
                      <div className="text-sm text-gray-500">
                        Apr 2, 2024 - 8:00 AM
                      </div>
                      <div className="text-sm text-gray-500">1 Stop</div>
                      <div className="text-sm text-gray-500">
                        1 Carry-on, 1 Checked Bag
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Return</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">TYO</div>
                        <ArrowRightIcon className="w-4 h-4" />
                        <div className="text-lg font-bold">YTO</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Tokyo to Toronto
                      </div>
                      <div className="text-sm text-gray-500">
                        Apr 9, 2024 - 6:00 PM
                      </div>
                      <div className="text-sm text-gray-500">Nonstop</div>
                      <div className="text-sm text-gray-500">
                        1 Carry-on, 1 Checked Bag
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex items-center justify-between w-full">
                      <div className="text-lg font-bold">Total: $666</div>
                      <Button>Book Now</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
                    <div className="w-2/3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">YTO</div>
                        <ArrowRightIcon className="w-4 h-4" />
                        <div className="text-lg font-bold">MIL</div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>Toronto to Milan</div>
                        <div>Nonstop</div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>Apr 2, 2024 - 6:00 AM</div>
                        <div>Apr 2, 2024 - 11:30 AM</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        1 Carry-on, 1 Checked Bag
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3 space-y-2 border-l border-dashed border-gray-200 dark:border-gray-800 pl-4">
                      <div className="text-lg font-bold">Total: $666</div>
                      <Button>Book</Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Flight Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Departure</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">YTO</div>
                        <ArrowRightIcon className="w-4 h-4" />
                        <div className="text-lg font-bold">MIL</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Toronto to Milan
                      </div>
                      <div className="text-sm text-gray-500">
                        Apr 2, 2024 - 6:00 AM
                      </div>
                      <div className="text-sm text-gray-500">Nonstop</div>
                      <div className="text-sm text-gray-500">
                        1 Carry-on, 1 Checked Bag
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Return</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">MIL</div>
                        <ArrowRightIcon className="w-4 h-4" />
                        <div className="text-lg font-bold">YTO</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Toronto to Milan
                      </div>
                      <div className="text-sm text-gray-500">
                        Apr 9, 2024 - 8:00 AM
                      </div>
                      <div className="text-sm text-gray-500">Nonstop</div>
                      <div className="text-sm text-gray-500">
                        1 Carry-on, 1 Checked Bag
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex items-center justify-between w-full">
                      <div className="text-lg font-bold">Total: $666</div>
                      <Button>Book Now</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

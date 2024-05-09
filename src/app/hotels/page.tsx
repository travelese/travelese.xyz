import Image from "next/image";
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
import { FilterIcon, ListOrderedIcon, StarIcon } from "lucide-react";
import HotelSearchForm from "@/components/hotel-search-form";

export default function Component() {
  return (
    <div>
      <div className="w-full max-w-5xl mx-auto">
        <HotelSearchForm />
      </div>
      <div>
        <div className="grid grid-cols-[240px_1fr] gap-8 p-6 min-h-screen md:p-10 border">
          <div className="space-y-6">
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Accordion collapsible type="single">
                <AccordionItem value="room-type">
                  <AccordionTrigger className="text-base font-medium">
                    Room Type
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="room-type-standard" />
                        Standard
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="room-type-suite" />
                        Suite
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="room-type-villa" />
                        Villa
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="room-type-family" />
                        Family
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bed-type">
                  <AccordionTrigger className="text-base font-medium">
                    Bed Type
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="bed-type-king" />
                        King
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="bed-type-queen" />
                        Queen
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="bed-type-double" />
                        Double
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="bed-type-twin" />
                        Twin
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="amenities">
                  <AccordionTrigger className="text-base font-medium">
                    Amenities
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="amenity-pool" />
                        Pool
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="amenity-gym" />
                        Gym
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="amenity-spa" />
                        Spa
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="amenity-restaurant" />
                        Restaurant
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
                        <span>$100</span>
                        <span>$1000</span>
                      </div>
                      <Slider
                        defaultValue={[100, 1000]}
                        max={1000}
                        min={100}
                        step={50}
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
                        <Checkbox id="option-breakfast" />
                        Breakfast Included
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="option-refundable" />
                        Refundable
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="option-pet-friendly" />
                        Pet Friendly
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Hotel Search Results</h1>
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
                      <DropdownMenuRadioItem value="rating">
                        Rating
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="distance">
                        Distance
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
                        <Image
                          alt="Hotel"
                          className="rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                          height={100}
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "150/100",
                            objectFit: "cover",
                          }}
                          width={150}
                        />
                        <div className="text-lg font-bold">The Grand Hotel</div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>San Francisco, CA</div>
                        <div>
                          4.5 <StarIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>Apr 2, 2024 - Apr 5, 2024</div>
                        <div>3 Nights</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Standard Room, 1 King Bed
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3 space-y-2 border-l border-dashed border-gray-200 dark:border-gray-800 pl-4">
                      <div className="text-lg font-bold">$499</div>
                      <Button>Book</Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Hotel Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-bold">The Grand Hotel</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500">
                          San Francisco, CA
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Apr 2, 2024 - Apr 5, 2024
                      </div>
                      <div className="text-sm text-gray-500">3 Nights</div>
                      <div className="text-sm text-gray-500">
                        Standard Room, 1 King Bed
                      </div>
                      <div className="text-sm text-gray-500">
                        Amenities: Pool, Gym, Restaurant
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Room Details</h3>
                      <div className="text-sm text-gray-500">
                        Standard Room, 1 King Bed
                      </div>
                      <div className="text-sm text-gray-500">
                        Room Size: 350 sq ft
                      </div>
                      <div className="text-sm text-gray-500">
                        City View, Non-Smoking
                      </div>
                      <div className="text-sm text-gray-500">
                        Amenities: Free WiFi, TV, Minibar
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex items-center justify-between w-full">
                      <div className="text-lg font-bold">Total: $499</div>
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
                        <Image
                          alt="Hotel"
                          className="rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                          height={100}
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "150/100",
                            objectFit: "cover",
                          }}
                          width={150}
                        />
                        <div className="text-lg font-bold">
                          The Beach Resort
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>Miami, FL</div>
                        <div>
                          4.2 <StarIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>Apr 2, 2024 - Apr 5, 2024</div>
                        <div>3 Nights</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Ocean View Suite, 1 King Bed
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3 space-y-2 border-l border-dashed border-gray-200 dark:border-gray-800 pl-4">
                      <div className="text-lg font-bold">$799</div>
                      <Button>Book</Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Hotel Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-bold">The Beach Resort</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500">Miami, FL</div>
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Apr 2, 2024 - Apr 5, 2024
                      </div>
                      <div className="text-sm text-gray-500">3 Nights</div>
                      <div className="text-sm text-gray-500">
                        Ocean View Suite, 1 King Bed
                      </div>
                      <div className="text-sm text-gray-500">
                        Amenities: Pool, Spa, Restaurant
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Room Details</h3>
                      <div className="text-sm text-gray-500">
                        Ocean View Suite, 1 King Bed
                      </div>
                      <div className="text-sm text-gray-500">
                        Room Size: 550 sq ft
                      </div>
                      <div className="text-sm text-gray-500">
                        Ocean View, Non-Smoking
                      </div>
                      <div className="text-sm text-gray-500">
                        Amenities: Free WiFi, TV, Minibar, Balcony
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex items-center justify-between w-full">
                      <div className="text-lg font-bold">Total: $799</div>
                      <Button>Book Now</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { BuildingIcon, StarIcon, MinusIcon, PlusIcon } from "lucide-react";

export default function Hotel() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white dark:bg-gray-950">
      <main className="grid gap-8">
        <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8">
              <section className="flex flex-col lg:flex-col gap-4">
                <div className="w-full">
                  <form className="flex flex-col sm:flex-row w-full gap-4 bg-white dark:bg-gray-950 shadow rounded-lg p-6">
                    <div className="flex-1 space-y-2">
                      <Input name="destination" placeholder="Destination" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input name="check-in" placeholder="Check-in date" />
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Calendar />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input
                            name="check-out"
                            placeholder="Select check-out date"
                          />
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Calendar />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Select name="guests">
                        <SelectTrigger>
                          <SelectValue placeholder="Guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <span>Adults</span>
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline">
                                  <MinusIcon className="h-4 w-4" />
                                </Button>
                                <span>1</span>
                                <Button size="icon" variant="outline">
                                  <PlusIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Children</span>
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline">
                                  <MinusIcon className="h-4 w-4" />
                                </Button>
                                <span>0</span>
                                <Button size="icon" variant="outline">
                                  <PlusIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Infants</span>
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline">
                                  <MinusIcon className="h-4 w-4" />
                                </Button>
                                <span>0</span>
                                <Button size="icon" variant="outline">
                                  <PlusIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <Button type="submit">Search Hotels</Button>
                    </div>
                  </form>
                </div>
                <div className="w-full">
                  <Card>
                    <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mt-3">
                          <BuildingIcon className="w-5 h-5" />
                          <div>
                            <div className="font-semibold">
                              The Ritz-Carlton
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                              New York, NY
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <StarIcon className="w-4 h-4 fill-primary" />
                          <span>4.9 (1,234 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">$399/night</div>
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

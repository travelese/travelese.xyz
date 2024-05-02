import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";

export default function Flight() {
  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <form className="flex w-full md:w-auto gap-4 bg-white dark:bg-gray-950 shadow rounded-lg p-6">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="departure">Departure</Label>
                  <Input id="departure" placeholder="Leaving from" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="arrival">Arrival</Label>
                  <Input id="arrival" placeholder="Going to" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="departure-date">Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        id="departure-date"
                        placeholder="Select departure date"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="return-date">Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        id="return-date"
                        placeholder="Select return date"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select id="passengers">
                    <SelectTrigger>
                      <SelectValue placeholder="Passengers" />
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
                <div className="flex-1 space-y-2">
                  <Label htmlFor="trip-type">Trip Type</Label>
                  <Select defaultValue="roundtrip" id="trip-type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roundtrip">Roundtrip</SelectItem>
                      <SelectItem value="oneway">One-way</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Button type="submit">
                    Search Flights
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <PlaneIcon className="w-5 h-5" />
                    <span className="font-semibold">American Airlines</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span>8:00 AM</span>
                    <ArrowRightIcon className="w-4 h-4" />
                    <span>11:30 AM</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$399</div>
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <PlaneIcon className="w-5 h-5" />
                    <span className="font-semibold">Delta Airlines</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span>6:00 AM</span>
                    <ArrowRightIcon className="w-4 h-4" />
                    <span>10:00 AM</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$499</div>
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <PlaneIcon className="w-5 h-5" />
                    <span className="font-semibold">United Airlines</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span>9:00 AM</span>
                    <ArrowRightIcon className="w-4 h-4" />
                    <span>12:30 PM</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$449</div>
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
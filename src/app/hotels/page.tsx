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

export default function Component() {
  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <form className="flex w-full md:w-auto gap-4 bg-white dark:bg-gray-950 shadow rounded-lg p-6">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="Enter destination" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="check-in">Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input id="check-in" placeholder="Select check-in date" />
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="check-out">Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        id="check-out"
                        placeholder="Select check-out date"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="guests">Guests</Label>
                  <Select id="guests">
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
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
          </div>
          <div className="grid gap-4">
            <Card>
              <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-semibold">The Ritz-Carlton</div>
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
            <Card>
              <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-semibold">The Ritz-Carlton</div>
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
            <Card>
              <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-semibold">The Ritz-Carlton</div>
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
        </div>
      </div>
    </div>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

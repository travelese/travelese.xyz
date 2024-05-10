import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-picker";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function FlightSearchForm() {
  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input name="departure" placeholder="Departure City" />
          <Input name="arrival" placeholder="Arrival City" />
          <DatePickerWithRange />
          <Select name="passengers">
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
          <Select defaultValue="roundtrip" name="trip-type">
            <SelectTrigger>
              <SelectValue placeholder="Select trip type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="roundtrip">Roundtrip</SelectItem>
              <SelectItem value="oneway">One-way</SelectItem>
            </SelectContent>
          </Select>
          <Button>Search</Button>
        </div>
      </div>
    </div>
  );
}

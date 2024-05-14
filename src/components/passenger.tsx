"use client";

import React from "react";
import { UserIcon, BabyIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

const Passenger = [
  { type: "adult", name: "Adults", count: 1, icon: UserIcon },
  { type: "child", name: "Children", count: 0, icon: BabyIcon },
  { type: "infant_without_seat", name: "Infants", count: 0, icon: BabyIcon },
];

export default function Passengers() {
  const [counter, setCounter] = React.useState(0);
  const [passengers, setPassengers] = React.useState(Passenger);

  const handleIncrement = (index: number) => {
    console.log("Incrementing");
    const updatedPassengers = [...passengers];
    updatedPassengers[index].count++;
    setPassengers(updatedPassengers);
    setCounter((prev) => prev + 1);
  };

  const handleDecrement = (index: number) => {
    console.log("Decrementing");
    if (passengers[index].count > 0) {
      if (passengers[index].type === "adult" && passengers[index].count === 1) {
        return; // do nothing if adult count is 1
      }
      const updatedPassengers = [...passengers];
      updatedPassengers[index].count--;
      setPassengers(updatedPassengers);
      setCounter((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <Popover>
        <div className="rounded-lg shadow-lg p-6 max-w-md">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-between w-full"
            >
              {Passenger.map((p, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <p.icon className="h-5 w-5" />
                  <span className="p-2 font-medium">{p.count}</span>
                </div>
              ))}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="grid grid-cols-1 gap-4 p-4 border">
            {Passenger.map((p, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center space-x-3">
                  <p.icon className="h-5 w-5" />
                  <span>{p.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button size="icon" variant="outline">
                    <MinusIcon
                      className="h-5 w-5"
                      onClick={() => handleDecrement(index)}
                    />
                  </Button>
                  <span className="p-1 w-4 justify-center font-medium">
                    {p.count}
                  </span>
                  <Button size="icon" variant="outline">
                    <PlusIcon
                      className="h-5 w-5"
                      onClick={() => handleIncrement(index)}
                    />
                  </Button>
                </div>
              </div>
            ))}
          </PopoverContent>
        </div>
      </Popover>
    </div>
  );
}

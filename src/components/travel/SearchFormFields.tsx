import React from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Control } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Seat } from '@kiwicom/orbit-components/icons'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import PlacesSelector from '@/components/travel/PlacesSelector'
import PassengerSelector from '@/components/travel/PassengerSelector'

interface FieldProps {
  control: Control<any>
  date?: DateRange | undefined
  setDate?: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export const OriginField: React.FC<FieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="origin"
    render={({ field, fieldState }) => (
      <FormItem className="flex-y-1 min-w-[125px]">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <PlacesSelector
                value={field.value}
                onSelect={(iataCode) => field.onChange(iataCode)}
                placeholder="Origin"
                type="origin"
              />
            </FormControl>
          </PopoverTrigger>
        </Popover>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
)

export const DestinationField: React.FC<FieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="destination"
    render={({ field, fieldState }) => (
      <FormItem className="flex-y-1 min-w-[125px]">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <PlacesSelector
                value={field.value}
                onSelect={(iataCode) => field.onChange(iataCode)}
                placeholder="Destination"
                type="destination"
              />
            </FormControl>
          </PopoverTrigger>
        </Popover>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
)

export const DatesField: React.FC<FieldProps> = ({
  control,
  date,
  setDate,
}) => (
  <FormField
    control={control}
    name="dates"
    render={({ field, fieldState }) => (
      <FormItem className="flex-y-1 min-w-[150px]">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={field.value?.from}
              selected={date}
              onSelect={(selected) => {
                setDate?.(selected as DateRange | undefined)
                field.onChange(selected)
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
)

export const PassengersField: React.FC<FieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="passengers"
    render={({ field, fieldState }) => (
      <FormItem className="flex-y-1 min-w-[125px]">
        <PassengerSelector
          value={field.value as any}
          onChange={(newPassengers) => field.onChange(newPassengers)}
        />
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )}
  />
)

export const CabinField: React.FC<FieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="cabin"
    render={({ field }) => (
      <FormItem className="lg:col-span-2">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-start text-left font-normal"
              >
                <Seat className="mr-2 h-4 w-4 shrink-0" />
                {field.value.charAt(0).toUpperCase() + field.value.slice(1)}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start" side="bottom">
            <Command>
              <CommandInput placeholder="Select cabin class" />
              <CommandList>
                <CommandGroup>
                  <CommandItem onSelect={() => field.onChange('economy')}>
                    Economy
                  </CommandItem>
                  <CommandItem
                    onSelect={() => field.onChange('premium_economy')}
                  >
                    Premium Economy
                  </CommandItem>
                  <CommandItem onSelect={() => field.onChange('business')}>
                    Business
                  </CommandItem>
                  <CommandItem onSelect={() => field.onChange('first')}>
                    First
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
)

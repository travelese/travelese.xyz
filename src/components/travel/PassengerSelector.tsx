import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { MinusIcon, PlusIcon, UserIcon } from 'lucide-react'
import { Child } from '@kiwicom/orbit-components/icons'
import { Infant } from '@kiwicom/orbit-components/icons'

import type { DuffelPassengerType } from '@duffel/api/types'

const pluralize = (type: DuffelPassengerType, count: number): string => {
  switch (type) {
    case 'child':
      return count === 1 ? 'Child' : 'Children'
    case 'infant_without_seat':
      return count === 1 ? 'Infant' : 'Infants'
    default:
      return count === 1 ? 'Adult' : 'Adults'
  }
}

const getPassengerIcon = (type: DuffelPassengerType) => {
  switch (type) {
    case 'child':
      return <Child className="h-4 w-4" />
    case 'infant_without_seat':
      return <Infant className="h-4 w-4" />
    default:
      return <UserIcon className="h-4 w-4" />
  }
}

interface PassengerSelectorProps {
  value: DuffelPassengerType[]
  onChange: (passengers: DuffelPassengerType[]) => void
}

export default function PassengerSelector({
  value = [],
  onChange,
}: PassengerSelectorProps): React.ReactElement {
  const handlePassengerChange = (type: DuffelPassengerType, change: number) => {
    const updatedPassengers = [...value]

    if (change > 0) {
      updatedPassengers.push(type)
    } else {
      const index = updatedPassengers.indexOf(type)
      if (index !== -1) {
        updatedPassengers.splice(index, 1)
      }
    }

    // Ensure at least one adult is always present
    if (type === 'adult' && !updatedPassengers.includes('adult')) {
      return
    }

    onChange(updatedPassengers)
  }

  const passengerCounts = value.reduce<{
    [key in DuffelPassengerType]: number
  }>(
    (acc, type) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    },
    {
      adult: 0,
      child: 0,
      infant_without_seat: 0,
    },
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {(
            ['adult', 'child', 'infant_without_seat'] as DuffelPassengerType[]
          ).map((type) => (
            <span key={type} className="flex items-center space-x-2 mx-2">
              {getPassengerIcon(type)}
              <span className="text-sm">{passengerCounts[type]}</span>
            </span>
          ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-3 border font-normal rounded-lg shadow-sm"
        align="start"
        side="bottom"
      >
        <div className="space-y-4">
          {(
            ['adult', 'child', 'infant_without_seat'] as DuffelPassengerType[]
          ).map((type) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getPassengerIcon(type)}
                <span className="text-sm font-medium">
                  {pluralize(type, passengerCounts[type])}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={passengerCounts[type] === 0}
                  className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                  onClick={() => handlePassengerChange(type, -1)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-sm w-4 text-center">
                  {passengerCounts[type]}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                  onClick={() => handlePassengerChange(type, 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

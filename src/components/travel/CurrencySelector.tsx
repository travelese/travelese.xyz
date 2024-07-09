import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

export default function CurrencySelector() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currency = searchParams.get('currency') || 'USD'

  const setCurrency = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('currency', value)
    router.push('?' + params.toString())
  }

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="EUR">EUR</SelectItem>
        <SelectItem value="CAD">CAD</SelectItem>
      </SelectContent>
    </Select>
  )
}

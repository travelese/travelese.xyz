import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Code2Icon,
  CopyIcon,
  MoveVerticalIcon,
} from 'lucide-react'

export default function FlyPriceCard() {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Booking Reference: RZPNX8
            <Button
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              size="icon"
              variant="outline"
            >
              <CopyIcon className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Created on{' '}
            <time dateTime="2024-04-11T15:48:11Z">April 11, 2024</time>
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button className="h-8 gap-1" size="sm" variant="outline">
            <Code2Icon className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              GDS
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8" size="icon" variant="outline">
                <MoveVerticalIcon className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Price Details (CAD)</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Base Amount</span>
              <span>CAD $60.60</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>CAD $30.20</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Seat Cost</span>
              <span>CAD $15.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>CAD $90.80</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Service Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Service Type</span>
              <span>Seat</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Service Amount</span>
              <span>CAD $15.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Seat Designator</span>
              <span>14B</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Payment Status</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Price Guarantee Expires At
              </span>
              <span>
                <time dateTime="2024-01-17T10:42:14.545Z">
                  January 17, 2024
                </time>
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Required By</span>
              <span>
                <time dateTime="2024-01-17T10:42:14.545Z">
                  January 17, 2024
                </time>
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Status</span>
              <span>Awaiting Payment</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Conditions</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Change Before Departure
              </span>
              <span>CAD $100.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Refund Before Departure
              </span>
              <span>CAD $100.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Changes</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">New Total Amount</span>
              <span>CAD $121.30</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Change Total Amount</span>
              <span>CAD $30.50</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Refund Amount</span>
              <span>CAD $90.80</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Penalty Total Amount
              </span>
              <span>CAD $15.50</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2024-05-25">May 25, 2024</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button className="h-6 w-6" size="icon" variant="outline">
                <ChevronLeftIcon className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button className="h-6 w-6" size="icon" variant="outline">
                <ChevronRightIcon className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}
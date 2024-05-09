import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BookIcon,
  DollarSignIcon,
  MoveHorizontalIcon,
  StarIcon,
} from "lucide-react";

export default function Bookings() {
  return (
    <main className="flex-1">
      <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Bookings</CardTitle>
              <BookIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,234</div>
              <p className="text-sm">
                +5.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Pending Bookings</CardTitle>
              <BookIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">234</div>
              <p className="text-sm">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Cancelled Bookings</CardTitle>
              <BookIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">56</div>
              <p className="text-sm">
                -1.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Revenue</CardTitle>
              <DollarSignIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$234,567</div>
              <p className="text-sm">
                +7.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Average Booking Value</CardTitle>
              <DollarSignIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$195</div>
              <p className="text-sm">
                +3.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Customer Satisfaction</CardTitle>
              <StarIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">4.8/5</div>
              <p className="text-sm">
                +0.2 from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button size="icon" variant="ghost">
                <MoveHorizontalIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-12 text-center">
                <TableRow>
                  <TableCell className="font-medium">
                    <Link className="hover:underline" href="#">
                      #12345
                    </Link>
                  </TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>2023-05-01</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Confirmed</Badge>
                  </TableCell>
                  <TableCell>$1,200</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link className="hover:underline" href="#">
                      #12346
                    </Link>
                  </TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>2023-04-28</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>$800</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link className="hover:underline" href="#">
                      #12347
                    </Link>
                  </TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>2023-04-22</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Cancelled</Badge>
                  </TableCell>
                  <TableCell>$1,500</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Restore</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </main>
  );
}

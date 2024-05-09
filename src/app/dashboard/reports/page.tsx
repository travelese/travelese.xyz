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
  DollarSignIcon,
  StarIcon,
  BookIcon,
  MoveHorizontalIcon,
} from "lucide-react";

export default function Reports() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Revenue</CardTitle>
              <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$234,567</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                +7.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Average Booking Value</CardTitle>
              <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$195</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                +3.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Customer Satisfaction</CardTitle>
              <StarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">4.8/5</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                +0.2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Bookings</CardTitle>
              <BookIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,234</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                +5.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Pending Bookings</CardTitle>
              <BookIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">234</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Cancelled Bookings</CardTitle>
              <BookIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">56</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                -1.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <Button size="icon" variant="ghost">
                <MoveHorizontalIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link className="hover:underline" href="#">
                      #12345
                    </Link>
                  </TableCell>
                  <TableCell>Monthly Sales Report</TableCell>
                  <TableCell>2023-05-01</TableCell>
                  <TableCell>
                    <Badge variant="success">Completed</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
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
                  <TableCell>Customer Satisfaction Survey</TableCell>
                  <TableCell>2023-04-28</TableCell>
                  <TableCell>
                    <Badge variant="warning">In Progress</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
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
                  <TableCell>Quarterly Financial Report</TableCell>
                  <TableCell>2023-04-22</TableCell>
                  <TableCell>
                    <Badge variant="danger">Cancelled</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
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

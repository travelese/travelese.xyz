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
  UsersIcon,
  SettingsIcon,
  ReceiptIcon,
  MoveHorizontalIcon,
} from "lucide-react";

export default function Expensese() {
  return (
    <main className="flex-1">
      <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Total Expenses</CardTitle>
              <ReceiptIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$234,567</div>
              <p className="text-sm">
                +5.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Pending Expenses</CardTitle>
              <ReceiptIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$12,345</div>
              <p className="text-sm">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Rejected Expenses</CardTitle>
              <ReceiptIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$2,345</div>
              <p className="text-sm">
                -1.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Employee Expenses</CardTitle>
              <UsersIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$156,789</div>
              <p className="text-sm">
                +7.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Average Expense</CardTitle>
              <DollarSignIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$95</div>
              <p className="text-sm">
                +3.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Policy Compliance</CardTitle>
              <SettingsIcon className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">92%</div>
              <p className="text-sm">
                +0.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Recent Expenses</CardTitle>
              <Button size="icon" variant="ghost">
                <MoveHorizontalIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
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
                  <TableCell>John Doe</TableCell>
                  <TableCell>2023-05-01</TableCell>
                  <TableCell>Travel</TableCell>
                  <TableCell>$1,200</TableCell>
                  <TableCell>
                    <Badge variant="success">Approved</Badge>
                  </TableCell>
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
                        <DropdownMenuItem>Reject</DropdownMenuItem>
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
                  <TableCell>Office Supplies</TableCell>
                  <TableCell>$800</TableCell>
                  <TableCell>
                    <Badge variant="warning">Pending</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
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
                  <TableCell>Marketing</TableCell>
                  <TableCell>$1,500</TableCell>
                  <TableCell>
                    <Badge variant="danger">Rejected</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoveHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem />
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

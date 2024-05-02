import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function MainNav() {
  return (
    <div className="bg-white dark:bg-gray-950 shadow">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <nav className="flex items-center justify-between">
          <Link
            className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white
              to-gray-500"
            href="/"
          >
            Travelese
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/flights"
            >
              Flights
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/hotels"
            >
              Hotels
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  Login
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full max-w-sm p-4">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                      Enter your email below to login to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="m@example.com"
                          required
                          type="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link
                            className="ml-auto inline-block text-sm underline"
                            href="#"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <Input id="password" required type="password" />
                      </div>
                      <Button className="w-full" type="submit">
                        Login
                      </Button>
                      <Button className="w-full" variant="outline">
                        Login with Google
                      </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?
                      <Link className="underline" href="#">
                        Sign up
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}

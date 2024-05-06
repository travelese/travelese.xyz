import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoginButtonGithub, LoginButtonGoogle } from "@/components/login-button";

export function Auth() {
  return (
    <div>
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
                <LoginButtonGithub />
                <LoginButtonGoogle />
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
    </div>
  );
}

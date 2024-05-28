import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LoginButtonGithub,
  LoginButtonGoogle,
} from "@/components/login-button";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="armin.babaei@me.com"
                required
                type="email"
              />
            </div>
            <div className="grid gap-2">
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
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

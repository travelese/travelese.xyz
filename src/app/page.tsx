import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import FlySearchForm from "@/components/travel/fly/FlySearchForm";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-muted-foreground">
                  Discover the World with Travelese
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Smartest way to book your next trip.
                </p>
              </div>
              <div className="mx-auto max-w-6xl">
                <Tabs
                  defaultValue="fly"
                  className="rounded-lg border shadow-sm"
                >
                  <TabsList className="grid w-full grid-cols-2 divide-x">
                    <TabsTrigger value="fly" className="w-full">
                      <PlaneTakeoffIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      Fly
                    </TabsTrigger>
                    <TabsTrigger value="stay" className="w-full">
                      <HotelIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      Stay
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="fly" className="overflow-hidden">
                    <FlySearchForm />
                  </TabsContent>
                  <TabsContent value="stay"></TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">
                  Featured Destinations
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-muted-foreground">
                  Explore the World
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover Tours
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {["Tokyo, Japan", "Paris, France", "Milan, Italy"].map(
                (destination) => (
                  <Card key={destination}>
                    <CardHeader>
                      <CardTitle>{destination}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        alt={`${destination}`}
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                        height="310"
                        src="placeholder.svg"
                        width="550"
                      />
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">
                  Fashion Week Packages
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-muted-foreground">
                  Fashion Week 2024
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Book your Fashion Week package now.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  price: "$666",
                  duration: "5-night",
                  tickets: "10",
                },
                {
                  price: "$666",
                  duration: "7-night",
                  tickets: "7",
                },
                {
                  price: "$666",
                  duration: "10-night",
                  tickets: "10",
                },
              ].map((pkg, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>
                      {pkg.price}
                      <span className="text-sm font-normal">/ package</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <PlaneIcon className="w-5 h-5" />
                        <span>Round-trip flight</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HotelIcon className="w-5 h-5" />
                        <span>{pkg.duration} stay</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CarIcon className="w-5 h-5" />
                        <span>Rental car included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TicketIcon className="w-5 h-5" />
                        <span>{pkg.tickets} Runway tickets</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full h-12" size="lg">
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">
                  Featured stays
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-muted-foreground">
                  Luxury Stays
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our featured stays for an unforgettable experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                "Tuba Club, Marseille",
                "Giulia, Milan",
                "Drei Berge, Mürren",
              ].map((stay) => (
                <Card key={stay}>
                  <CardHeader>
                    <CardTitle>{stay}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      alt={stay}
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                      height="310"
                      src="placeholder.svg"
                      width="550"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full h-12" size="lg">
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Sign Up for Updates
                </h2>
                <p className="max-w-[600px] text-muted-500 md:text-xl dark:text-muted-400">
                  Stay updated with the latest product news and updates.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button size="default">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-500 dark:text-muted-400">
          © 2024 Armin Babaei Studio. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function HotelIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 22v-6.57" />
      <path d="M12 11h.01" />
      <path d="M12 7h.01" />
      <path d="M14 15.43V22" />
      <path d="M15 16a5 5 0 0 0-6 0" />
      <path d="M16 11h.01" />
      <path d="M16 7h.01" />
      <path d="M8 11h.01" />
      <path d="M8 7h.01" />
      <rect x="4" y="2" width="16" height="20" rx="2" />
    </svg>
  );
}

function PlaneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function PlaneTakeoffIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 22h20" />
      <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" />
    </svg>
  );
}

function TicketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

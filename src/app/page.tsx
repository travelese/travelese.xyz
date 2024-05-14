import Image from "next/image";
import { Contact } from "@/components/contact";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import {
  PlaneIcon,
  HotelIcon,
  CarIcon,
  TicketIcon,
} from "lucide-react";
import FlightSearchForm from "@/components/flight-search-form";
import HotelSearchForm from "@/components/hotel-search-form";

export const metadata = {
  title: "Travelese",
  description: "Smartest way to book your next trip.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-200
              to-blue-950"
                >
                  Discover the World with Travelese
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Smartest way to book your next trip.
                </p>
              </div>
              <div className="w-full max-w-5xl mx-auto">
                <Tabs className="w-full" defaultValue="flights">
                  <TabsList className="grid w-full grid-cols-2 gap-6 p-0">
                    <TabsTrigger
                      className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colorsocus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                      value="flights"
                    >
                      Flights
                    </TabsTrigger>
                    <TabsTrigger
                      className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                      value="hotels"
                    >
                      Hotels
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="flights">
                    <FlightSearchForm />
                  </TabsContent>
                  <TabsContent value="hotels">
                    <HotelSearchForm />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">
                  Featured Destinations
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-200
              to-blue-950"
                >
                  Explore the World
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover Tours
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Tokyo, Japan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Paris"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                    height="310"
                    src="/placeholder.svg"
                    width="550"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Paris, France</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Tokyo"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                    height="310"
                    src="/placeholder.svg"
                    width="550"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Milan, Italy</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Sydney"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                    height="310"
                    src="/placeholder.svg"
                    width="550"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">
                  Fashion Week Packages
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-200
              to-blue-950"
                >
                  Fashion Week 2024
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Book your Fashion Week package now.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>
                    $666
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
                      <span>5-night hotel stay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CarIcon className="w-5 h-5" />
                      <span>Rental car included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TicketIcon className="w-5 h-5" />
                      <span>10 Runway tickets</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-12" size="lg">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    $666
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
                      <span>7-night hotel stay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CarIcon className="w-5 h-5" />
                      <span>Rental car included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TicketIcon className="w-5 h-5" />
                      <span>7 Runway tickets</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-12" size="lg">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    $666
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
                      <span>10-night hotel stay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CarIcon className="w-5 h-5" />
                      <span>Rental car included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TicketIcon className="w-5 h-5" />
                      <span>10 Runway tickets</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-12" size="lg">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Featured Hotels
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-200
              to-blue-950"
                >
                  Luxury Stays
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our featured hotels for an unforgettable experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Tuba Club, Marseille</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Tuba Club, Marseille"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                    height="310"
                    src="/placeholder.svg"
                    width="550"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-12" size="lg">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Giulia, Milan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Giulia, Milan"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                    height="310"
                    src="/placeholder.svg"
                    width="550"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-12" size="lg">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Drei Berge, Mürren</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Drei Berge, Mürren"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                    height="310"
                    src="/placeholder.svg"
                    width="550"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-12" size="lg">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

// app/page.tsx
import Head from "next/head";
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
import { PlaneIcon, stayIcon, CarIcon, TicketIcon } from "lucide-react";
import FlightSearchForm from "@/components/flight/flight-search-form";
import StaySearchForm from "@/components/stay/stay-search-form";

export const metadata = {
  title: "Travelese",
  description: "Smartest way to book your next trip.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Travelese - Smartest way to book your next trip</title>
        <meta
          name="description"
          content="Discover and book your next travel with Travelese. We offer flights, stays, and fashion week packages to top destinations like Tokyo, Paris, Milan, and more."
        />
        <meta
          name="keywords"
          content="travel, flights, Stays, booking, travel booking, fashion week, Tokyo, Paris, Milan"
        />
        <meta name="author" content="Travelese" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Travelese - Smartest way to book your next trip"
        />
        <meta
          property="og:description"
          content="Discover and book your next travel with Travelese. We offer flights, stays, and fashion week packages to top destinations like Tokyo, Paris, Milan, and more."
        />
        <meta property="og:image" content="/path-to-your-image.jpg" />
        <meta property="og:url" content="https://travelese.xyz" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="flex-1">
        {/* Hero Section */}
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
                  <TabsList
                    className="grid w-full grid-cols-2 gap-6 p-0"
                    aria-label="Search options"
                  >
                    <TabsTrigger
                      className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                      value="flights"
                    >
                      Flights
                    </TabsTrigger>
                    <TabsTrigger
                      className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                      value="stays"
                    >
                      Stays
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="flights">
                    <FlightSearchForm />
                  </TabsContent>
                  <TabsContent value="stays">
                    <StaySearchForm />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
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
              {["Tokyo, Japan", "Paris, France", "Milan, Italy"].map(
                (destination) => (
                  <Card key={destination}>
                    <CardHeader>
                      <CardTitle>{destination}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Ensure real image sources and meaningful alt texts */}
                      <Image
                        alt={`${destination}`}
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                        height="310"
                        src={`/images/${destination.replace(", ", "_")}.jpg`}
                        width="550"
                      />
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>

        {/* Fashion Week Packages */}
        <section className="w-full py-12 md:py-24 lg:py-32">
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
              {/* Improved data handling and unique keys */}
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
                        <stayIcon className="w-5 h-5" />
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

        {/* Featured stays */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Featured stays
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-200
              to-blue-950"
                >
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
                      src={`/images/${stay.replace(" ", "_")}.jpg`}
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
      </main>
      <footer>
        <Contact />
      </footer>
    </div>
  );
}
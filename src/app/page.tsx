import Image from "next/image";
import Contact from "@/components/contact";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { PlaneIcon, CarIcon, TicketIcon, HotelIcon, AirplayIcon, PlaneTakeoffIcon, TrainIcon, ShipIcon } from "lucide-react";
import FlightSearchForm from "@/components/fly/flight-search-form";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";

export const metadata = {
  title: "Travelese",
  description: "Smartest way to book your next trip.",
};

export default function Home() {
  return (
    <>
      <MainNav />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
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
                <div className="w-full max-w-5xl mx-auto">
                  <Tabs className="w-full" defaultValue="fly">
                    <div className="flex items-center">
                      <TabsList
                        className="grid w-full grid-cols-5 gap-6 p-0"
                        aria-label="Search options"
                      >
                        <TabsTrigger
                          className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                          value="fly"
                        >
                          <PlaneTakeoffIcon className="w-5 h-5 mr-2" />
                          Fly
                        </TabsTrigger>
                        <TabsTrigger
                          className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                          value="sail"
                        >
                          <ShipIcon className="w-5 h-5 mr-2" />
                          Sail
                        </TabsTrigger>
                        <TabsTrigger
                          className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                          value="ride"
                        >
                          <TrainIcon className="w-5 h-5 mr-2" />
                          Ride
                        </TabsTrigger>
                        <TabsTrigger
                          className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                          value="drive"
                        >
                          <CarIcon className="w-5 h-5 mr-2" />
                          Drive
                        </TabsTrigger>
                        <TabsTrigger
                          className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                          value="stay"
                        >
                          <HotelIcon className="w-5 h-5 mr-2" />
                          Stay
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="fly">
                      <FlightSearchForm />
                    </TabsContent>
                    <TabsContent value="sail">
                      {/* <SailSearchForm /> */}
                    </TabsContent>
                    <TabsContent value="ride">
                      {/* <RideSearchForm /> */}
                    </TabsContent>
                    <TabsContent value="drive">
                      {/* <DriveSearchForm /> */}
                    </TabsContent>
                    <TabsContent value="stay">
                      {/* <StaySearchForm /> */}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Destinations */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
                        {/* Ensure real image sources and meaningful alt texts */}
                        <Image
                          alt={`${destination}`}
                          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full dark:brightness-[0.2] dark:grayscale"
                          height="310"
                          src="placeholder.svg"
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-muted-foreground">
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

          {/* Featured stays */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
        </main>
        <footer>
          <Contact />
        </footer>
      </div>
    </>
  );
}
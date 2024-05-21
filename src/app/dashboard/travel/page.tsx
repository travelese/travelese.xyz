// File: /src/app/playground/travel
// Description: Travel booking UI components

"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  PlaneIcon,
  WifiIcon,
  CalendarDaysIcon,
  FileAudioIcon,
  InfoIcon,
  ShareIcon,
  PlaneTakeoffIcon,
  PlaneLandingIcon,
  MapPinIcon,
  HotelIcon,
  BedIcon,
  CloudFogIcon,
} from "lucide-react";
import {
  BaggagePersonal,
  BaggageCabin,
  BaggageChecked30,
  Seat,
} from "@kiwicom/orbit-components/icons";

const FlightBooking = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl"></h1>
      </div> */}
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-chunk-main"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          {/* <h3 className="text-2xl font-bold tracking-tight">
          </h3>
          <p className="text-sm text-muted-foreground">
          </p> */}
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>Search</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Review</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Book</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">Toronto → Tokyo and back</h1>
              <div className="mt-4">
                <section>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card>
                        <div className="flex w-full items-center justify-between p-6 rounded-lg cursor-pointer">
                          <div className="w-2/3 space-y-4 pr-5 border-r border-dashed">
                            <div>
                              <div className="text-sm">Outbound</div>
                              <div className="flex items-center space-x-2">
                                <div className="font-bold text-lg">YYZ</div>
                                <div className="flex-1 border-t" />
                                <div className="text-sm">1 stop</div>
                                <Avatar>
                                  <AvatarImage
                                    alt="Airline Logo"
                                    src="/placeholder.svg?height=32&width=32"
                                  />
                                  <AvatarFallback>AF</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 border-t" />
                                <div className="font-bold text-lg">HND</div>
                              </div>
                              <div className="flex justify-between">
                                <time className="text-2xl font-bold">
                                  18:15
                                </time>
                                <Badge variant="secondary">22h 40m</Badge>
                                <time className="text-2xl font-bold">
                                  05:55
                                  <sup className="text-sm">+2</sup>
                                </time>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm">Inbound</div>
                              <div className="flex items-center space-x-2">
                                <div className="ont-bold text-lg">HND</div>
                                <div className="flex-1 border-t" />
                                <div className="text-sm">1 stop</div>
                                <Avatar>
                                  <AvatarImage
                                    alt="Airline Logo"
                                    src="/placeholder.svg?height=32&width=32"
                                  />
                                  <AvatarFallback>AF</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 border-t" />
                                <div className="font-bold text-lg">YYZ</div>
                              </div>
                              <div className="flex justify-between">
                                <time className="text-2xl font-bold">
                                  21:50
                                </time>
                                <Badge variant="secondary">36h 25m</Badge>
                                <time className="text-2xl font-bold">
                                  21:15
                                </time>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="text-sm mr-3">Included</div>
                              <BaggagePersonal className="h-4 w-4" />
                              <BaggageCabin className="h-4 w-4" />
                              <BaggageChecked30 className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center w-1/3">
                            <div className="mt-2">
                              <Alert>
                                <CloudFogIcon className="h-4 w-4" />
                                <AlertTitle>Emission</AlertTitle>
                                <AlertDescription>
                                  kg CO<sub>2</sub>
                                </AlertDescription>
                              </Alert>
                            </div>
                            <div className="text-sm m-3">
                              1 seat left at this price
                            </div>
                            <div className="text-2xl font-bold">CA$2,404</div>
                            <Button className="mt-2" variant="outline">
                              Lock price for CA$240
                            </Button>
                            <Button className="mt-2">Select</Button>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-xl p-6">
                      <DialogHeader className="flex justify-between items-center pb-4 border-b">
                        <DialogTitle>Itinerary details</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[400px] my-4">
                        <Card className="mr-6">
                          <CardHeader className="p-4 border-b">
                            <CardTitle>
                              <h3 className="text-md font-semibold mt-2">
                                To Tokyo
                              </h3>
                            </CardTitle>
                            <CardDescription></CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="layover border-b">
                              <Badge variant="outline" className="m-2">
                                <span className="text-sm">Economy</span>
                              </Badge>
                            </div>
                            <div className="segment m-2">
                              <div className="space-y-4">
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Toronto
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneTakeoffIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Toronto Pearson International (YYZ)
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Sat 1 Jun
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <time className="text-2xl font-bold">
                                    18:15
                                  </time>
                                  <Badge variant="secondary">7h 30m</Badge>
                                  <time className="text-2xl font-bold">
                                    07:45
                                    <sup className="text-sm">+1</sup>
                                  </time>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Accordion type="single" collapsible>
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      <div className="flex items-center mt-4">
                                        <Avatar>
                                          <AvatarImage
                                            alt="Air France"
                                            src="/placeholder.svg?height=24&width=24"
                                          />
                                        </Avatar>
                                        <div className="ml-3">
                                          <Badge>Air France</Badge>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="mt-4 ml-8 pl-4 border-l-2 border-dashed">
                                        <div className="connection my-4">
                                          <div className="text-sm font-semibold">
                                            Connection info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneTakeoffIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Airline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Air France
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <InfoIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Flight Number
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                AF 355
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Aircraft
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Airbus A380-800
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="ancillary my-4">
                                          <div className="text-sm font-semibold">
                                            Seating info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat pitch
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                81 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat width
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                45 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat recline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                118 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <FileAudioIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Audio & video on demand
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Yes
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <WifiIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Wi-Fi on board
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                No
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                              <div className="space-y-4">
                                <div className="layover border-b">
                                  <Badge variant="destructive" className="m-2">
                                    <span className="text-sm">
                                      You will arrive the next day
                                    </span>
                                  </Badge>
                                </div>
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Sun 2 Jun
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Paris
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneLandingIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Charles de Gaulle Airport (CDG)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="layover border-t border-b">
                              <Badge variant="outline" className="m-2">
                                <span className="text-sm">1h 40m layover</span>
                              </Badge>
                            </div>
                            <div className="segment m-2">
                              <div className="space-y-4">
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Paris
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneTakeoffIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Charles de Gaulle Airport (CDG)
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Sun 2 Jun
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <time className="text-2xl font-bold">
                                    09:25
                                  </time>
                                  <Badge variant="secondary">13h 30m</Badge>
                                  <time className="text-2xl font-bold">
                                    05:55
                                    <sup className="text-sm">+1</sup>
                                  </time>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Accordion type="single" collapsible>
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      <div className="flex items-center mt-4">
                                        <Avatar>
                                          <AvatarImage
                                            alt="Air France"
                                            src="/placeholder.svg?height=24&width=24"
                                          />
                                        </Avatar>
                                        <div className="ml-3">
                                          <Badge>Air France</Badge>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="mt-4 ml-8 pl-4 border-l-2 border-dashed">
                                        <div className="connection my-4">
                                          <div className="text-sm font-semibold">
                                            Connection info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneTakeoffIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Airline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Air France
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <InfoIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Flight Number
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                AF 162
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Aircraft
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Airbus A380-800
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="ancillary my-4">
                                          <div className="text-sm font-semibold">
                                            Seating info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat pitch
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                81 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat width
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                45 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat recline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                118 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <FileAudioIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Audio & video on demand
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Yes
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <WifiIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Wi-Fi on board
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                No
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                              <div className="space-y-4">
                                <div className="layover border-b">
                                  <Badge variant="destructive" className="m-2">
                                    <span className="text-sm">
                                      You will arrive the next day
                                    </span>
                                  </Badge>
                                </div>
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="h-4 w-4" />
                                  <div className="ml-2 text-sm font-medium">
                                    Mon 3 Jun
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Tokyo
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneTakeoffIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Haneda (HND)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter></CardFooter>
                        </Card>
                        <Card className="mr-6 mt-4 mb-4">
                          <CardHeader className="p-4 border-b">
                            <CardTitle>
                              <h3 className="text-md font-semibold mt-2">
                                In Tokyo
                              </h3>
                            </CardTitle>
                            <CardDescription>
                              <div className="flex items-center text-sm text-muted-foreground my-2">
                                <BedIcon className="h-4 w-4 mr-2" />
                                <span>27 nights at the Tokyo</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground my-2">
                                <HotelIcon className="h-4 w-4 mr-2" />
                                <span>
                                  Rooms from CA$1,022 by arminbabaei.com
                                </span>
                              </div>
                            </CardDescription>
                          </CardHeader>
                        </Card>
                        <Card className="mr-6">
                          <CardHeader className="p-4 border-b">
                            <CardTitle>
                              <h3 className="text-md font-semibold mt-2">
                                To Toronto
                              </h3>
                            </CardTitle>
                            <CardDescription></CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="layover border-b">
                              <Badge variant="outline" className="m-2">
                                <span className="text-sm">Economy</span>
                              </Badge>
                            </div>
                            <div className="segment m-2">
                              <div className="space-y-4">
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Tokyo
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneTakeoffIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Haneda (HND)
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Sun 30 Jun
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <time className="text-2xl font-bold">
                                    21:50
                                  </time>
                                  <Badge variant="secondary">14h 50m</Badge>
                                  <time className="text-2xl font-bold">
                                    05:40
                                    <sup className="text-sm">+1</sup>
                                  </time>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Accordion type="single" collapsible>
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      <div className="flex items-center mt-4">
                                        <Avatar>
                                          <AvatarImage
                                            alt="Air France"
                                            src="/placeholder.svg?height=24&width=24"
                                          />
                                        </Avatar>
                                        <div className="ml-3">
                                          <Badge>Air France</Badge>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="mt-4 ml-8 pl-4 border-l-2 border-dashed">
                                        <div className="connection my-4">
                                          <div className="text-sm font-semibold">
                                            Connection info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneTakeoffIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Airline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Air France
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <InfoIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Flight Number
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                AF 293
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Aircraft
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Airbus A380-800
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="ancillary my-4">
                                          <div className="text-sm font-semibold">
                                            Seating info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat pitch
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                81 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat width
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                45 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat recline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                118 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <FileAudioIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Audio & video on demand
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Yes
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <WifiIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Wi-Fi on board
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                No
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                              <div className="space-y-4">
                                <div className="layover border-b">
                                  <Badge variant="destructive" className="m-2">
                                    <span className="text-sm">
                                      You will arrive the next day
                                    </span>
                                  </Badge>
                                </div>
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Mon 1 Jul
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Paris
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneTakeoffIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Charles de Gaulle Airport (CDG)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="layover border-t border-b">
                              <Badge variant="outline" className="m-2">
                                <span className="text-sm">13h 15m layover</span>
                              </Badge>
                            </div>
                            <div className="segment m-2">
                              <div className="space-y-4">
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Paris
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneTakeoffIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Charles de Gaulle Airport (CDG)
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Mondat 2 Jul
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <time className="text-2xl font-bold">
                                    18:55
                                  </time>
                                  <Badge variant="secondary">8h 20m</Badge>
                                  <time className="text-2xl font-bold">
                                    21:15
                                  </time>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <Accordion type="single" collapsible>
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      <div className="flex items-center mt-4">
                                        <Avatar>
                                          <AvatarImage
                                            alt="Air France"
                                            src="/placeholder.svg?height=24&width=24"
                                          />
                                        </Avatar>
                                        <div className="ml-3">
                                          <Badge>Air France</Badge>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="mt-4 ml-8 pl-4 border-l-2 border-dashed">
                                        <div className="connection my-4">
                                          <div className="text-sm font-semibold">
                                            Connection info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneTakeoffIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Airline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Air France
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <InfoIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Flight Number
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                AF 386
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <PlaneIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Aircraft
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Airbus A380-800
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="ancillary my-4">
                                          <div className="text-sm font-semibold">
                                            Seating info
                                          </div>
                                          <div className="mt-2">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat pitch
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                81 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat width
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                45 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <Seat className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Seat recline
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                118 cm
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <FileAudioIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Audio & video on demand
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                Yes
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                              <div className="flex items-center">
                                                <WifiIcon className="h-4 w-4" />
                                                <span className="ml-2 text-sm">
                                                  Wi-Fi on board
                                                </span>
                                              </div>
                                              <span className="text-sm font-semibold">
                                                No
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-center mt-4">
                                  <CalendarDaysIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Mon 3 Jun
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <MapPinIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Toronto
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <PlaneLandingIcon className="w-5 h-5" />
                                  <div className="ml-2 text-sm font-medium">
                                    Toronto Pearson International (YYZ)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter></CardFooter>
                        </Card>
                      </ScrollArea>
                      <DialogFooter className="flex justify-between items-center pt-4 border-t">
                        <ShareIcon />
                        <Button>Select</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </section>
                <section>
                  <div>
                    <section className="mt-4">
                      <h2 className="text-xl font-semibold">
                        Select passengers
                      </h2>
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <Avatar>
                          <AvatarImage
                            alt="Traveler"
                            src="/placeholder.svg?height=32&width=32"
                          />
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Mr Armin Babaei</p>
                          <p className="text-sm">21/03/1982</p>
                        </div>
                        <ChevronDownIcon className="h-6 w-6" />
                      </div>
                    </section>
                    <section className="mt-4">
                      <h2 className="text-xl font-semibold">
                        Primary passenger
                      </h2>
                      <div className="p-4 border rounded-md">
                        <form>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="given-names">Given names</Label>
                              <Input
                                id="given-names"
                                placeholder="e.g., Armin"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="surnames">Surnames</Label>
                              <Input id="surnames" placeholder="e.g., Babaei" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="nationality">Nationality</Label>
                              <Select>
                                <SelectTrigger id="nationality">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="canada">Canada</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="gender">Gender</Label>
                              <Select>
                                <SelectTrigger id="gender">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="dob-day">Date of birth</Label>
                              <div className="flex space-x-2">
                                <Input
                                  className="w-1/3"
                                  id="dob-day"
                                  placeholder="DD"
                                />
                                <Input
                                  className="w-1/3"
                                  id="dob-month"
                                  placeholder="Month"
                                />
                                <Input
                                  className="w-1/3"
                                  id="dob-year"
                                  placeholder="YYYY"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="passport-id">
                                Passport or ID number
                              </Label>
                              <Input
                                id="passport-id"
                                placeholder="Passport or ID number..."
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="passport-exp-day">
                                Passport or ID expiration date
                              </Label>
                              <div className="flex space-x-2">
                                <Input
                                  className="w-1/3"
                                  id="passport-exp-day"
                                  placeholder="DD"
                                />
                                <Input
                                  className="w-1/3"
                                  id="passport-exp-month"
                                  placeholder="Month"
                                />
                                <Input
                                  className="w-1/3"
                                  id="passport-exp-year"
                                  placeholder="YYYY"
                                />
                              </div>
                            </div>
                            <div className="flex items-center mt-6">
                              <Checkbox id="no-expiration" />
                              <Label className="ml-2" htmlFor="no-expiration">
                                No expiration
                              </Label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
            <div className="w-80">
              <div className="sticky top-4">
                <div className="flex flex-col p-4 rounded shadow-sm bg-muted">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Passenger</div>
                    <div className="text-sm font-medium">CA$3,792</div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm font-medium">Cabin baggage</div>
                    <div className="text-sm font-medium">CA$0</div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between border-t pt-2">
                      <div className="text-lg font-bold">Total (CAD)</div>
                      <div className="text-lg font-bold">CA$3,792</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Including all taxes, fees, surcharges and travelese.xyz
                      service fees.
                    </div>
                  </div>
                  <Button className="mt-4">View price breakdown</Button>
                </div>
              </div>
            </div>
          </div>
          <footer className="flex items-center justify-between p-4 border-t">
            <Button variant="ghost">Back</Button>
            <Button>Continue</Button>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default FlightBooking;

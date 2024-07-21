"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat, Message } from "ai/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  BirdIcon,
  CornerDownLeftIcon,
  MicIcon,
  PaperclipIcon,
  RabbitIcon,
  SettingsIcon,
  TurtleIcon,
} from "lucide-react";
import Loading from "@/app/loading";
import FlyCard from "@/components/travel/fly/FlyCard";

export default function TraveleseAI() {
  const [model, setModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(1);
  const [topK, setTopK] = useState(50);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [systemMessage, setSystemMessage] = useState(
    "You are a travel agent AI assistant.",
  );
  const [role, setRole] = useState("system");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
  } = useChat({
    api: "/api/ai",
    body: { model, temperature, topP, topK, maxTokens, systemMessage },
    onResponse: (response) => {
      console.log("Received response:", response);
    },
    onFinish: (message) => {
      console.log("Finished message:", message);
    },
    onError: (error) => {
      console.error("Error in chat:", error);
    },
  });

  const OutputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (OutputRef.current) {
      OutputRef.current.scrollTop = OutputRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      console.error("Error in chat:", error);
    }
  }, [error]);

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    reload();
  };

  const renderMessage = (message: Message) => {
    return (
      <div className="mb-4">
        <h3 className="font-semibold">
          {message.role === "user" ? "You:" : "Travelese:"}
        </h3>
        <pre className="whitespace-pre-wrap">{message.content}</pre>
        {message.role === "assistant" &&
          message.toolInvocations &&
          message.toolInvocations.map((toolInvocation, index) => (
            <div key={index} className="mt-2 border-l-2 border-gray-300 pl-2">
              <p className="font-semibold">
                Tool Call: {toolInvocation.toolName}
              </p>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(toolInvocation.args, null, 2)}
              </pre>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8 border">
      <header>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="md:hidden" size="icon" variant="ghost">
              <SettingsIcon className="size-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model and messages.
              </DrawerDescription>
            </DrawerHeader>
            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Model</Label>
                  <Select value={model} onValueChange={handleModelChange}>
                    <SelectTrigger
                      className="items-start [&_[data-description]]:hidden"
                      id="model"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <RabbitIcon className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              gpt-4o{` `}
                              <span className="font-medium text-foreground">
                                OpenAI
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="claude-3-5-sonnet-20240620">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <BirdIcon className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Claude 3.5 Sonnet{` `}
                              <span className="font-medium text-foreground">
                                Anthropic
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Performance and speed for efficiency.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="gemini-1.5-pro-latest">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <TurtleIcon className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Gemini 1.5 Pro{` `}
                              <span className="font-medium text-foreground">
                                Google
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful model for complex computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-p">Top P</Label>
                  <Input
                    id="top-p"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={topP}
                    onChange={(e) => setTopP(parseFloat(e.target.value))}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-k">Top K</Label>
                  <Input
                    id="top-k"
                    type="number"
                    min="0"
                    step="1"
                    value={topK}
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                  />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="system-message">Content</Label>
                  <Textarea
                    id="system-message"
                    placeholder="You are a..."
                    value={systemMessage}
                    onChange={(e) => setSystemMessage(e.target.value)}
                  />
                </div>
              </fieldset>
            </form>
          </DrawerContent>
        </Drawer>
      </header>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative hidden flex-col items-start gap-8 md:flex">
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="model">Model</Label>
                <Select value={model} onValueChange={handleModelChange}>
                  <SelectTrigger
                    className="items-start [&_[data-description]]:hidden"
                    id="model"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <RabbitIcon className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            gpt-4o{` `}
                            <span className="font-medium text-foreground">
                              OpenAI
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Our fastest model for general use cases.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="claude-3-5-sonnet-20240620">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <BirdIcon className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Claude 3.5 Sonnet{` `}
                            <span className="font-medium text-foreground">
                              Anthropic
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Performance and speed for efficiency.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="gemini-1.5-pro-latest">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <TurtleIcon className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Gemini 1.5 Pro{` `}
                            <span className="font-medium text-foreground">
                              Google
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            The most powerful model for complex computations.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input
                  id="top-p"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={topP}
                  onChange={(e) => setTopP(parseFloat(e.target.value))}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input
                  id="top-k"
                  type="number"
                  min="0"
                  step="1"
                  value={topK}
                  onChange={(e) => setTopK(parseInt(e.target.value))}
                />
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Messages
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="system-message">Content</Label>
                <Textarea
                  id="system-message"
                  placeholder="You are a..."
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                />
              </div>
            </fieldset>
          </form>
        </div>
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <Badge className="absolute right-3 top-3" variant="outline">
            Output
          </Badge>
          <ScrollArea className="flex-1 overflow-auto mb-4">
            <div ref={OutputRef}>
              {messages.map((message, index) => (
                <React.Fragment key={index}>
                  {renderMessage(message)}
                </React.Fragment>
              ))}
              {isLoading && <Loading />}
              {error && (
                <div className="text-red-500">
                  Error:{" "}
                  {error instanceof Error ? error.message : String(error)}
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <Label className="sr-only" htmlFor="message">
              Message
            </Label>
            <Textarea
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              id="message"
              placeholder="Type your message here..."
              value={input}
              onChange={handleInputChange}
            />
            <div className="flex items-center p-3 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <PaperclipIcon className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MicIcon className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
                <Button
                  className="ml-auto gap-1.5"
                  size="sm"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Thinking..." : "Send Message"}
                  <CornerDownLeftIcon className="size-3.5" />
                </Button>
              </TooltipProvider>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat, Message } from "ai/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { CornerDownLeftIcon, MicIcon, PaperclipIcon } from "lucide-react";
import Loading from "@/app/loading";
import FlyCard from "@/components/travel/fly/FlyCard";

export default function Agent() {
  const [model, setModel] = useState("gpt-4o");
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/agent",
      body: { model },
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
                Error: {error instanceof Error ? error.message : String(error)}
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
    </div>
  );
}

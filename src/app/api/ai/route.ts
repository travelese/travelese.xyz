import { NextRequest } from "next/server";
import { getUserAuth } from "@/lib/auth/utils";
import { StreamingTextResponse, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { searchFlights, getPlaceSuggestions } from "@/lib/travel/duffel";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const { session } = await getUserAuth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { messages, model, temperature, topP, topK, systemMessage } =
      await req.json();

    const result = await streamText({
      model: getModel(model, temperature, topP, topK),
      messages: systemMessage
        ? [
            {
              role: "system",
              content: systemMessage,
            },
            ...messages,
          ]
        : messages,
      temperature,
      topP: topP,
      tools: {
        search_flights: {
          description:
            "Search for flights. Use this tool whenever a user asks to find, search, or book flights between two locations.",
          parameters: z.object({
            origin: z.string().describe("Origin city name"),
            destination: z.string().describe("Destination city name"),
            departure_date: z
              .string()
              .describe("Departure date in YYYY-MM-DD format"),
            return_date: z
              .string()
              .optional()
              .describe("Return date in YYYY-MM-DD format for round trips"),
            passengers: z
              .array(
                z.object({
                  type: z.enum(["adult", "child", "infant_without_seat"]),
                  age: z.number().optional(),
                }),
              )
              .describe("Array of passenger objects"),
            cabin_class: z
              .enum(["economy", "premium_economy", "business", "first"])
              .describe("Desired cabin class"),
            limit: z.number().optional().describe("Number of offers to fetch"),
          }),
          execute: async (args) => {
            const {
              origin,
              destination,
              departure_date,
              return_date,
              passengers,
              limit,
              cabin_class,
            } = args;

            try {
              const originSuggestions = await getPlaceSuggestions({
                query: origin,
              });
              const destinationSuggestions = await getPlaceSuggestions({
                query: destination,
              });

              if (!originSuggestions.length || !destinationSuggestions.length) {
                throw new Error(
                  "Unable to find IATA codes for provided locations.",
                );
              }

              // Use iata_city_code if available
              const originCode =
                originSuggestions[0].iata_city_code ||
                originSuggestions[0].iata_code;
              const destinationCode =
                destinationSuggestions[0].iata_city_code ||
                destinationSuggestions[0].iata_code;

              const slices = [
                {
                  origin: originCode,
                  destination: destinationCode,
                  departure_date,
                },
                ...(return_date
                  ? [
                      {
                        origin: destinationCode,
                        destination: originCode,
                        departure_date: return_date,
                      },
                    ]
                  : []),
              ];

              const results = await searchFlights(
                slices,
                passengers,
                cabin_class,
                limit,
              );

              return results;
            } catch (error: any) {
              return {
                error: "Failed to search flights",
                details: error.message,
                stack: error.stack,
              };
            }
          },
        },
        get_place_suggestions: {
          description: "Get place suggestions based on a query",
          parameters: z.object({
            query: z.string().describe("Search query for place suggestions"),
          }),
          execute: async (args) => {
            try {
              const { query } = args;
              const results = await getPlaceSuggestions({ query });

              return results;
            } catch (error: any) {
              return {
                error: "Failed to get place suggestions",
                details: error.message,
                stack: error.stack,
              };
            }
          },
        },
      },
    });

    return new StreamingTextResponse(result.toAIStream());
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "An error occurred",
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

function getModel(
  model: string,
  temperature: number,
  topP: number,
  topK: number,
) {
  switch (model) {
    case "gpt-4o":
      return openai("gpt-4o");
    case "claude-3-5-sonnet-20240620":
      return anthropic("claude-3-5-sonnet-20240620");
    case "gemini-1.5-pro-latest":
      return google("gemini-1.5-pro-latest", {
        topK,
      });
    default:
      return openai("gpt-4o");
  }
}

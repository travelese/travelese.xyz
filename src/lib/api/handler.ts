import * as Sentry from "@sentry/nextjs";
import { posthog } from "posthog-js";
import { DuffelError } from "@duffel/api";
import { ratelimit } from "@/lib/ratelimit";

type ApiHandler = (
  req: Request,
  context: { params: { [key: string]: string | string[] } },
) => Promise<Response>;

export function createApiHandler(handler: ApiHandler) {
  return async (
    req: Request,
    context: { params: { [key: string]: string | string[] } },
  ) => {
    try {
      // Apply rate limiting
      const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success } = await ratelimit.limit(ip);

      if (!success) {
        return Response.json({ error: "Too many requests" }, { status: 429 });
      }

      // Track API call
      posthog.capture("api_call", {
        endpoint: req.url,
        method: req.method,
      });

      const response = await handler(req, context);

      return response;
    } catch (error) {
      console.error("API Error:", error);
      Sentry.captureException(error);

      if (error instanceof DuffelError) {
        return Response.json(
          {
            error: "Duffel API Error",
            message: error.message,
            meta: error.meta,
            errors: error.errors,
          },
          { status: error.meta?.status || 500 },
        );
      }

      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
}

import { NextRequest, NextResponse } from "next/server";

import { contactFormRequestSchema } from "@/lib/contact-form";
import { sendContactEmail } from "@/lib/contact-email";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_STORE_MAX_SIZE = 5_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimit = globalThis as typeof globalThis & {
  contactFormRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore = globalRateLimit.contactFormRateLimit ?? new Map<string, RateLimitEntry>();

globalRateLimit.contactFormRateLimit = rateLimitStore;

function json(body: object, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwardedFor || request.headers.get("x-real-ip")?.trim() || "unknown";
}

function consumeRateLimit(key: string, now = Date.now()) {
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    if (rateLimitStore.size >= RATE_LIMIT_STORE_MAX_SIZE) {
      for (const [storedKey, entry] of rateLimitStore) {
        if (entry.resetAt <= now) rateLimitStore.delete(storedKey);
      }
    }

    if (rateLimitStore.size < RATE_LIMIT_STORE_MAX_SIZE) {
      rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return json({ code: "FORBIDDEN" }, 403);
  }

  const contentType = request.headers.get("content-type")?.toLowerCase();

  if (!contentType?.startsWith("application/json")) {
    return json({ code: "UNSUPPORTED_MEDIA_TYPE" }, 415);
  }

  const declaredBodySize = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredBodySize) && declaredBodySize > MAX_BODY_BYTES) {
    return json({ code: "PAYLOAD_TOO_LARGE" }, 413);
  }

  const rateLimit = consumeRateLimit(getClientAddress(request));

  if (!rateLimit.allowed) {
    return json({ code: "RATE_LIMITED" }, 429, {
      "Retry-After": String(rateLimit.retryAfter),
    });
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return json({ code: "INVALID_REQUEST" }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ code: "PAYLOAD_TOO_LARGE" }, 413);
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return json({ code: "INVALID_JSON" }, 400);
  }

  const parsedBody = contactFormRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return json({ code: "VALIDATION_ERROR" }, 400);
  }

  if (parsedBody.data.website.trim()) {
    return json({ ok: true }, 200);
  }

  const result = await sendContactEmail({
    name: parsedBody.data.name,
    email: parsedBody.data.email,
    subject: parsedBody.data.subject,
    message: parsedBody.data.message,
    language: parsedBody.data.language,
    sourcePath: parsedBody.data.sourcePath,
  });

  if (!result.ok) {
    if (result.reason === "configuration") {
      console.error("Contact form email delivery is not configured.");
      return json({ code: "UNAVAILABLE" }, 503);
    }

    if (result.reason === "rate-limited") {
      console.error("Contact form email delivery was rate-limited by Resend.");
      return json({ code: "RATE_LIMITED" }, 429, { "Retry-After": "60" });
    }

    console.error("Contact form email delivery failed.");
    return json({ code: "SEND_FAILED" }, 502);
  }

  return json({ ok: true }, 200);
}

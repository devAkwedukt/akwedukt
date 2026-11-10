import { NextRequest, NextResponse } from "next/server";
import { readFacebookImportConfig, type FacebookImportConfig } from "@/lib/facebook-import/config";
import { processFacebookWebhook } from "@/lib/facebook-import/processor";
import { secureTextEquals, verifyFacebookSignature } from "@/lib/facebook-import/signature";

export const runtime = "nodejs";

const MAX_WEBHOOK_BODY_BYTES = 1024 * 1024;

function response(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const suppliedToken = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");
  const expectedToken = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN?.trim();

  if (!expectedToken) {
    return response("Facebook webhook verification is not configured", 503);
  }

  if (
    mode === "subscribe" &&
    suppliedToken &&
    challenge &&
    secureTextEquals(suppliedToken, expectedToken)
  ) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return response("Facebook webhook verification rejected", 403);
}

export async function POST(request: NextRequest) {
  const declaredContentLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredContentLength) && declaredContentLength > MAX_WEBHOOK_BODY_BYTES) {
    return response("Webhook payload is too large", 413);
  }

  const appSecret = process.env.FACEBOOK_APP_SECRET?.trim();

  if (!appSecret) {
    return response("Facebook webhook signature verification is not configured", 503);
  }

  const rawBody = await request.text();

  if (Buffer.byteLength(rawBody, "utf8") > MAX_WEBHOOK_BODY_BYTES) {
    return response("Webhook payload is too large", 413);
  }

  const signatureIsValid = verifyFacebookSignature({
    rawBody,
    signatureHeader: request.headers.get("x-hub-signature-256"),
    appSecret,
  });

  if (!signatureIsValid) {
    return response("Invalid Facebook webhook signature", 401);
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return response("Invalid JSON payload", 400);
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !("object" in payload) ||
    payload.object !== "page"
  ) {
    return NextResponse.json({
      received: true,
      imported: false,
      reason: "unsupported-object",
    });
  }

  let config: FacebookImportConfig;

  try {
    config = readFacebookImportConfig(process.env);
  } catch (error) {
    console.error(
      "Facebook import configuration error:",
      error instanceof Error ? error.message : "Unknown configuration error"
    );

    return response("Facebook import configuration is invalid", 503);
  }

  if (!config.enabled) {
    return NextResponse.json({
      received: true,
      imported: false,
      reason: "import-disabled",
    });
  }

  try {
    const summary = await processFacebookWebhook(payload, config);

    return NextResponse.json({
      received: true,
      imported: summary.createdDrafts > 0,
      reason: summary.matchedEvents > 0 ? "processed" : "no-supported-post-event",
      summary,
    });
  } catch (error) {
    console.error(
      "Facebook import processing error:",
      error instanceof Error ? error.message : "Unknown processing error"
    );

    // A non-2xx response asks Meta to retry transient Graph, image or Sanity failures.
    return response("Facebook import processing failed", 503);
  }
}

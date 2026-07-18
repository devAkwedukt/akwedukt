import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * @see https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs
 * @see https://www.sanity.io/learn/course/controlling-cached-content-in-next-js/path-based-revalidation
 */

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
  locale?: string;
  path?: string;
};

const getTagsToRevalidate = (body: WebhookPayload): string[] => {
  // Revalidate entire site for any Sanity change
  // Simple but effective approach
  return ["sanity"];
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response("Missing environment variable SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body) {
      const message = "Missing body";
      return new Response(JSON.stringify({ message, body }), {
        status: 400,
      });
    }

    const tags = getTagsToRevalidate(body);
    tags.forEach((tag) => revalidateTag(tag, "max"));

    const message = `Revalidated tags: ${tags.join(", ")}`;
    console.log(message, { body });
    return NextResponse.json({ body, message, tags });
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}

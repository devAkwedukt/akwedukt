import { revalidatePath, revalidateTag } from "next/cache";
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

const getPathsToRevalidate = (body: WebhookPayload): string[] => {
  const paths: string[] = [];

  // Revalidate specific page by slug (ignore placeholder "string" values)
  if (
    body.slug?.current &&
    body.locale &&
    body.slug.current !== "string" &&
    body.locale !== "string"
  ) {
    paths.push(`/${body.locale}/${body.slug.current}`);
  }

  // Revalidate pages with sections by document type
  if (body._type && body._type !== "string") {
    const locale = body.locale && body.locale !== "string" ? body.locale : "pl";

    // Map document types to their paths
    const typeToPath: Record<string, string> = {
      home: `/${locale}`,
      coNowego: `/${locale}/co-nowego`,
      oNas: `/${locale}/o-nas`,
      wspolpraca: `/${locale}/wspolpraca`,
      dlaRodzicow: `/${locale}/dla-rodzicow`,
      volunteerWithUs: `/${locale}/volunteer-with-us`,
      wesprzyj: `/${locale}/wesprzyj`,
    };

    if (typeToPath[body._type]) {
      paths.push(typeToPath[body._type]);
    }
  }

  return paths;
};

const getTagsToRevalidate = (body: WebhookPayload): string[] => {
  const tags: string[] = [];

  // Add type-specific tag (ignore placeholder "string")
  if (body._type && body._type !== "string") {
    tags.push(body._type);
  }

  // Add slug-based tag for specific pages (ignore placeholder "string")
  if (body.slug?.current && body.slug.current !== "string") {
    tags.push(`slug:${body.slug.current}`);
  }

  // Add locale-specific tag (ignore placeholder "string")
  if (body.locale && body.locale !== "string") {
    tags.push(`locale:${body.locale}`);
  }

  // Only revalidate everything if we have no valid specific tags
  if (tags.length === 0) {
    console.log("⚠️ No valid tags found, skipping revalidation to avoid ISR waste");
    return [];
  }

  return tags;
};

export async function POST(req: NextRequest) {
  try {
    console.log("🔔 Webhook received at /api/revalidate");

    if (!process.env.SANITY_REVALIDATE_SECRET) {
      console.error("❌ Missing SANITY_REVALIDATE_SECRET");
      return new Response("Missing environment variable SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    console.log("🔍 Signature validation:", { isValidSignature, body });

    if (!isValidSignature) {
      const message = "Invalid signature";
      console.error("❌", message, { isValidSignature, body });
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body) {
      const message = "Missing body";
      console.error("❌", message, { body });
      return new Response(JSON.stringify({ message, body }), {
        status: 400,
      });
    }

    const paths = getPathsToRevalidate(body);
    const tags = getTagsToRevalidate(body);

    console.log("🏷️ Tags to revalidate:", tags);
    console.log("🛤️ Paths to revalidate:", paths);

    tags.forEach((tag) => {
      console.log(`🔄 Revalidating tag: ${tag}`);
      revalidateTag(tag, "max");
    });

    paths.forEach((path) => {
      console.log(`🔄 Revalidating path: ${path}`);
      revalidatePath(path);
    });

    const message = `Revalidated tags: ${tags.join(", ")}, paths: ${paths.join(", ")}`;
    console.log("✅", message, { body });
    return NextResponse.json({ body, message, tags, paths });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return new Response((err as Error).message, { status: 500 });
  }
}

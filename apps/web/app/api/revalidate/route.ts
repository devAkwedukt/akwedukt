import { revalidatePath } from "next/cache";
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

  // Глобальні шляхи для всіх змін
  paths.push("/");

  // Специфічні шляхи за типом документа
  if (body._type === "post" && body.slug?.current) {
    paths.push(`/post/${body.slug.current}`);
    paths.push("/posts");
  }

  if (body._type === "project" && body.slug?.current) {
    paths.push(`/project/${body.slug.current}`);
    paths.push("/projects");
  }

  if (body._type === "category") {
    paths.push("/posts");
  }

  if (body._type === "tag") {
    paths.push("/posts");
  }

  // Якщо вказаний конкретний path в payload
  if (body.path) {
    paths.push(body.path);
  }

  return [...new Set(paths)]; // Remove duplicates
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

    const paths = getPathsToRevalidate(body);
    paths.forEach((path) => revalidatePath(path));

    const message = `Revalidated routes: ${paths.join(", ")}`;
    console.log(message, { body });
    return NextResponse.json({ body, message, paths });
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}

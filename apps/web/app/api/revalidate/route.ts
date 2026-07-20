import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: string;
};

function getTags({ _type, slug }: WebhookPayload): string[] {
  switch (_type) {
    case "post":
      return slug ? ["posts", `post:${slug}`] : ["posts"];

    case "project":
      return slug ? ["projects", `project:${slug}`] : ["projects"];

    default:
      return [`page:${_type}`];
  }
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      return NextResponse.json({ message: "Missing SANITY_REVALIDATE_SECRET" }, { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    const tags = getTags(body);

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    return NextResponse.json({
      revalidated: tags,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

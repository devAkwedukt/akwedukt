import { type NextRequest, NextResponse } from "next/server";
import { parseBody, type ParsedBody } from "next-sanity/webhook";
import { type FirebaseNewsTarget, sendFirebaseNewsPush } from "@/lib/news-push/firebase";

export const runtime = "nodejs";

type PublicationEvent = {
  _id?: unknown;
  _type?: unknown;
  title?: unknown;
  status?: unknown;
  previousStatus?: unknown;
};

const postIdPattern = /^[a-zA-Z0-9_-][a-zA-Z0-9_.-]{0,127}$/;

function readPushTarget(): FirebaseNewsTarget | null {
  if (process.env.VERCEL_ENV === "production") {
    const topic = process.env.FCM_NEWS_PUSH_TOPIC?.trim();
    return topic === "akwedukt_news" ? { topic } : null;
  }

  const token = process.env.FCM_NEWS_PUSH_TEST_TOKEN?.trim();
  return token ? { token } : null;
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_NEWS_PUSH_SECRET?.trim();
  const target = readPushTarget();
  const serviceAccountJson = process.env.FCM_SERVICE_ACCOUNT_JSON?.trim();

  if (!secret || !target || !serviceAccountJson) {
    return NextResponse.json({ message: "News push is not configured" }, { status: 503 });
  }

  let event: ParsedBody<PublicationEvent>;
  try {
    event = await parseBody<PublicationEvent>(request, secret);
  } catch {
    return NextResponse.json({ message: "Invalid webhook request" }, { status: 400 });
  }

  if (event.isValidSignature !== true) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const post = event.body;
  if (post?._type !== "post" || post.status !== "publish" || post.previousStatus === "publish") {
    return NextResponse.json({ sent: false, reason: "not-a-new-publication" });
  }

  if (
    typeof post._id !== "string" ||
    !postIdPattern.test(post._id) ||
    typeof post.previousStatus !== "string"
  ) {
    return NextResponse.json({ message: "Invalid publication event" }, { status: 400 });
  }

  if (post._id.startsWith("drafts.") || post._id.startsWith("versions.")) {
    return NextResponse.json({ sent: false, reason: "not-a-published-document" });
  }

  try {
    const messageId = await sendFirebaseNewsPush({
      serviceAccountJson,
      target,
      postId: post._id,
      title: typeof post.title === "string" ? post.title : "",
    });
    return NextResponse.json({ sent: true, messageId });
  } catch (error) {
    console.error("News push failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "News push failed" }, { status: 502 });
  }
}

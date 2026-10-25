import type {
  FacebookDraftDocument,
  FacebookSourcePost,
  PortableTextBlock,
  PortableTextItem,
  PortableTextLinkMarkDefinition,
  PortableTextSpan,
} from "./types";

const FALLBACK_TITLE = "Post z Facebooka";
const MAX_TITLE_LENGTH = 90;
const MAX_EXCERPT_LENGTH = 240;
const MAX_SLUG_LENGTH = 96;

function stableKey(prefix: string, value: string, index: number): string {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }

  return `${prefix}-${index}-${(hash >>> 0).toString(36)}`;
}

function truncateWithoutBreakingEmoji(value: string, maximumLength: number): string {
  const characters = Array.from(value);

  if (characters.length <= maximumLength) return value;

  const shortened = characters
    .slice(0, maximumLength - 1)
    .join("")
    .trimEnd();
  const lastSpace = shortened.lastIndexOf(" ");
  const cleanEnding = lastSpace >= maximumLength * 0.65 ? shortened.slice(0, lastSpace) : shortened;

  return `${cleanEnding.trimEnd()}…`;
}

function normalizeMessage(message: string): string {
  return message.replace(/\r\n?/g, "\n").replace(/^\n+|\n+$/g, "");
}

function splitUrlTrailingPunctuation(value: string): { url: string; trailing: string } {
  const match = value.match(/[.,!?;:]+$/u);

  if (!match) return { url: value, trailing: "" };

  return {
    url: value.slice(0, -match[0].length),
    trailing: match[0],
  };
}

function createPlainSpan(text: string, lineIndex: number, spanIndex: number): PortableTextSpan {
  return {
    _key: stableKey("span", text, lineIndex * 100 + spanIndex),
    _type: "span",
    text,
    marks: [],
  };
}

function lineToBlock(line: string, lineIndex: number): PortableTextBlock {
  const children: PortableTextSpan[] = [];
  const markDefs: PortableTextLinkMarkDefinition[] = [];
  const urlPattern = /(?:https?:\/\/|www\.)[^\s<>"']+/giu;
  let cursor = 0;
  let spanIndex = 0;

  for (const match of line.matchAll(urlPattern)) {
    const start = match.index ?? 0;

    if (start > cursor) {
      children.push(createPlainSpan(line.slice(cursor, start), lineIndex, spanIndex++));
    }

    const rawValue = match[0];
    const { url, trailing } = splitUrlTrailingPunctuation(rawValue);
    const href = url.toLowerCase().startsWith("www.") ? `https://${url}` : url;
    const markKey = stableKey("link", href, lineIndex * 100 + spanIndex);

    try {
      new URL(href);

      markDefs.push({
        _key: markKey,
        _type: "link",
        href,
        blank: true,
        rel: "noopener noreferrer",
      });
      children.push({
        _key: stableKey("span", url, lineIndex * 100 + spanIndex++),
        _type: "span",
        text: url,
        marks: [markKey],
      });
    } catch {
      children.push(createPlainSpan(url, lineIndex, spanIndex++));
    }

    if (trailing) {
      children.push(createPlainSpan(trailing, lineIndex, spanIndex++));
    }

    cursor = start + rawValue.length;
  }

  if (cursor < line.length) {
    children.push(createPlainSpan(line.slice(cursor), lineIndex, spanIndex));
  }

  if (children.length === 0) {
    children.push(createPlainSpan(line, lineIndex, 0));
  }

  return {
    _key: stableKey("block", line, lineIndex),
    _type: "block",
    style: "normal",
    markDefs,
    children,
  };
}

export function facebookMessageToPortableText(message: string): PortableTextItem[] {
  const normalized = normalizeMessage(message);

  if (!normalized) return [];

  return normalized.split("\n").map((line, lineIndex) => {
    if (line.trim().length === 0) {
      return {
        _key: stableKey("spacer", "empty-line", lineIndex),
        _type: "spacer" as const,
        size: "small" as const,
      };
    }

    return lineToBlock(line, lineIndex);
  });
}

function deriveTitle(message: string): string {
  const firstTextLine = normalizeMessage(message)
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !/^(?:https?:\/\/|www\.)/iu.test(line));

  return truncateWithoutBreakingEmoji(firstTextLine ?? FALLBACK_TITLE, MAX_TITLE_LENGTH);
}

function deriveExcerpt(message: string): PortableTextItem[] {
  const firstParagraph = normalizeMessage(message)
    .split(/\n\s*\n/u)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").trim())
    .find((paragraph) => paragraph.length > 0);

  if (!firstParagraph) return [];

  return facebookMessageToPortableText(
    truncateWithoutBreakingEmoji(firstParagraph, MAX_EXCERPT_LENGTH)
  );
}

function slugify(value: string): string {
  const polishCharacters: Record<string, string> = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
  };

  return value
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/gu, (character) => polishCharacters[character] ?? character)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function createSlug(title: string, facebookPostId: string): string {
  const uniqueSuffix =
    facebookPostId
      .replace(/[^a-z0-9]/giu, "")
      .slice(-10)
      .toLowerCase() || stableKey("post", facebookPostId, 0).replace(/[^a-z0-9]/giu, "");
  const suffix = `-fb-${uniqueSuffix}`;
  const maximumBaseLength = MAX_SLUG_LENGTH - suffix.length;
  const base = (slugify(title) || "post-z-facebooka")
    .slice(0, maximumBaseLength)
    .replace(/-+$/g, "");

  return `${base}${suffix}`;
}

function createDraftId(facebookPostId: string): `drafts.facebook-${string}` {
  const safeId = facebookPostId.trim().replace(/[^a-z0-9_-]/giu, "-");

  if (!safeId) {
    throw new Error("Facebook post ID cannot be empty");
  }

  return `drafts.facebook-${safeId}`;
}

export function buildFacebookDraft(post: FacebookSourcePost): FacebookDraftDocument {
  const createdTime = new Date(post.createdTime);

  if (Number.isNaN(createdTime.getTime())) {
    throw new Error("Facebook post createdTime must be a valid date");
  }

  const message = post.message ?? "";
  const title = deriveTitle(message);

  return {
    _id: createDraftId(post.id),
    _type: "post",
    locale: "pl",
    title,
    slug: {
      _type: "slug",
      current: createSlug(title, post.id),
    },
    date: createdTime.toISOString(),
    status: "draft",
    content: facebookMessageToPortableText(message),
    excerpt: deriveExcerpt(message),
    categories: [],
    tags: [],
  };
}

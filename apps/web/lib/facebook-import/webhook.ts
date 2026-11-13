const SUPPORTED_FEED_ITEMS = new Set(["status", "photo", "video", "share", "link", "post"]);
const MAX_DIAGNOSTIC_CHANGES = 20;
const MAX_DIAGNOSTIC_VALUE_LENGTH = 128;

type FacebookWebhookDiagnosticChange = {
  pageId: string | null;
  field: string | null;
  item: string | null;
  verb: string | null;
  published: boolean | null;
  postId: string | null;
};

type FacebookWebhookDiagnosticSummary = {
  payloadKind: "page" | "meta-sample" | "other";
  object: string | null;
  entryCount: number;
  changeCount: number;
  truncated: boolean;
  changes: FacebookWebhookDiagnosticChange[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPublished(value: unknown): boolean {
  return value === 1 || value === "1" || value === true;
}

function optionalDiagnosticString(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, MAX_DIAGNOSTIC_VALUE_LENGTH) : null;
}

function buildDiagnosticChange(
  pageId: unknown,
  field: unknown,
  value: Record<string, unknown> | undefined
): FacebookWebhookDiagnosticChange {
  return {
    pageId: optionalDiagnosticString(pageId),
    field: optionalDiagnosticString(field),
    item: optionalDiagnosticString(value?.item),
    verb: optionalDiagnosticString(value?.verb),
    published: value?.published === undefined ? null : isPublished(value.published),
    postId: optionalDiagnosticString(value?.post_id),
  };
}

/**
 * Builds a bounded, content-free summary for production diagnostics.
 * Post text, author names, media URLs and secrets are never included.
 */
export function summarizeFacebookWebhookPayload(
  payload: unknown
): FacebookWebhookDiagnosticSummary {
  const payloadRecord = isRecord(payload) ? payload : undefined;
  const object = optionalDiagnosticString(payloadRecord?.object);
  const sample = isRecord(payloadRecord?.sample) ? payloadRecord.sample : undefined;

  if (sample) {
    const value = isRecord(sample.value) ? sample.value : undefined;
    const from = isRecord(value?.from) ? value.from : undefined;

    return {
      payloadKind: "meta-sample",
      object,
      entryCount: 0,
      changeCount: 1,
      truncated: false,
      changes: [buildDiagnosticChange(from?.id, sample.field, value)],
    };
  }

  const entries = Array.isArray(payloadRecord?.entry) ? payloadRecord.entry : [];
  const changes: FacebookWebhookDiagnosticChange[] = [];
  let changeCount = 0;

  for (const entry of entries) {
    if (!isRecord(entry) || !Array.isArray(entry.changes)) continue;

    for (const change of entry.changes) {
      changeCount += 1;

      if (changes.length >= MAX_DIAGNOSTIC_CHANGES || !isRecord(change)) continue;

      const value = isRecord(change.value) ? change.value : undefined;
      changes.push(buildDiagnosticChange(entry.id, change.field, value));
    }
  }

  return {
    payloadKind: object === "page" ? "page" : "other",
    object,
    entryCount: entries.length,
    changeCount,
    truncated: changeCount > changes.length,
    changes,
  };
}

/**
 * Extracts only newly published Page post IDs.
 * Comments, edits, deletions, unpublished posts and other Page IDs are ignored.
 */
export function extractNewFacebookPostIds(payload: unknown, expectedPageId: string): string[] {
  if (!isRecord(payload) || payload.object !== "page" || !Array.isArray(payload.entry)) {
    return [];
  }

  const postIds = new Set<string>();

  for (const entry of payload.entry) {
    if (!isRecord(entry) || String(entry.id ?? "") !== expectedPageId) continue;
    if (!Array.isArray(entry.changes)) continue;

    for (const change of entry.changes) {
      if (!isRecord(change) || change.field !== "feed" || !isRecord(change.value)) continue;

      const value = change.value;
      const item = typeof value.item === "string" ? value.item : "";
      const verb = typeof value.verb === "string" ? value.verb : "";
      const postId = typeof value.post_id === "string" ? value.post_id.trim() : "";

      if (
        verb !== "add" ||
        !SUPPORTED_FEED_ITEMS.has(item) ||
        !isPublished(value.published) ||
        !postId
      ) {
        continue;
      }

      postIds.add(postId);
    }
  }

  return [...postIds];
}

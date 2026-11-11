const SUPPORTED_FEED_ITEMS = new Set(["status", "photo", "video", "share", "link", "post"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPublished(value: unknown): boolean {
  return value === 1 || value === "1" || value === true;
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

import { describe, expect, it } from "vitest";
import { extractNewFacebookPostIds } from "./webhook";

function feedChange(value: Record<string, unknown>) {
  return { field: "feed", value };
}

describe("Facebook Page webhook filtering", () => {
  it("accepts only new published posts for the configured Page and removes duplicates", () => {
    const payload = {
      object: "page",
      entry: [
        {
          id: "page-123",
          changes: [
            feedChange({ item: "status", verb: "add", published: 1, post_id: "page-123_456" }),
            feedChange({ item: "status", verb: "add", published: 1, post_id: "page-123_456" }),
            feedChange({ item: "photo", verb: "add", published: true, post_id: "page-123_789" }),
          ],
        },
      ],
    };

    expect(extractNewFacebookPostIds(payload, "page-123")).toEqual([
      "page-123_456",
      "page-123_789",
    ]);
  });

  it("rejects comments, edits, unpublished items and entries from another Page", () => {
    const payload = {
      object: "page",
      entry: [
        {
          id: "page-123",
          changes: [
            feedChange({ item: "comment", verb: "add", published: 1, post_id: "page-123_1" }),
            feedChange({ item: "status", verb: "edited", published: 1, post_id: "page-123_2" }),
            feedChange({ item: "status", verb: "add", published: 0, post_id: "page-123_3" }),
          ],
        },
        {
          id: "another-page",
          changes: [
            feedChange({ item: "status", verb: "add", published: 1, post_id: "another-page_4" }),
          ],
        },
      ],
    };

    expect(extractNewFacebookPostIds(payload, "page-123")).toEqual([]);
  });

  it("safely rejects malformed payloads", () => {
    expect(extractNewFacebookPostIds(null, "page-123")).toEqual([]);
    expect(extractNewFacebookPostIds({ object: "user", entry: [] }, "page-123")).toEqual([]);
    expect(extractNewFacebookPostIds({ object: "page", entry: "invalid" }, "page-123")).toEqual([]);
  });
});

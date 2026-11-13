import { describe, expect, it } from "vitest";
import { extractNewFacebookPostIds, summarizeFacebookWebhookPayload } from "./webhook";

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

  it("summarizes real Page events without logging post content or author names", () => {
    const payload = {
      object: "page",
      entry: [
        {
          id: "page-123",
          changes: [
            feedChange({
              item: "photo",
              verb: "add",
              published: 1,
              post_id: "page-123_456",
              message: "private post copy",
              from: { id: "page-123", name: "Private author name" },
              full_picture: "https://example.com/private-image.jpg",
            }),
          ],
        },
      ],
    };

    const summary = summarizeFacebookWebhookPayload(payload);

    expect(summary).toEqual({
      payloadKind: "page",
      object: "page",
      entryCount: 1,
      changeCount: 1,
      truncated: false,
      changes: [
        {
          pageId: "page-123",
          field: "feed",
          item: "photo",
          verb: "add",
          published: true,
          postId: "page-123_456",
        },
      ],
    });
    expect(JSON.stringify(summary)).not.toContain("private post copy");
    expect(JSON.stringify(summary)).not.toContain("Private author name");
    expect(JSON.stringify(summary)).not.toContain("private-image.jpg");
  });

  it("recognizes Meta's sample envelope without treating it as a Page event", () => {
    const payload = {
      sample: {
        field: "feed",
        value: {
          item: "status",
          verb: "add",
          published: 1,
          post_id: "sample-page_456",
          from: { id: "sample-page", name: "Test Page" },
          message: "Example post content.",
        },
      },
      sub_field_options: null,
      sample_context_metadata: null,
    };

    expect(summarizeFacebookWebhookPayload(payload)).toEqual({
      payloadKind: "meta-sample",
      object: null,
      entryCount: 0,
      changeCount: 1,
      truncated: false,
      changes: [
        {
          pageId: "sample-page",
          field: "feed",
          item: "status",
          verb: "add",
          published: true,
          postId: "sample-page_456",
        },
      ],
    });
  });
});

import { describe, expect, it, vi } from "vitest";
import type { FacebookImportConfig } from "./config";
import { processFacebookWebhook } from "./processor";

const config = {
  enabled: true,
  startAt: "2026-11-10T12:00:00.000Z",
  pageId: "page-123",
  pageAccessToken: "page-token",
  appSecret: "app-secret",
  webhookVerifyToken: "verify-token",
  sanityWriteToken: "sanity-token",
  sanityDataset: "development",
} satisfies FacebookImportConfig;

function payload(postId = "page-123_456") {
  return {
    object: "page",
    entry: [
      {
        id: "page-123",
        changes: [
          {
            field: "feed",
            value: { item: "status", verb: "add", published: 1, post_id: postId },
          },
        ],
      },
    ],
  };
}

function unusedClient() {
  return {
    getDocument: vi.fn(),
    createIfNotExists: vi.fn(),
    assets: { upload: vi.fn() },
  };
}

describe("Facebook import processor", () => {
  it("creates one deterministic draft for a new post at or after the start time", async () => {
    const createDraft = vi.fn(async () => ({
      created: true,
      documentId: "drafts.facebook-page-123_456",
      imageCount: 2,
    }));

    const summary = await processFacebookWebhook(payload(), config, {
      fetchPost: vi.fn(async () => ({
        id: "page-123_456",
        message: "Nowy post 🚀",
        createdTime: "2026-11-10T12:00:00.000Z",
        authorPageId: "page-123",
        imageUrls: [
          "https://scontent.xx.fbcdn.net/one.jpg",
          "https://scontent.xx.fbcdn.net/two.jpg",
        ],
      })),
      createClient: unusedClient,
      createDraft,
    });

    expect(summary).toEqual({
      matchedEvents: 1,
      createdDrafts: 1,
      existingDrafts: 0,
      skippedBeforeStart: 0,
      skippedWrongPage: 0,
      importedImages: 2,
    });
    expect(createDraft).toHaveBeenCalledWith(
      expect.objectContaining({
        draft: expect.objectContaining({
          _id: "drafts.facebook-page-123_456",
          status: "draft",
          locale: "pl",
        }),
      })
    );
  });

  it("skips posts older than the configured start time", async () => {
    const createDraft = vi.fn();

    const summary = await processFacebookWebhook(payload(), config, {
      fetchPost: vi.fn(async () => ({
        id: "page-123_456",
        createdTime: "2026-11-10T11:59:59.999Z",
        authorPageId: "page-123",
        imageUrls: [],
      })),
      createClient: unusedClient,
      createDraft,
    });

    expect(summary.skippedBeforeStart).toBe(1);
    expect(summary.createdDrafts).toBe(0);
    expect(createDraft).not.toHaveBeenCalled();
  });

  it("skips a Graph response belonging to a different Page", async () => {
    const createDraft = vi.fn();

    const summary = await processFacebookWebhook(payload(), config, {
      fetchPost: vi.fn(async () => ({
        id: "page-123_456",
        createdTime: "2026-11-10T13:00:00.000Z",
        authorPageId: "another-page",
        imageUrls: [],
      })),
      createClient: unusedClient,
      createDraft,
    });

    expect(summary.skippedWrongPage).toBe(1);
    expect(createDraft).not.toHaveBeenCalled();
  });

  it("reports an existing deterministic draft without overwriting it", async () => {
    const summary = await processFacebookWebhook(payload(), config, {
      fetchPost: vi.fn(async () => ({
        id: "page-123_456",
        createdTime: "2026-11-10T13:00:00.000Z",
        authorPageId: "page-123",
        imageUrls: [],
      })),
      createClient: unusedClient,
      createDraft: vi.fn(async () => ({
        created: false,
        documentId: "drafts.facebook-page-123_456",
        imageCount: 0,
      })),
    });

    expect(summary.existingDrafts).toBe(1);
    expect(summary.createdDrafts).toBe(0);
  });
});

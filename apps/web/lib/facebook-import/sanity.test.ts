import { describe, expect, it, vi } from "vitest";
import { buildFacebookDraft } from "./transform";
import { createFacebookDraftInSanity, isAllowedFacebookImageUrl } from "./sanity";

function testDraft() {
  return buildFacebookDraft({
    id: "page-123_456",
    message: "Nowy wpis",
    createdTime: "2026-11-10T12:00:00.000Z",
  });
}

describe("Sanity Facebook draft writer", () => {
  it("allows HTTPS Meta media hosts and rejects unrelated or unsafe hosts", () => {
    expect(isAllowedFacebookImageUrl("https://scontent-waw2-1.xx.fbcdn.net/photo.jpg")).toBe(true);
    expect(isAllowedFacebookImageUrl("https://lookaside.fbsbx.com/photo.jpg")).toBe(true);
    expect(isAllowedFacebookImageUrl("http://scontent.xx.fbcdn.net/photo.jpg")).toBe(false);
    expect(isAllowedFacebookImageUrl("https://example.com/photo.jpg")).toBe(false);
  });

  it("does not download or overwrite anything when the deterministic draft already exists", async () => {
    const fetcher = vi.fn();
    const upload = vi.fn();
    const createIfNotExists = vi.fn();

    const result = await createFacebookDraftInSanity({
      client: {
        getDocument: vi.fn(async (id: string) =>
          id.startsWith("drafts.") ? { _id: id } : undefined
        ),
        createIfNotExists,
        assets: { upload },
      },
      draft: testDraft(),
      imageUrls: ["https://scontent.xx.fbcdn.net/photo.jpg"],
      fetcher,
    });

    expect(result.created).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
    expect(upload).not.toHaveBeenCalled();
    expect(createIfNotExists).not.toHaveBeenCalled();
  });

  it("does not recreate a post that has already been published in Sanity", async () => {
    const createIfNotExists = vi.fn();

    const result = await createFacebookDraftInSanity({
      client: {
        getDocument: vi.fn(async (id: string) =>
          id === "facebook-page-123_456" ? { _id: id } : undefined
        ),
        createIfNotExists,
        assets: { upload: vi.fn() },
      },
      draft: testDraft(),
      imageUrls: [],
      fetcher: vi.fn(),
    });

    expect(result.created).toBe(false);
    expect(createIfNotExists).not.toHaveBeenCalled();
  });

  it("rejects redirects from a Meta media host to an unrelated host", async () => {
    const fetcher = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(null, {
          status: 302,
          headers: { Location: "https://example.com/private-image.jpg" },
        })
    );
    const createIfNotExists = vi.fn();

    await expect(
      createFacebookDraftInSanity({
        client: {
          getDocument: vi.fn(async () => undefined),
          createIfNotExists,
          assets: { upload: vi.fn() },
        },
        draft: testDraft(),
        imageUrls: ["https://scontent.xx.fbcdn.net/photo.jpg"],
        fetcher,
      })
    ).rejects.toThrow("approved Meta media host");

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(createIfNotExists).not.toHaveBeenCalled();
  });

  it("stores the first image as featured media and the rest in the slider", async () => {
    const createdDocuments: unknown[] = [];
    const upload = vi
      .fn()
      .mockResolvedValueOnce({ _id: "image-featured" })
      .mockResolvedValueOnce({ _id: "image-slider" });
    const fetcher = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(new Uint8Array([1, 2, 3]), {
          status: 200,
          headers: { "Content-Type": "image/jpeg", "Content-Length": "3" },
        })
    );

    const result = await createFacebookDraftInSanity({
      client: {
        getDocument: vi.fn(async () => undefined),
        createIfNotExists: vi.fn(async (document) => {
          createdDocuments.push(document);
          return document;
        }),
        assets: { upload },
      },
      draft: testDraft(),
      imageUrls: [
        "https://scontent.xx.fbcdn.net/first.jpg",
        "https://scontent.xx.fbcdn.net/second.jpg",
      ],
      fetcher,
    });

    expect(result).toMatchObject({ created: true, imageCount: 2 });
    expect(createdDocuments[0]).toMatchObject({
      _id: "drafts.facebook-page-123_456",
      status: "draft",
      featuredMedia: {
        _type: "image",
        asset: { _type: "reference", _ref: "image-featured" },
      },
      slider: [
        {
          image: {
            _type: "image",
            asset: { _type: "reference", _ref: "image-slider" },
          },
        },
      ],
    });
  });
});
